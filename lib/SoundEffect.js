class SoundEffect {
    /**
     * @type {Phaser.Sound.BaseSoundManager}
     */
    static soundManager
    #sound
    /**
     * Creates a new SoundEffect instance.
     * @param {string} soundEffectName - The name of the sound effect.
     * @param {number} [maxConcurrent=1] - The max count of this sound effect playing at once (minimum of 1).
     * @param {boolean} [restartable=true] - Whether or not to restart the first instance of this sound effect
     * currently playing if the sound could not play otherwise.
     * @param {Phaser.Types.Sound.SoundConfig} [soundConfig] - An optional sound configuration object.
     */
    constructor(soundEffectName, maxConcurrent=1, restartable=true, soundConfig) {
        this.#sound = SoundEffect.soundManager.add(soundEffectName);
        this.currentlyPlaying = 0;
        this.maxConcurrent = maxConcurrent;
        this.restartable = restartable;
        this.soundConfig = soundConfig;
    }

    /**
     * Plays the sound effect.
     * 
     * @returns {boolean} Returns true if the sound effect was played successfully, false otherwise.
     */
    play() {
        if (this.canPlay()) {
            this.#sound.play(this.soundConfig);
            return true;
        }
        else {
            return false;
        }
    }

    canPlay() {
        return this.currentlyPlaying < this.maxConcurrent || this.restartable;
    }
}