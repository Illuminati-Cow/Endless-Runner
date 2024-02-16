"use strict"

class SFXManager extends Phaser.Scene {
    /**
     * The singleton instance of the SFXManager class.
     * @type{SFXManager}
     */
    static Instance = null;
    #sfx = {};
    
    /**
     * Creates an instance of SFXManager.
     * @constructor
     * @param {Array.<string>} sfx - The sound effects to play.
     */
    constructor(sfx) {
        super('SFXManager');
        if (this.Instance != null) {
            return null
        } else {
            SFXManager.Instance = this;
        }
        this.keys = sfx;
        this.currentlyPlaying = [];
        this.#sfx = {};
    }

    create() {
        this.keys.forEach(key => {
            this.#sfx.key = new SFX(this.sound, key)
        });
        console.log(this.#sfx)
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

    stop(key) {
        if (key in this.currentlyPlaying) {
            this.#sfx[key].stop();
            if (!this.#sfx[key].isPlaying)
                this.currentlyPlaying.splice(this.currentlyPlaying.indexOf(key), 1);
        }
    }

    addSFX(key) {
        let canAdd = true;
        if (this.sound.get(key) == null)
            return false;
        // is sfx already added
        this.#sfx.forEach(sfx => {
            if (sfx.key == key)
                return false;
        });
        this.#sfx.push(new SFX(this.sound, key, 1, true));
    }
}

class SFX {
    /**
     * @type {Array.<Phaser.Sound.BaseSound>}
     */
    #sfx

    /**
     * Creates a new sound effect wrapper class.
     * @param {Phaser.Sound.BaseSoundManager} soundManager - The sound manager instance.
     * @param {string} key - The key of the sound to be managed.
     * @param {number} [maxConcurrent=1] - The maximum number of concurrent plays allowed.
     * @param {boolean} [restartOnPlay=true] - Whether to restart the sound when played again.
     * @param {Phaser.Types.Sound.SoundConfig}
     */
    constructor(soundManager, key, maxConcurrent=1, restartOnPlay=true, soundConfig={}) {
        this.key = key;
        this.isPlaying = false;
        this.maxConcurrent = maxConcurrent;
        this.playingCount = 0;
        this.restartOnPlay = restartOnPlay;
        this.sound = soundManager;
        this.#sfx = soundManager.add(key, soundConfig);
    }

    canPlay() {
        if (this.playingCount < this.maxConcurrent || this.restartOnPlay) {
            return true;
        }
        return false;
    }

    play() {
        if (this.canPlay()) {
            for (let index = 0; index < this.#sfx.length; index++) {
                const element = this.#sfx[index];
                if (!element.isPlaying) {
                    element.play();
                    this.playingCount++;
                    this.isPlaying = true;
                    break;
                }
            }
        }
    }

    stop() {
        for (let index = 0; index < this.#sfx.length; index++) {
            const element = this.#sfx[index];
            if (!element.isPlaying) {
                element.play();
                this.playingCount--;
                break;
            }
        }
        if (this.playingCount == 0)
            this.isPlaying = false;
    }

    stopAll() {
        this.#sfx.forEach(sfx => {
            sfx.stop();
        });
    }

}