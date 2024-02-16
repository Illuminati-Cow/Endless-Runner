class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        this.scene.sendToBack(this);
        this.background = this.add.image(gameSettings.width/2, gameSettings.height/2, 'stars').setScale(1.5);
        this.foreground = this.add.image(gameSettings.width/2, gameSettings.height/2, 'planet').setScale(1.5);
        this.background.startPos = {x: this.background.x, y: this.background.y};
        this.foreground.startPos = {x: this.foreground.x, y: this.foreground.y};
        this.player = new Player(this, gameSettings.spawnLocation.x, gameSettings.spawnLocation.y);
        this.timeAlive = 0;
        this.startTime = 0;
        this.startDelay = 250;
        this.startDelayTime = 0;
        this.enemySpeed = 25;
        this.maxEnemyCount = 3;
        this.enemyCount = 2;
        this.enemyRespawnDelay = {min: 1000, max:3000}
        this.startInput = false;
        this.enemies = []
        this.enemyGroup = this.physics.add.group();
        this.enemySpawnTime = 0;
        this.enemySpawnInterval = 10 * 1000;
        // Create enemy pool
        for (let index = 0; index < this.maxEnemyCount; index++) {
            let enemy = new Enemy(this);
            this.enemies.push(enemy);
            this.enemyGroup.add(enemy);
        }
        // Add collider between enemies and player
        this.physics.add.collider(this.player, this.enemyGroup, (player, enemy) => {this.playerCollisionHandler(player, enemy)});
        // Add collider between endbox and enemies
        let endBox = this.physics.add.staticBody(-350,0,250,gameSettings.height)
        this.physics.add.collider(endBox, this.enemyGroup, (endBox, enemy) => {
            this.gameOver();
        });
        this.add.rectangle(gameSettings.width-gameSettings.width/10, gameSettings.height/40, gameSettings.width/5, gameSettings.height/10, 0xeda3ff)
            .setAlpha(0.7)
            .setOrigin(0.3, 0)
        this.timeAliveCounter = this.add.text(gameSettings.width-gameSettings.width/50, gameSettings.height/30, "0.0").setOrigin(1,0);
        this.timeAliveCounter.setFontSize('7vh');
        // Event listener for initial input after start delay. Effectively pauses game until user inputs valid control input.
        this.input.keyboard.on('keydown', (event) => {
            if ((event.keyCode == gameSettings.controls.down || event.keyCode == gameSettings.controls.up) &&
                    Date.now() > this.startDelayTime && !this.startInput) {
                this.startInput = true;
                this.startTime = Date.now();
                this.player.active = true;
                this.time.delayedCall(1000, () => this.enemies[0].spawn());
                this.time.delayedCall(3000, () => this.enemies[1].spawn()); 
                console.log("Game Started");
            }
        });
        // Event listener for restarting game
        this.game.scene.systemScene.events.addListener('restart', ()=>this.start());
        this.start()
    }
    
    start() {
        // Despawn all enemies
        this.enemies.forEach(enemy => enemy.despawn());
        this.player.respawn(gameSettings.spawnLocation.x, gameSettings.spawnLocation.y)
        this.startTime = Date.now();
        this.startDelayTime = Date.now() + this.startDelay;
        this.player.active = false;
        this.startInput = false;
        this.enemySpawnTime = this.startTime + this.enemySpawnInterval;
        this.timeAliveCounter.text = "0.0";
    }

    update() {
        if (this.player.active) {
            this.player.update()
            let time = Math.floor((Date.now() - this.startTime) / 100) / 10;
            this.timeAlive = time;
            this.timeAliveCounter.text = time == Math.round(time) ? time += '.0' : time;
            if (this.enemySpawnTime <= Date.now() && this.enemyCount < this.maxEnemyCount) {
                this.enemies[this.enemyCount++].spawn();
                this.enemySpawnTime = Date.now() + this.enemySpawnInterval;
            }
        }
        this.doParallax(this.foreground, this.foreground.startPos.x, this.foreground.startPos.y,
             10, 10, this.player.x, this.player.y
        );
    }

    gameOver() {
        this.game.scene.systemScene.events.emit('gameover', this.timeAliveCounter.text);
        this.player.kill();
        this.player.y = 10000;
        this.enemies.forEach(enemy => enemy.despawn()); 
        UIManager.Instance.changeMenu('GameOverMenu');
    }

    doParallax(object, startX, startY, maxDevationX, maxDevationY, targetX, targetY) {
        object.y += (targetY - this.foreground.y) * .0001;
        object.y =  Math.min(Math.max(object.y, startY - maxDevationY), startY + maxDevationY); 
        //object.x += (targetX - this.foreground.x) * .05; 
    }

    playerCollisionHandler(player, enemy) {
        if (player.color == enemy.color) {
            enemy.despawn();
            this.time.delayedCall(
                this.enemyRespawnDelay.min+Math.random()*(this.enemyRespawnDelay.max-this.enemyRespawnDelay.min),
                enemy.spawn()
            );
        }
        else {
            this.gameOver();
        }
    }
}


class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 10000, 10000, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.color = colors.red;
        this.speed = 150;
        this.minSpeed = this.speed;
        this.maxSpeed = 300;
        this.context = scene;
    }

    spawn() {
        // Choose random color
        this.color = Phaser.Utils.Array.GetRandom(Object.entries(colors))[1];
        switch (this.color) {
            case colors.red:
                this.setTint(0xff3300);
                break;
            case colors.green:
                this.setTint(0x008000);
                break;
            case colors.blue:
                this.setTint(0x0099ff);
                break;
        }
        // Pick random y position
        let y = 1.25 * this.height + Math.random() * (gameSettings.height - 2.5 * this.height);
        this.setPosition(gameSettings.width + 25, y);
        this.active = true;
        this.visible = true;
        // interpolate speed by game length
        let ratio = this.context.timeAlive / gameSettings.maxSpeedTime;
        this.speed = Math.max(this.minSpeed, this.maxSpeed * easeOutCubic(ratio));
        this.setVelocity(-this.speed, 0);
    }
    
    despawn() {
        this.clearTint();
        this.visible = false;
        this.active = false;
        this.x = 10000;
    }
}

/** Credit: https://easings.net/#easeOutCubic
 * . Calculates the cubic easing value for a given input.
 * @param {number} x - The input value between 0 and 1.
 * @returns {number} The eased output value between 0 and 1.
 */
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
    
    }