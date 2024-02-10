class Player extends Phaser.Physics.Arcade.Sprite  {
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
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.stateMachine = new StateMachine(0, {
            idle: new IdleState(this.stateMachine),
            run: new RunState(this.stateMachine),
            jump: new JumpState(this.stateMachine),
        }, [this]);
    }
}

class IdleState extends State {

    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'running': true,
            'jumping': true,
        }
    }

    enter(player) {
        this.stateMachine.sprite.anims.play('idle')
    }
}

class RunState extends State {
    
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'jumping': true,
        }
    }

    enter(player) {
        this.stateMachine.sprite.anims.play('run')
    }

    update(player) {
        // Check for input and change state
    }
}

class JumpState extends State {
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {

        }
    }

    enter(player) {

    }
}