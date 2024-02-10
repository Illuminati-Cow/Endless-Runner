class State {
    
    /**
     * Represents a state in the state machine.
     * @constructor
     * @param {StateMachine} stateMachine - The state machine that this state belongs to.
     */
    constructor(stateMachine) {
        this.stateMachine = stateMachine
        this.transitions = {}
    }


    /**
     * Checks if the current state can transition to the specified new state.
     * @param {string} newState - The new state to transition to.
     * @returns {boolean} - True if the transition is allowed, false otherwise.
     */
    canTransitionTo(newState) {
        return this.transitions[newState] !== undefined
    }

    /**
     * Checks if the current state can transition from the specified old state.
     * @param {State} oldState - The old state to transition from.
     * @returns {boolean} - True if the transition is allowed, false otherwise.
     */
    canTransitionFrom(oldState) {
        return oldState.canTransitionTo(this)
    }

    enter() {}
    exit() {}
    update() {}
}