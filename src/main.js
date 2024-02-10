"use strict"

const config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 1280,
    height: 720,
    scene: [MainMenu, Play, GameOverMenu, CreditsMenu],
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
    height: config.height
}