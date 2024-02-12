"use strict"

const config = {
    type: Phaser.WEBGL, // Use WEBGL
    width: 1280,
    height: 720,
    scene: [MainMenu, Play, GameOverMenu, CreditsMenu],
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            debug: {
                showBody: true,
                showStaticBody: true
            }
        }
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