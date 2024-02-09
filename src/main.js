"use strict"

let config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 1280,
    height: 720,
    scene: [MainMenu, Play, GameOverMenu, CreditsMenu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x:0, y: 0}
        }
    },
    render: {
        pixelArt: true,
    },
}

let game = new Phaser.Game(config)

var gameSettings = {
    width: config.width,
    height: config.height
}