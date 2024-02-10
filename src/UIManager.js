"use strict"

class UIManager {
    static Instance = null;
    #menu = {};
    #hud = {};
    currentMenu;
    currentHud;
    
    /**
     * Represents the UIManager class. If an instance of the manager already exists, this instance will be nullified.
     * @constructor
     * @param {Array.<String>} menus - The array of menus.
     * @param {Array.<String>} huds - The array of HUDs.
     * @param {Object} [startingMenu=menus[0]] - The starting menu. Defaults to the first menu in menus.
     */
    constructor(menus, huds, startingMenu=menus[0]) {
        if (this.Instance != null) {
            this = null
            return null
        } else {
            this.Instance = this
        }
        this.#menu = menus
        this.#hud = huds
        this.currentMenu = startingMenu
    }

    /**
     * Changes the current menu to the specified new menu.
     * @param {string} newMenu - The name of the new menu.
     * @returns {boolean} - Returns true if the menu was successfully changed, false otherwise.
     */
    changeMenu(newMenu) {
        if (newMenu in this.#menu) {
            this.currentMenu.close()
            this.currentMenu = newMenu
            this.currentMenu.open()
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
    changeHud(newHud) {
        if (newHud in this.#hud) {
            this.currentMenu.close()
            this.currentMenu = newHud
            this.currentMenu.open()
            return true
        }
        else
            return false
    }
}