class Play extends Phaser.Scene {
    /**
     * @type {Player}
     */
    static Player
    constructor() {
        super('Play');
    }
    
    create() {
        this.player = new Player(this, gameSettings.spawnLocation.x, gameSettings.spawnLocation.y, 'red-arrow');
        this.timeAlive = 0;
        this.startTime = 0;
        this.startDelay = 1000;
        this.startDelayTime = 0;
        this.startInput = false;
        this.add.rectangle(gameSettings.width-gameSettings.width/10, gameSettings.height/40, gameSettings.width/5, gameSettings.height/10, 0xeda3ff)
            .setAlpha(0.7)
            .setOrigin(0.3, 0)
        this.timeAliveCounter = this.add.text(gameSettings.width-gameSettings.width/50, gameSettings.height/30, "0.0").setOrigin(1,0);
        this.timeAliveCounter.setFontSize('7vh')
        this.input.keyboard.on('keydown', (event) => {
            if ((event.keyCode == gameSettings.controls.down || event.keyCode == gameSettings.controls.up) &&
                    Date.now() > this.startDelayTime && !this.startInput) {
                this.startInput = true;
                this.startTime = Date.now();
                this.player.isActive = true;
                console.log("Game Started")
            }
        });
        this.start()
    }
    
    start() {
        this.startDelayTime = Date.now() + this.startDelay;
        this.startInput = false;
    }

    update() {
        if (this.startInput) {
            this.player.update()
            let time = Math.floor((Date.now() - this.startTime) / 100) / 10;
            this.timeAliveCounter.text = time == Math.round(time) ? time += '.0' : time;
        }
    }

    restart() {
        this.startInput = false;
        this.startTime = 0;
        this.player.isActive = false;
    }

    gameOver() {
        this.player.isActive = false;
        this.timeAlive = this.timeAliveCounter.text
        UIManager.Instance.changeMenu('GameOverMenu');
    }
}