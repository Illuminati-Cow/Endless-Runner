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
        // Terrain configurations
        let startPieceConfig = [
            this, 
            0, 
            0, 
            'start-terrain', 
            TerrainPiece.directions.E, 
            TerrainPiece.directions.W,
            0,
            0
        ];
        // Player
        this.Player = new Player(this, gameSettings.spawnLocation.x, gameSettings.spawnLocation.y, 'player');
        // Follow player with main camera
        this.cameras.main.startFollow(this.Player, false, gameSettings.cameraFollowStrength.x, gameSettings.cameraFollowStrength.y)
        this.cameras.main.setBackgroundColor(959e94);
        this.terrainGenerator = new TerrainGenerator(new TerrainPiece(...startPieceConfig), {
            // FILL WITH TERRAIN OBJECTS
        }, 3, this);
        // Turn off world bounds and handle Player out of bounds condition in Player
        this.matter.world.setBounds(0,0,0,0,0,false,false,false,false)
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