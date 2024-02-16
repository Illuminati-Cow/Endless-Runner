class Button extends Phaser.GameObjects.Sprite {

    #alignment = {
        topleft: { x: gameSettings.width/10, y: gameSettings.height/10 },
        topcenter: { x: gameSettings.width/2, y: gameSettings.height/10 },
        topright: { x: 9*gameSettings.width/10, y: gameSettings.height/10 },
        centerleft: { x: gameSettings.width/10, y: gameSettings.height/2 },
        center: { x: gameSettings.width/2, y: gameSettings.height/2 },
        centerright: { x: 9*gameSettings.width/10, y: gameSettings.height/2 },
        bottomleft: {x: 9*gameSettings.width/10, y: 9*gameSettings.height/10 },
        bottomcenter: {x: gameSettings.width/2, y: 9*gameSettings.height/10 },
        bottomright: {x: 9*gameSettings.width/10, y: 9*gameSettings.height/10 },
        absolute: { x: 0, y: 0 }
    }

    /**
     * Represents an interactable up/down button in the game.
     * @constructor
     * @param {Phaser.Scene} scene - The scene in which the button is created.
     * @param {number} x - The x-coordinate of the button relative to the anchor point.
     * @param {number} y - The y-coordinate of the button relative to the anchor point.
     * @param {number} width - The width of the button.
     * @param {number} height - The height of the button.
     * @param {string} text - The text for the button.
     * @param {function} callback - The callback function to be executed when the button is clicked.
     * @param {Phaser.Types.GameObjects.Text.TextStyle} [textStyle=undefined] The optional textStyle config for the button text.
     * @param {string} [alignment='top-left'] - The optional alignment of the button relative to the center of the screen.
     * This sets this position as the anchor point as well. Defaults to 'top-left'.
     * Can be from the following list of options
     * ```javascript
     * let alignment = [
     *  'topleft',
     *  'topcenter',
     *  'topright',
     *  'centerleft',
     *  'center',
     *  'centerright',
     *  'bottomleft',
     *  'bottomcenter',
     *  'bottomright',
     *  'absolute'
     * ]
     * ```
     */
    constructor(scene, x, y, width, height, text, callback, textStyle=undefined, alignment='top-left') {
        super(scene, x, y, 'button');
        scene.add.existing(this);
        this.setOrigin(0.5);
        this.width = width;
        this.height = height;
        this.pressedTint = 0x7932fc;
        this.hoverTint = 0xd9c7fc;
        this.setInteractive();
        this.on('pointerup', callback);
        this.on('pointerover', this.enterButtonHoverState);
        this.on('pointerdown', this.enterButtonActiveState);
        this.on('pointerout', this.enterButtonRestState);
        //If an invalid alignment use absolute
        if (!(alignment in this.#alignment)) {
            alignment = 'absolute';
        }
        this.x = this.#alignment[alignment].x;
        this.y = this.#alignment[alignment].y;
        // Adjust button position to fit on screen and then apply x and y parameters
        if (alignment != 'absolute') {
            this.x = this.x + x;
            this.y = this.y+ y;
        }
        if (textStyle==undefined || textStyle == {}) {
            this.buttonText = scene.add.text(this.x, this.y, text);
            this.buttonText.setOrigin(0.5);
            this.buttonText.setAlign('center');
            this.buttonText.setFontFamily('Monospace')
            this.buttonText.setFontSize(this.width/text.length+5);
        }
        else
            this.buttonText = scene.add.text(this.x, this.y, text, textStyle);

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

//export default Button;