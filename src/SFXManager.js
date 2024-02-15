"use strict"

class SFXManager extends Phaser.Scene {
    static Instance = null;
    #sfx = {};
    
    constructor(sfx, soundManagerPlugin) {
        if (this.Instance != null) {
            return null
        } else {
            super({key: 'SFXManager', visible: false, active: true});
            this.sound = soundManagerPlugin;
            SFXManager.Instance = this;
        }
        this.#sfx = sfx;
        this.currentlyPlaying = {};
    }

    /**
     * Plays the specified sound effect if it is loaded and can play.
     * @param {string} soundEffectName 
     * @returns true if sound effect played else false
     */
    play(soundEffectName) {
        if (soundEffectName in this.#sfx) {
            let sfx = this.#sfx[soundEffectName];
            if (sfx.canPlay()) {
                sfx.play();
                return true;
            }
            else {
                console.log(`Max number of allowed ${soundEffectName} already playing`)
                return false;
            }
        }
        else {
            console.log(`${soundEffectName} is not a valid sound effect`)
            return false;
        }
    }
}