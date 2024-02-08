class StateMachine {
    state = null;

    constructor(initialState, stateArgs = []) {
        this.state = initialState;
        this.stateArgs = stateArgs;
    }
    
    transitionTo(state) {
        let oldState = this.state;
        this.state.onExit(this.stateArgs);
        this.state = state;
        this.state.onEnter(oldState, this.stateArgs);
    }

    update() {
        this.state.update(this.stateArgs);
    }
}