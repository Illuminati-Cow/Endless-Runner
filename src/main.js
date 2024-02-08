"use strict"

let config = {
    type: Phaser.AUTO,
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