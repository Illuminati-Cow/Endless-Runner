"use strict"
class Menu extends Phaser.Scene {
    constructor(sceneName) {
        super({key: sceneName, visible: false});
        this.name = sceneName;
        this._scene = game.scene.systemScene.scene;
        this._events = game.scene.systemScene.events;
    }

    init() {
        this._events.emit('menucreated', this)
    }

    /**
     * Do not override without still calling this function
     */
    openMenu() {
        this._scene.wake(this.name);
        this._scene.setVisible(true, this.name);
        //Menu.sceneManagerPlugin.bringToTop(this.name);
        //console.log(this.name);
    }

    /**
     * Do not override without still calling this function
     */
    closeMenu() {
        this._scene.setVisible(false, this.name);
        //Menu.sceneManagerPlugin.setActive(false, this);
        this._scene.sleep(this.name);
    }
}