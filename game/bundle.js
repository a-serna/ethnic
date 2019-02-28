(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function PlayState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
PlayState.prototype = Object.create(Phaser.State.prototype);
PlayState.prototype.constructor = PlayState;

PlayState.prototype.init = function () {
    this.isPause = false;
    this.isMute = false;
    this.currentTime = 31;
    this.levelWins = 1;

    this.startTime = new Date();
    this.totalTime = 31;
    this.timeElapsed = 0;

    this.endTime = false;
    if (Phaser.Device.desktop) {
        this.quantityPuzzleLevels = [
            { level: 1, quantity: 4 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.6, y: 0.6 } },
            { level: 2, quantity: 6 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.6, y: 0.6 } },
            { level: 3, quantity: 8 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.5, y: 0.5 }  },
            { level: 4, quantity: 9 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.6, y: 0.6 }  },
            { level: 5, quantity: 12 , backgroundScale: { x: 0.7, y: 0.7 }, pieceScale: { x: 0.5, y: 0.5 }  }
        ];

        this.totemLevelScale = { x: 0.8, y: 0.8 };

        this.barScale = { x: 0.6, y: 0.6 };
    } else {
        this.quantityPuzzleLevels = [
            { level: 1, quantity: 4 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.3, y: 0.3 } },
            { level: 2, quantity: 6 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.3, y: 0.3 } },
            { level: 3, quantity: 8 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.3, y: 0.3 }  },
            { level: 4, quantity: 9 , backgroundScale: { x: 1, y: 1 }, pieceScale: { x: 0.3, y: 0.3 }  },
            { level: 5, quantity: 12 , backgroundScale: { x: 0.35, y: 0.35 }, pieceScale: { x: 0.3, y: 0.3 }  }
        ];

        this.totemLevelScale = { x: 0.8, y: 0.8 };

        this.barScale = { x: 0.6, y: 0.3 };
    }

  this._vPiecesPuzzle = [];
  this._vPiecesClones = [];
};

PlayState.prototype.preload = function () {
    var loadStyle = {
        font: '7em Times Roman',
        fill: '#2b3f68',
        align: 'center'
    };

    this.stage.backgroundColor = '#ffffff';
    var loadTextY = Phaser.Device.desktop ? 300 : this.world.centerY;
    var loadText = this.add.text(0, 0, '', loadStyle);
    loadText.y = Phaser.Device.desktop ? loadTextY : this.world.centerY / 2;
    loadText.x = Phaser.Device.desktop ? this.world.centerX : this.world.centerX / 2 + 30;
    loadText.anchor.setTo(0.5);

    if (Phaser.Device.desktop) {
        var progressBar = this.add.graphics(330, -150);
        var lodingBar = this.add.graphics(330, -150);
        lodingBar.lineStyle(3, '0x2b3f68');
        lodingBar.drawRoundedRect(100,500,300,30,10);
        lodingBar.endFill();
    }

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadText.setText(progress+'%');
        if (Phaser.Device.desktop) {
            var load = progress + 194;
            progressBar.clear();
            progressBar.lineStyle(3, '0x2b3f68');
            progressBar.beginFill('0x2b3f68',1);
            progressBar.drawRoundedRect(103,501,load,27,1);
            progressBar.endFill();
        }
    }, this);

    // pieces
    // puzzle 1
    this.load.image('t1-1', 'assets/puzzles/puzzle1/totem-1-1.png');
    this.load.image('t1-2', 'assets/puzzles/puzzle1/totem-1-2.png');
    this.load.image('t1-3', 'assets/puzzles/puzzle1/totem-1-3.png');
    this.load.image('t1-4', 'assets/puzzles/puzzle1/totem-1-4.png');

    // puzzle 2
    this.load.image('t2-1', 'assets/puzzles/puzzle2/totem-2-1.png');
    this.load.image('t2-2', 'assets/puzzles/puzzle2/totem-2-2.png');
    this.load.image('t2-3', 'assets/puzzles/puzzle2/totem-2-3.png');
    this.load.image('t2-4', 'assets/puzzles/puzzle2/totem-2-4.png');
    this.load.image('t2-5', 'assets/puzzles/puzzle2/totem-2-5.png');
    this.load.image('t2-5', 'assets/puzzles/puzzle2/totem-2-5.png');
    this.load.image('t2-6', 'assets/puzzles/puzzle2/totem-2-6.png');

    // puzzle 3
    this.load.image('t3-1', 'assets/puzzles/puzzle3/totem-3-1.png');
    this.load.image('t3-2', 'assets/puzzles/puzzle3/totem-3-2.png');
    this.load.image('t3-3', 'assets/puzzles/puzzle3/totem-3-3.png');
    this.load.image('t3-4', 'assets/puzzles/puzzle3/totem-3-4.png');
    this.load.image('t3-5', 'assets/puzzles/puzzle3/totem-3-5.png');
    this.load.image('t3-6', 'assets/puzzles/puzzle3/totem-3-6.png');
    this.load.image('t3-7', 'assets/puzzles/puzzle3/totem-3-7.png');
    this.load.image('t3-8', 'assets/puzzles/puzzle3/totem-3-8.png');

    // puzzle 4
    this.load.image('t4-1', 'assets/puzzles/puzzle4/totem-4-1.png');
    this.load.image('t4-2', 'assets/puzzles/puzzle4/totem-4-2.png');
    this.load.image('t4-3', 'assets/puzzles/puzzle4/totem-4-3.png');
    this.load.image('t4-4', 'assets/puzzles/puzzle4/totem-4-4.png');
    this.load.image('t4-5', 'assets/puzzles/puzzle4/totem-4-5.png');
    this.load.image('t4-6', 'assets/puzzles/puzzle4/totem-4-6.png');
    this.load.image('t4-7', 'assets/puzzles/puzzle4/totem-4-7.png');
    this.load.image('t4-8', 'assets/puzzles/puzzle4/totem-4-8.png');
    this.load.image('t4-9', 'assets/puzzles/puzzle4/totem-4-9.png');

    // puzzle 5
    this.load.image('t5-1', 'assets/puzzles/puzzle5/totem-nivel-5-01.png');
    this.load.image('t5-2', 'assets/puzzles/puzzle5/totem-nivel-5-02.png');
    this.load.image('t5-3', 'assets/puzzles/puzzle5/totem-nivel-5-03.png');
    this.load.image('t5-4', 'assets/puzzles/puzzle5/totem-nivel-5-04.png');
    this.load.image('t5-5', 'assets/puzzles/puzzle5/totem-nivel-5-05.png');
    this.load.image('t5-6', 'assets/puzzles/puzzle5/totem-nivel-5-06.png');
    this.load.image('t5-7', 'assets/puzzles/puzzle5/totem-nivel-5-07.png');
    this.load.image('t5-8', 'assets/puzzles/puzzle5/totem-nivel-5-08.png');
    this.load.image('t5-9', 'assets/puzzles/puzzle5/totem-nivel-5-09.png');
    this.load.image('t5-10', 'assets/puzzles/puzzle5/totem-nivel-5-10.png');
    this.load.image('t5-11', 'assets/puzzles/puzzle5/totem-nivel-5-11.png');
    this.load.image('t5-12', 'assets/puzzles/puzzle5/totem-nivel-5-12.png');


    if (Phaser.Device.desktop) {
        this.load.image('background','assets/background/background-brown.jpg');
        this.load.image('bar','assets/bar/bar-white.jpg');

        // items levels
        this.load.image('t1-off', 'assets/totems-levels/totem-nivel01-off.png');
        this.load.image('t2-off', 'assets/totems-levels/totem-nivel02-off.png');
        this.load.image('t3-off', 'assets/totems-levels/totem-nivel03-off.png');
        this.load.image('t4-off', 'assets/totems-levels/totem-nivel04-off.png');
        this.load.image('t5-off', 'assets/totems-levels/totem-nivel05-off.png');

            // items levels
            this.load.image('t1-on', 'assets/totems-levels/totem-nivel01-on.png');
            this.load.image('t2-on', 'assets/totems-levels/totem-nivel02-on.png');
            this.load.image('t3-on', 'assets/totems-levels/totem-nivel03-on.png');
            this.load.image('t4-on', 'assets/totems-levels/totem-nivel04-on.png');
            this.load.image('t5-on', 'assets/totems-levels/totem-nivel05-on.png');

        //background totem
				this.load.image('totemContainer', 'assets/totems-backgrounds/totem-container.png');
        // this.load.image('totem1', 'assets/totems-backgrounds/totem-01.png');
        // this.load.image('totem2', 'assets/totems-backgrounds/totem-02.png');
        // this.load.image('totem3', 'assets/totems-backgrounds/totem-03.png');
        // this.load.image('totem4', 'assets/totems-backgrounds/totem-04.png');
        // this.load.image('totem5', 'assets/totems-backgrounds/totem-05.png');

        // buttons
        this.load.image('sound', './assets/buttons/sound.png');
        this.load.image('mute', './assets/buttons/mute.png');
        this.load.image('pause', './assets/buttons/pause.png');
        this.load.image('play', './assets/buttons/play.png');

        this.load.image('windowWin', 'assets/popups/popupsWin.jpg');
        this.load.image('windowFail', 'assets/popups/popupsFail.jpg');
        this.load.image('next-level', 'assets/buttons/next-level.jpg');
        this.load.image('reply', 'assets/buttons/reply.jpg');

        this.load.image('store', 'assets/buttons/store.png');
        this.load.image('boot', 'assets/buttons/boot.png');
        this.load.image('fail-popup', 'assets/popups/failWindows.jpg');
    } else {
        this.load.image('background','assets/background/mobile/background-brown.jpg');
        this.load.image('bar','assets/bar/mobile/bar-white.jpg');

        // items levels
        this.load.image('t1-off', 'assets/totems-levels/mobile/totem-nivel01-off.png');
        this.load.image('t2-off', 'assets/totems-levels/mobile/totem-nivel02-off.png');
        this.load.image('t3-off', 'assets/totems-levels/mobile/totem-nivel03-off.png');
        this.load.image('t4-off', 'assets/totems-levels/mobile/totem-nivel04-off.png');
        this.load.image('t5-off', 'assets/totems-levels/mobile/totem-nivel05-off.png');

        this.load.image('t1-on', 'assets/totems-levels/mobile/totem-nivel01-on.png');
        this.load.image('t2-on', 'assets/totems-levels/mobile/totem-nivel02-on.png');
        this.load.image('t3-on', 'assets/totems-levels/mobile/totem-nivel03-on.png');
        this.load.image('t4-on', 'assets/totems-levels/mobile/totem-nivel04-on.png');
        this.load.image('t5-on', 'assets/totems-levels/mobile/totem-nivel05-on.png');


        //background totems
        this.load.image('totemContainer', 'assets/totems-backgrounds/totem-container.png');
        // this.load.image('totem1', 'assets/totems-backgrounds/mobile/totem-01.png');
        // this.load.image('totem2', 'assets/totems-backgrounds/mobile/totem-02.png');
        // this.load.image('totem3', 'assets/totems-backgrounds/mobile/totem-03.png');
        // this.load.image('totem4', 'assets/totems-backgrounds/mobile/totem-04.png');
        // this.load.image('totem5', 'assets/totems-backgrounds/mobile/totem-05.png');

         // buttons
         this.load.image('sound', 'assets/buttons/mobile/sound.png');
         this.load.image('mute', 'assets/buttons/mobile/mute.png');
         this.load.image('pause', 'assets/buttons/mobile/pause.png');
         this.load.image('play', 'assets/buttons/mobile/play.png');


        this.load.image('windowWin', 'assets/popups/mobile/popupsWin.jpg');
        this.load.image('windowFail', 'assets/popups/mobile/popupsFail.jpg');

        this.load.image('next-level', 'assets/buttons/mobile/next-level.jpg');
        this.load.image('reply', 'assets/buttons/mobile/reply.png');

        this.load.image('store', 'assets/buttons/mobile/store.png');
        this.load.image('boot', 'assets/buttons/mobile/boot.png');

        this.load.image('fail-popup', 'assets/popups/mobile/failWindow.jpg');
    }

    this.load.audio('tribal1', 'assets/music/Tribal1.mp3');
    this.load.audio('tribal2', 'assets/music/Tribal2.mp3');
    this.load.audio('tribal3', 'assets/music/Tribal2.mp3');
    this.load.audio('tribal4', 'assets/music/Tribal3.mp3');
    this.load.audio('tribal5', 'assets/music/Tribal1.mp3');
};

