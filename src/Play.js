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
]

class Play extends Phaser.Scene {
    /**
     * @type {Player}
     */
    static Player
    constructor() {
        super('Play');
        this.Player = new this.Player();
        this.terrainGenerator = new TerrainGenerator(new TerrainPiece(...startPieceConfig), {
            // FILL WITH TERRAIN OBJECTS
        }, this);
    }
    
}