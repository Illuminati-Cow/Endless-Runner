class TerrainGenerator {
    /**
     * The current terrain object loaded.
     * @type {TerrainPiece}
     */
    currentTerrain
    /**
     * The last terrain object loaded. May be undefined.
     * @type {TerrainPiece}
     */
    lastTerrain
    /**
     * Generates terrain for the play scene.
     * @constructor
     * @param {TerrainPiece} initialTerrainPiece - The unique initial terrain piece.
     * @param {Object} terrainPieces - The dictionary of TerrainPiece objects.
     * @param {Phaser.Scene} context - The scene in which terrain should be created.
     */
    constructor(initialTerrainPiece, terrainPieces, context) {
        this.currentTerrain = initialTerrainPiece
        this.currentTerrain.enable() // Enable first terrain
        this.lastTerrain = undefined
        this.scene = context
    }

    /**
     * Generates the next terrain piece.
     * If a key is provided, generates the specified terrain piece.
     * If no key is provided, selects a random terrain piece that has a compatible connection to the current piece.
     * @param {string} [key] - The key string of the terrain piece to generate.
     */
    generateNextTerrain(key) {
        const lastTerrain = this.currentTerrain;
        if (key in this.terrainPieces && this.terrainPieces[key].connectsTo == this.currentTerrain.connectsFrom) {
            // Generate terrain specified
            this.currentTerrain = this.terrainPieces[key];
            this.currentTerrain.enable();
            this.currentTerrain.setPosition(lastTerrain.doorPosition.x, lastTerrain.doorPosition.y);
        }
        else {
            // Select random terrain piece that has a compatible connection to the current piece and is not the current or last terrain.
            // Object property filtering from GitHub Copilot
            let validPieces = Object.entries(this.terrainPieces).filter(([key, value]) => {
                return this.currentTerrain.connectsTo == value.connectsFrom;
                
                // SWAP LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                // For testing with a small number of assets allow duplicates REMOVE
                //return this.currentTerrain.connectsTo == value.connectsFrom && this.currentTerrain != value && lastTerrain != value;
            });
            let terrain = validPieces[Math.floor(Math.random() * validPieces.length)][0];
            this.currentTerrain = terrain;
            this.currentTerrain.enable();
            this.currentTerrain.setPosition(lastTerrain.doorPosition.x, lastTerrain.doorPosition.y);
        }
        this.lastTerrain.disable();
        this.lastTerrain = lastTerrain;
    }
}

class TerrainPiece extends Phaser.Physics.Arcade.Sprite {
    /**
     * Use to denote the direction of terrain connections.
     * ```javascript
     *  let directions = {N: 0, E: 1, S: 2, W: 3};
     * ```
     */
    static directions = {N: 0, E: 1, S: 2, W: 3}
    #connectsTo
    #connectsFrom
    /**
     * @type {Phaser.Types.Animations.PlayAnimationConfig}
     */
    #animationConfig
    /**
     * Represents a piece of terrain. Set the origin of the terrain to the center of the
     * entrance door so that the terrain aligns correctly. Use TerrainPiece.directions value for the
     * direction of connections. Starts disabled so it can be pooled in a TerrainGenerator.
     * @constructor
     * @param {Phaser.Scene} scene - The Phaser scene.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     * @param {string} texture - The string name of the texture for the object.
     * @param {number} connectsTo - The direction this terrain can connect to (the direction of its exit).
     * @param {number} connectsFrom - The direction this terrain can be connected to (the direction of its entrance).
     * @param {number} doorPositionX - The x-coordinate of the center of the exit door.
     * @param {number} doorPositionY - The y-coordinate of the center of the exit door. 
    */
    constructor(scene, x, y, texture, connectsTo, connectsFrom, doorPositionX, doorPositionY) {
        super(scene, x, y, texture, 0)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.#connectsTo = connectsTo
        this.#connectsFrom = connectsFrom
        this.doorPosition = {x: doorPositionX, y: doorPositionY}
        this.#animationConfig = {
            key: texture + '-active',
            frameRate: 24,
            repeat: true,
        }
        this.disable()
    }

    get connectsTo() {
        return this.#connectsTo
    }
    
    get connectsFrom() {
        return this.#connectsFrom
    }

    /**
     * Disables the Terrain object and hides it.
     */
    disable() {
        this.anims.stop();
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }

    /**
     * Enables the Terrain object and makes it visible.
     */
    enable() {
        this.anims.play(this.#animationConfig);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
    }
}