PlayState.prototype.create = function () {
    var font = Phaser.Device.desktop ? '3em American' : '3em American';
    var style = {
        font: font,
        fill: '#2b3f68',
        align: 'center'
    };

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.add.sprite(0,0, 'background');
	
	//if(Phaser.Device.desktop){
		//this.add.sprite(250,50, 'totemContainer');
	//}
	//else{
		//this.add.sprite(250,0, 'totemContainer');
	//}

    //this.totemContainer = this.add.sprite(250,50, 'totemContainer');
    //this.totemContainer.anchor.set(0.5);
    //this.totemContainer.scale.set(0.5);
    // this.totemContainer.x =  Phaser.Device.desktop ? this.game.world.width / 2 : this.totemContainer.width / 2;
    // this.totemContainer.y = Phaser.Device.desktop ? this.game.height / 2 : this.totemContainer.height / 2;

    this.bar = this.add.sprite(0,0, 'bar');
    this.bar.anchor.setTo(0);
    this.bar.scale.setTo(this.barScale.x, this.barScale.y);
    this.level = 1;

    this.audio = this.add.sprite(0, 0, 'sound');
    this.audio.anchor.set(0.5);
    Phaser.Device.desktop ? this.audio.scale.set(1) : this.audio.scale.set(0.4);
    this.audio.x =  Phaser.Device.desktop ? this.game.world.width - this.audio.width : this.game.world.width / 2;
    this.audio.y = Phaser.Device.desktop ? this.bar.height / 2 : this.audio.height / 2;

    this.pause = this.add.sprite(0, 0, 'pause');
    this.pause.anchor.set(0.5);
    Phaser.Device.desktop ? this.pause.scale.set(1) : this.pause.scale.set(0.4);
    this.pause.x =  Phaser.Device.desktop ? this.game.world.width - this.pause.width - this.audio.width - 20 : (this.game.world.width / 2) - this.audio.width - 10;
    this.pause.y = Phaser.Device.desktop ? this.bar.height / 2 : this.pause.height / 2;


    this.audio.inputEnabled = true;
    this.audio.input.pixelPerfectOver = true;
    this.audio.input.useHandCursor = true;
    this.audio.events.onInputDown.add(function(){
        this.audioManager();
    },this);

    this.pause.inputEnabled = true;
    this.pause.input.pixelPerfectOver = true;
    this.pause.input.useHandCursor = true;
    this.pause.events.onInputDown.add(function(){
        this.pauseManager();
    },this);

    this._vTotemsLevels = [];
    this._vTribalMusics = [];
    var offset = this.bar.height + 10;

    var level = this.add.text(50, 0, 'Nivel', style);
    level.anchor.setTo(0.5);
    level.y = Phaser.Device.desktop ? this.bar.height / 2 : level.height / 2;

    for (var index = 1; index <= 5; index++) {
        var name = String('t' + index) + '-off';
        var tribalMusic = this.add.audio(String('tribal' + index));
        tribalMusic.loop = true;

        var totemLevel = this.add.sprite(0, 0, name);
        totemLevel.anchor.setTo(0.5, 0);
        totemLevel.scale.setTo(this.totemLevelScale.x,  this.totemLevelScale.y);

        totemLevel.x = Phaser.Device.desktop ? 50 : 32;
        totemLevel.y = offset;

        offset += totemLevel.height + 10;

        this._vTotemsLevels.push(totemLevel);
        this._vTribalMusics.push(tribalMusic);
    }

    this._vTribalMusics[this.level - 1].play();
    this.createTimer();

    var game = this;

    this.startTime = new Date();
    this.totalTime = 31;
    this.timeElapsed = 0;
    this.counter = 0;
    this.timer =  this.time.events.loop(100, function () {
        game.checkTime();
        this.counter++;
    }, this);

    this.createPieces();

   this.btnBoot = this.add.sprite(0, 0, 'boot');
   this.btnBoot.x = Phaser.Device.desktop ? this.game.world.width - 50 : (this.game.world.width / 2) + 10;
   this.btnBoot.y =  Phaser.Device.desktop ? this.game.world.height - 50 : this.game.world.height / 2 + 30/* this.game.world.height / 2 - 30 */;
   this.btnBoot.anchor.set(0.5);
   Phaser.Device.desktop ? this.btnBoot.scale.set(0.5) :this.btnBoot.scale.set(0.4);
   this.btnBoot.inputEnabled = true;
   this.btnBoot.input.useHandCursor = true;
   this.btnBoot.events.onInputDown.add(function(){
    this.state.start('Tutorial');
    },this);

    this.btnStore = this.add.sprite(0, 0, 'store');
    this.btnStore.x =  Phaser.Device.desktop ? 50 : 35;
    this.btnStore.y =  Phaser.Device.desktop ? this.game.world.height - 50 : this.game.world.height / 2 + 30/* this.game.world.height / 2 - 30 */;
    this.btnStore.anchor.set(0.5);
    Phaser.Device.desktop ?  this.btnStore.scale.set(0.5) : this.btnStore.scale.set(0.4);
    this.btnStore.inputEnabled = true;
    this.btnStore.input.useHandCursor = true;

    this.btnStore.events.onInputDown.add(function(){
        document.location = "https://www.americanino.com/";
    },this);

    this.windowWin = this.add.sprite(0, 0, 'windowWin');
    this.windowWin.x = Phaser.Device.desktop ? this.world.width/2 : this.world.width/4 + 20;
    this.windowWin.y = Phaser.Device.desktop ? this.world.height/2 : this.world.height/4 + 30;
    this.windowWin.anchor.setTo(0.5);
    Phaser.Device.desktop ? this.windowWin.scale.setTo(0.5) : this.windowWin.scale.setTo(0.87, 0.9);
    this.windowWin.visible = false;

    var nextLevel = this.add.sprite(0, 0, 'next-level');
    nextLevel.y = Phaser.Device.desktop ? this.windowWin.height / 2 + this.windowWin.height / 4  - nextLevel.height : (this.windowWin.height / 4 ) + nextLevel.height ;
    nextLevel.anchor.set(0.5);
    nextLevel.inputEnabled = true;
    nextLevel.input.useHandCursor = true;
    this.windowWin.addChild(nextLevel);

    var game = this;
    nextLevel.events.onInputDown.add(function(){
        game.windowWin.visible = false;
        game.restorePuzzle();
        game.startTime = new Date();
        game.totalTime = 31;
        game.timeElapsed = 0;
        game.endTime = false;
        game.levelWins++;
        game.timer.timer.resume();
        game.world.addChildAt(game.windowWin, game.world.children.length - 1);
    },this);

    this.windowFail = this.add.sprite(0, 0, 'windowFail');
    this.windowFail.x = Phaser.Device.desktop ? this.world.width/2 : this.world.width/4 + 20;
    this.windowFail.y = Phaser.Device.desktop ? this.world.height/2 : this.world.height/4 + 30;
    this.windowFail.anchor.setTo(0.5);
    Phaser.Device.desktop ? this.windowFail.scale.setTo(0.5) : this.windowFail.scale.setTo(0.87, 0.9);
    this.windowFail.inputEnabled = true;
    this.windowFail.input.useHandCursor = true;
    this.windowFail.visible = false;


    var reply = this.add.sprite(0, 0, 'next-level');
    reply.y = Phaser.Device.desktop ? this.windowFail.height / 2 + this.windowFail.height / 4  - reply.height : (this.windowFail.height / 4 ) + reply.height / 2 ;
    reply.anchor.set(0.5);
    // Phaser.Device.desktop ?  reply.scale.set(1) : reply.scale.set(0.3);
    reply.inputEnabled = true;
    reply.input.useHandCursor = true;

    this.windowFail.addChild(reply);

    var game = this;
    reply.events.onInputDown.add(function(){
        this.windowFail.visible = false;
        this.restorePuzzle();
        this.startTime = new Date();
        this.totalTime = 31;
        this.timeElapsed = 0;
        this.currentTime = 31;
        game.timer.timer.resume();
    },this);

   this.failState = this.add.sprite(0, 0, 'fail-popup');
   this.failState.x = Phaser.Device.desktop ? this.world.width/2 : this.world.width/4 + 20;
   this.failState.y = Phaser.Device.desktop ? this.world.height/2 : this.world.height/4 + 30;
   this.failState.anchor.setTo(0.5);
    Phaser.Device.desktop ?this.failState.scale.setTo(0.5) :this.failState.scale.setTo(0.3);
   this.failState.inputEnabled = true;
   this.failState.input.useHandCursor = true;
   this.failState.visible = false;


   var replyLevel = this.add.sprite(0, 0, 'reply');
   replyLevel.y = Phaser.Device.desktop ? this.windowFail.height / 2 + this.windowFail.height / 4  - replyLevel.height : (this.windowFail.height / 4 ) + replyLevel.height ;
   replyLevel.anchor.set(0.5);
   Phaser.Device.desktop ?  replyLevel.scale.set(1) : replyLevel.scale.set(1);
   replyLevel.inputEnabled = true;
   replyLevel.input.useHandCursor = true;

   this.failState.addChild(replyLevel);

   var game = this;
   replyLevel.events.onInputDown.add(function(){
        game.failState.visible = false;
        game.startTime = new Date();
        game.totalTime = 31;
        game.timeElapsed = 0;
        game.currentTime = 31;
        game.game.state.restart();
        game.timer.timer.resume();
   },this);
 };

 PlayState.prototype.audioManager = function () {
    if (this.isMute) {
        this.audio.loadTexture('mute',0);
        this.game.sound.mute = true;
        this.isMute = false;
    } else {
        this.audio.loadTexture('sound',0);
        this.game.sound.mute = false;
        this.isMute = true;
    }
};

PlayState.prototype.checkTime = function () {
    var currentTime = new Date();
    var timeDifference = this.startTime.getTime() - currentTime.getTime();

    //Time elapsed in seconds
    this.timeElapsed = Math.abs(timeDifference / 1000);

    //Time remaining in seconds
    var timeRemaining = this.totalTime - this.timeElapsed;

    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);
    this.currentTime = seconds;

    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes;

    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

    if (minutes < 0) {
        this.endTime = true;
    }
    this.timeLabel.text = result;
}

PlayState.prototype.pauseManager = function () {
    if (this.isPause === true) {
        this.pause.loadTexture('play', 0);
        this.game.paused = this.isPause;
        this.totalTime = this.currentTime;
        this.timer.timer.pause();
        this.isPause = false;
    } else {
        this.pause.loadTexture('pause', 0);
        this.game.paused = this.isPause;
        this.startTime = new Date();
        this.timer.timer.resume();
        this.isPause = true;
    }
};


PlayState.prototype.createTimer = function () {
    this.timeLabel = this.game.add.text(0, 0, "00:00", {font: "4em American bold",fill: "#2b3f68"});
    this.timeLabel.anchor.setTo(0.5, 0.5);
    this.timeLabel.align = 'center';


    this.timeLabel.x = Phaser.Device.desktop ? this.game.world.width / 2 + this.game.world.width / 4 :  this.game.world.width / 2 - this.game.world.width / 4 + this.timeLabel.height / 2;
    this.timeLabel.y = Phaser.Device.desktop ? this.bar.height / 2 : this.timeLabel.height / 2;
}

 PlayState.prototype.restorePuzzle = function() {
    this._vTotemsLevels[this.level - 1].loadTexture(String('t' + this.level) + '-on', 0);
    this._vTribalMusics[this.level - 1].stop();

    for (let i = 0; i < this._vAllPieces.length; i++) {
        this._vAllPieces[i].destroy();
    }

    this._vPiecesPuzzle = [];
    this._vPiecesClones = [];

    if (this.level !== 5) {
        this.level++;
        var indexMusic = this.level - 1;
        this.createPieces();
        this._vTribalMusics[indexMusic].play();
    } else {
        this.state.start('win', true, true, this.levelWins);
    }

    this.world.addChildAt(this.windowWin, this.world.children.length - 1);
 };

 PlayState.prototype.createPieces = function () {
    var offsetBar = this.bar.height + 10;
    var quantityPieces = this.quantityPuzzleLevels[this.level - 1].quantity;
    this._vAllPieces = [];

    for (var index = 1; index <= quantityPieces; index++) {
        var name = String('t' + this.level + '-' + index);

        var piece = this.add.sprite(0, 0, name);
        piece.anchor.setTo(0.5);
        piece.scale.setTo(this.quantityPuzzleLevels[this.level - 1].pieceScale.x,  this.quantityPuzzleLevels[this.level - 1].pieceScale.y);
        this.game.physics.arcade.enable(piece);
        piece.index = index;
        piece.pos = {};
        piece.alpha = 0.05;
        piece.tint= 0xeee0ca;

        var offsetObj = getOffsetByLvl(offsetBar, this.level);
        var initialPosPiece = initialPositionByLvl(piece, this.level, index);
        var initialPosClone = initialPosition(piece, this.level, index);

        piece.x = initialPosPiece.x;
        piece.y = initialPosPiece.y;

        piece.x += offsetObj.x;
        piece.y += offsetObj.y;

        let x1 = initialPosClone.x;
        let y1 = initialPosClone.y;

        x1 += offsetObj.x;
        y1 += offsetObj.y;

        let pieceClon = this.add.sprite(x1, y1, name);
        pieceClon.anchor.setTo(0.5);
        pieceClon.scale.setTo(this.quantityPuzzleLevels[this.level - 1].pieceScale.x,  this.quantityPuzzleLevels[this.level - 1].pieceScale.y);
        this.game.physics.arcade.enable(pieceClon);

        pieceClon.parentIndex = piece.index;
        pieceClon.inputEnabled = true;
        pieceClon.input.enableDrag();
        pieceClon.originalPosition = pieceClon.position.clone();
        pieceClon.input.enableSnap(pieceClon.width, pieceClon.height, false, true);
        pieceClon.events.onDragStop.add(function(currentSprite){
            this.stopDrag(currentSprite);
        }, this);

        this._vPiecesPuzzle.push(piece);
        this._vAllPieces.push(piece);
        this._vAllPieces.push(pieceClon);
    }
 };

 PlayState.prototype.stopDrag =  function (currentSprite) {
        var scope = this;
        var endSprite = this._vPiecesPuzzle[currentSprite.parentIndex - 1];
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
        currentSprite.input.draggable = false;
        scope._vPiecesClones.push(currentSprite);
        currentSprite.position.copyFrom(endSprite.position);
        currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
      })) {
        currentSprite.position.copyFrom(currentSprite.originalPosition);
     }
 };

