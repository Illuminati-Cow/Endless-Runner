"use strict"
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
            debug: true,
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