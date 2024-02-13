class Load extends Phaser.Scene {
    constructor() {
        super('Load');
        this.progressBar;
        this.progressBox;
    }

    init () {
        // Progress Bar
        this.progressBox = this.add.graphics();
        this.progressBar = this.add.graphics();
        let boxConfig = {
            x: gameSettings.width/2-gameSettings.width/4, 
            y: gameSettings.height/2-gameSettings.height/10, 
            width: gameSettings.width/2, 
            height: gameSettings.height/10
        }
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(boxConfig.x, boxConfig.y, boxConfig.width, boxConfig.height);
    }

    /**
     * Loads all assets needed in the game.
     */
    preload() {
        // Update progress bar based on load status
        this.load.on('progress', (progress) => {
            // this.progressBarInternal.setVisible(true)
            // this.progressBarInternal.scaleX(progress)
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            let barConfig = {
                x: gameSettings.width/2-gameSettings.width/4+5, 
                y: gameSettings.height/2-gameSettings.height/10+5, 
                width: gameSettings.width/2-10, 
                height: gameSettings.height/10-10
            }
            this.progressBar.fillRect(barConfig.x, barConfig.y, barConfig.width * progress, barConfig.height);
        });
        this.load.on('complete', () => {
            this.scene.start('MainMenu')
        });
        // Load assets
        this.load.path = './assets/'

        // Physics Shapes 
        // Reference: https://github.com/phaserjs/examples/blob/master/public/src/physics/matterjs/advanced%20shape%20creation.js
        this.load.json('terrain-shapes', 'physics/terrain-shapes.json')
        // Player Sprites
        //this.load.spritesheet('player-sheet', 'player.png')
    }
    /**
     * Creates all global assets needed in the game.
     */
    create() {
        // Create Manager Singletons
        new UIManager({
            main: new MainMenu(),
            credits: new CreditsMenu(),
            pause: new PauseMenu(),
            gameover: new GameOverMenu(),
        }, {
            // ADD HUD
        });
        new SFXManager({
            // ADD SFX
        });
        // this.anims.create({
        //     key: 'walk-down',
        //     frameRate: 8,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        // })
    }
}