PlayState.prototype.render = function () {
};

PlayState.prototype.update = function () {
    if ( (this._vPiecesClones &&  this._vPiecesClones.length >= this.quantityPuzzleLevels[this.level - 1].quantity)) {
        if (this.level >= 5) {
            this.endTime = false;
            this.state.start('win', true, true, this.levelWins);
        } else {
            this.windowWin.visible = true;
            this.timer.timer.pause();
        }
    }

    if (this.endTime) {
        if (this.windowWin.visible === false && this.level < 5) {
            this.world.addChildAt(this.windowFail, this.world.children.length - 1);
            this.windowFail.visible = true;
            this.endTime = false;
            this.timer.timer.pause();
        } else {
            if (this.levelWins <= 1 && this.level === 5) {
                this.endTime = false;
                this.world.addChildAt(this.failState, this.world.children.length - 1);
                this.failState.visible = true;
                this.timer.timer.pause();
            } else {
                this.endTime = false;
                this.levelWins--;
                this.state.start('win', true, true, this.levelWins);
            }

        }
    }
};
module.exports = PlayState;

function initialPositionByLvl (piece, level, index) {
    var vPositionsInitial;

    if (Phaser.Device.desktop) {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 2 },
            ];
        } else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 },
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 5, y: piece.height },
                { x: piece.width * 4, y: piece.height * 2},
                { x: piece.width * 5, y: piece.height * 2 },
                { x: piece.width * 4, y: piece.height * 3 },
                { x: piece.width * 5, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 4 },
                { x: piece.width * 5, y: piece.height * 4 }
            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 5, y: piece.height },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 4, y: piece.height * 2 },
                { x: piece.width * 5, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 3 },
                { x: piece.width * 5, y: piece.height * 3 },
            ];
        } else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 5, y: piece.height },
                { x: piece.width * 4, y: piece.height * 2 },
                { x: piece.width * 5, y: piece.height * 2 },
                { x: piece.width * 4, y: piece.height * 3 },
                { x: piece.width * 5, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 4 },
                { x: piece.width * 5, y: piece.height * 4 },
                { x: piece.width * 4, y: piece.height * 5 },
                { x: piece.width * 5, y: piece.height * 5 },
                { x: piece.width * 4, y: piece.height * 6 },
                { x: piece.width * 5, y: piece.height * 6 },
            ];
        }
    } else {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width, y: piece.height },
                { x: piece.width * 2, y: piece.height },
                { x: piece.width, y: piece.height * 2 },
                { x: piece.width * 2, y: piece.height * 2 },
            ];
        } else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 }
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 3, y: piece.height * 2},
                { x: piece.width * 4, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 4 },
                { x: piece.width * 4, y: piece.height * 4 }
            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 4, y: piece.height },

                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 4, y: piece.height * 2 },

                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 3 },
            ];
        } else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 3, y: piece.height },

                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 2 },

                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 },

                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 4 },

                { x: piece.width * 2, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 5 },

                { x: piece.width * 2, y: piece.height * 6 },
                { x: piece.width * 3, y: piece.height * 6 },
            ];
        }
    }

    return vPositionsInitial[index - 1];
}

function initialPosition (piece, level, index) {
    var vPositionsInitial;

    if (Phaser.Device.desktop) {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height * 2 },
                { x: piece.width, y: piece.height },
                { x: piece.width, y: piece.height * 2 },
                { x: piece.width * 4, y: piece.height },

            ];
        }  else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 4, y: piece.height * 2 },
                { x: piece.width, y: piece.height * 3 },
                { x: piece.width, y: piece.height },
                { x: piece.width, y: piece.height * 2 },
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 3, y: piece.height * 2},
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 6, y: piece.height },
                { x: piece.width * 6, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 4 },
                { x: piece.width * 6, y: piece.height * 2 },
                { x: piece.width * 6, y: piece.height * 4 }
            ];
        }  else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 7, y: piece.height * 2 },
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 6, y: piece.height * 3 },
                { x: piece.width * 7, y: piece.height },
                { x: piece.width * 6, y: piece.height },
                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 7, y: piece.height * 3 },
                { x: piece.width * 6, y: piece.height * 2 }

            ];
        }  else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 6, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 6, y: piece.height },
                { x: piece.width * 6, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 6 },
                { x: piece.width * 6, y: piece.height * 3 },
                { x: piece.width * 6, y: piece.height * 6 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 6, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 4 }

            ];
        }
    } else {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width, y: piece.height * 3 },
                { x: piece.width, y: piece.height * 4 },
                { x: piece.width * 2, y: piece.height * 3 },

            ];
        }  else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height * 2},
                { x: piece.width * 2, y: piece.height * 5 },
                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 4, y: piece.height }

            ];
        }  else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 5, y: piece.height },
                { x: piece.width * 5, y: piece.height * 2},
                { x: piece.width * 5, y: piece.height * 3 },
                { x: piece.width * 5, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 6 },
                { x: piece.width * 4, y: piece.height * 5 },
                { x: piece.width * 5, y: piece.height * 6 }

            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 2, y: piece.height * 6 },
                { x: piece.width * 4, y: piece.height * 6 },
                { x: piece.width * 3, y: piece.height * 4 },
                { x: piece.width * 4, y: piece.height * 4 },
                { x: piece.width * 2, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 6 },
                { x: piece.width * 4, y: piece.height * 5 }

            ];
        }  else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 4, y: piece.height * 2},
                { x: piece.width * 4, y: piece.height * 3 },

                { x: piece.width * 4, y: piece.height * 4 },
                { x: piece.width * 4, y: piece.height * 5 },

                { x: piece.width * 4, y: piece.height * 6 },


                { x: piece.width * 3, y: piece.height * 7 },

                { x: piece.width * 4, y: piece.height * 7 },
                { x: piece.width * 2, y: piece.height * 8 },
                { x: piece.width * 3, y: piece.height * 8 },
                { x: piece.width * 4, y: piece.height * 8 },


                { x: piece.width * 2, y: piece.height * 7 }
            ];
        }
    }

    return vPositionsInitial[index - 1];
}

function getOffsetByLvl (offset, level) {
    var x = 0;
    var y = 0;

    if (level === 1) {
        if (Phaser.Device.desktop) {
            y = -(offset / 2);
            x = offset / 2;
        } else {
            x = (offset / 2);
        }
    }

    if (level === 2) {
        if (Phaser.Device.desktop) {
            x = offset;
            y = -(offset / 2 - 10);
        } else {
            x = -offset - 30;
        }
    }

    if (level === 3) {
        if (Phaser.Device.desktop) {
            y = -(offset / 2);
            x = (offset / 2);
        } else {
            x = -offset - (offset / 2);
        }
    }


    if (level === 4) {
        if (!Phaser.Device.desktop) {
            x = -(offset / 2);
        }
    }

    if (level === 5) {
        if (Phaser.Device.desktop) {
            x = 10;
            y = 0;
        } else {
            y = (offset / 2);
        }

    }

    return { x, y };
}

},{}],2:[function(require,module,exports){
function TutorialState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
TutorialState.prototype =  Object.create(Phaser.State.prototype);
TutorialState.prototype.constructor = TutorialState;

TutorialState.prototype.init = function () {
	this.tutorialPart = 1;
    this.popup = null;
};

TutorialState.prototype.preload = function () {
    var loadStyle = {
        font: '7em Times Roman',
        fill: '#2b3f68',
        align: 'center'
    };

    this.stage.backgroundColor = '#ffffff';
    var loadTextY = Phaser.Device.desktop ? 300 : this.world.centerY;
    var loadText = this.add.text(0, 0, '', loadStyle);
    loadText.y = Phaser.Device.desktop ? loadTextY : this.world.centerY / 2;
    loadText.x = Phaser.Device.desktop ? this.world.centerX : this.world.centerX / 2 + 30;
    loadText.anchor.setTo(0.5);

    if (Phaser.Device.desktop) {
        var progressBar = this.add.graphics(330, -150);
        var lodingBar = this.add.graphics(330, -150);
        lodingBar.lineStyle(3, '0x2b3f68');
        lodingBar.drawRoundedRect(100,500,300,30,10);
        lodingBar.endFill();
    }

    this.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadText.setText(progress+'%');
        if (Phaser.Device.desktop) {
            var load = progress + 194;
            progressBar.clear();
            progressBar.lineStyle(3, '0x2b3f68');
            progressBar.beginFill('0x2b3f68',1);
            progressBar.drawRoundedRect(103,501,load,27,1);
            progressBar.endFill();
        }
    }, this);

    if(Phaser.Device.desktop){
        this.load.image('window1', 'assets/tutorial/ventana-tutorial01.jpg');
        this.load.image('window2', 'assets/tutorial/ventana-tutorial02.jpg');
        this.load.image('window3', 'assets/tutorial/ventana-tutorial03.jpg');
        this.load.image('window4', 'assets/tutorial/ventana-tutorial04.jpg');

    } else {
        this.load.image('window1', 'assets/tutorial/mobile/ventana-tutorial01-mbl.jpg');
        this.load.image('window2', 'assets/tutorial/mobile/ventana-tutorial02-mbl.jpg');
        this.load.image('window3', 'assets/tutorial/mobile/ventana-tutorial03-mbl.jpg');
        this.load.image('window4', 'assets/tutorial/mobile/ventana-tutorial04-mbl.jpg');
    }

    this.load.image('street','assets/background/background.jpg');
    this.load.image('next', 'assets/tutorial/next.jpg');
    this.load.image('close','assets/tutorial/close.jpg');
    this.load.image('button-play','assets/tutorial/button-play.jpg');

};

TutorialState.prototype.create = function () {
    this.street = this.add.sprite(0, 0,'street');
    this.street.scale.setTo(0.7);

    var popup = this.add.sprite(0, 0, 'window1');
    if(Phaser.Device.desktop){
        popup.x = Phaser.Device.desktop ? this.world.centerX : this.world.centerX / 2 + 15;
        popup.y = Phaser.Device.desktop ? this.world.centerY : this.world.centerY / 2 + 30;
        popup.anchor.setTo(0.5);
        Phaser.Device.desktop ? popup.scale.setTo(0.7) : popup.scale.setTo(0.26);
        popup.inputEnabled = true;

    } else {
			popup.x = Phaser.Device.desktop ? this.world.centerX :  this.world.centerX / 2 + 30;
			popup.y = Phaser.Device.desktop ? this.world.centerY :  this.world.centerY / 2 + 40;
			popup.anchor.setTo(0.5);
			Phaser.Device.desktop ? popup.scale.setTo(0.29) : popup.scale.set(0.29);
			popup.inputEnabled = true;
    }

    var ok = this.add.sprite(0, 0, 'next');
    ok.anchor.setTo(0.5);
		if(Phaser.Device.desktop){
		Phaser.Device.desktop ? ok.scale.set(1) : ok.scale.set(2);
	    ok.inputEnabled = true;
	    ok.input.useHandCursor = true;
	    popup.addChild(ok);
	    ok.y = Phaser.Device.desktop ? (popup.height / 2) : popup.height + (popup.height / 6);
	    this.tutorialPart = 1;
    } else {
		Phaser.Device.desktop ? ok.scale.set(1.2) : ok.scale.set(2);
	    ok.inputEnabled = true;
	    ok.input.useHandCursor = true;
        popup.addChild(ok);
	    ok.y = Phaser.Device.desktop ? (popup.height / 2) : popup.height + (popup.height / 3);
	    this.tutorialPart = 1;
    }

    var close = this.add.sprite(0, 0, 'close');
if(Phaser.Device.desktop){
    Phaser.Device.desktop ? close.scale.set(1) : close.scale.set(1);
    close.inputEnabled = true;
    close.input.useHandCursor = true;
    popup.addChild(close);
    close.x =  Phaser.Device.desktop ? (popup.width / 2) + close.width : popup.width + close.width - 25;
    close.y = Phaser.Device.desktop ? -popup.height / 2 : -popup.height * 2 + close.height * 2 - close.height;
} else{
    Phaser.Device.desktop ? close.scale.set(2) : close.scale.set(2);
    close.inputEnabled = true;
    close.input.useHandCursor = true;
    popup.addChild(close);
    close.x =  Phaser.Device.desktop ? (popup.width / 2) + close.width : popup.width + close.width - 15;
    close.y = Phaser.Device.desktop ? -popup.height / 2 : -popup.height * 2 + close.height * 2 - close.height;
}

    close.events.onInputDown.add(function(){
        game.state.start('Play');
    },this);

    var game = this;
    ok.events.onInputDown.add(function(){
        switch (this.tutorialPart) {
            case 1 :
                popup.loadTexture('window2',0);
                this.tutorialPart = 2;
                break;
            case 2 :
                popup.loadTexture('window3',0);
                this.tutorialPart = 3;
                break;
            case 3 :
                popup.loadTexture('window4',0);
                this.tutorialPart = 4;
                break;
            case 4 :
                popup.visible = false;
                this.tutorialPart = 1;
                this.state.start('Play');
                break;
        }

    }, this);
};

