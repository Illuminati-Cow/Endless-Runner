class Button extends Phaser.GameObjects.Sprite {
    /**
     * Represents a button in the game.
     * @constructor
     * @param {Phaser.Scene} scene - The scene in which the button is created.
     * @param {number} x - The x-coordinate of the button.
     * @param {number} y - The y-coordinate of the button.
     * @param {string | Object} text - The text for the button or a text config object.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {function} callback - The callback function to be executed when the button is clicked.
     */
    constructor(scene, x, y, width, height, text, callback) {
        super(scene, x, y, 'button');
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.width = width;
        this.height = height;
        this.pressedTint = 0x7932fc;
        this.hoverTint = 0xd9c7fc;
        this.setInteractive()
        this.on('pointerup', callback)
        this.on('pointerover', this.enterButtonHoverState)
        this.on('pointerdown', this.enterButtonActiveState)
        this.on('pointerout', this.enterButtonRestState)
        let defaultTextConfig = {
            x: x,
            y: y,

        }
        if (typeof text == 'string') {
            let buttonText = scene.add.text(defaultTextConfig.x, defaultTextConfig.y, text)
            buttonText.setOrigin(0.5);
            buttonText.setAlign('center');
            buttonText.setFontFamily('Monospace')
            buttonText.setFontSize(this.width/text.length+5);
        }
        else // TODO: Implement TextStyle support
            scene.add.text(text.x, text.y, text.text, text.style)

    }
    // I got some techniques to create interactive buttons from this blog including following callbacks
    // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
    enterButtonHoverState() {
        this.setTint(this.hoverTint);
    }
    
    enterButtonRestState() {
        this.clearTint();
    }
    
    enterButtonActiveState() {
        this.setTint(this.pressedTint);
    }
}