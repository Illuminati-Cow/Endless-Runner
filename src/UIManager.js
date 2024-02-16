"use strict"

class UIManager {
    /**
     * @type {UIManager} - The singleton instance of UIManager.
     */
    static Instance = null;
    #menu = {};
    #hud = {};
    /**
     * @type {Menu} - The current menu open.
     */
    #currentMenu;
    /**
     * @type {HUD} - The current HUD displayed.
     */
    #currentHUD;
    
    /**
     * Represents the UIManager class. If an instance of the manager already exists, this instance will be nullified.
     * @constructor
     * @param {Phaser.Scenes.ScenePlugin} sceneManagerPlugin - The scene manager plugin
     * @param {Phaser.Events.EventEmitter} eventManagerPlugin
     * @param {Object} menus - The dictionary of menus.
     * @param {Object} huds - The dictionary of HUDs.
     * @param {string} [startingMenu] - The starting menu. Defaults to an empty menu.
     * @param {string} [startingHUD=null] - The starting HUD. Defaults to null.
     */
    constructor(sceneManagerPlugin, eventManagerPlugin, menus, huds, startingMenu=null, startingHUD=null) {
        if (this.Instance != null) {
            return null
        } else {
            UIManager.Instance = this;
        }
        this.#menu = menus
        // Add None menu
        this.#menu.None = new None();
        this.#hud = huds
        this.#currentHUD = startingHUD
        if (startingMenu)
            this.#currentMenu = this.#menu[startingMenu]
        else
            this.#currentMenu = this.#menu['None'];
        // Launch all menus and huds
        for (let menu in this.#menu) {
            game.scene.systemScene.scene.launch(menu);
            console.log(menu);
        }
        for (let hud in this.#hud) {

        }
        // Listen for menus being loaded and close them unless starting menu
        game.scene.systemScene.events.addListener('menucreated', (menu) => {
            console.log(menu)
            if (menu.name == this.#currentMenu.name) {
                menu.openMenu();
            }
            else {
                menu.closeMenu();
            }
        }, game.scene.systemScene);
    }

    /**
     * Changes the current menu to the specified new menu.
     * @param {string} newMenu - The name of the new menu.
     * @returns {boolean} - Returns true if the menu was successfully changed, false otherwise.
     */
    changeMenu(newMenu) {
        if (newMenu in this.#menu) {
            this.#currentMenu.closeMenu();
            this.#currentMenu = this.#menu[newMenu]
            this.#currentMenu.openMenu();   
            return true
        }
        else
            return false
    }

    /**
     * Changes the current HUD (Heads-Up Display) to the specified new HUD.
     * @param {string} newHud - The name of the new HUD.
     * @returns {boolean} - Returns true if the HUD was successfully changed, false otherwise.
     */
    changeHud(newHUD) {
        if (newHUD in this.#hud) {
            this.#currentHUD.closeHUD()
            this.#currentHUD = newHUD
            this.#currentHUD.openHUD()
            return true
        }
        else
            return false
    }

    get currentMenu() {
        return this.#currentMenu
    }

    get currentHUD() {
        return this.#currentHUD
    }
}