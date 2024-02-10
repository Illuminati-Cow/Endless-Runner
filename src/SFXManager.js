"use strict"

class SFXManager {
    static Instance = null;
    #sfx = {};
    
    constructor(sfx) {
        if (this.Instance != null) {
            this = null
            return null
        }
        this.#sfx = sfx
        this.currentMenu = startingMenu
    }
}