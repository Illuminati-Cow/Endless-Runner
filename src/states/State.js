class State {
    constructor(stateMachine) {
        this.stateMachine = stateMachine
        this.transitions = {}
    }

    canTransitionTo(newState) {
        return this.transitions[newState] !== undefined
    }

    canTransitionFrom(oldState) {
        return oldState.canTransitionTo(this)
    }

    enter() {}
    exit() {}
    update() {}
}