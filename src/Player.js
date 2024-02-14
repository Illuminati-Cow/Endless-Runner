class Player extends Phaser.Physics.Matter.Sprite  {
    /**
     * Represents a player object.
     * @constructor
     * @param {Phaser.Scene} scene - The scene in which the player exists.
     * @param {number} x - The x-coordinate of the player's initial position.
     * @param {number} y - The y-coordinate of the player's initial position.
     * @param {string} texture - The texture key for the player's sprite.
     */
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture)
        scene.add.existing(this);
        scene.matter.add.gameObject(this);
        this.direction = 'right';
        // Set Movement constants
        this.acceleration = 1;
        this.maxRunningSpeed = 10;

        // Set up StateMachine
        this.stateMachine = new StateMachine('idle', {
            'idle': new IdleState(this.stateMachine),
            'run': new RunState(this.stateMachine),
            'jump': new JumpState(this.stateMachine),
        }, [this]);
        // Get Keys from KeyCodes stored in gameSettings
        this.controls = {
            left: scene.input.keyboard.addKey(gameSettings.controls.left),
            right: scene.input.keyboard.addKey(gameSettings.controls.right),
            down: scene.input.keyboard.addKey(gameSettings.controls.down),
            jump: scene.input.keyboard.addKey(gameSettings.controls.jump),
            grapple: scene.input.keyboard.addKey(gameSettings.controls.grapple),
        }
    }

    /**
     * Checks if the player is out of bounds.
     * @returns {boolean} True if the player is out of bounds, false otherwise.
     */
    isOutofBounds() {
        // Check if player is out of bounds and return true or false based on this
        return false;
    }

    /**
     * Checks if the player is on the ground.
     * @returns {boolean} True if the player is on the ground, false otherwise.
     */
    isGrounded() {
        // Check if player is on the ground and return true if so and false otherwise
        return true;
    }
}

class IdleState extends State {

    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'run': true,
            'jump': true,
        }
    }

    /**
     * Plays the idle animation for the player in the specified direction.
     * 
     * @param {Player} player - The player object.
     */
    enter(player) {
        player.anims.play(`idle-${player.direction}`)
    }

    update(player) {
        // Next check for Jump input
        if(Phaser.Input.Keyboard.JustDown(player.controls.jump)) {
            player.stateMachine.transitionTo('jump');
            return;
        }
        // Check if movement keys are down
        if(player.controls.left.isDown || player.controls.right.isDown) {
            player.stateMachine.transitionTo('run');
            return;
        }
    }
}

class RunState extends State {
    
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'jump': true,
            'idle': false,
        }
    }

    enter(player) {
        player.anims.play(`run-${player.direction}`, true)
    }

    /**
     * Updates the player's state based on user input.
     * @param {Player} player - The player object.
     */
    update(player) {
        // First check if out of bounds, if so, game is over
        if(player.isOutofBounds()) {
            player.stateMachine.transitionTo('idle')
            player.scene.gameOver();
            return;
        }
        // Next check if player is on the ground -> if not transition to falling
        if(!player.isGrounded()) {
            player.stateMachine.transitionTo('fall');
            return;
        }
        // Next check for Jump input
        if(Phaser.Input.Keyboard.JustDown(player.controls.jump)) {
            player.stateMachine.transitionTo('jump');
            return;
        }
        // Check for input and change state
        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        if(player.controls.left.isDown) {
            moveDirection.x += -1;
            player.direction = 'left';
        }
        if(player.controls.right.isDown) {
            moveDirection.x += 1;
            player.direction = 'right';
        }
        // Check for jump after move direction is calculated so that 
        // normalize movement vector, update hero position, and play proper animation
        moveDirection.normalize();
        let accel = moveDirection.x * player.acceleration;
        let vel = player.getVelocity();
        // If player is moving slower than max running speed add run force
        if(Math.abs(player.body.velocity.x) < player.maxRunningSpeed)
            player.setVelocityX(vel.x+accel*(Play.deltaTime*0.5));
        // If not moving at all then transistion to idle
        if (player.getVelocity().x != 0)
            player.anims.play(`run-${player.direction}`, true);
        else
            player.stateMachine.transitionTo('idle');
        // Change player animation speed based on player speed
        // player.anims.currentAnim.frameRate *= Math.max(0.75, Math.abs(player.getVelocity()));
    }
}

class JumpState extends State {
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'run': true,
            'fall': true,
            'idle': true,
        }
    }

    /**
     * Plays the jump animation in the Player's direction
     * @param {Player} player - The player sprite.
     */
    enter(player) {
        player.anims.play(`jump-${player.direction}`)
    }

    update(player) {
        // If player grounded then transition
        if(player.isGrounded()) {
            if(player.controls.left.isDown || player.controls.right.isDown)
                player.stateMachine.transitionTo('run')
            else
                player.stateMachine.transitionTo('idle')
        }
    }
}