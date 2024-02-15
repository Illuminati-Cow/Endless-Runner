"use strict"

class Menu extends Phaser.Scene {
    /**
     * The scene manager for the game.
     * @type{Phaser.Scenes.ScenePlugin}
     */
    static sceneManagerPlugin
    constructor(sceneName) {
        super({key: sceneName, visible: false, active: false})
    }

    openMenu() {
        Menu.sceneManagerPlugin.setActive(true, this);
        Menu.sceneManagerPlugin.setVisible(true, this);
    }

    closeMenu() {
        Menu.sceneManagerPlugin.setVisible(false, this);
        Menu.sceneManagerPlugin.setActive(false, this);
    }
}