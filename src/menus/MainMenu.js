"use strict"

class MainMenu extends Menu {
    constructor() {
        super('MainMenu');
    }
    create() {
        this.cameras.main.setBackgroundColor(0x4d4d4d)
        let mainTextConfig = {
            x: gameSettings.width/2,
            y: gameSettings.height/2-gameSettings.height/5,
            text: "Speed"
        }
        /**
         * @type{Phaser.Types.GameObjects.Text.TextStyle}
         */
        let mainTextStyleConfig = {
            fontFamily: 'Monospace',
            fontSize: gameSettings.width/5
        }
        this.add.text(mainTextConfig.x, mainTextConfig.y, mainTextConfig.text, mainTextStyleConfig).setOrigin(0.5)
        let startButtonConfig = {
            x: gameSettings.width/2,
            y: gameSettings.height/2+gameSettings.height/6,
            width: gameSettings.width/5,
            height: gameSettings.height/5,
            text: "START",
            callback: () => {
                this.scene.start('Play');
            },
        };
        let button = new Button(this, startButtonConfig.x, startButtonConfig.y, startButtonConfig.width, startButtonConfig.height, startButtonConfig.text, startButtonConfig.callback)
    }
}