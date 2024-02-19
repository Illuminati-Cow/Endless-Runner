"use strict"

/**
 * Speed by Cole Falxa-Sturken
 * This project took me at least 40 hours do to scrapping a previous
 * project utilizing matter.js physics. It would not have been completed
 * within the time frame so I gave up and made a simpler game that did
 * not utilize procedural generation.
 * My creative tilt is the creation of a UIManager class that utilizes
 * a menu inheritance hierarchy that can be seen in the src/menus folder
 * and src/UIManager.js. Both this and my custom button class utilize the
 * Phaser events system to communicate between concurrently running scenes.
 * 
 * My second creative tilt is a twist on the endless runner format similar
 * to older 'endless runner' games that utilized endless gameplay without a 
 * running player character. I make the character match the color of the 
 * projectiles in order to destroy them which makes the gameplay similar to
 * a rythm game. I also utilize an easing function for both enemy speed scaling
 * and for the background visuals which smoothly shift up and down as the player moves.
 */


/**
 * @type{Phaser.Core.Config}
 */
const config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 960,
    height: 540,
    scene: [Load, MainMenu, Play, GameOverMenu, CreditsMenu, PauseMenu, None],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y: 0},
            debug: false,
        },
    },
    pixelArt: true
}

const game = new Phaser.Game(config)

const gameSettings = {
    width: config.width,
    height: config.height,
    cameraFollowStrength: {x: .8, y: .8},
    controls: {
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        down: Phaser.Input.Keyboard.KeyCodes.J,
        up: Phaser.Input.Keyboard.KeyCodes.I,
        red: Phaser.Input.Keyboard.KeyCodes.Q,
        green: Phaser.Input.Keyboard.KeyCodes.W,
        blue: Phaser.Input.Keyboard.KeyCodes.E,
    },
    spawnLocation: {x: config.width/5, y: config.height/2},
    maxSpeedTime: 120
}
