class Play extends Phaser.Scene {
    /**
     * @type {Player}
     */
    static Player
    static #lastTime
    static deltaTime

    constructor() {
        super('Play');
    }

    create() {
        // Player
        this.Player = new Player(this, gameSettings.spawnLocation.x, gameSettings.spawnLocation.y, 'player');
        // Follow player with main camera
        //this.cameras.main.startFollow(this.Player, false, gameSettings.cameraFollowStrength.x, gameSettings.cameraFollowStrength.y)
        this.cameras.main.setBackgroundColor(959e94);
        this.cameras.main.zoom = 0.5;
        // Get terrain shapes
        let terrainShapes = this.cache.json.get('terrain-shapes');
        console.log(terrainShapes);
        this.terrainGenerator = new TerrainGenerator(new TerrainPiece(this, 0, 0, 'start-level', {
            connectsTo: TerrainPiece.directions.E,
            connectsFrom: TerrainPiece.directions.W,
            entrancePositionX: 0,
            entrancePositionY: 0,
            exitPositionX: 0,
            exitPositionY: 0,
            insideShape: terrainShapes.startLevelInside,
            outsideShape: terrainShapes.startLevelOutside,
        }), {
            // FILL WITH TERRAIN OBJECTS
        }, 3, this);
        // Turn off world bounds and handle Player out of bounds condition in Player
        //this.matter.world.setBounds(0,0,0,0,0,false,false,false,false)
        /**
         * Delta time in miliseconds
         */
        Play.deltaTime = 0
        Play.#lastTime = this.time.now
    }

    update() {
        // Update delta time
        Play.deltaTime = this.time.now - Play.#lastTime;
        // Update player state - Handles input
        this.Player.stateMachine.update();
    }

    gameOver() {

    }
}