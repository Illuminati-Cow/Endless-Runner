var colors = {
    red:0,
    orange:1,
    yellow:2,
    green:3,
    cyan:4,
    blue:5,
    purple:6
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
   /**
    * Represents a player object.
    * @constructor
    * @param {Phaser.Scene} scene - The scene in which the player exists.
    * @param {number} x - The x-coordinate of the player's initial position.
    * @param {number} y - The y-coordinate of the player's initial position.
    * @param {string} texture - The texture key for the player's sprite.
   */
  constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#isAlive = true;
        this.isActive = false;
        this.#color = colors.red;
        this.moveSpeed = 20;
        this.dragForce = 10;
        this.#maxMoveSpeed = 500;
        this.body.setMaxVelocity(this.#maxMoveSpeed)
        this.body.setCollideWorldBounds(true, 0, 5)
        this.#particleConfig = {
            red: {
                x: this.x,
                y: this.y,
                angle: {min:-45,max:45},
                accelerationX: -0.5,
                speed: 5,
                lifespan: {min:2,max:4},
                alpha: {start:0.8,end:0.25},
                texture: 'red-particle'
            } 
        };
        this.particleEmitter = this.scene.add.particles(this.x, this.y, 'red-particle', this.#particleConfig.red);
        this.controls = {
            down: scene.input.keyboard.addKey(gameSettings.controls.down),
            up: scene.input.keyboard.addKey(gameSettings.controls.up),
        };
    }

    update() {
        // Get input if active
        if (this.isActive) {
            let velocity = this.body.velocity.y
            let dir = velocity != 0 ? Math.abs(velocity) / velocity : 0
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

    }
}