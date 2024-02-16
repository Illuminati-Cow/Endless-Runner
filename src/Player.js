var colors = {
    red:0,
    //orange:1,
    //yellow:2,
    green:3,
    //cyan:4,
    blue:5,
    //purple:6
}
class Player extends Phaser.Physics.Arcade.Sprite  {
    /**
     * True if player is alive else false
     * @type{boolean}
    */
   #isAlive
   #color
   #particleConfig
   #maxMoveSpeed
   #morphing
   /**
    * Represents a player object.
    * @constructor
    * @param {Phaser.Scene} scene - The scene in which the player exists.
    * @param {number} x - The x-coordinate of the player's initial position.
    * @param {number} y - The y-coordinate of the player's initial position.
   */
  constructor(scene, x, y) {
        super(scene, x, y, 'red-arrow')
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#isAlive = true;
        this.#color = colors.red;
        this.moveSpeed = 20;
        this.dragForce = 10;
        this.#maxMoveSpeed = 500;
        this.#morphing = false;
        this.body.setMaxVelocity(this.#maxMoveSpeed)
        this.body.setCollideWorldBounds(true, 0, 5)
        this.setPushable(false);
        this.#particleConfig = {
            red: {
                x: {min:-10,max:10},
                y: {min:-10,max:10},
                angle: {min:160,max:200},
                accelerationX: -0.5,
                speed: 500,
                lifespan: {min:100,max:500},
                alpha: {start:0.8,end:0.25},
                frequency: 10,
                rotation: {
                    onUpdate: (particle, key, t, value) => {
                        value += 5
                        return value;
                    }
                },
                texture: 'red-particle'
            } 
        };
        this.particleEmitter = this.scene.add.particles(this.x, this.y, 'red-particle', this.#particleConfig.red);
        this.particleEmitter.emitting = false
        this.particleEmitter.visible = false
        this.controls = {
            down: scene.input.keyboard.addKey(gameSettings.controls.down),
            up: scene.input.keyboard.addKey(gameSettings.controls.up),
            red: scene.input.keyboard.addKey(gameSettings.controls.red),
            green: scene.input.keyboard.addKey(gameSettings.controls.green),
            blue: scene.input.keyboard.addKey(gameSettings.controls.blue),
        };
    }

    update() {
        // Get input if active
        if (this.active) {
            this.particleEmitter.emitting = true;
            this.particleEmitter.visible = true;
            this.particleEmitter.setPosition(this.x-20, this.y)
            let velocity = this.body.velocity.y;
            let dir = velocity != 0 ? Math.abs(velocity) / velocity : 0;
            let accelDir = 0;
            if (this.controls.down.isDown)
                accelDir += 1;
            if (this.controls.up.isDown)
                accelDir += -1;
            if (accelDir == 0)
                velocity -= this.dragForce * dir;
            else
                velocity += accelDir * this.moveSpeed;
            this.body.velocity.y = velocity;

            // Color changing
            if(this.controls.blue.isDown && !this.#morphing) {
                this.particleEmitter.emitting = false;
                this.#morphing = true;
                this.anims.play('morph', true).on('animationcomplete', ()=>{
                    this.#color = colors.blue;
                    this.particleEmitter.setTexture('blue-particle');
                    this.particleEmitter.emitting = true;
                    this.setTexture('blue-arrow');
                    this.#morphing = false;
                },this);
            }
            else if (this.controls.red.isDown && !this.#morphing) {
                this.particleEmitter.emitting = false;
                this.#morphing = true;
                this.anims.play('morph', true).on('animationcomplete', ()=>{
                    this.#color = colors.red;
                    this.particleEmitter.setTexture('red-particle');
                    this.particleEmitter.emitting = true;
                    this.setTexture('red-arrow');
                    this.#morphing = false;
                },this);
            }
            else if (this.controls.green.isDown && !this.#morphing) {
                this.particleEmitter.emitting = false;
                this.#morphing = true;
                this.anims.play('morph', true).on('animationcomplete', ()=>{
                    this.#color = colors.green;
                    this.particleEmitter.setTexture('green-particle');
                    this.particleEmitter.emitting = true;
                    this.setTexture('green-arrow');
                    this.#morphing = false;
                },this);
            }
        }
    }

    get color() {
        return this.#color;
    }

    get isAlive() {
        return this.#isAlive;
    }

    /**
     * @param {number} value
     */
    set maxMoveSpeed(value) {
        this.#maxMoveSpeed = value;
        this.body.setMaxVelocity(value);
    }

    kill() {
        this.visible = false;
        this.active = false;
        this.particleEmitter.emitting = false;
        this.setVelocity(0, 0);
    }
    
    respawn(x, y) {
        this.setPosition(x, y);
        this.particleEmitter.setPosition(x-20, y)
        this.active = true;
        this.visible = true;
        this.particleEmitter.setTexture('red-particle');
        this.particleEmitter.emitting = true;
        this.setVelocity(0, 0);
        this.setTexture('red-arrow');
    }
}