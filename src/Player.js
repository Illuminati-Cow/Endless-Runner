class Player extends Phaser.Physics.Arcade.Sprite  {
    
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        this.stateMachine = new StateMachine(new IdleState(this))
    }
}

class IdleState extends State {
    
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'running': true,
            'jumping': true
        }
    }

    enter() {
        this.stateMachine.sprite.anims.play('idle')
    }
}
class RunningState extends State {
    
    constructor(stateMachine) {
        super(stateMachine)
        this.transitions = {
            'jumping': true,
        }
    }

    enter() {
        this.stateMachine.sprite.anims.play('run')
    }

    update() {
        // Check for input and change state
    }
}