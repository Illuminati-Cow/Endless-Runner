class StateMachine {
    /**
     * Creates a new StateMachine instance.
     * @param {String} initialState - The initial state of the StateMachine.
     * @param {Object} states - A dictionary of possible states for the StateMachine.
     * @param {Array} stateArgs - An array of arguments to be passed to each state.
     */
    constructor(initialState, states, stateArgs = []) {
        this.stateArgs = stateArgs;
        this.states = states
        /**
         * The current state of the machine.
         * @type {State}
         */
        this.state = states[initialState];
    }
    

    /**
     * Transition to a new state.
     * @param {string} state - The new state to transition to.
     * @returns {boolean} True if transistion successful, false if otherwise
     */
    transitionTo(state) {
        if (!this.state.canTransitionTo(state))
            return false
        //let oldState = this.state;
        this.state.exit(...this.stateArgs);
        this.state = state;
        this.state.enter(...this.stateArgs);
        return true
    }


    /**
     * Updates the state of the state machine.
     * Should be called from an update loop.
     */
    update() {
        this.state.update(...this.stateArgs);
    }
}