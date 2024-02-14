class TerrainGenerator {
    /**
     * A queue of the current terrain objects active.
     * @type {Array.<TerrainPiece>}
     */
    currentTerrain
    /**
     * The dictionary of all terrain objects loaded.
     * @type {Array.<TerrainPiece>}
     */
    terrain

    /**
     * Generates terrain for the play scene.
     * @constructor
     * @param {TerrainPiece} initialTerrainPiece - The unique initial terrain piece.
     * Note: If you would like this to be in the pool of spawnable terrain
     * @param {Object} terrainPieces - The dictionary of TerrainPiece objects.
     * @param {number} maxTerrainActive - The maximum number of terrain that can be active at one time.
     * @param {Phaser.Scene} context - The scene in which terrain should be created.
     */
    constructor(initialTerrainPiece, terrainPieces, maxTerrainActive, context) {
        this.terrain = terrainPieces;
        this.currentTerrain = [initialTerrainPiece];
        this.maxTerrain = maxTerrainActive;
        initialTerrainPiece.enable(); // Enable first terrain
        this.scene = context;
        // Get terrain shapes
        this.shapes = this.scene.cache.json.get('terrain-shapes')
    }

    /**
     * Generates the next terrain piece and activates it. If this would put the number of
     * currently active terrain pieces then disable the oldest TerrainPiece.
     * If a key is provided, generates the specified terrain piece.
     * If no key is provided, selects a random terrain piece that has a compatible connection to the current piece.
     * @param {string} [key] - The key string of the terrain piece to generate.
     */
    generateNextTerrain(key) {
        const prevTerrain = this.currentTerrain[this.currentTerrain.length-1];
        if (key in this.terrain && this.terrain[key].connectsTo == this.currentTerrain.connectsFrom) {
            // Generate terrain specified
            let newTerrain = this.terrain[key];
            newTerrain.enable();
            newTerrain.setPosition(prevTerrain.doorPosition.x, prevTerrain.doorPosition.y);
            this.currentTerrain.push(newTerrain);
        }
        else {
            // Select random terrain piece that has a compatible connection to the current piece and is not the current or last terrain.
            // Object property filtering from GitHub Copilot
            let validPieces = Object.entries(this.terrain).filter(([key, value]) => {
                return this.currentTerrain.connectsTo == value.connectsFrom;
                
                // SWAP LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                // For testing with a small number of assets allow duplicates REMOVE
                //return this.currentTerrain.connectsTo == value.connectsFrom && this.currentTerrain != value && lastTerrain != value;
            });
            // The 1st index of the selected key-value pair array will be the TerrainPiece
            let newTerrain = validPieces[Math.floor(Math.random() * validPieces.length)][1];
            newTerrain.enable();
            newTerrain.setPosition(prevTerrain.doorPosition.x, prevTerrain.doorPosition.y);
            this.currentTerrain.push(newTerrain);
        }
        if (this.maxTerrain > this.currentTerrain.length)
            this.currentTerrain.shift().disable();
    }
}

class TerrainPiece extends Phaser.Physics.Matter.Image {
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
     * @param {}
     * @param {number} connectsTo - The direction this terrain can connect to (the direction of its exit).
     * @param {number} connectsFrom - The direction this terrain can be connected to (the direction of its entrance).
     * @param {number} doorPositionX - The x-coordinate of the center of the exit door.
     * @param {number} doorPositionY - The y-coordinate of the center of the exit door. 
    */
    constructor(scene, x, y, texture, insideShape, outsideShape, connectsTo, connectsFrom, doorPositionX, doorPositionY) {
        super(scene.matter.world, x, y, texture, 0);
        scene.add.existing(this);
        scene.matter.add.gameObject(this, );
        this.#connectsTo = connectsTo;
        this.#connectsFrom = connectsFrom;
        this.doorPosition = {x: doorPositionX, y: doorPositionY};
        // this.#animationConfig = {
        //     key: texture + '-active',
        //     frameRate: 24,
        //     repeat: true,
        // };
        this.disable();
    }

    get connectsTo() {
        return this.#connectsTo;
    }
    
    get connectsFrom() {
        return this.#connectsFrom;
    }

    /**
     * Disables the Terrain object and hides it.
     */
    disable() {
        // this.anims.stop();
        this.setActive(false);
        this.setVisible(false);
        this.body.enable = false;
    }

    /**
     * Enables the Terrain object and makes it visible.
     */
    enable() {
        // this.anims.play(this.#animationConfig);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
    }
}