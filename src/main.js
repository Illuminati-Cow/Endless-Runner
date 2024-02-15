"use strict"
/**
 * @type{Phaser.Core.Config}
 */
const config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 960,
    height: 540,
    scene: [Load, MainMenu, Play, GameOverMenu, CreditsMenu, PauseMenu],
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
        down: Phaser.Input.Keyboard.KeyCodes.S,
        up: Phaser.Input.Keyboard.KeyCodes.W,
    },
    spawnLocation: {x: config.width/5, y: config.height/2},
}