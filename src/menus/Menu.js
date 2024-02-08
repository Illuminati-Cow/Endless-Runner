"use strict"

class Menu extends Phaser.Scene {
    constructor(sceneName) {
        super(sceneName)
    }

    openMenu() {
        this.scene.isActive(true);
    }

    closeMenu() {

    }
}