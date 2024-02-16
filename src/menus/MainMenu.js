"use strict"

class MainMenu extends Menu {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x4d4d4d);
        let width = gameSettings.width;
        let height = gameSettings.height;
        let mainTextConfig = {
            x: width/2,
            y: height/2-height/5,
            text: "Speed"
        }
        /**
         * @type{Phaser.Types.GameObjects.Text.TextStyle}
         */
        let mainTextStyleConfig = {
            fontFamily: 'Monospace',
            fontSize: width/5
        }
        this.add.text(mainTextConfig.x, mainTextConfig.y, mainTextConfig.text, mainTextStyleConfig).setOrigin(0.5)
        let startButtonConfig = {
            width: width/5,
            height: height/5,
            text: "START",
            callback: () => {
                UIManager.Instance.changeMenu("None");
                this._scene.launch('Play');
            },
        };
        // I
        this.add.rectangle(width/15, 2*height/4, width/10, width/10, 0xff00ff, 1);
        this.add.text(width/15, 2*height/4+5, 'I', {fontFamily: 'Monospace', fontSize: '8.5vw'}).setOrigin(0.5);
        this.add.text(width/8, 2*height/4, 'UP', {fontFamily: 'Monospace', fontSize: '5vw'}).setOrigin(0, 0.5);
        // J
        this.add.rectangle(width/15, 3*height/4, width/10, width/10, 0xff00ff, 1);
        this.add.text(width/15, 3*height/4+5, 'J', {fontFamily: 'Monospace', fontSize: '8.5vw'}).setOrigin(0.5);
        this.add.text(width/8, 3*height/4, 'DOWN', {fontFamily: 'Monospace', fontSize: '5vw'}).setOrigin(0, 0.5);
        // Q
        this.add.rectangle(width-width/15, 1*height/4, width/10, width/10, 0xff3300, 1);
        this.add.text(width-width/15, 1*height/4-5, 'Q', {fontFamily: 'Monospace', fontSize: '8vw'}).setOrigin(0.5);
        // W
        this.add.rectangle(width-width/15, 2*height/4, width/10, width/10, 0x008000, 1);
        this.add.text(width-width/15, 2*height/4+5, 'W', {fontFamily: 'Monospace', fontSize: '8.5vw'}).setOrigin(0.5);
        // E
        this.add.rectangle(width-width/15, 3*height/4, width/10, width/10, 0x0099ff, 1);
        this.add.text(width-width/15, 3*height/4+5, 'E', {fontFamily: 'Monospace', fontSize: '8.5vw'}).setOrigin(0.5);

        let button = new Button(this, 0, height/5, startButtonConfig.width, startButtonConfig.height, startButtonConfig.text, startButtonConfig.callback, undefined, 'center');
    }
}