module.exports = TutorialState;

},{}],3:[function(require,module,exports){
function WinState() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
WinState.prototype = Object.create(Phaser.State.prototype);
WinState.prototype.constructor = WinState;

WinState.prototype.init = function (level) {

    if (Phaser.Device.desktop) {
        var msgEthnics = [
            "Eres fuerte, poderosa y noble. Características de los reyes y gobernantes.",
            "Has logrado fortalecer tu espíritu de independencia y aventura.",
            "Tu perseverancia en la lucha, aporta energía extra a todos los tuyos. \n lograste conquistar los espíritus étnicos que atraen y mantienen amigos.",
            "Los espíritus étnicos nos dicen que eres de las que salen de todas las dificultades con arte y elegancia.",
            "Ves la vida desde una perspectiva más sabia y elevada. \n has logrado comprender tu destino y los ciclos vividos."
        ];
    } else {
        var msgEthnics = [
            "Eres fuerte, poderosa y noble. \n Características de los reyes y gobernantes.",
            "Has logrado fortalecer tu espíritu \n de independencia y aventura.",
            "Tu perseverancia en la lucha, aporta  \n energía extra a todos los tuyos. \n lograste conquistar los espíritus étnicos \n que atraen y mantienen amigos.",
            "Los espíritus étnicos nos dicen que  \n eres de las que salen de todas \n las dificultades con arte y elegancia.",
            "Ves la vida desde una perspectiva más sabia y elevada. \n has logrado comprender tu destino y los ciclos vividos."
        ];
    }

    var discountObj = [
        {
            discount: 0, words: [
                "Nada", "Nada"
            ]
        },
        {
            discount: 15, words: [
                "Máscaras", "Madera"
            ]
        },
        {
            discount: 20, words: [
                "Festejo", "Plumas"
            ]
        },
        {
            discount: 25, words: [
                "Música", "Indios"
            ]
        }
    ];

    this.level = parseInt(level);

    switch (this.level) {
        case 0:
            this.discount = 0;
            break;
        case 1:
            this.discount = 0;
            break;
        case 2:
            this.discount = 15;
            break;
        case 3:
            this.discount = 20;
            break;
        case 4:
            this.discount = 20;
            break;
        case 5:
            this.discount = 25;
            break;
    
        default:
            this.discount = 0;
            break;
    }

    for (let index = 0; index < discountObj.length; index++) {
        const element = discountObj[index];

        if (element.discount == this.discount) {
            this.word = element.words[this.game.rnd.integerInRange(0, 1)];
        }

    }

    this.msg = msgEthnics[this.game.rnd.integerInRange(0, 4)];
};

WinState.prototype.preload = function () {
    if (Phaser.Device.desktop) {
        this.load.image('background','assets/background/background-brown.jpg');
        this.load.image('window','assets/popups/window-win.jpg');
        this.load.image('store', 'assets/buttons/store.png');
        this.load.image('boot', 'assets/buttons/boot.png');
    } else {
        this.load.image('background','assets/background/mobile/background-brown.jpg');
        this.load.image('window','assets/popups/mobile/windowWin.jpg');
        this.load.image('store', 'assets/buttons/mobile/store.png');
        this.load.image('boot', 'assets/buttons/mobile/boot.png');
    }
};

WinState.prototype.create = function () {
  this.add.sprite(0, 0, 'background');
  var window = this.add.sprite(0,0,'window');
  Phaser.Device.desktop ? window.scale.set(0.73) : window.scale.set(0.29, 0.291);
  window.y = 0;
  window.x = 0;
    if (Phaser.Device.desktop) {
        var bonoStyle = {
            font: '2em American Bold',
            fill: '#2b3f68',
            align: 'center'
        };

        var discountStyle = {
            font: '5em American',
            fill: '#2b3f68',
            align: 'center'
        };

        var worKey = {
            font: '5em American',
            fill: '#2b3f68',
            align: 'center'
        };

        var legalStyle = {
            font: '2.2em American',
            fill: '#2b3f68',
            align: 'center'
        };
    } else {
        var bonoStyle = {
            font: '1em American Bold',
            fill: '#2b3f68',
            align: 'center'
        };

        var discountStyle = {
            font: '3em American',
            fill: '#2b3f68',
            align: 'center'
        };

        var worKey = {
            font: '3em American',
            fill: '#2b3f68',
            align: 'center'
        };

        var legalStyle = {
            font: '1.2em American',
            fill: '#2b3f68',
            align: 'center'
        };
    }

    this.btnBoot = this.add.sprite(0, 0, 'boot');
    this.btnBoot.x = Phaser.Device.desktop ? this.game.world.width - 50 : (this.game.world.width / 2) + 10;
    this.btnBoot.y =  Phaser.Device.desktop ? this.game.world.height - 50 : this.game.world.height / 2 + 30/* this.game.world.height / 2 - 30 */;
    this.btnBoot.anchor.set(0.5);
    Phaser.Device.desktop ? this.btnBoot.scale.set(0.5) :this.btnBoot.scale.set(0.4);
    this.btnBoot.inputEnabled = true;
    this.btnBoot.input.useHandCursor = true;
    this.btnBoot.events.onInputDown.add(function(){
     this.state.start('Tutorial');
     },this);

     this.btnStore = this.add.sprite(0, 0, 'store');
     this.btnStore.x =  Phaser.Device.desktop ? 50 : 35;
     this.btnStore.y = Phaser.Device.desktop ? this.game.world.height - 50 : this.game.world.height / 2 + 30 /* this.game.world.height / 2 - 30 */;
     this.btnStore.anchor.set(0.5);
     Phaser.Device.desktop ?  this.btnStore.scale.set(0.5) : this.btnStore.scale.set(0.4);
     this.btnStore.inputEnabled = true;
     this.btnStore.input.useHandCursor = true;

     this.btnStore.events.onInputDown.add(function(){
         document.location = "https://www.americanino.com/";
     },this);

    var generalX = Phaser.Device.desktop ? this.world.width / 2 : this.world.width / 4 + 20;
    var textfirst = this.add.text(generalX, 0, '', legalStyle);
    textfirst.y = Phaser.Device.desktop ? this.world.height / 2.5 : this.world.height / 5;
    textfirst.text = "Lograste liberar a los esprititus etnicos.";
    textfirst.anchor.setTo(0.5,0);


    var discountText = this.add.text(generalX, 0, '',discountStyle);
    discountText.y = textfirst.y + discountText.height / 3;
    discountText.text = this.discount+"%";
    discountText.anchor.setTo(0.5,0);

    var textBono = this.add.text(generalX, 0, '',bonoStyle);
    textBono.y = discountText.y + textBono.height + 15;
    textBono.anchor.setTo(0.5,0);
    textBono.text = "Recibe un bono de descuento en cualquier producto de nuestras tiendas.";

    var word = this.add.text(generalX, 0, '',worKey);
    word.y =  textBono.y + word.height / 4;
    word.text = String(this.word);
    word.anchor.setTo(0.5,0);

    var msg = this.add.text(generalX, 0, '',legalStyle);
    msg.y =  word.y + msg.height + 15;
    msg.text = String(this.msg);
    msg.anchor.setTo(0.5,0);

};

WinState.prototype.update = function () {

};

module.exports = WinState;

},{}],4:[function(require,module,exports){
// PHASER IS IMPORTED AS AN EXTERNAL BUNDLE IN INDEX.HTML
Phaser.Device.whenReady(function () {
  var PlayState  = require('./PlayState');
  var WinState  = require('./WinState');
  var TutorialState  = require('./TutorialState');

  if (!Phaser.Device.desktop) {
    var game = new Phaser.Game(640, 1152, Phaser.AUTO, 'game');
    game.stage.backgroundColor = 0x000000;

    game.scale.setMinMax(640, 1152);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
  } else {
    var game = new Phaser.Game(1152, 640, Phaser.AUTO, 'game');
    game.stage.backgroundColor = 0x000000;

    game.scale.setMinMax(1152, 640);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.scale.forceOrientation(false, true);

  }


  game.state.add('Play',   PlayState);
  game.state.add('win',   WinState);
  game.state.add('Tutorial',   TutorialState);

  game.state.start('Tutorial');
})

},{"./PlayState":1,"./TutorialState":2,"./WinState":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0hPTUUvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvcGhhc2VyLW5vZGUta2l0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9QbGF5U3RhdGUuanMiLCJidWlsZC9qcy9UdXRvcmlhbFN0YXRlLmpzIiwiYnVpbGQvanMvV2luU3RhdGUuanMiLCJidWlsZC9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzM2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBQbGF5U3RhdGUoKSB7XHJcblx0UGhhc2VyLlN0YXRlLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKiBAdHlwZSBQaGFzZXIuU3RhdGUgKi9cclxuUGxheVN0YXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLlN0YXRlLnByb3RvdHlwZSk7XHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQbGF5U3RhdGU7XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNNdXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMzE7XHJcbiAgICB0aGlzLmxldmVsV2lucyA9IDE7XHJcblxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy50b3RhbFRpbWUgPSAzMTtcclxuICAgIHRoaXMudGltZUVsYXBzZWQgPSAwO1xyXG5cclxuICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHMgPSBbXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDEsIHF1YW50aXR5OiA0ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjYsIHk6IDAuNiB9IH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDIsIHF1YW50aXR5OiA2ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjYsIHk6IDAuNiB9IH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDMsIHF1YW50aXR5OiA4ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjUsIHk6IDAuNSB9ICB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiA0LCBxdWFudGl0eTogOSAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfSAgfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogNSwgcXVhbnRpdHk6IDEyICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDAuNywgeTogMC43IH0sIHBpZWNlU2NhbGU6IHsgeDogMC41LCB5OiAwLjUgfSAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMudG90ZW1MZXZlbFNjYWxlID0geyB4OiAwLjgsIHk6IDAuOCB9O1xyXG5cclxuICAgICAgICB0aGlzLmJhclNjYWxlID0geyB4OiAwLjYsIHk6IDAuNiB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzID0gW1xyXG4gICAgICAgICAgICB7IGxldmVsOiAxLCBxdWFudGl0eTogNCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC4zLCB5OiAwLjMgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAyLCBxdWFudGl0eTogNiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC4zLCB5OiAwLjMgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAzLCBxdWFudGl0eTogOCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC4zLCB5OiAwLjMgfSAgfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogNCwgcXVhbnRpdHk6IDkgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDUsIHF1YW50aXR5OiAxMiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAwLjM1LCB5OiAwLjM1IH0sIHBpZWNlU2NhbGU6IHsgeDogMC4zLCB5OiAwLjMgfSAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHRoaXMudG90ZW1MZXZlbFNjYWxlID0geyB4OiAwLjgsIHk6IDAuOCB9O1xyXG5cclxuICAgICAgICB0aGlzLmJhclNjYWxlID0geyB4OiAwLjYsIHk6IDAuMyB9O1xyXG4gICAgfVxyXG5cclxuICB0aGlzLl92UGllY2VzUHV6emxlID0gW107XHJcbiAgdGhpcy5fdlBpZWNlc0Nsb25lcyA9IFtdO1xyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxvYWRTdHlsZSA9IHtcclxuICAgICAgICBmb250OiAnN2VtIFRpbWVzIFJvbWFuJyxcclxuICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIGxvYWRUZXh0WSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDMwMCA6IHRoaXMud29ybGQuY2VudGVyWTtcclxuICAgIHZhciBsb2FkVGV4dCA9IHRoaXMuYWRkLnRleHQoMCwgMCwgJycsIGxvYWRTdHlsZSk7XHJcbiAgICBsb2FkVGV4dC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gbG9hZFRleHRZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMjtcclxuICAgIGxvYWRUZXh0LnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcbiAgICBsb2FkVGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICB2YXIgbG9kaW5nQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICBsb2RpbmdCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgIGxvZGluZ0Jhci5kcmF3Um91bmRlZFJlY3QoMTAwLDUwMCwzMDAsMzAsMTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5lbmRGaWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZChmdW5jdGlvbihwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKXtcclxuICAgICAgICBsb2FkVGV4dC5zZXRUZXh0KHByb2dyZXNzKyclJyk7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB2YXIgbG9hZCA9IHByb2dyZXNzICsgMTk0O1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5jbGVhcigpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmJlZ2luRmlsbCgnMHgyYjNmNjgnLDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5kcmF3Um91bmRlZFJlY3QoMTAzLDUwMSxsb2FkLDI3LDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5lbmRGaWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgLy8gcGllY2VzXHJcbiAgICAvLyBwdXp6bGUgMVxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0MS0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTEvdG90ZW0tMS0xLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0MS0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTEvdG90ZW0tMS0yLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0MS0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTEvdG90ZW0tMS0zLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0MS00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTEvdG90ZW0tMS00LnBuZycpO1xyXG5cclxuICAgIC8vIHB1enpsZSAyXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMi90b3RlbS0yLTYucG5nJyk7XHJcblxyXG4gICAgLy8gcHV6emxlIDNcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtNicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtNi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtNycsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtNy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDMtOCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGUzL3RvdGVtLTMtOC5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgNFxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC0xLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC0yLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC0zLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC00LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC02JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC02LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC03JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC03LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC04JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC04LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NC05JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTQvdG90ZW0tNC05LnBuZycpO1xyXG5cclxuICAgIC8vIHB1enpsZSA1XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTAxLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtNicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDYucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTcnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA3LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS04JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wOC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtOScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDkucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTEwJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0xMC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTExLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMTIucG5nJyk7XHJcblxyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFyJywnYXNzZXRzL2Jhci9iYXItd2hpdGUuanBnJyk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zIGxldmVsc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDEtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDEtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDItb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDMtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDMtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDQtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDQtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDUtb2ZmLnBuZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gaXRlbXMgbGV2ZWxzXHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDEtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMS1vbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0Mi1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAyLW9uLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDMtb24ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDQtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNC1vbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NS1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDA1LW9uLnBuZycpO1xyXG5cclxuICAgICAgICAvL2JhY2tncm91bmQgdG90ZW1cclxuXHRcdFx0XHR0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtQ29udGFpbmVyJywgJ2Fzc2V0cy90b3RlbXMtYmFja2dyb3VuZHMvdG90ZW0tY29udGFpbmVyLnBuZycpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZC5pbWFnZSgndG90ZW0xJywgJ2Fzc2V0cy90b3RlbXMtYmFja2dyb3VuZHMvdG90ZW0tMDEucG5nJyk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkLmltYWdlKCd0b3RlbTInLCAnYXNzZXRzL3RvdGVtcy1iYWNrZ3JvdW5kcy90b3RlbS0wMi5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtMycsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLTAzLnBuZycpO1xyXG4gICAgICAgIC8vIHRoaXMubG9hZC5pbWFnZSgndG90ZW00JywgJ2Fzc2V0cy90b3RlbXMtYmFja2dyb3VuZHMvdG90ZW0tMDQucG5nJyk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkLmltYWdlKCd0b3RlbTUnLCAnYXNzZXRzL3RvdGVtcy1iYWNrZ3JvdW5kcy90b3RlbS0wNS5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnLi9hc3NldHMvYnV0dG9ucy9zb3VuZC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ211dGUnLCAnLi9hc3NldHMvYnV0dG9ucy9tdXRlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGF1c2UnLCAnLi9hc3NldHMvYnV0dG9ucy9wYXVzZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnLi9hc3NldHMvYnV0dG9ucy9wbGF5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd1dpbicsICdhc3NldHMvcG9wdXBzL3BvcHVwc1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd0ZhaWwnLCAnYXNzZXRzL3BvcHVwcy9wb3B1cHNGYWlsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbmV4dC1sZXZlbCcsICdhc3NldHMvYnV0dG9ucy9uZXh0LWxldmVsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncmVwbHknLCAnYXNzZXRzL2J1dHRvbnMvcmVwbHkuanBnJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL2Jvb3QucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdmYWlsLXBvcHVwJywgJ2Fzc2V0cy9wb3B1cHMvZmFpbFdpbmRvd3MuanBnJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL21vYmlsZS9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFyJywnYXNzZXRzL2Jhci9tb2JpbGUvYmFyLXdoaXRlLmpwZycpO1xyXG5cclxuICAgICAgICAvLyBpdGVtcyBsZXZlbHNcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMS1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0Mi1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDItb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDMtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAzLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwNC1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDUtb2ZmLnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAxLW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDItb24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMy1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA0LW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDUtb24ucG5nJyk7XHJcblxyXG5cclxuICAgICAgICAvL2JhY2tncm91bmQgdG90ZW1zXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtMScsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL21vYmlsZS90b3RlbS0wMS5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtMicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL21vYmlsZS90b3RlbS0wMi5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtMycsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL21vYmlsZS90b3RlbS0wMy5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtNCcsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL21vYmlsZS90b3RlbS0wNC5wbmcnKTtcclxuICAgICAgICAvLyB0aGlzLmxvYWQuaW1hZ2UoJ3RvdGVtNScsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL21vYmlsZS90b3RlbS0wNS5wbmcnKTtcclxuXHJcbiAgICAgICAgIC8vIGJ1dHRvbnNcclxuICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzb3VuZCcsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvc291bmQucG5nJyk7XHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbXV0ZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvbXV0ZS5wbmcnKTtcclxuICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvcGF1c2UucG5nJyk7XHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGxheScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvcGxheS5wbmcnKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93V2luJywgJ2Fzc2V0cy9wb3B1cHMvbW9iaWxlL3BvcHVwc1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd0ZhaWwnLCAnYXNzZXRzL3BvcHVwcy9tb2JpbGUvcG9wdXBzRmFpbC5qcGcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCduZXh0LWxldmVsJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9uZXh0LWxldmVsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncmVwbHknLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3JlcGx5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9zdG9yZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Jvb3QnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL2Jvb3QucG5nJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1wb3B1cCcsICdhc3NldHMvcG9wdXBzL21vYmlsZS9mYWlsV2luZG93LmpwZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMicsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMycsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNCcsICdhc3NldHMvbXVzaWMvVHJpYmFsMy5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvbnQgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAnM2VtIEFtZXJpY2FuJyA6ICczZW0gQW1lcmljYW4nO1xyXG4gICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6IGZvbnQsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2JhY2tncm91bmQnKTtcclxuXHRcclxuXHQvL2lmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcblx0XHQvL3RoaXMuYWRkLnNwcml0ZSgyNTAsNTAsICd0b3RlbUNvbnRhaW5lcicpO1xyXG5cdC8vfVxyXG5cdC8vZWxzZXtcclxuXHRcdC8vdGhpcy5hZGQuc3ByaXRlKDI1MCwwLCAndG90ZW1Db250YWluZXInKTtcclxuXHQvL31cclxuXHJcbiAgICAvL3RoaXMudG90ZW1Db250YWluZXIgPSB0aGlzLmFkZC5zcHJpdGUoMjUwLDUwLCAndG90ZW1Db250YWluZXInKTtcclxuICAgIC8vdGhpcy50b3RlbUNvbnRhaW5lci5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAvL3RoaXMudG90ZW1Db250YWluZXIuc2NhbGUuc2V0KDAuNSk7XHJcbiAgICAvLyB0aGlzLnRvdGVtQ29udGFpbmVyLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMiA6IHRoaXMudG90ZW1Db250YWluZXIud2lkdGggLyAyO1xyXG4gICAgLy8gdGhpcy50b3RlbUNvbnRhaW5lci55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLmhlaWdodCAvIDIgOiB0aGlzLnRvdGVtQ29udGFpbmVyLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5iYXIgPSB0aGlzLmFkZC5zcHJpdGUoMCwwLCAnYmFyJyk7XHJcbiAgICB0aGlzLmJhci5hbmNob3Iuc2V0VG8oMCk7XHJcbiAgICB0aGlzLmJhci5zY2FsZS5zZXRUbyh0aGlzLmJhclNjYWxlLngsIHRoaXMuYmFyU2NhbGUueSk7XHJcbiAgICB0aGlzLmxldmVsID0gMTtcclxuXHJcbiAgICB0aGlzLmF1ZGlvID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdzb3VuZCcpO1xyXG4gICAgdGhpcy5hdWRpby5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmF1ZGlvLnNjYWxlLnNldCgxKSA6IHRoaXMuYXVkaW8uc2NhbGUuc2V0KDAuNCk7XHJcbiAgICB0aGlzLmF1ZGlvLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gdGhpcy5hdWRpby53aWR0aCA6IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDI7XHJcbiAgICB0aGlzLmF1ZGlvLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogdGhpcy5hdWRpby5oZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMucGF1c2UgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3BhdXNlJyk7XHJcbiAgICB0aGlzLnBhdXNlLmFuY2hvci5zZXQoMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMucGF1c2Uuc2NhbGUuc2V0KDEpIDogdGhpcy5wYXVzZS5zY2FsZS5zZXQoMC40KTtcclxuICAgIHRoaXMucGF1c2UueCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQud2lkdGggLSB0aGlzLnBhdXNlLndpZHRoIC0gdGhpcy5hdWRpby53aWR0aCAtIDIwIDogKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIpIC0gdGhpcy5hdWRpby53aWR0aCAtIDEwO1xyXG4gICAgdGhpcy5wYXVzZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5iYXIuaGVpZ2h0IC8gMiA6IHRoaXMucGF1c2UuaGVpZ2h0IC8gMjtcclxuXHJcblxyXG4gICAgdGhpcy5hdWRpby5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hdWRpby5pbnB1dC5waXhlbFBlcmZlY3RPdmVyID0gdHJ1ZTtcclxuICAgIHRoaXMuYXVkaW8uaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLmF1ZGlvLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlcigpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBhdXNlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnBhdXNlLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXVzZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMucGF1c2UuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucGF1c2VNYW5hZ2VyKCk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX3ZUb3RlbXNMZXZlbHMgPSBbXTtcclxuICAgIHRoaXMuX3ZUcmliYWxNdXNpY3MgPSBbXTtcclxuICAgIHZhciBvZmZzZXQgPSB0aGlzLmJhci5oZWlnaHQgKyAxMDtcclxuXHJcbiAgICB2YXIgbGV2ZWwgPSB0aGlzLmFkZC50ZXh0KDUwLCAwLCAnTml2ZWwnLCBzdHlsZSk7XHJcbiAgICBsZXZlbC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIGxldmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogbGV2ZWwuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDw9IDU7IGluZGV4KyspIHtcclxuICAgICAgICB2YXIgbmFtZSA9IFN0cmluZygndCcgKyBpbmRleCkgKyAnLW9mZic7XHJcbiAgICAgICAgdmFyIHRyaWJhbE11c2ljID0gdGhpcy5hZGQuYXVkaW8oU3RyaW5nKCd0cmliYWwnICsgaW5kZXgpKTtcclxuICAgICAgICB0cmliYWxNdXNpYy5sb29wID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGVtTGV2ZWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdG90ZW1MZXZlbC5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICAgICAgICB0b3RlbUxldmVsLnNjYWxlLnNldFRvKHRoaXMudG90ZW1MZXZlbFNjYWxlLngsICB0aGlzLnRvdGVtTGV2ZWxTY2FsZS55KTtcclxuXHJcbiAgICAgICAgdG90ZW1MZXZlbC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gNTAgOiAzMjtcclxuICAgICAgICB0b3RlbUxldmVsLnkgPSBvZmZzZXQ7XHJcblxyXG4gICAgICAgIG9mZnNldCArPSB0b3RlbUxldmVsLmhlaWdodCArIDEwO1xyXG5cclxuICAgICAgICB0aGlzLl92VG90ZW1zTGV2ZWxzLnB1c2godG90ZW1MZXZlbCk7XHJcbiAgICAgICAgdGhpcy5fdlRyaWJhbE11c2ljcy5wdXNoKHRyaWJhbE11c2ljKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl92VHJpYmFsTXVzaWNzW3RoaXMubGV2ZWwgLSAxXS5wbGF5KCk7XHJcbiAgICB0aGlzLmNyZWF0ZVRpbWVyKCk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudG90YWxUaW1lID0gMzE7XHJcbiAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLnRpbWVyID0gIHRoaXMudGltZS5ldmVudHMubG9vcCgxMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnYW1lLmNoZWNrVGltZSgpO1xyXG4gICAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVQaWVjZXMoKTtcclxuXHJcbiAgIHRoaXMuYnRuQm9vdCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnYm9vdCcpO1xyXG4gICB0aGlzLmJ0bkJvb3QueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDUwIDogKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIpICsgMTA7XHJcbiAgIHRoaXMuYnRuQm9vdC55ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA1MCA6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyICsgMzAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICB0aGlzLmJ0bkJvb3QuYW5jaG9yLnNldCgwLjUpO1xyXG4gICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNSkgOnRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC40KTtcclxuICAgdGhpcy5idG5Cb290LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgIHRoaXMuYnRuQm9vdC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgdGhpcy5idG5Cb290LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnRuU3RvcmUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3N0b3JlJyk7XHJcbiAgICB0aGlzLmJ0blN0b3JlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gNTAgOiAzNTtcclxuICAgIHRoaXMuYnRuU3RvcmUueSA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgIHRoaXMuYnRuU3RvcmUuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gIHRoaXMuYnRuU3RvcmUuc2NhbGUuc2V0KDAuNSkgOiB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5idG5TdG9yZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5TdG9yZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmJ0blN0b3JlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbiA9IFwiaHR0cHM6Ly93d3cuYW1lcmljYW5pbm8uY29tL1wiO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLndpbmRvd1dpbiA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnd2luZG93V2luJyk7XHJcbiAgICB0aGlzLndpbmRvd1dpbi54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgICB0aGlzLndpbmRvd1dpbi55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQvMiA6IHRoaXMud29ybGQuaGVpZ2h0LzQgKyAzMDtcclxuICAgIHRoaXMud2luZG93V2luLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dXaW4uc2NhbGUuc2V0VG8oMC41KSA6IHRoaXMud2luZG93V2luLnNjYWxlLnNldFRvKDAuODcsIDAuOSk7XHJcbiAgICB0aGlzLndpbmRvd1dpbi52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIG5leHRMZXZlbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnbmV4dC1sZXZlbCcpO1xyXG4gICAgbmV4dExldmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd1dpbi5oZWlnaHQgLyAyICsgdGhpcy53aW5kb3dXaW4uaGVpZ2h0IC8gNCAgLSBuZXh0TGV2ZWwuaGVpZ2h0IDogKHRoaXMud2luZG93V2luLmhlaWdodCAvIDQgKSArIG5leHRMZXZlbC5oZWlnaHQgO1xyXG4gICAgbmV4dExldmVsLmFuY2hvci5zZXQoMC41KTtcclxuICAgIG5leHRMZXZlbC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgbmV4dExldmVsLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy53aW5kb3dXaW4uYWRkQ2hpbGQobmV4dExldmVsKTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICBuZXh0TGV2ZWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIGdhbWUud2luZG93V2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBnYW1lLnJlc3RvcmVQdXp6bGUoKTtcclxuICAgICAgICBnYW1lLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZ2FtZS50b3RhbFRpbWUgPSAzMTtcclxuICAgICAgICBnYW1lLnRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICBnYW1lLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICBnYW1lLmxldmVsV2lucysrO1xyXG4gICAgICAgIGdhbWUudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgICAgICAgZ2FtZS53b3JsZC5hZGRDaGlsZEF0KGdhbWUud2luZG93V2luLCBnYW1lLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLndpbmRvd0ZhaWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3dpbmRvd0ZhaWwnKTtcclxuICAgIHRoaXMud2luZG93RmFpbC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuaGVpZ2h0LzIgOiB0aGlzLndvcmxkLmhlaWdodC80ICsgMzA7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd0ZhaWwuc2NhbGUuc2V0VG8oMC41KSA6IHRoaXMud2luZG93RmFpbC5zY2FsZS5zZXRUbygwLjg3LCAwLjkpO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICB2YXIgcmVwbHkgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQtbGV2ZWwnKTtcclxuICAgIHJlcGx5LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gMiArIHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyA0ICAtIHJlcGx5LmhlaWdodCA6ICh0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCApICsgcmVwbHkuaGVpZ2h0IC8gMiA7XHJcbiAgICByZXBseS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAvLyBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAgcmVwbHkuc2NhbGUuc2V0KDEpIDogcmVwbHkuc2NhbGUuc2V0KDAuMyk7XHJcbiAgICByZXBseS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgcmVwbHkuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblxyXG4gICAgdGhpcy53aW5kb3dGYWlsLmFkZENoaWxkKHJlcGx5KTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICByZXBseS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy53aW5kb3dGYWlsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc3RvcmVQdXp6bGUoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSAzMTtcclxuICAgICAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMzE7XHJcbiAgICAgICAgZ2FtZS50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICB0aGlzLmZhaWxTdGF0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnZmFpbC1wb3B1cCcpO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodC8yIDogdGhpcy53b3JsZC5oZWlnaHQvNCArIDMwO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/dGhpcy5mYWlsU3RhdGUuc2NhbGUuc2V0VG8oMC41KSA6dGhpcy5mYWlsU3RhdGUuc2NhbGUuc2V0VG8oMC4zKTtcclxuICAgdGhpcy5mYWlsU3RhdGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgdGhpcy5mYWlsU3RhdGUuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICB2YXIgcmVwbHlMZXZlbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncmVwbHknKTtcclxuICAgcmVwbHlMZXZlbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDIgKyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCAgLSByZXBseUxldmVsLmhlaWdodCA6ICh0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCApICsgcmVwbHlMZXZlbC5oZWlnaHQgO1xyXG4gICByZXBseUxldmVsLmFuY2hvci5zZXQoMC41KTtcclxuICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gIHJlcGx5TGV2ZWwuc2NhbGUuc2V0KDEpIDogcmVwbHlMZXZlbC5zY2FsZS5zZXQoMSk7XHJcbiAgIHJlcGx5TGV2ZWwuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgcmVwbHlMZXZlbC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgIHRoaXMuZmFpbFN0YXRlLmFkZENoaWxkKHJlcGx5TGV2ZWwpO1xyXG5cclxuICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICByZXBseUxldmVsLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBnYW1lLmZhaWxTdGF0ZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZ2FtZS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGdhbWUudG90YWxUaW1lID0gMzE7XHJcbiAgICAgICAgZ2FtZS50aW1lRWxhcHNlZCA9IDA7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50VGltZSA9IDMxO1xyXG4gICAgICAgIGdhbWUuZ2FtZS5zdGF0ZS5yZXN0YXJ0KCk7XHJcbiAgICAgICAgZ2FtZS50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgfSx0aGlzKTtcclxuIH07XHJcblxyXG4gUGxheVN0YXRlLnByb3RvdHlwZS5hdWRpb01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5pc011dGUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLmxvYWRUZXh0dXJlKCdtdXRlJywwKTtcclxuICAgICAgICB0aGlzLmdhbWUuc291bmQubXV0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc011dGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5sb2FkVGV4dHVyZSgnc291bmQnLDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zb3VuZC5tdXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc011dGUgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5jaGVja1RpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIHRpbWVEaWZmZXJlbmNlID0gdGhpcy5zdGFydFRpbWUuZ2V0VGltZSgpIC0gY3VycmVudFRpbWUuZ2V0VGltZSgpO1xyXG5cclxuICAgIC8vVGltZSBlbGFwc2VkIGluIHNlY29uZHNcclxuICAgIHRoaXMudGltZUVsYXBzZWQgPSBNYXRoLmFicyh0aW1lRGlmZmVyZW5jZSAvIDEwMDApO1xyXG5cclxuICAgIC8vVGltZSByZW1haW5pbmcgaW4gc2Vjb25kc1xyXG4gICAgdmFyIHRpbWVSZW1haW5pbmcgPSB0aGlzLnRvdGFsVGltZSAtIHRoaXMudGltZUVsYXBzZWQ7XHJcblxyXG4gICAgLy9Db252ZXJ0IHNlY29uZHMgaW50byBtaW51dGVzIGFuZCBzZWNvbmRzXHJcbiAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZyAvIDYwKTtcclxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcih0aW1lUmVtYWluaW5nKSAtICg2MCAqIG1pbnV0ZXMpO1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHNlY29uZHM7XHJcblxyXG4gICAgLy9EaXNwbGF5IG1pbnV0ZXMsIGFkZCBhIDAgdG8gdGhlIHN0YXJ0IGlmIGxlc3MgdGhhbiAxMFxyXG4gICAgdmFyIHJlc3VsdCA9IChtaW51dGVzIDwgMTApID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlcztcclxuXHJcbiAgICAvL0Rpc3BsYXkgc2Vjb25kcywgYWRkIGEgMCB0byB0aGUgc3RhcnQgaWYgbGVzcyB0aGFuIDEwXHJcbiAgICByZXN1bHQgKz0gKHNlY29uZHMgPCAxMCkgPyBcIjowXCIgKyBzZWNvbmRzIDogXCI6XCIgKyBzZWNvbmRzO1xyXG5cclxuICAgIGlmIChtaW51dGVzIDwgMCkge1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWVMYWJlbC50ZXh0ID0gcmVzdWx0O1xyXG59XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnBhdXNlTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmlzUGF1c2UgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlLmxvYWRUZXh0dXJlKCdwbGF5JywgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRoaXMuaXNQYXVzZTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHRoaXMuY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lci50aW1lci5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhdXNlLmxvYWRUZXh0dXJlKCdwYXVzZScsIDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSB0aGlzLmlzUGF1c2U7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNyZWF0ZVRpbWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50aW1lTGFiZWwgPSB0aGlzLmdhbWUuYWRkLnRleHQoMCwgMCwgXCIwMDowMFwiLCB7Zm9udDogXCI0ZW0gQW1lcmljYW4gYm9sZFwiLGZpbGw6IFwiIzJiM2Y2OFwifSk7XHJcbiAgICB0aGlzLnRpbWVMYWJlbC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgdGhpcy50aW1lTGFiZWwuYWxpZ24gPSAnY2VudGVyJztcclxuXHJcblxyXG4gICAgdGhpcy50aW1lTGFiZWwueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgKyB0aGlzLmdhbWUud29ybGQud2lkdGggLyA0IDogIHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgLSB0aGlzLmdhbWUud29ybGQud2lkdGggLyA0ICsgdGhpcy50aW1lTGFiZWwuaGVpZ2h0IC8gMjtcclxuICAgIHRoaXMudGltZUxhYmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogdGhpcy50aW1lTGFiZWwuaGVpZ2h0IC8gMjtcclxufVxyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUucmVzdG9yZVB1enpsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fdlRvdGVtc0xldmVsc1t0aGlzLmxldmVsIC0gMV0ubG9hZFRleHR1cmUoU3RyaW5nKCd0JyArIHRoaXMubGV2ZWwpICsgJy1vbicsIDApO1xyXG4gICAgdGhpcy5fdlRyaWJhbE11c2ljc1t0aGlzLmxldmVsIC0gMV0uc3RvcCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdkFsbFBpZWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX3ZBbGxQaWVjZXNbaV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3ZQaWVjZXNQdXp6bGUgPSBbXTtcclxuICAgIHRoaXMuX3ZQaWVjZXNDbG9uZXMgPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5sZXZlbCAhPT0gNSkge1xyXG4gICAgICAgIHRoaXMubGV2ZWwrKztcclxuICAgICAgICB2YXIgaW5kZXhNdXNpYyA9IHRoaXMubGV2ZWwgLSAxO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGllY2VzKCk7XHJcbiAgICAgICAgdGhpcy5fdlRyaWJhbE11c2ljc1tpbmRleE11c2ljXS5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3dpbicsIHRydWUsIHRydWUsIHRoaXMubGV2ZWxXaW5zKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy53aW5kb3dXaW4sIHRoaXMud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiB9O1xyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlUGllY2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG9mZnNldEJhciA9IHRoaXMuYmFyLmhlaWdodCArIDEwO1xyXG4gICAgdmFyIHF1YW50aXR5UGllY2VzID0gdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucXVhbnRpdHk7XHJcbiAgICB0aGlzLl92QWxsUGllY2VzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8PSBxdWFudGl0eVBpZWNlczsgaW5kZXgrKykge1xyXG4gICAgICAgIHZhciBuYW1lID0gU3RyaW5nKCd0JyArIHRoaXMubGV2ZWwgKyAnLScgKyBpbmRleCk7XHJcblxyXG4gICAgICAgIHZhciBwaWVjZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCBuYW1lKTtcclxuICAgICAgICBwaWVjZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBwaWVjZS5zY2FsZS5zZXRUbyh0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLngsICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLnkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUocGllY2UpO1xyXG4gICAgICAgIHBpZWNlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcGllY2UucG9zID0ge307XHJcbiAgICAgICAgcGllY2UuYWxwaGEgPSAwLjA1O1xyXG4gICAgICAgIHBpZWNlLnRpbnQ9IDB4ZWVlMGNhO1xyXG5cclxuICAgICAgICB2YXIgb2Zmc2V0T2JqID0gZ2V0T2Zmc2V0QnlMdmwob2Zmc2V0QmFyLCB0aGlzLmxldmVsKTtcclxuICAgICAgICB2YXIgaW5pdGlhbFBvc1BpZWNlID0gaW5pdGlhbFBvc2l0aW9uQnlMdmwocGllY2UsIHRoaXMubGV2ZWwsIGluZGV4KTtcclxuICAgICAgICB2YXIgaW5pdGlhbFBvc0Nsb25lID0gaW5pdGlhbFBvc2l0aW9uKHBpZWNlLCB0aGlzLmxldmVsLCBpbmRleCk7XHJcblxyXG4gICAgICAgIHBpZWNlLnggPSBpbml0aWFsUG9zUGllY2UueDtcclxuICAgICAgICBwaWVjZS55ID0gaW5pdGlhbFBvc1BpZWNlLnk7XHJcblxyXG4gICAgICAgIHBpZWNlLnggKz0gb2Zmc2V0T2JqLng7XHJcbiAgICAgICAgcGllY2UueSArPSBvZmZzZXRPYmoueTtcclxuXHJcbiAgICAgICAgbGV0IHgxID0gaW5pdGlhbFBvc0Nsb25lLng7XHJcbiAgICAgICAgbGV0IHkxID0gaW5pdGlhbFBvc0Nsb25lLnk7XHJcblxyXG4gICAgICAgIHgxICs9IG9mZnNldE9iai54O1xyXG4gICAgICAgIHkxICs9IG9mZnNldE9iai55O1xyXG5cclxuICAgICAgICBsZXQgcGllY2VDbG9uID0gdGhpcy5hZGQuc3ByaXRlKHgxLCB5MSwgbmFtZSk7XHJcbiAgICAgICAgcGllY2VDbG9uLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5zY2FsZS5zZXRUbyh0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLngsICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLnkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUocGllY2VDbG9uKTtcclxuXHJcbiAgICAgICAgcGllY2VDbG9uLnBhcmVudEluZGV4ID0gcGllY2UuaW5kZXg7XHJcbiAgICAgICAgcGllY2VDbG9uLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgcGllY2VDbG9uLmlucHV0LmVuYWJsZURyYWcoKTtcclxuICAgICAgICBwaWVjZUNsb24ub3JpZ2luYWxQb3NpdGlvbiA9IHBpZWNlQ2xvbi5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5pbnB1dC5lbmFibGVTbmFwKHBpZWNlQ2xvbi53aWR0aCwgcGllY2VDbG9uLmhlaWdodCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5ldmVudHMub25EcmFnU3RvcC5hZGQoZnVuY3Rpb24oY3VycmVudFNwcml0ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcERyYWcoY3VycmVudFNwcml0ZSk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZQaWVjZXNQdXp6bGUucHVzaChwaWVjZSk7XHJcbiAgICAgICAgdGhpcy5fdkFsbFBpZWNlcy5wdXNoKHBpZWNlKTtcclxuICAgICAgICB0aGlzLl92QWxsUGllY2VzLnB1c2gocGllY2VDbG9uKTtcclxuICAgIH1cclxuIH07XHJcblxyXG4gUGxheVN0YXRlLnByb3RvdHlwZS5zdG9wRHJhZyA9ICBmdW5jdGlvbiAoY3VycmVudFNwcml0ZSkge1xyXG4gICAgICAgIHZhciBzY29wZSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGVuZFNwcml0ZSA9IHRoaXMuX3ZQaWVjZXNQdXp6bGVbY3VycmVudFNwcml0ZS5wYXJlbnRJbmRleCAtIDFdO1xyXG4gICAgICAgIGlmICghdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAoY3VycmVudFNwcml0ZSwgZW5kU3ByaXRlLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjdXJyZW50U3ByaXRlLmlucHV0LmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHNjb3BlLl92UGllY2VzQ2xvbmVzLnB1c2goY3VycmVudFNwcml0ZSk7XHJcbiAgICAgICAgY3VycmVudFNwcml0ZS5wb3NpdGlvbi5jb3B5RnJvbShlbmRTcHJpdGUucG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRTcHJpdGUuYW5jaG9yLnNldFRvKGVuZFNwcml0ZS5hbmNob3IueCwgZW5kU3ByaXRlLmFuY2hvci55KTtcclxuICAgICAgfSkpIHtcclxuICAgICAgICBjdXJyZW50U3ByaXRlLnBvc2l0aW9uLmNvcHlGcm9tKGN1cnJlbnRTcHJpdGUub3JpZ2luYWxQb3NpdGlvbik7XHJcbiAgICAgfVxyXG4gfTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoICh0aGlzLl92UGllY2VzQ2xvbmVzICYmICB0aGlzLl92UGllY2VzQ2xvbmVzLmxlbmd0aCA+PSB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5xdWFudGl0eSkpIHtcclxuICAgICAgICBpZiAodGhpcy5sZXZlbCA+PSA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCd3aW4nLCB0cnVlLCB0cnVlLCB0aGlzLmxldmVsV2lucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dXaW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZW5kVGltZSkge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd1dpbi52aXNpYmxlID09PSBmYWxzZSAmJiB0aGlzLmxldmVsIDwgNSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy53aW5kb3dGYWlsLCB0aGlzLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd0ZhaWwudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnBhdXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxXaW5zIDw9IDEgJiYgdGhpcy5sZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy5mYWlsU3RhdGUsIHRoaXMud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxTdGF0ZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFdpbnMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3dpbicsIHRydWUsIHRydWUsIHRoaXMubGV2ZWxXaW5zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gUGxheVN0YXRlO1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbFBvc2l0aW9uQnlMdmwgKHBpZWNlLCBsZXZlbCwgaW5kZXgpIHtcclxuICAgIHZhciB2UG9zaXRpb25zSW5pdGlhbDtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAyfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogNCB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMn0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdlBvc2l0aW9uc0luaXRpYWxbaW5kZXggLSAxXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbFBvc2l0aW9uIChwaWVjZSwgbGV2ZWwsIGluZGV4KSB7XHJcbiAgICB2YXIgdlBvc2l0aW9uc0luaXRpYWw7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMn0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDcsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDcsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA3LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMiB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAyfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogMn0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiA2IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAyfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDcgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA4IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogOCB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNyB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2UG9zaXRpb25zSW5pdGlhbFtpbmRleCAtIDFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPZmZzZXRCeUx2bCAob2Zmc2V0LCBsZXZlbCkge1xyXG4gICAgdmFyIHggPSAwO1xyXG4gICAgdmFyIHkgPSAwO1xyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeSA9IC0ob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQgLyAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSAob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldDtcclxuICAgICAgICAgICAgeSA9IC0ob2Zmc2V0IC8gMiAtIDEwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gLW9mZnNldCAtIDMwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHkgPSAtKG9mZnNldCAvIDIpO1xyXG4gICAgICAgICAgICB4ID0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSAtb2Zmc2V0IC0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgaWYgKCFQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IC0ob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IDEwO1xyXG4gICAgICAgICAgICB5ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5ID0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgeCwgeSB9O1xyXG59XHJcbiIsImZ1bmN0aW9uIFR1dG9yaWFsU3RhdGUoKSB7XHJcblx0UGhhc2VyLlN0YXRlLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKiBAdHlwZSBQaGFzZXIuU3RhdGUgKi9cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUgPSAgT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUdXRvcmlhbFN0YXRlO1xyXG5cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICB0aGlzLnBvcHVwID0gbnVsbDtcclxufTtcclxuXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbG9hZFN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6ICc3ZW0gVGltZXMgUm9tYW4nLFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgbG9hZFRleHRZID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gMzAwIDogdGhpcy53b3JsZC5jZW50ZXJZO1xyXG4gICAgdmFyIGxvYWRUZXh0ID0gdGhpcy5hZGQudGV4dCgwLCAwLCAnJywgbG9hZFN0eWxlKTtcclxuICAgIGxvYWRUZXh0LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBsb2FkVGV4dFkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyO1xyXG4gICAgbG9hZFRleHQueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuICAgIGxvYWRUZXh0LmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIHZhciBsb2RpbmdCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDAsNTAwLDMwMCwzMCwxMCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmVuZEZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKGZ1bmN0aW9uKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpe1xyXG4gICAgICAgIGxvYWRUZXh0LnNldFRleHQocHJvZ3Jlc3MrJyUnKTtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2FkID0gcHJvZ3Jlc3MgKyAxOTQ7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuYmVnaW5GaWxsKCcweDJiM2Y2OCcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDMsNTAxLGxvYWQsMjcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmVuZEZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MScsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAxLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MicsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAyLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MycsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAzLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93NCcsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDA0LmpwZycpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cxJywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDAxLW1ibC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzInLCAnYXNzZXRzL3R1dG9yaWFsL21vYmlsZS92ZW50YW5hLXR1dG9yaWFsMDItbWJsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MycsICdhc3NldHMvdHV0b3JpYWwvbW9iaWxlL3ZlbnRhbmEtdHV0b3JpYWwwMy1tYmwuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3c0JywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDA0LW1ibC5qcGcnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0cmVldCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQnLCAnYXNzZXRzL3R1dG9yaWFsL25leHQuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Nsb3NlJywnYXNzZXRzL3R1dG9yaWFsL2Nsb3NlLmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdidXR0b24tcGxheScsJ2Fzc2V0cy90dXRvcmlhbC9idXR0b24tcGxheS5qcGcnKTtcclxuXHJcbn07XHJcblxyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnN0cmVldCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCdzdHJlZXQnKTtcclxuICAgIHRoaXMuc3RyZWV0LnNjYWxlLnNldFRvKDAuNyk7XHJcblxyXG4gICAgdmFyIHBvcHVwID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICd3aW5kb3cxJyk7XHJcbiAgICBpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgICAgIHBvcHVwLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMTU7XHJcbiAgICAgICAgcG9wdXAueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDIgKyAzMDtcclxuICAgICAgICBwb3B1cC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBwb3B1cC5zY2FsZS5zZXRUbygwLjcpIDogcG9wdXAuc2NhbGUuc2V0VG8oMC4yNik7XHJcbiAgICAgICAgcG9wdXAuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cdFx0XHRwb3B1cC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogIHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuXHRcdFx0cG9wdXAueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWSA6ICB0aGlzLndvcmxkLmNlbnRlclkgLyAyICsgNDA7XHJcblx0XHRcdHBvcHVwLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0XHRQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBwb3B1cC5zY2FsZS5zZXRUbygwLjI5KSA6IHBvcHVwLnNjYWxlLnNldCgwLjI5KTtcclxuXHRcdFx0cG9wdXAuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb2sgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQnKTtcclxuICAgIG9rLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0aWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuXHRcdFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IG9rLnNjYWxlLnNldCgxKSA6IG9rLnNjYWxlLnNldCgyKTtcclxuXHQgICAgb2suaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHQgICAgb2suaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblx0ICAgIHBvcHVwLmFkZENoaWxkKG9rKTtcclxuXHQgICAgb2sueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC5oZWlnaHQgLyAyKSA6IHBvcHVwLmhlaWdodCArIChwb3B1cC5oZWlnaHQgLyA2KTtcclxuXHQgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuXHRcdFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IG9rLnNjYWxlLnNldCgxLjIpIDogb2suc2NhbGUuc2V0KDIpO1xyXG5cdCAgICBvay5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cdCAgICBvay5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICBwb3B1cC5hZGRDaGlsZChvayk7XHJcblx0ICAgIG9rLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAocG9wdXAuaGVpZ2h0IC8gMikgOiBwb3B1cC5oZWlnaHQgKyAocG9wdXAuaGVpZ2h0IC8gMyk7XHJcblx0ICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xvc2UgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2Nsb3NlJyk7XHJcbmlmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBjbG9zZS5zY2FsZS5zZXQoMSkgOiBjbG9zZS5zY2FsZS5zZXQoMSk7XHJcbiAgICBjbG9zZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgY2xvc2UuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICBwb3B1cC5hZGRDaGlsZChjbG9zZSk7XHJcbiAgICBjbG9zZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC53aWR0aCAvIDIpICsgY2xvc2Uud2lkdGggOiBwb3B1cC53aWR0aCArIGNsb3NlLndpZHRoIC0gMjU7XHJcbiAgICBjbG9zZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gLXBvcHVwLmhlaWdodCAvIDIgOiAtcG9wdXAuaGVpZ2h0ICogMiArIGNsb3NlLmhlaWdodCAqIDIgLSBjbG9zZS5oZWlnaHQ7XHJcbn0gZWxzZXtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGNsb3NlLnNjYWxlLnNldCgyKSA6IGNsb3NlLnNjYWxlLnNldCgyKTtcclxuICAgIGNsb3NlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICBjbG9zZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHBvcHVwLmFkZENoaWxkKGNsb3NlKTtcclxuICAgIGNsb3NlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gKHBvcHVwLndpZHRoIC8gMikgKyBjbG9zZS53aWR0aCA6IHBvcHVwLndpZHRoICsgY2xvc2Uud2lkdGggLSAxNTtcclxuICAgIGNsb3NlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAtcG9wdXAuaGVpZ2h0IC8gMiA6IC1wb3B1cC5oZWlnaHQgKiAyICsgY2xvc2UuaGVpZ2h0ICogMiAtIGNsb3NlLmhlaWdodDtcclxufVxyXG5cclxuICAgIGNsb3NlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdQbGF5Jyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHZhciBnYW1lID0gdGhpcztcclxuICAgIG9rLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHV0b3JpYWxQYXJ0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5sb2FkVGV4dHVyZSgnd2luZG93MicsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLmxvYWRUZXh0dXJlKCd3aW5kb3czJywwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzQnLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSA0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNCA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSwgdGhpcyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFR1dG9yaWFsU3RhdGU7XHJcbiIsImZ1bmN0aW9uIFdpblN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcbldpblN0YXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLlN0YXRlLnByb3RvdHlwZSk7XHJcbldpblN0YXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFdpblN0YXRlO1xyXG5cclxuV2luU3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAobGV2ZWwpIHtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIG1zZ0V0aG5pY3MgPSBbXHJcbiAgICAgICAgICAgIFwiRXJlcyBmdWVydGUsIHBvZGVyb3NhIHkgbm9ibGUuIENhcmFjdGVyw61zdGljYXMgZGUgbG9zIHJleWVzIHkgZ29iZXJuYW50ZXMuXCIsXHJcbiAgICAgICAgICAgIFwiSGFzIGxvZ3JhZG8gZm9ydGFsZWNlciB0dSBlc3DDrXJpdHUgZGUgaW5kZXBlbmRlbmNpYSB5IGF2ZW50dXJhLlwiLFxyXG4gICAgICAgICAgICBcIlR1IHBlcnNldmVyYW5jaWEgZW4gbGEgbHVjaGEsIGFwb3J0YSBlbmVyZ8OtYSBleHRyYSBhIHRvZG9zIGxvcyB0dXlvcy4gXFxuIGxvZ3Jhc3RlIGNvbnF1aXN0YXIgbG9zIGVzcMOtcml0dXMgw6l0bmljb3MgcXVlIGF0cmFlbiB5IG1hbnRpZW5lbiBhbWlnb3MuXCIsXHJcbiAgICAgICAgICAgIFwiTG9zIGVzcMOtcml0dXMgw6l0bmljb3Mgbm9zIGRpY2VuIHF1ZSBlcmVzIGRlIGxhcyBxdWUgc2FsZW4gZGUgdG9kYXMgbGFzIGRpZmljdWx0YWRlcyBjb24gYXJ0ZSB5IGVsZWdhbmNpYS5cIixcclxuICAgICAgICAgICAgXCJWZXMgbGEgdmlkYSBkZXNkZSB1bmEgcGVyc3BlY3RpdmEgbcOhcyBzYWJpYSB5IGVsZXZhZGEuIFxcbiBoYXMgbG9ncmFkbyBjb21wcmVuZGVyIHR1IGRlc3Rpbm8geSBsb3MgY2ljbG9zIHZpdmlkb3MuXCJcclxuICAgICAgICBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbXNnRXRobmljcyA9IFtcclxuICAgICAgICAgICAgXCJFcmVzIGZ1ZXJ0ZSwgcG9kZXJvc2EgeSBub2JsZS4gXFxuIENhcmFjdGVyw61zdGljYXMgZGUgbG9zIHJleWVzIHkgZ29iZXJuYW50ZXMuXCIsXHJcbiAgICAgICAgICAgIFwiSGFzIGxvZ3JhZG8gZm9ydGFsZWNlciB0dSBlc3DDrXJpdHUgXFxuIGRlIGluZGVwZW5kZW5jaWEgeSBhdmVudHVyYS5cIixcclxuICAgICAgICAgICAgXCJUdSBwZXJzZXZlcmFuY2lhIGVuIGxhIGx1Y2hhLCBhcG9ydGEgIFxcbiBlbmVyZ8OtYSBleHRyYSBhIHRvZG9zIGxvcyB0dXlvcy4gXFxuIGxvZ3Jhc3RlIGNvbnF1aXN0YXIgbG9zIGVzcMOtcml0dXMgw6l0bmljb3MgXFxuIHF1ZSBhdHJhZW4geSBtYW50aWVuZW4gYW1pZ29zLlwiLFxyXG4gICAgICAgICAgICBcIkxvcyBlc3DDrXJpdHVzIMOpdG5pY29zIG5vcyBkaWNlbiBxdWUgIFxcbiBlcmVzIGRlIGxhcyBxdWUgc2FsZW4gZGUgdG9kYXMgXFxuIGxhcyBkaWZpY3VsdGFkZXMgY29uIGFydGUgeSBlbGVnYW5jaWEuXCIsXHJcbiAgICAgICAgICAgIFwiVmVzIGxhIHZpZGEgZGVzZGUgdW5hIHBlcnNwZWN0aXZhIG3DoXMgc2FiaWEgeSBlbGV2YWRhLiBcXG4gaGFzIGxvZ3JhZG8gY29tcHJlbmRlciB0dSBkZXN0aW5vIHkgbG9zIGNpY2xvcyB2aXZpZG9zLlwiXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGlzY291bnRPYmogPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNjb3VudDogMCwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiTmFkYVwiLCBcIk5hZGFcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAxNSwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiTcOhc2NhcmFzXCIsIFwiTWFkZXJhXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNjb3VudDogMjAsIHdvcmRzOiBbXHJcbiAgICAgICAgICAgICAgICBcIkZlc3Rlam9cIiwgXCJQbHVtYXNcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAyNSwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiTcO6c2ljYVwiLCBcIkluZGlvc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMubGV2ZWwgPSBwYXJzZUludChsZXZlbCk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmxldmVsKSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMTU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDIwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAyMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMjU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkaXNjb3VudE9iai5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZGlzY291bnRPYmpbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5kaXNjb3VudCA9PSB0aGlzLmRpc2NvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZCA9IGVsZW1lbnQud29yZHNbdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCAxKV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1zZyA9IG1zZ0V0aG5pY3NbdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCA0KV07XHJcbn07XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93JywnYXNzZXRzL3BvcHVwcy93aW5kb3ctd2luLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL2Jvb3QucG5nJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL21vYmlsZS9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93JywnYXNzZXRzL3BvcHVwcy9tb2JpbGUvd2luZG93V2luLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3N0b3JlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm9vdCcsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvYm9vdC5wbmcnKTtcclxuICAgIH1cclxufTtcclxuXHJcbldpblN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdiYWNrZ3JvdW5kJyk7XHJcbiAgdmFyIHdpbmRvdyA9IHRoaXMuYWRkLnNwcml0ZSgwLDAsJ3dpbmRvdycpO1xyXG4gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHdpbmRvdy5zY2FsZS5zZXQoMC43MykgOiB3aW5kb3cuc2NhbGUuc2V0KDAuMjksIDAuMjkxKTtcclxuICB3aW5kb3cueSA9IDA7XHJcbiAgd2luZG93LnggPSAwO1xyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBib25vU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcyZW0gQW1lcmljYW4gQm9sZCcsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGRpc2NvdW50U3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICc1ZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB3b3JLZXkgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICc1ZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBsZWdhbFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMi4yZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBib25vU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcxZW0gQW1lcmljYW4gQm9sZCcsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGRpc2NvdW50U3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICczZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB3b3JLZXkgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICczZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBsZWdhbFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMS4yZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5idG5Cb290ID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdib290Jyk7XHJcbiAgICB0aGlzLmJ0bkJvb3QueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDUwIDogKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIpICsgMTA7XHJcbiAgICB0aGlzLmJ0bkJvb3QueSA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgIHRoaXMuYnRuQm9vdC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNSkgOnRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC40KTtcclxuICAgIHRoaXMuYnRuQm9vdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5Cb290LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5Cb290LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdUdXRvcmlhbCcpO1xyXG4gICAgIH0sdGhpcyk7XHJcblxyXG4gICAgIHRoaXMuYnRuU3RvcmUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3N0b3JlJyk7XHJcbiAgICAgdGhpcy5idG5TdG9yZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDUwIDogMzU7XHJcbiAgICAgdGhpcy5idG5TdG9yZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDUwIDogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyAzMCAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICAgIHRoaXMuYnRuU3RvcmUuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/ICB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjUpIDogdGhpcy5idG5TdG9yZS5zY2FsZS5zZXQoMC40KTtcclxuICAgICB0aGlzLmJ0blN0b3JlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgdGhpcy5idG5TdG9yZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgdGhpcy5idG5TdG9yZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uID0gXCJodHRwczovL3d3dy5hbWVyaWNhbmluby5jb20vXCI7XHJcbiAgICAgfSx0aGlzKTtcclxuXHJcbiAgICB2YXIgZ2VuZXJhbFggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLndpZHRoIC8gMiA6IHRoaXMud29ybGQud2lkdGggLyA0ICsgMjA7XHJcbiAgICB2YXIgdGV4dGZpcnN0ID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsIGxlZ2FsU3R5bGUpO1xyXG4gICAgdGV4dGZpcnN0LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodCAvIDIuNSA6IHRoaXMud29ybGQuaGVpZ2h0IC8gNTtcclxuICAgIHRleHRmaXJzdC50ZXh0ID0gXCJMb2dyYXN0ZSBsaWJlcmFyIGEgbG9zIGVzcHJpdGl0dXMgZXRuaWNvcy5cIjtcclxuICAgIHRleHRmaXJzdC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuXHJcbiAgICB2YXIgZGlzY291bnRUZXh0ID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsZGlzY291bnRTdHlsZSk7XHJcbiAgICBkaXNjb3VudFRleHQueSA9IHRleHRmaXJzdC55ICsgZGlzY291bnRUZXh0LmhlaWdodCAvIDM7XHJcbiAgICBkaXNjb3VudFRleHQudGV4dCA9IHRoaXMuZGlzY291bnQrXCIlXCI7XHJcbiAgICBkaXNjb3VudFRleHQuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbiAgICB2YXIgdGV4dEJvbm8gPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyxib25vU3R5bGUpO1xyXG4gICAgdGV4dEJvbm8ueSA9IGRpc2NvdW50VGV4dC55ICsgdGV4dEJvbm8uaGVpZ2h0ICsgMTU7XHJcbiAgICB0ZXh0Qm9uby5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG4gICAgdGV4dEJvbm8udGV4dCA9IFwiUmVjaWJlIHVuIGJvbm8gZGUgZGVzY3VlbnRvIGVuIGN1YWxxdWllciBwcm9kdWN0byBkZSBudWVzdHJhcyB0aWVuZGFzLlwiO1xyXG5cclxuICAgIHZhciB3b3JkID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsd29yS2V5KTtcclxuICAgIHdvcmQueSA9ICB0ZXh0Qm9uby55ICsgd29yZC5oZWlnaHQgLyA0O1xyXG4gICAgd29yZC50ZXh0ID0gU3RyaW5nKHRoaXMud29yZCk7XHJcbiAgICB3b3JkLmFuY2hvci5zZXRUbygwLjUsMCk7XHJcblxyXG4gICAgdmFyIG1zZyA9IHRoaXMuYWRkLnRleHQoZ2VuZXJhbFgsIDAsICcnLGxlZ2FsU3R5bGUpO1xyXG4gICAgbXNnLnkgPSAgd29yZC55ICsgbXNnLmhlaWdodCArIDE1O1xyXG4gICAgbXNnLnRleHQgPSBTdHJpbmcodGhpcy5tc2cpO1xyXG4gICAgbXNnLmFuY2hvci5zZXRUbygwLjUsMCk7XHJcblxyXG59O1xyXG5cclxuV2luU3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdpblN0YXRlO1xyXG4iLCIvLyBQSEFTRVIgSVMgSU1QT1JURUQgQVMgQU4gRVhURVJOQUwgQlVORExFIElOIElOREVYLkhUTUxcclxuUGhhc2VyLkRldmljZS53aGVuUmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBQbGF5U3RhdGUgID0gcmVxdWlyZSgnLi9QbGF5U3RhdGUnKTtcclxuICB2YXIgV2luU3RhdGUgID0gcmVxdWlyZSgnLi9XaW5TdGF0ZScpO1xyXG4gIHZhciBUdXRvcmlhbFN0YXRlICA9IHJlcXVpcmUoJy4vVHV0b3JpYWxTdGF0ZScpO1xyXG5cclxuICBpZiAoIVBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgdmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoNjQwLCAxMTUyLCBQaGFzZXIuQVVUTywgJ2dhbWUnKTtcclxuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gMHgwMDAwMDA7XHJcblxyXG4gICAgZ2FtZS5zY2FsZS5zZXRNaW5NYXgoNjQwLCAxMTUyKTtcclxuICAgIGdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgIGdhbWUuc2NhbGUuZnVsbFNjcmVlblNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcblxyXG4gICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIGdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoMTE1MiwgNjQwLCBQaGFzZXIuQVVUTywgJ2dhbWUnKTtcclxuICAgIGdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gMHgwMDAwMDA7XHJcblxyXG4gICAgZ2FtZS5zY2FsZS5zZXRNaW5NYXgoMTE1MiwgNjQwKTtcclxuICAgIGdhbWUuc2NhbGUuc2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuICAgIGdhbWUuc2NhbGUuZnVsbFNjcmVlblNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcblxyXG4gICAgZ2FtZS5zY2FsZS5mb3JjZU9yaWVudGF0aW9uKGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ1BsYXknLCAgIFBsYXlTdGF0ZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3dpbicsICAgV2luU3RhdGUpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdUdXRvcmlhbCcsICAgVHV0b3JpYWxTdGF0ZSk7XHJcblxyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbn0pXHJcbiJdfQ==
