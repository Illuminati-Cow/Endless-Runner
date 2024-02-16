"use strict"
class GameOverMenu extends Menu {
        constructor() {
            super('GameOverMenu');
        }

        create() {
            this.gameOverText = this.add.text(gameSettings.width/2, gameSettings.height/2.5, 
                "GAME OVER", {fontSize: gameSettings.width/8, fontFamily: 'Monospace'}
            )
                .setOrigin(0.5);
            this.hiscoreText = this.add.text(gameSettings.width/2, gameSettings.height/2-gameSettings.height/3,
             "0.0s", {fontFamily: 'Monospace', fontSize: gameSettings.width/20}
            ).setOrigin(0.5);
            this.resetButton = new Button(this, 0, -gameSettings.height/6, 
                gameSettings.width/5, gameSettings.height/4, "PLAY AGAIN", () => {
                    this._events.emit('restart');
                    UIManager.Instance.changeMenu('None');
                }, undefined, 'bottomcenter');

            // Add listener for game over event and set text accordingly
            this._events.addListener('gameover', (time) => {this.hiscoreText.text = time + 's'});
        }
}
