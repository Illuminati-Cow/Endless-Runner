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
        this.load.on('complete', () => {this.scene.stop(this)})
        // Load assets
        this.load.path = './assets/'
        this.load.image('planet', 'purple-planet.png');
        this.load.image('stars', 'sun-space.png');
        // Texture atlas
        this.load.atlas('sheet', 'spritesheet.png', 'spritesheet.json');
        this.load.image('button', 'button.png');
        this.load.image('enemy', 'enemy.png');
        // Load SFX
        this.load.audio('hover', 'sfx/hover.wav');
        this.load.audio('click', 'sfx/click.wav');
        this.load.audio('explosion', 'sfx/explosion.wav');
        this.load.audio('game-over', 'sfx/game-over.wav');
        this.load.audio('bg-music', 'sfx/space-battle.mp3');    
    }
    /**
     * Creates all global assets needed in the game.
     */
    create() {
        // Create Manager Singletons
        new UIManager(this.scene, this.events, {
            MainMenu: new MainMenu(),
            CreditsMenu: new CreditsMenu(),
            PauseMenu: new PauseMenu(),
            GameOverMenu: new GameOverMenu(),
        }, {
            // ADD HUD
        }, 'MainMenu');
        // new SFXManager([
        //     'hover',
        //     'click',
        //     'explosion',
        //     'game-over',
        //     'bg-music'
        // ]); 
        // Create Animations
        this.anims.create({
            key: 'morph',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNames('sheet', {prefix: 'morph', start:0, end: 2, zeroPad:1})
        });
        // Create textures
        this.textures.addSpriteSheetFromAtlas(
            'red-particle',
            {
                atlas: 'sheet',
                frame: 'fire-particle',
                frameWidth: 16,
                frameHeight: 16,
            }
        );
        this.textures.addSpriteSheetFromAtlas(
            'green-particle',
            {
                atlas: 'sheet',
                frame: 'leaf-particle',
                frameWidth: 16,
                frameHeight: 16,
            }
        );
        this.textures.addSpriteSheetFromAtlas(
            'blue-particle',
            {
                atlas: 'sheet',
                frame: 'water-particle',
                frameWidth: 16,
                frameHeight: 16,
            }
        );
        this.textures.addSpriteSheetFromAtlas(
            'red-arrow',
            {
                atlas: 'sheet',
                frame: 'red-arrow',
                frameWidth: 29,
                frameHeight: 28,
            }
        );
        this.textures.addSpriteSheetFromAtlas(
            'green-arrow',
            {
                atlas: 'sheet',
                frame: 'green-arrow',
                frameWidth: 31,
                frameHeight: 26,
            }
        );
        this.textures.addSpriteSheetFromAtlas(
            'blue-arrow',
            {
                atlas: 'sheet',
                frame: 'blue-arrow',
                frameWidth: 27,
                frameHeight: 28,
            }
        );
        
    }
}