class Load extends Phaser.Scene {
    constructor() {
        super('Load');
        // Progress Bar
        this.progressBar = new Phaser.GameObjects.NineSlice(this, gameSettings.width/2, gameSettings.height/2,'progress-bar')
        this.progressBar.leftWidth = 5
        this.progressBar.rightWidth = 5
        this.progressBarInternal = new Phaser.GameObjects.NineSlice(this, gameSettings.width/2, gameSettings.height/2, 'progress-bar-internal')
        this.progressBarInternal.scaleX(0)
        this.progressBarInternal.leftWidth = 5
        this.progressBarInternal.rightWidth = 5
    }

    /**
     * Loads all assets needed in the game.
     */
    preload() {
        // Update progress bar based on load status
        this.load.on('progress', (progress) => {
            this.progressBarInternal.scaleX(progress) 
        })
        // Load assets
        this.load.path = './assets/'
        // Progress Bar
        this.load.texture('progress-bar', 'progress-bar')
        this.load.texture('progress-bar-internal', 'progress-bar-internal')
        // Player Sprites
        
    }
    /**
     * Creates all global assets needed in the game.
     */
    create() {
        // this.anims.create({
        //     key: 'walk-down',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        // })
    }
}