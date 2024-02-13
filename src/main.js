"use strict"

const config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 1280,
    height: 720,
    scene: [Load, MainMenu, Play, GameOverMenu, CreditsMenu, PauseMenu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y: 0},
            debug: true,
        },
    },
    render: {
        pixelArt: true,
    },
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
        jump: Phaser.Input.Keyboard.KeyCodes.W,
        grapple: Phaser.Input.Keyboard.KeyCodes.SPACE,
    },
    spawnLocation: {x: 500, y: 500},
}