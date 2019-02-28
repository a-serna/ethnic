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

		var totemContainer = this.add.sprite(0, 0, 'totemContainer');
		if(Phaser.Device.desktop){
		totemContainer.scale.set(0.8);
		totemContainer.y = Phaser.Device.desktop ? this.world.centerY : this.world.centerY / 2 + 30;
		totemContainer.x = Phaser.Device.desktop ? this.world.centerX : this.world.centerX / 2 + 30;
		totemContainer.anchor.setTo(0.5);
		}
		else{
			totemContainer.scale.set(0.5);
			totemContainer.y = Phaser.Device.desktop ? this.world.centerY : this.world.centerY / 2 + 30;
			totemContainer.x = Phaser.Device.desktop ? this.world.centerX : this.world.centerX / 2 + 30;
			totemContainer.anchor.setTo(0.5);
		}

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
        piece.alpha = 0;
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
                { x: piece.width * 2.3, y: piece.height },
                { x: piece.width * 3.3, y: piece.height },
                { x: piece.width * 2.3, y: piece.height * 2 },
                { x: piece.width * 3.3, y: piece.height * 2 },
            ];
        } else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 2.3, y: piece.height },
                { x: piece.width * 3.3, y: piece.height },
                { x: piece.width * 2.3, y: piece.height * 2 },
                { x: piece.width * 3.3, y: piece.height * 2 },
                { x: piece.width * 2.3, y: piece.height * 3 },
                { x: piece.width * 3.3, y: piece.height * 3 },
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 4.5, y: piece.height },
                { x: piece.width * 5.5, y: piece.height },
                { x: piece.width * 4.5, y: piece.height * 2},
                { x: piece.width * 5.5, y: piece.height * 2 },
                { x: piece.width * 4.5, y: piece.height * 3 },
                { x: piece.width * 5.5, y: piece.height * 3 },
                { x: piece.width * 4.5, y: piece.height * 4 },
                { x: piece.width * 5.5, y: piece.height * 4 }
            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 3.1, y: piece.height },
                { x: piece.width * 4.1, y: piece.height },
                { x: piece.width * 5.1, y: piece.height },
                { x: piece.width * 3.1, y: piece.height * 2 },
                { x: piece.width * 4.1, y: piece.height * 2 },
                { x: piece.width * 5.1, y: piece.height * 2 },
                { x: piece.width * 3.1, y: piece.height * 3 },
                { x: piece.width * 4.1, y: piece.height * 3 },
                { x: piece.width * 5.1, y: piece.height * 3 },
            ];
        } else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 5.3, y: piece.height },
                { x: piece.width * 6.3, y: piece.height },
                { x: piece.width * 5.3, y: piece.height * 2 },
                { x: piece.width * 6.3, y: piece.height * 2 },
                { x: piece.width * 5.3, y: piece.height * 3 },
                { x: piece.width * 6.3, y: piece.height * 3 },
                { x: piece.width * 5.3, y: piece.height * 4 },
                { x: piece.width * 6.3, y: piece.height * 4 },
                { x: piece.width * 5.3, y: piece.height * 5 },
                { x: piece.width * 6.3, y: piece.height * 5 },
                { x: piece.width * 5.3, y: piece.height * 6 },
                { x: piece.width * 6.3, y: piece.height * 6 },
            ];
        }
    } else {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width * 1.4, y: piece.height * 2.35 },
                { x: piece.width * 2.4, y: piece.height * 2.35 },
                { x: piece.width * 1.4, y: piece.height * 3.35 },
                { x: piece.width * 2.4, y: piece.height * 3.35 },
            ];
        } else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 2.4, y: piece.height * 3 },
                { x: piece.width * 3.4, y: piece.height * 3 },
                { x: piece.width * 2.4, y: piece.height * 4 },
                { x: piece.width * 3.4, y: piece.height * 4 },
                { x: piece.width * 2.4, y: piece.height * 5 },
                { x: piece.width * 3.4, y: piece.height * 5 }
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 3.5, y: piece.height * 2.3 },
                { x: piece.width * 4.5, y: piece.height * 2.3 },
                { x: piece.width * 3.5, y: piece.height * 3.3 },
                { x: piece.width * 4.5, y: piece.height * 3.3 },
                { x: piece.width * 3.5, y: piece.height * 4.3 },
                { x: piece.width * 4.5, y: piece.height * 4.3 },
                { x: piece.width * 3.5, y: piece.height * 5.3 },
                { x: piece.width * 4.5, y: piece.height * 5.3 }
            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 4, y: piece.height * 3 },

                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height * 4 },
                { x: piece.width * 4, y: piece.height * 4 },

                { x: piece.width * 2, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 4, y: piece.height * 5 },
            ];
        } else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 2.6, y: piece.height * 2.8 },
                { x: piece.width * 3.6, y: piece.height * 2.8 },

                { x: piece.width * 2.6, y: piece.height * 3.8 },
                { x: piece.width * 3.6, y: piece.height * 3.8 },

                { x: piece.width * 2.6, y: piece.height * 4.8 },
                { x: piece.width * 3.6, y: piece.height * 4.8 },

                { x: piece.width * 2.6, y: piece.height * 5.8 },
                { x: piece.width * 3.6, y: piece.height * 5.8 },

                { x: piece.width * 2.6, y: piece.height * 6.8 },
                { x: piece.width * 3.6, y: piece.height * 6.8 },

                { x: piece.width * 2.6, y: piece.height * 7.8 },
                { x: piece.width * 3.6, y: piece.height * 7.8 },
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
                { x: piece.width * 4.5, y: piece.height * 2 },
                { x: piece.width, y: piece.height },
                { x: piece.width, y: piece.height * 2 },
                { x: piece.width * 4.5, y: piece.height },

            ];
        }  else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 5, y: piece.height * 3 },
                { x: piece.width * 5, y: piece.height },
                { x: piece.width * 5, y: piece.height * 2 },
                { x: piece.width, y: piece.height * 3 },
                { x: piece.width, y: piece.height },
                { x: piece.width, y: piece.height * 2 },
            ];
        } else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 2},
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 8, y: piece.height },
                { x: piece.width * 8, y: piece.height * 3 },
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 2, y: piece.height * 4 },
                { x: piece.width * 8, y: piece.height * 2 },
                { x: piece.width * 8, y: piece.height * 4 }
            ];
        }  else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 3 },
                { x: piece.width * 6, y: piece.height * 2 },
                { x: piece.width * 6, y: piece.height * 3 },
                { x: piece.width * 7, y: piece.height * 2 },
                { x: piece.width * 7, y: piece.height * 3 },
                { x: piece.width * 2, y: piece.height * 2 },
                { x: piece.width * 2, y: piece.height * 1 },
                { x: piece.width * 6, y: piece.height },
                { x: piece.width * 2, y: piece.height }

            ];
        }  else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 8, y: piece.height * 4 },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 3, y: piece.height * 2 },
                { x: piece.width * 8, y: piece.height },
                { x: piece.width * 8, y: piece.height * 2 },
                { x: piece.width * 3, y: piece.height * 3 },
                { x: piece.width * 3, y: piece.height * 6 },
                { x: piece.width * 8, y: piece.height * 3 },
                { x: piece.width * 8, y: piece.height * 6 },
                { x: piece.width * 3, y: piece.height * 5 },
                { x: piece.width * 8, y: piece.height * 5 },
                { x: piece.width * 3, y: piece.height * 4 }

            ];
        }
    } else {
        if (level === 1) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 5 },
                { x: piece.width, y: piece.height },
                { x: piece.width, y: piece.height * 5 },
                { x: piece.width * 2, y: piece.height },

            ];
        }  else if (level === 2) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 4, y: piece.height * 6.5 },
                { x: piece.width * 2, y: piece.height * 6.5 },
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 3, y: piece.height * 6.5 },
                { x: piece.width * 4, y: piece.height }

            ];
        }  else if (level === 3) {
            vPositionsInitial = [
                { x: piece.width * 3, y: piece.height },
                { x: piece.width * 4, y: piece.height },
                { x: piece.width * 5, y: piece.height  },
                { x: piece.width * 3, y: piece.height * 6.5 },
                { x: piece.width * 6, y: piece.height  },
                { x: piece.width * 6, y: piece.height * 4 },
                { x: piece.width * 6, y: piece.height * 6.5 },
                { x: piece.width * 4, y: piece.height * 6.5 }

            ];
        } else if (level === 4) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height * 1.5 },
                { x: piece.width * 5, y: piece.height * 4 },
                { x: piece.width * 5, y: piece.height * 1.5 },
                { x: piece.width * 3.5, y: piece.height * 1.5 },
                { x: piece.width * 5, y: piece.height * 5 },
                { x: piece.width * 5, y: piece.height * 7 },
                { x: piece.width * 1.5, y: piece.height * 7 },
                { x: piece.width * 4, y: piece.height * 7 },
                { x: piece.width * 3.5, y: piece.height * 7 }

            ];
        }  else if (level === 5) {
            vPositionsInitial = [
                { x: piece.width * 2, y: piece.height },
                { x: piece.width * 6, y: piece.height },
                { x: piece.width * 4, y: piece.height },

                { x: piece.width * 6, y: piece.height * 3 },
                { x: piece.width * 6, y: piece.height * 5 },
                { x: piece.width * 6, y: piece.height * 7 },
                { x: piece.width * 6, y: piece.height * 9 },

                { x: piece.width * 4, y: piece.height * 9 },
                { x: piece.width * 2, y: piece.height * 9 },
                { x: piece.width * 3, y: piece.height * 11 },
                { x: piece.width * 4, y: piece.height * 8 },

                { x: piece.width * 2, y: piece.height * 8 }
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
            x = (offset / 6);
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
			Phaser.Device.desktop ? popup.scale.setTo(0.3) : popup.scale.set(0.3);
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

    var close = this.add.sprite(325, 20, 'close');
if(Phaser.Device.desktop){
    Phaser.Device.desktop ? close.scale.set(1) : close.scale.set(1);
    close.inputEnabled = true;
    close.input.useHandCursor = true;
    popup.addChild(close);
    close.x =  Phaser.Device.desktop ? (popup.width / 2) + close.width : popup.width + close.width - 25;
    close.y = Phaser.Device.desktop ? -popup.height / 2 : -popup.height * 2 + close.height * 2 - close.height;
} else{
    Phaser.Device.desktop ? close.scale.set(0.5) : close.scale.set(0.5);
		close.inputEnabled = true;
    close.input.useHandCursor = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2x1aXNzZXJuYS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9waGFzZXItbm9kZS1raXQvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImJ1aWxkL2pzL1BsYXlTdGF0ZS5qcyIsImJ1aWxkL2pzL1R1dG9yaWFsU3RhdGUuanMiLCJidWlsZC9qcy9XaW5TdGF0ZS5qcyIsImJ1aWxkL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gUGxheVN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TdGF0ZS5wcm90b3R5cGUpO1xyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGxheVN0YXRlO1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTXV0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDMxO1xyXG4gICAgdGhpcy5sZXZlbFdpbnMgPSAxO1xyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudG90YWxUaW1lID0gMzE7XHJcbiAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuXHJcbiAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzID0gW1xyXG4gICAgICAgICAgICB7IGxldmVsOiAxLCBxdWFudGl0eTogNCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAyLCBxdWFudGl0eTogNiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAzLCBxdWFudGl0eTogOCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC41LCB5OiAwLjUgfSAgfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogNCwgcXVhbnRpdHk6IDkgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNiwgeTogMC42IH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDUsIHF1YW50aXR5OiAxMiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAwLjcsIHk6IDAuNyB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNSwgeTogMC41IH0gIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGVtTGV2ZWxTY2FsZSA9IHsgeDogMC44LCB5OiAwLjggfTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXJTY2FsZSA9IHsgeDogMC42LCB5OiAwLjYgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVscyA9IFtcclxuICAgICAgICAgICAgeyBsZXZlbDogMSwgcXVhbnRpdHk6IDQgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMiwgcXVhbnRpdHk6IDYgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMywgcXVhbnRpdHk6IDggLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDQsIHF1YW50aXR5OiA5ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9ICB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiA1LCBxdWFudGl0eTogMTIgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMC4zNSwgeTogMC4zNSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGVtTGV2ZWxTY2FsZSA9IHsgeDogMC44LCB5OiAwLjggfTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXJTY2FsZSA9IHsgeDogMC42LCB5OiAwLjMgfTtcclxuICAgIH1cclxuXHJcbiAgdGhpcy5fdlBpZWNlc1B1enpsZSA9IFtdO1xyXG4gIHRoaXMuX3ZQaWVjZXNDbG9uZXMgPSBbXTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzdlbSBUaW1lcyBSb21hbicsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIHZhciBsb2FkVGV4dFkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAzMDAgOiB0aGlzLndvcmxkLmNlbnRlclk7XHJcbiAgICB2YXIgbG9hZFRleHQgPSB0aGlzLmFkZC50ZXh0KDAsIDAsICcnLCBsb2FkU3R5bGUpO1xyXG4gICAgbG9hZFRleHQueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGxvYWRUZXh0WSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDI7XHJcbiAgICBsb2FkVGV4dC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDMwO1xyXG4gICAgbG9hZFRleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgdmFyIGxvZGluZ0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICBsb2RpbmdCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMCw1MDAsMzAwLDMwLDEwKTtcclxuICAgICAgICBsb2RpbmdCYXIuZW5kRmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQoZnVuY3Rpb24ocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcyl7XHJcbiAgICAgICAgbG9hZFRleHQuc2V0VGV4dChwcm9ncmVzcysnJScpO1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgdmFyIGxvYWQgPSBwcm9ncmVzcyArIDE5NDtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5iZWdpbkZpbGwoJzB4MmIzZjY4JywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMyw1MDEsbG9hZCwyNywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZW5kRmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIC8vIHBpZWNlc1xyXG4gICAgLy8gcHV6emxlIDFcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtNC5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgMlxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0xLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0yLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0zLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi00LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi02JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi02LnBuZycpO1xyXG5cclxuICAgIC8vIHB1enpsZSAzXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTYucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTcnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTcucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTgnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTgucG5nJyk7XHJcblxyXG4gICAgLy8gcHV6emxlIDRcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtOCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtOC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtOScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtOS5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgNVxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTAzLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA2LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS03JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtOCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDgucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTknLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA5LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xMCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMTAucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTExJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0xMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTEyLnBuZycpO1xyXG5cclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL2JhY2tncm91bmQvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhcicsJ2Fzc2V0cy9iYXIvYmFyLXdoaXRlLmpwZycpO1xyXG5cclxuICAgICAgICAvLyBpdGVtcyBsZXZlbHNcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAxLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAyLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAzLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDA0LW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDA1LW9mZi5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGl0ZW1zIGxldmVsc1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDEtb24ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMi1vbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAzLW9uLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDQtb24ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNS1vbi5wbmcnKTtcclxuXHJcbiAgICAgICAgLy9iYWNrZ3JvdW5kIHRvdGVtXHJcblx0XHRcdFx0dGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnLi9hc3NldHMvYnV0dG9ucy9zb3VuZC5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ211dGUnLCAnLi9hc3NldHMvYnV0dG9ucy9tdXRlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGF1c2UnLCAnLi9hc3NldHMvYnV0dG9ucy9wYXVzZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnLi9hc3NldHMvYnV0dG9ucy9wbGF5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd1dpbicsICdhc3NldHMvcG9wdXBzL3BvcHVwc1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd0ZhaWwnLCAnYXNzZXRzL3BvcHVwcy9wb3B1cHNGYWlsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbmV4dC1sZXZlbCcsICdhc3NldHMvYnV0dG9ucy9uZXh0LWxldmVsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncmVwbHknLCAnYXNzZXRzL2J1dHRvbnMvcmVwbHkuanBnJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL2Jvb3QucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdmYWlsLXBvcHVwJywgJ2Fzc2V0cy9wb3B1cHMvZmFpbFdpbmRvd3MuanBnJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL21vYmlsZS9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFyJywnYXNzZXRzL2Jhci9tb2JpbGUvYmFyLXdoaXRlLmpwZycpO1xyXG5cclxuICAgICAgICAvLyBpdGVtcyBsZXZlbHNcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMS1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0Mi1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDItb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDMtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAzLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwNC1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDUtb2ZmLnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAxLW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDItb24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMy1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA0LW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDUtb24ucG5nJyk7XHJcblxyXG5cclxuICAgICAgICAvL2JhY2tncm91bmQgdG90ZW1zXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuXHJcbiAgICAgICAgIC8vIGJ1dHRvbnNcclxuICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzb3VuZCcsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvc291bmQucG5nJyk7XHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbXV0ZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvbXV0ZS5wbmcnKTtcclxuICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvcGF1c2UucG5nJyk7XHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGxheScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvcGxheS5wbmcnKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93V2luJywgJ2Fzc2V0cy9wb3B1cHMvbW9iaWxlL3BvcHVwc1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd0ZhaWwnLCAnYXNzZXRzL3BvcHVwcy9tb2JpbGUvcG9wdXBzRmFpbC5qcGcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCduZXh0LWxldmVsJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9uZXh0LWxldmVsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncmVwbHknLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3JlcGx5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9zdG9yZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Jvb3QnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL2Jvb3QucG5nJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1wb3B1cCcsICdhc3NldHMvcG9wdXBzL21vYmlsZS9mYWlsV2luZG93LmpwZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMicsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMycsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNCcsICdhc3NldHMvbXVzaWMvVHJpYmFsMy5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvbnQgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAnM2VtIEFtZXJpY2FuJyA6ICczZW0gQW1lcmljYW4nO1xyXG4gICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6IGZvbnQsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2JhY2tncm91bmQnKTtcclxuXHJcblx0XHR2YXIgdG90ZW1Db250YWluZXIgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3RvdGVtQ29udGFpbmVyJyk7XHJcblx0XHRpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG5cdFx0dG90ZW1Db250YWluZXIuc2NhbGUuc2V0KDAuOCk7XHJcblx0XHR0b3RlbUNvbnRhaW5lci55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMiArIDMwO1xyXG5cdFx0dG90ZW1Db250YWluZXIueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuXHRcdHRvdGVtQ29udGFpbmVyLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dG90ZW1Db250YWluZXIuc2NhbGUuc2V0KDAuNSk7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyICsgMzA7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0fVxyXG5cclxuICAgIHRoaXMuYmFyID0gdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2JhcicpO1xyXG4gICAgdGhpcy5iYXIuYW5jaG9yLnNldFRvKDApO1xyXG4gICAgdGhpcy5iYXIuc2NhbGUuc2V0VG8odGhpcy5iYXJTY2FsZS54LCB0aGlzLmJhclNjYWxlLnkpO1xyXG4gICAgdGhpcy5sZXZlbCA9IDE7XHJcblxyXG4gICAgdGhpcy5hdWRpbyA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnc291bmQnKTtcclxuICAgIHRoaXMuYXVkaW8uYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5hdWRpby5zY2FsZS5zZXQoMSkgOiB0aGlzLmF1ZGlvLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5hdWRpby54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIHRoaXMuYXVkaW8ud2lkdGggOiB0aGlzLmdhbWUud29ybGQud2lkdGggLyAyO1xyXG4gICAgdGhpcy5hdWRpby55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5iYXIuaGVpZ2h0IC8gMiA6IHRoaXMuYXVkaW8uaGVpZ2h0IC8gMjtcclxuXHJcbiAgICB0aGlzLnBhdXNlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdwYXVzZScpO1xyXG4gICAgdGhpcy5wYXVzZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLnBhdXNlLnNjYWxlLnNldCgxKSA6IHRoaXMucGF1c2Uuc2NhbGUuc2V0KDAuNCk7XHJcbiAgICB0aGlzLnBhdXNlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gdGhpcy5wYXVzZS53aWR0aCAtIHRoaXMuYXVkaW8ud2lkdGggLSAyMCA6ICh0aGlzLmdhbWUud29ybGQud2lkdGggLyAyKSAtIHRoaXMuYXVkaW8ud2lkdGggLSAxMDtcclxuICAgIHRoaXMucGF1c2UueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYmFyLmhlaWdodCAvIDIgOiB0aGlzLnBhdXNlLmhlaWdodCAvIDI7XHJcblxyXG5cclxuICAgIHRoaXMuYXVkaW8uaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYXVkaW8uaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmF1ZGlvLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5hdWRpby5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIoKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdGhpcy5wYXVzZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXVzZS5pbnB1dC5waXhlbFBlcmZlY3RPdmVyID0gdHJ1ZTtcclxuICAgIHRoaXMucGF1c2UuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLnBhdXNlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnBhdXNlTWFuYWdlcigpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLl92VG90ZW1zTGV2ZWxzID0gW107XHJcbiAgICB0aGlzLl92VHJpYmFsTXVzaWNzID0gW107XHJcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5iYXIuaGVpZ2h0ICsgMTA7XHJcblxyXG4gICAgdmFyIGxldmVsID0gdGhpcy5hZGQudGV4dCg1MCwgMCwgJ05pdmVsJywgc3R5bGUpO1xyXG4gICAgbGV2ZWwuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBsZXZlbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5iYXIuaGVpZ2h0IC8gMiA6IGxldmVsLmhlaWdodCAvIDI7XHJcblxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8PSA1OyBpbmRleCsrKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBTdHJpbmcoJ3QnICsgaW5kZXgpICsgJy1vZmYnO1xyXG4gICAgICAgIHZhciB0cmliYWxNdXNpYyA9IHRoaXMuYWRkLmF1ZGlvKFN0cmluZygndHJpYmFsJyArIGluZGV4KSk7XHJcbiAgICAgICAgdHJpYmFsTXVzaWMubG9vcCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciB0b3RlbUxldmVsID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsIG5hbWUpO1xyXG4gICAgICAgIHRvdGVtTGV2ZWwuYW5jaG9yLnNldFRvKDAuNSwgMCk7XHJcbiAgICAgICAgdG90ZW1MZXZlbC5zY2FsZS5zZXRUbyh0aGlzLnRvdGVtTGV2ZWxTY2FsZS54LCAgdGhpcy50b3RlbUxldmVsU2NhbGUueSk7XHJcblxyXG4gICAgICAgIHRvdGVtTGV2ZWwueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDUwIDogMzI7XHJcbiAgICAgICAgdG90ZW1MZXZlbC55ID0gb2Zmc2V0O1xyXG5cclxuICAgICAgICBvZmZzZXQgKz0gdG90ZW1MZXZlbC5oZWlnaHQgKyAxMDtcclxuXHJcbiAgICAgICAgdGhpcy5fdlRvdGVtc0xldmVscy5wdXNoKHRvdGVtTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX3ZUcmliYWxNdXNpY3MucHVzaCh0cmliYWxNdXNpYyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdlRyaWJhbE11c2ljc1t0aGlzLmxldmVsIC0gMV0ucGxheSgpO1xyXG4gICAgdGhpcy5jcmVhdGVUaW1lcigpO1xyXG5cclxuICAgIHZhciBnYW1lID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnRvdGFsVGltZSA9IDMxO1xyXG4gICAgdGhpcy50aW1lRWxhcHNlZCA9IDA7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy50aW1lciA9ICB0aGlzLnRpbWUuZXZlbnRzLmxvb3AoMTAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZ2FtZS5jaGVja1RpbWUoKTtcclxuICAgICAgICB0aGlzLmNvdW50ZXIrKztcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlUGllY2VzKCk7XHJcblxyXG4gICB0aGlzLmJ0bkJvb3QgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2Jvb3QnKTtcclxuICAgdGhpcy5idG5Cb290LnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQud2lkdGggLSA1MCA6ICh0aGlzLmdhbWUud29ybGQud2lkdGggLyAyKSArIDEwO1xyXG4gICB0aGlzLmJ0bkJvb3QueSA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgdGhpcy5idG5Cb290LmFuY2hvci5zZXQoMC41KTtcclxuICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5idG5Cb290LnNjYWxlLnNldCgwLjUpIDp0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNCk7XHJcbiAgIHRoaXMuYnRuQm9vdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICB0aGlzLmJ0bkJvb3QuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgIHRoaXMuYnRuQm9vdC5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdUdXRvcmlhbCcpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJ0blN0b3JlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdzdG9yZScpO1xyXG4gICAgdGhpcy5idG5TdG9yZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDUwIDogMzU7XHJcbiAgICB0aGlzLmJ0blN0b3JlLnkgPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDUwIDogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyAzMC8qIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyIC0gMzAgKi87XHJcbiAgICB0aGlzLmJ0blN0b3JlLmFuY2hvci5zZXQoMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/ICB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjUpIDogdGhpcy5idG5TdG9yZS5zY2FsZS5zZXQoMC40KTtcclxuICAgIHRoaXMuYnRuU3RvcmUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYnRuU3RvcmUuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5idG5TdG9yZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSBcImh0dHBzOi8vd3d3LmFtZXJpY2FuaW5vLmNvbS9cIjtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdGhpcy53aW5kb3dXaW4gPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3dpbmRvd1dpbicpO1xyXG4gICAgdGhpcy53aW5kb3dXaW4ueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQud2lkdGgvMiA6IHRoaXMud29ybGQud2lkdGgvNCArIDIwO1xyXG4gICAgdGhpcy53aW5kb3dXaW4ueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuaGVpZ2h0LzIgOiB0aGlzLndvcmxkLmhlaWdodC80ICsgMzA7XHJcbiAgICB0aGlzLndpbmRvd1dpbi5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud2luZG93V2luLnNjYWxlLnNldFRvKDAuNSkgOiB0aGlzLndpbmRvd1dpbi5zY2FsZS5zZXRUbygwLjg3LCAwLjkpO1xyXG4gICAgdGhpcy53aW5kb3dXaW4udmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBuZXh0TGV2ZWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQtbGV2ZWwnKTtcclxuICAgIG5leHRMZXZlbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dXaW4uaGVpZ2h0IC8gMiArIHRoaXMud2luZG93V2luLmhlaWdodCAvIDQgIC0gbmV4dExldmVsLmhlaWdodCA6ICh0aGlzLndpbmRvd1dpbi5oZWlnaHQgLyA0ICkgKyBuZXh0TGV2ZWwuaGVpZ2h0IDtcclxuICAgIG5leHRMZXZlbC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBuZXh0TGV2ZWwuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIG5leHRMZXZlbC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMud2luZG93V2luLmFkZENoaWxkKG5leHRMZXZlbCk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICAgbmV4dExldmVsLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBnYW1lLndpbmRvd1dpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZ2FtZS5yZXN0b3JlUHV6emxlKCk7XHJcbiAgICAgICAgZ2FtZS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGdhbWUudG90YWxUaW1lID0gMzE7XHJcbiAgICAgICAgZ2FtZS50aW1lRWxhcHNlZCA9IDA7XHJcbiAgICAgICAgZ2FtZS5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgZ2FtZS5sZXZlbFdpbnMrKztcclxuICAgICAgICBnYW1lLnRpbWVyLnRpbWVyLnJlc3VtZSgpO1xyXG4gICAgICAgIGdhbWUud29ybGQuYWRkQ2hpbGRBdChnYW1lLndpbmRvd1dpbiwgZ2FtZS53b3JsZC5jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdGhpcy53aW5kb3dGYWlsID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICd3aW5kb3dGYWlsJyk7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQud2lkdGgvMiA6IHRoaXMud29ybGQud2lkdGgvNCArIDIwO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodC8yIDogdGhpcy53b3JsZC5oZWlnaHQvNCArIDMwO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dGYWlsLnNjYWxlLnNldFRvKDAuNSkgOiB0aGlzLndpbmRvd0ZhaWwuc2NhbGUuc2V0VG8oMC44NywgMC45KTtcclxuICAgIHRoaXMud2luZG93RmFpbC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgdmFyIHJlcGx5ID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICduZXh0LWxldmVsJyk7XHJcbiAgICByZXBseS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDIgKyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCAgLSByZXBseS5oZWlnaHQgOiAodGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDQgKSArIHJlcGx5LmhlaWdodCAvIDIgO1xyXG4gICAgcmVwbHkuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgcmVwbHkuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHJlcGx5LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMud2luZG93RmFpbC5hZGRDaGlsZChyZXBseSk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICAgcmVwbHkuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMud2luZG93RmFpbC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXN0b3JlUHV6emxlKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gMzE7XHJcbiAgICAgICAgdGhpcy50aW1lRWxhcHNlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDMxO1xyXG4gICAgICAgIGdhbWUudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgdGhpcy5mYWlsU3RhdGUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2ZhaWwtcG9wdXAnKTtcclxuICAgdGhpcy5mYWlsU3RhdGUueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQud2lkdGgvMiA6IHRoaXMud29ybGQud2lkdGgvNCArIDIwO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQvMiA6IHRoaXMud29ybGQuaGVpZ2h0LzQgKyAzMDtcclxuICAgdGhpcy5mYWlsU3RhdGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgP3RoaXMuZmFpbFN0YXRlLnNjYWxlLnNldFRvKDAuNSkgOnRoaXMuZmFpbFN0YXRlLnNjYWxlLnNldFRvKDAuMyk7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG5cclxuICAgdmFyIHJlcGx5TGV2ZWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3JlcGx5Jyk7XHJcbiAgIHJlcGx5TGV2ZWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyAyICsgdGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDQgIC0gcmVwbHlMZXZlbC5oZWlnaHQgOiAodGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDQgKSArIHJlcGx5TGV2ZWwuaGVpZ2h0IDtcclxuICAgcmVwbHlMZXZlbC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/ICByZXBseUxldmVsLnNjYWxlLnNldCgxKSA6IHJlcGx5TGV2ZWwuc2NhbGUuc2V0KDEpO1xyXG4gICByZXBseUxldmVsLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgIHJlcGx5TGV2ZWwuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblxyXG4gICB0aGlzLmZhaWxTdGF0ZS5hZGRDaGlsZChyZXBseUxldmVsKTtcclxuXHJcbiAgIHZhciBnYW1lID0gdGhpcztcclxuICAgcmVwbHlMZXZlbC5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2FtZS5mYWlsU3RhdGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGdhbWUuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICBnYW1lLnRvdGFsVGltZSA9IDMxO1xyXG4gICAgICAgIGdhbWUudGltZUVsYXBzZWQgPSAwO1xyXG4gICAgICAgIGdhbWUuY3VycmVudFRpbWUgPSAzMTtcclxuICAgICAgICBnYW1lLmdhbWUuc3RhdGUucmVzdGFydCgpO1xyXG4gICAgICAgIGdhbWUudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgIH0sdGhpcyk7XHJcbiB9O1xyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUuYXVkaW9NYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuaXNNdXRlKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5sb2FkVGV4dHVyZSgnbXV0ZScsMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNvdW5kLm11dGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ubG9hZFRleHR1cmUoJ3NvdW5kJywwKTtcclxuICAgICAgICB0aGlzLmdhbWUuc291bmQubXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY2hlY2tUaW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHZhciB0aW1lRGlmZmVyZW5jZSA9IHRoaXMuc3RhcnRUaW1lLmdldFRpbWUoKSAtIGN1cnJlbnRUaW1lLmdldFRpbWUoKTtcclxuXHJcbiAgICAvL1RpbWUgZWxhcHNlZCBpbiBzZWNvbmRzXHJcbiAgICB0aGlzLnRpbWVFbGFwc2VkID0gTWF0aC5hYnModGltZURpZmZlcmVuY2UgLyAxMDAwKTtcclxuXHJcbiAgICAvL1RpbWUgcmVtYWluaW5nIGluIHNlY29uZHNcclxuICAgIHZhciB0aW1lUmVtYWluaW5nID0gdGhpcy50b3RhbFRpbWUgLSB0aGlzLnRpbWVFbGFwc2VkO1xyXG5cclxuICAgIC8vQ29udmVydCBzZWNvbmRzIGludG8gbWludXRlcyBhbmQgc2Vjb25kc1xyXG4gICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWVSZW1haW5pbmcgLyA2MCk7XHJcbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZykgLSAoNjAgKiBtaW51dGVzKTtcclxuICAgIHRoaXMuY3VycmVudFRpbWUgPSBzZWNvbmRzO1xyXG5cclxuICAgIC8vRGlzcGxheSBtaW51dGVzLCBhZGQgYSAwIHRvIHRoZSBzdGFydCBpZiBsZXNzIHRoYW4gMTBcclxuICAgIHZhciByZXN1bHQgPSAobWludXRlcyA8IDEwKSA/IFwiMFwiICsgbWludXRlcyA6IG1pbnV0ZXM7XHJcblxyXG4gICAgLy9EaXNwbGF5IHNlY29uZHMsIGFkZCBhIDAgdG8gdGhlIHN0YXJ0IGlmIGxlc3MgdGhhbiAxMFxyXG4gICAgcmVzdWx0ICs9IChzZWNvbmRzIDwgMTApID8gXCI6MFwiICsgc2Vjb25kcyA6IFwiOlwiICsgc2Vjb25kcztcclxuXHJcbiAgICBpZiAobWludXRlcyA8IDApIHtcclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50aW1lTGFiZWwudGV4dCA9IHJlc3VsdDtcclxufVxyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5wYXVzZU1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5pc1BhdXNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZS5sb2FkVGV4dHVyZSgncGxheScsIDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSB0aGlzLmlzUGF1c2U7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXVzZS5sb2FkVGV4dHVyZSgncGF1c2UnLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWUucGF1c2VkID0gdGhpcy5pc1BhdXNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnJlc3VtZSgpO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5jcmVhdGVUaW1lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGltZUxhYmVsID0gdGhpcy5nYW1lLmFkZC50ZXh0KDAsIDAsIFwiMDA6MDBcIiwge2ZvbnQ6IFwiNGVtIEFtZXJpY2FuIGJvbGRcIixmaWxsOiBcIiMyYjNmNjhcIn0pO1xyXG4gICAgdGhpcy50aW1lTGFiZWwuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgIHRoaXMudGltZUxhYmVsLmFsaWduID0gJ2NlbnRlcic7XHJcblxyXG5cclxuICAgIHRoaXMudGltZUxhYmVsLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQud2lkdGggLyAyICsgdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNCA6ICB0aGlzLmdhbWUud29ybGQud2lkdGggLyAyIC0gdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gNCArIHRoaXMudGltZUxhYmVsLmhlaWdodCAvIDI7XHJcbiAgICB0aGlzLnRpbWVMYWJlbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5iYXIuaGVpZ2h0IC8gMiA6IHRoaXMudGltZUxhYmVsLmhlaWdodCAvIDI7XHJcbn1cclxuXHJcbiBQbGF5U3RhdGUucHJvdG90eXBlLnJlc3RvcmVQdXp6bGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuX3ZUb3RlbXNMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLmxvYWRUZXh0dXJlKFN0cmluZygndCcgKyB0aGlzLmxldmVsKSArICctb24nLCAwKTtcclxuICAgIHRoaXMuX3ZUcmliYWxNdXNpY3NbdGhpcy5sZXZlbCAtIDFdLnN0b3AoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3ZBbGxQaWVjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLl92QWxsUGllY2VzW2ldLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl92UGllY2VzUHV6emxlID0gW107XHJcbiAgICB0aGlzLl92UGllY2VzQ2xvbmVzID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMubGV2ZWwgIT09IDUpIHtcclxuICAgICAgICB0aGlzLmxldmVsKys7XHJcbiAgICAgICAgdmFyIGluZGV4TXVzaWMgPSB0aGlzLmxldmVsIC0gMTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVBpZWNlcygpO1xyXG4gICAgICAgIHRoaXMuX3ZUcmliYWxNdXNpY3NbaW5kZXhNdXNpY10ucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCd3aW4nLCB0cnVlLCB0cnVlLCB0aGlzLmxldmVsV2lucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy53b3JsZC5hZGRDaGlsZEF0KHRoaXMud2luZG93V2luLCB0aGlzLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gfTtcclxuXHJcbiBQbGF5U3RhdGUucHJvdG90eXBlLmNyZWF0ZVBpZWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBvZmZzZXRCYXIgPSB0aGlzLmJhci5oZWlnaHQgKyAxMDtcclxuICAgIHZhciBxdWFudGl0eVBpZWNlcyA9IHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnF1YW50aXR5O1xyXG4gICAgdGhpcy5fdkFsbFBpZWNlcyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPD0gcXVhbnRpdHlQaWVjZXM7IGluZGV4KyspIHtcclxuICAgICAgICB2YXIgbmFtZSA9IFN0cmluZygndCcgKyB0aGlzLmxldmVsICsgJy0nICsgaW5kZXgpO1xyXG5cclxuICAgICAgICB2YXIgcGllY2UgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgcGllY2UuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICAgICAgcGllY2Uuc2NhbGUuc2V0VG8odGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS54LCAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS55KTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHBpZWNlKTtcclxuICAgICAgICBwaWVjZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHBpZWNlLnBvcyA9IHt9O1xyXG4gICAgICAgIHBpZWNlLmFscGhhID0gMDtcclxuICAgICAgICBwaWVjZS50aW50PSAweGVlZTBjYTtcclxuXHJcbiAgICAgICAgdmFyIG9mZnNldE9iaiA9IGdldE9mZnNldEJ5THZsKG9mZnNldEJhciwgdGhpcy5sZXZlbCk7XHJcbiAgICAgICAgdmFyIGluaXRpYWxQb3NQaWVjZSA9IGluaXRpYWxQb3NpdGlvbkJ5THZsKHBpZWNlLCB0aGlzLmxldmVsLCBpbmRleCk7XHJcbiAgICAgICAgdmFyIGluaXRpYWxQb3NDbG9uZSA9IGluaXRpYWxQb3NpdGlvbihwaWVjZSwgdGhpcy5sZXZlbCwgaW5kZXgpO1xyXG5cclxuICAgICAgICBwaWVjZS54ID0gaW5pdGlhbFBvc1BpZWNlLng7XHJcbiAgICAgICAgcGllY2UueSA9IGluaXRpYWxQb3NQaWVjZS55O1xyXG5cclxuICAgICAgICBwaWVjZS54ICs9IG9mZnNldE9iai54O1xyXG4gICAgICAgIHBpZWNlLnkgKz0gb2Zmc2V0T2JqLnk7XHJcblxyXG4gICAgICAgIGxldCB4MSA9IGluaXRpYWxQb3NDbG9uZS54O1xyXG4gICAgICAgIGxldCB5MSA9IGluaXRpYWxQb3NDbG9uZS55O1xyXG5cclxuICAgICAgICB4MSArPSBvZmZzZXRPYmoueDtcclxuICAgICAgICB5MSArPSBvZmZzZXRPYmoueTtcclxuXHJcbiAgICAgICAgbGV0IHBpZWNlQ2xvbiA9IHRoaXMuYWRkLnNwcml0ZSh4MSwgeTEsIG5hbWUpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBwaWVjZUNsb24uc2NhbGUuc2V0VG8odGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS54LCAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS55KTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHBpZWNlQ2xvbik7XHJcblxyXG4gICAgICAgIHBpZWNlQ2xvbi5wYXJlbnRJbmRleCA9IHBpZWNlLmluZGV4O1xyXG4gICAgICAgIHBpZWNlQ2xvbi5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5pbnB1dC5lbmFibGVEcmFnKCk7XHJcbiAgICAgICAgcGllY2VDbG9uLm9yaWdpbmFsUG9zaXRpb24gPSBwaWVjZUNsb24ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBwaWVjZUNsb24uaW5wdXQuZW5hYmxlU25hcChwaWVjZUNsb24ud2lkdGgsIHBpZWNlQ2xvbi5oZWlnaHQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICBwaWVjZUNsb24uZXZlbnRzLm9uRHJhZ1N0b3AuYWRkKGZ1bmN0aW9uKGN1cnJlbnRTcHJpdGUpe1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BEcmFnKGN1cnJlbnRTcHJpdGUpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl92UGllY2VzUHV6emxlLnB1c2gocGllY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZBbGxQaWVjZXMucHVzaChwaWVjZSk7XHJcbiAgICAgICAgdGhpcy5fdkFsbFBpZWNlcy5wdXNoKHBpZWNlQ2xvbik7XHJcbiAgICB9XHJcbiB9O1xyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUuc3RvcERyYWcgPSAgZnVuY3Rpb24gKGN1cnJlbnRTcHJpdGUpIHtcclxuICAgICAgICB2YXIgc2NvcGUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBlbmRTcHJpdGUgPSB0aGlzLl92UGllY2VzUHV6emxlW2N1cnJlbnRTcHJpdGUucGFyZW50SW5kZXggLSAxXTtcclxuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKGN1cnJlbnRTcHJpdGUsIGVuZFNwcml0ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY3VycmVudFNwcml0ZS5pbnB1dC5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgICAgICBzY29wZS5fdlBpZWNlc0Nsb25lcy5wdXNoKGN1cnJlbnRTcHJpdGUpO1xyXG4gICAgICAgIGN1cnJlbnRTcHJpdGUucG9zaXRpb24uY29weUZyb20oZW5kU3ByaXRlLnBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50U3ByaXRlLmFuY2hvci5zZXRUbyhlbmRTcHJpdGUuYW5jaG9yLngsIGVuZFNwcml0ZS5hbmNob3IueSk7XHJcbiAgICAgIH0pKSB7XHJcbiAgICAgICAgY3VycmVudFNwcml0ZS5wb3NpdGlvbi5jb3B5RnJvbShjdXJyZW50U3ByaXRlLm9yaWdpbmFsUG9zaXRpb24pO1xyXG4gICAgIH1cclxuIH07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCAodGhpcy5fdlBpZWNlc0Nsb25lcyAmJiAgdGhpcy5fdlBpZWNlc0Nsb25lcy5sZW5ndGggPj0gdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucXVhbnRpdHkpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPj0gNSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnd2luJywgdHJ1ZSwgdHJ1ZSwgdGhpcy5sZXZlbFdpbnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93V2luLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmVuZFRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy53aW5kb3dXaW4udmlzaWJsZSA9PT0gZmFsc2UgJiYgdGhpcy5sZXZlbCA8IDUpIHtcclxuICAgICAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZEF0KHRoaXMud2luZG93RmFpbCwgdGhpcy53b3JsZC5jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dGYWlsLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50aW1lci50aW1lci5wYXVzZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxldmVsV2lucyA8PSAxICYmIHRoaXMubGV2ZWwgPT09IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZC5hZGRDaGlsZEF0KHRoaXMuZmFpbFN0YXRlLCB0aGlzLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsU3RhdGUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxXaW5zLS07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCd3aW4nLCB0cnVlLCB0cnVlLCB0aGlzLmxldmVsV2lucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlTdGF0ZTtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxQb3NpdGlvbkJ5THZsIChwaWVjZSwgbGV2ZWwsIGluZGV4KSB7XHJcbiAgICB2YXIgdlBvc2l0aW9uc0luaXRpYWw7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi4zLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4zLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuNSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiAyfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjUsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjUsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4xLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjEsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4xLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC4xLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4xLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4xLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC4xLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4xLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobGV2ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMS40LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjM1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi40LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjM1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMS40LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjM1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi40LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjM1IH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjQsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjQsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDIuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogMy4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDQuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogNC4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiA1LjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDUuMyB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDUpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDIuOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDMuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogMy44IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogNC44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiA0LjggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiA1LjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDUuOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDYuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogNi44IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogNy44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiA3LjggfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZQb3NpdGlvbnNJbml0aWFsW2luZGV4IC0gMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxQb3NpdGlvbiAocGllY2UsIGxldmVsLCBpbmRleCkge1xyXG4gICAgdmFyIHZQb3NpdGlvbnNJbml0aWFsO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICBpZiAobGV2ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAyfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogNCB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDcsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNi41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNi41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNi41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogNi41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNi41IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAxLjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogMS41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiAxLjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogNyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDEuNSwgeTogcGllY2UuaGVpZ2h0ICogNyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDcgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDcgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiA3IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogOSB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA5IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogOSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDExIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA4IH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZQb3NpdGlvbnNJbml0aWFsW2luZGV4IC0gMV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE9mZnNldEJ5THZsIChvZmZzZXQsIGxldmVsKSB7XHJcbiAgICB2YXIgeCA9IDA7XHJcbiAgICB2YXIgeSA9IDA7XHJcblxyXG4gICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB5ID0gLShvZmZzZXQgLyAyKTtcclxuICAgICAgICAgICAgeCA9IG9mZnNldCAvIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeCA9IChvZmZzZXQgLyA2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB4ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB5ID0gLShvZmZzZXQgLyAyIC0gMTApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSAtb2Zmc2V0IC0gMzA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeSA9IC0ob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgICAgIHggPSAob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeCA9IC1vZmZzZXQgLSAob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICBpZiAoIVBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB4ID0gLShvZmZzZXQgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB4ID0gMTA7XHJcbiAgICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHkgPSAob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyB4LCB5IH07XHJcbn1cclxuIiwiZnVuY3Rpb24gVHV0b3JpYWxTdGF0ZSgpIHtcclxuXHRQaGFzZXIuU3RhdGUuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuLyoqIEB0eXBlIFBoYXNlci5TdGF0ZSAqL1xyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZSA9ICBPYmplY3QuY3JlYXRlKFBoYXNlci5TdGF0ZS5wcm90b3R5cGUpO1xyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFR1dG9yaWFsU3RhdGU7XHJcblxyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgIHRoaXMucG9wdXAgPSBudWxsO1xyXG59O1xyXG5cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzdlbSBUaW1lcyBSb21hbicsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIHZhciBsb2FkVGV4dFkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAzMDAgOiB0aGlzLndvcmxkLmNlbnRlclk7XHJcbiAgICB2YXIgbG9hZFRleHQgPSB0aGlzLmFkZC50ZXh0KDAsIDAsICcnLCBsb2FkU3R5bGUpO1xyXG4gICAgbG9hZFRleHQueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGxvYWRUZXh0WSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDI7XHJcbiAgICBsb2FkVGV4dC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDMwO1xyXG4gICAgbG9hZFRleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgdmFyIGxvZGluZ0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICBsb2RpbmdCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMCw1MDAsMzAwLDMwLDEwKTtcclxuICAgICAgICBsb2RpbmdCYXIuZW5kRmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQoZnVuY3Rpb24ocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcyl7XHJcbiAgICAgICAgbG9hZFRleHQuc2V0VGV4dChwcm9ncmVzcysnJScpO1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgdmFyIGxvYWQgPSBwcm9ncmVzcyArIDE5NDtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5iZWdpbkZpbGwoJzB4MmIzZjY4JywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMyw1MDEsbG9hZCwyNywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZW5kRmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cxJywgJ2Fzc2V0cy90dXRvcmlhbC92ZW50YW5hLXR1dG9yaWFsMDEuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cyJywgJ2Fzc2V0cy90dXRvcmlhbC92ZW50YW5hLXR1dG9yaWFsMDIuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3czJywgJ2Fzc2V0cy90dXRvcmlhbC92ZW50YW5hLXR1dG9yaWFsMDMuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3c0JywgJ2Fzc2V0cy90dXRvcmlhbC92ZW50YW5hLXR1dG9yaWFsMDQuanBnJyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzEnLCAnYXNzZXRzL3R1dG9yaWFsL21vYmlsZS92ZW50YW5hLXR1dG9yaWFsMDEtbWJsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MicsICdhc3NldHMvdHV0b3JpYWwvbW9iaWxlL3ZlbnRhbmEtdHV0b3JpYWwwMi1tYmwuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3czJywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDAzLW1ibC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzQnLCAnYXNzZXRzL3R1dG9yaWFsL21vYmlsZS92ZW50YW5hLXR1dG9yaWFsMDQtbWJsLmpwZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc3RyZWV0JywnYXNzZXRzL2JhY2tncm91bmQvYmFja2dyb3VuZC5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnbmV4dCcsICdhc3NldHMvdHV0b3JpYWwvbmV4dC5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnY2xvc2UnLCdhc3NldHMvdHV0b3JpYWwvY2xvc2UuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2J1dHRvbi1wbGF5JywnYXNzZXRzL3R1dG9yaWFsL2J1dHRvbi1wbGF5LmpwZycpO1xyXG5cclxufTtcclxuXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3RyZWV0ID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsJ3N0cmVldCcpO1xyXG4gICAgdGhpcy5zdHJlZXQuc2NhbGUuc2V0VG8oMC43KTtcclxuXHJcbiAgICB2YXIgcG9wdXAgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3dpbmRvdzEnKTtcclxuICAgIGlmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcbiAgICAgICAgcG9wdXAueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAxNTtcclxuICAgICAgICBwb3B1cC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMiArIDMwO1xyXG4gICAgICAgIHBvcHVwLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHBvcHVwLnNjYWxlLnNldFRvKDAuNykgOiBwb3B1cC5zY2FsZS5zZXRUbygwLjI2KTtcclxuICAgICAgICBwb3B1cC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblx0XHRcdHBvcHVwLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiAgdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDMwO1xyXG5cdFx0XHRwb3B1cC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJZIDogIHRoaXMud29ybGQuY2VudGVyWSAvIDIgKyA0MDtcclxuXHRcdFx0cG9wdXAuYW5jaG9yLnNldFRvKDAuNSk7XHJcblx0XHRcdFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHBvcHVwLnNjYWxlLnNldFRvKDAuMykgOiBwb3B1cC5zY2FsZS5zZXQoMC4zKTtcclxuXHRcdFx0cG9wdXAuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb2sgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQnKTtcclxuICAgIG9rLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0aWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuXHRcdFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IG9rLnNjYWxlLnNldCgxKSA6IG9rLnNjYWxlLnNldCgyKTtcclxuXHQgICAgb2suaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHQgICAgb2suaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblx0ICAgIHBvcHVwLmFkZENoaWxkKG9rKTtcclxuXHQgICAgb2sueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC5oZWlnaHQgLyAyKSA6IHBvcHVwLmhlaWdodCArIChwb3B1cC5oZWlnaHQgLyA2KTtcclxuXHQgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuXHRcdFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IG9rLnNjYWxlLnNldCgxLjIpIDogb2suc2NhbGUuc2V0KDIpO1xyXG5cdCAgICBvay5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cdCAgICBvay5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgICAgICBwb3B1cC5hZGRDaGlsZChvayk7XHJcblx0ICAgIG9rLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAocG9wdXAuaGVpZ2h0IC8gMikgOiBwb3B1cC5oZWlnaHQgKyAocG9wdXAuaGVpZ2h0IC8gMyk7XHJcblx0ICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xvc2UgPSB0aGlzLmFkZC5zcHJpdGUoMzI1LCAyMCwgJ2Nsb3NlJyk7XHJcbmlmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBjbG9zZS5zY2FsZS5zZXQoMSkgOiBjbG9zZS5zY2FsZS5zZXQoMSk7XHJcbiAgICBjbG9zZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgY2xvc2UuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICBwb3B1cC5hZGRDaGlsZChjbG9zZSk7XHJcbiAgICBjbG9zZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC53aWR0aCAvIDIpICsgY2xvc2Uud2lkdGggOiBwb3B1cC53aWR0aCArIGNsb3NlLndpZHRoIC0gMjU7XHJcbiAgICBjbG9zZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gLXBvcHVwLmhlaWdodCAvIDIgOiAtcG9wdXAuaGVpZ2h0ICogMiArIGNsb3NlLmhlaWdodCAqIDIgLSBjbG9zZS5oZWlnaHQ7XHJcbn0gZWxzZXtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGNsb3NlLnNjYWxlLnNldCgwLjUpIDogY2xvc2Uuc2NhbGUuc2V0KDAuNSk7XHJcblx0XHRjbG9zZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgY2xvc2UuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbn1cclxuXHJcbiAgICBjbG9zZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2FtZS5zdGF0ZS5zdGFydCgnUGxheScpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICBvay5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnR1dG9yaWFsUGFydCkge1xyXG4gICAgICAgICAgICBjYXNlIDEgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzInLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5sb2FkVGV4dHVyZSgnd2luZG93MycsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLmxvYWRUZXh0dXJlKCd3aW5kb3c0JywwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gNDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnUGxheScpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sIHRoaXMpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUdXRvcmlhbFN0YXRlO1xyXG4iLCJmdW5jdGlvbiBXaW5TdGF0ZSgpIHtcclxuXHRQaGFzZXIuU3RhdGUuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuLyoqIEB0eXBlIFBoYXNlci5TdGF0ZSAqL1xyXG5XaW5TdGF0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TdGF0ZS5wcm90b3R5cGUpO1xyXG5XaW5TdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXaW5TdGF0ZTtcclxuXHJcbldpblN0YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKGxldmVsKSB7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBtc2dFdGhuaWNzID0gW1xyXG4gICAgICAgICAgICBcIkVyZXMgZnVlcnRlLCBwb2Rlcm9zYSB5IG5vYmxlLiBDYXJhY3RlcsOtc3RpY2FzIGRlIGxvcyByZXllcyB5IGdvYmVybmFudGVzLlwiLFxyXG4gICAgICAgICAgICBcIkhhcyBsb2dyYWRvIGZvcnRhbGVjZXIgdHUgZXNww61yaXR1IGRlIGluZGVwZW5kZW5jaWEgeSBhdmVudHVyYS5cIixcclxuICAgICAgICAgICAgXCJUdSBwZXJzZXZlcmFuY2lhIGVuIGxhIGx1Y2hhLCBhcG9ydGEgZW5lcmfDrWEgZXh0cmEgYSB0b2RvcyBsb3MgdHV5b3MuIFxcbiBsb2dyYXN0ZSBjb25xdWlzdGFyIGxvcyBlc3DDrXJpdHVzIMOpdG5pY29zIHF1ZSBhdHJhZW4geSBtYW50aWVuZW4gYW1pZ29zLlwiLFxyXG4gICAgICAgICAgICBcIkxvcyBlc3DDrXJpdHVzIMOpdG5pY29zIG5vcyBkaWNlbiBxdWUgZXJlcyBkZSBsYXMgcXVlIHNhbGVuIGRlIHRvZGFzIGxhcyBkaWZpY3VsdGFkZXMgY29uIGFydGUgeSBlbGVnYW5jaWEuXCIsXHJcbiAgICAgICAgICAgIFwiVmVzIGxhIHZpZGEgZGVzZGUgdW5hIHBlcnNwZWN0aXZhIG3DoXMgc2FiaWEgeSBlbGV2YWRhLiBcXG4gaGFzIGxvZ3JhZG8gY29tcHJlbmRlciB0dSBkZXN0aW5vIHkgbG9zIGNpY2xvcyB2aXZpZG9zLlwiXHJcbiAgICAgICAgXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1zZ0V0aG5pY3MgPSBbXHJcbiAgICAgICAgICAgIFwiRXJlcyBmdWVydGUsIHBvZGVyb3NhIHkgbm9ibGUuIFxcbiBDYXJhY3RlcsOtc3RpY2FzIGRlIGxvcyByZXllcyB5IGdvYmVybmFudGVzLlwiLFxyXG4gICAgICAgICAgICBcIkhhcyBsb2dyYWRvIGZvcnRhbGVjZXIgdHUgZXNww61yaXR1IFxcbiBkZSBpbmRlcGVuZGVuY2lhIHkgYXZlbnR1cmEuXCIsXHJcbiAgICAgICAgICAgIFwiVHUgcGVyc2V2ZXJhbmNpYSBlbiBsYSBsdWNoYSwgYXBvcnRhICBcXG4gZW5lcmfDrWEgZXh0cmEgYSB0b2RvcyBsb3MgdHV5b3MuIFxcbiBsb2dyYXN0ZSBjb25xdWlzdGFyIGxvcyBlc3DDrXJpdHVzIMOpdG5pY29zIFxcbiBxdWUgYXRyYWVuIHkgbWFudGllbmVuIGFtaWdvcy5cIixcclxuICAgICAgICAgICAgXCJMb3MgZXNww61yaXR1cyDDqXRuaWNvcyBub3MgZGljZW4gcXVlICBcXG4gZXJlcyBkZSBsYXMgcXVlIHNhbGVuIGRlIHRvZGFzIFxcbiBsYXMgZGlmaWN1bHRhZGVzIGNvbiBhcnRlIHkgZWxlZ2FuY2lhLlwiLFxyXG4gICAgICAgICAgICBcIlZlcyBsYSB2aWRhIGRlc2RlIHVuYSBwZXJzcGVjdGl2YSBtw6FzIHNhYmlhIHkgZWxldmFkYS4gXFxuIGhhcyBsb2dyYWRvIGNvbXByZW5kZXIgdHUgZGVzdGlubyB5IGxvcyBjaWNsb3Mgdml2aWRvcy5cIlxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRpc2NvdW50T2JqID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzY291bnQ6IDAsIHdvcmRzOiBbXHJcbiAgICAgICAgICAgICAgICBcIk5hZGFcIiwgXCJOYWRhXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNjb3VudDogMTUsIHdvcmRzOiBbXHJcbiAgICAgICAgICAgICAgICBcIk3DoXNjYXJhc1wiLCBcIk1hZGVyYVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzY291bnQ6IDIwLCB3b3JkczogW1xyXG4gICAgICAgICAgICAgICAgXCJGZXN0ZWpvXCIsIFwiUGx1bWFzXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNjb3VudDogMjUsIHdvcmRzOiBbXHJcbiAgICAgICAgICAgICAgICBcIk3DunNpY2FcIiwgXCJJbmRpb3NcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmxldmVsID0gcGFyc2VJbnQobGV2ZWwpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5sZXZlbCkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDE1O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAyMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMjA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDI1O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGlzY291bnRPYmoubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRpc2NvdW50T2JqW2luZGV4XTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnQuZGlzY291bnQgPT0gdGhpcy5kaXNjb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmQgPSBlbGVtZW50LndvcmRzW3RoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgMSldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tc2cgPSBtc2dFdGhuaWNzW3RoaXMuZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMCwgNCldO1xyXG59O1xyXG5cclxuV2luU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL2JhY2tncm91bmQvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdycsJ2Fzc2V0cy9wb3B1cHMvd2luZG93LXdpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL3N0b3JlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm9vdCcsICdhc3NldHMvYnV0dG9ucy9ib290LnBuZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9tb2JpbGUvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdycsJ2Fzc2V0cy9wb3B1cHMvbW9iaWxlL3dpbmRvd1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9zdG9yZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Jvb3QnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL2Jvb3QucG5nJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnYmFja2dyb3VuZCcpO1xyXG4gIHZhciB3aW5kb3cgPSB0aGlzLmFkZC5zcHJpdGUoMCwwLCd3aW5kb3cnKTtcclxuICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB3aW5kb3cuc2NhbGUuc2V0KDAuNzMpIDogd2luZG93LnNjYWxlLnNldCgwLjI5LCAwLjI5MSk7XHJcbiAgd2luZG93LnkgPSAwO1xyXG4gIHdpbmRvdy54ID0gMDtcclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgYm9ub1N0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMmVtIEFtZXJpY2FuIEJvbGQnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBkaXNjb3VudFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnNWVtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgd29yS2V5ID0ge1xyXG4gICAgICAgICAgICBmb250OiAnNWVtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbGVnYWxTdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzIuMmVtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgYm9ub1N0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMWVtIEFtZXJpY2FuIEJvbGQnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBkaXNjb3VudFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnM2VtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgd29yS2V5ID0ge1xyXG4gICAgICAgICAgICBmb250OiAnM2VtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbGVnYWxTdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzEuMmVtIEFtZXJpY2FuJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYnRuQm9vdCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnYm9vdCcpO1xyXG4gICAgdGhpcy5idG5Cb290LnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQud2lkdGggLSA1MCA6ICh0aGlzLmdhbWUud29ybGQud2lkdGggLyAyKSArIDEwO1xyXG4gICAgdGhpcy5idG5Cb290LnkgPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDUwIDogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyAzMC8qIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyIC0gMzAgKi87XHJcbiAgICB0aGlzLmJ0bkJvb3QuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5idG5Cb290LnNjYWxlLnNldCgwLjUpIDp0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNCk7XHJcbiAgICB0aGlzLmJ0bkJvb3QuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuYnRuQm9vdC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMuYnRuQm9vdC5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgdGhpcy5zdGF0ZS5zdGFydCgnVHV0b3JpYWwnKTtcclxuICAgICB9LHRoaXMpO1xyXG5cclxuICAgICB0aGlzLmJ0blN0b3JlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdzdG9yZScpO1xyXG4gICAgIHRoaXMuYnRuU3RvcmUueCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyA1MCA6IDM1O1xyXG4gICAgIHRoaXMuYnRuU3RvcmUueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA1MCA6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyICsgMzAgLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgICB0aGlzLmJ0blN0b3JlLmFuY2hvci5zZXQoMC41KTtcclxuICAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAgdGhpcy5idG5TdG9yZS5zY2FsZS5zZXQoMC41KSA6IHRoaXMuYnRuU3RvcmUuc2NhbGUuc2V0KDAuNCk7XHJcbiAgICAgdGhpcy5idG5TdG9yZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgIHRoaXMuYnRuU3RvcmUuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblxyXG4gICAgIHRoaXMuYnRuU3RvcmUuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgICBkb2N1bWVudC5sb2NhdGlvbiA9IFwiaHR0cHM6Ly93d3cuYW1lcmljYW5pbm8uY29tL1wiO1xyXG4gICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdmFyIGdlbmVyYWxYID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aCAvIDIgOiB0aGlzLndvcmxkLndpZHRoIC8gNCArIDIwO1xyXG4gICAgdmFyIHRleHRmaXJzdCA9IHRoaXMuYWRkLnRleHQoZ2VuZXJhbFgsIDAsICcnLCBsZWdhbFN0eWxlKTtcclxuICAgIHRleHRmaXJzdC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQgLyAyLjUgOiB0aGlzLndvcmxkLmhlaWdodCAvIDU7XHJcbiAgICB0ZXh0Zmlyc3QudGV4dCA9IFwiTG9ncmFzdGUgbGliZXJhciBhIGxvcyBlc3ByaXRpdHVzIGV0bmljb3MuXCI7XHJcbiAgICB0ZXh0Zmlyc3QuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcblxyXG4gICAgdmFyIGRpc2NvdW50VGV4dCA9IHRoaXMuYWRkLnRleHQoZ2VuZXJhbFgsIDAsICcnLGRpc2NvdW50U3R5bGUpO1xyXG4gICAgZGlzY291bnRUZXh0LnkgPSB0ZXh0Zmlyc3QueSArIGRpc2NvdW50VGV4dC5oZWlnaHQgLyAzO1xyXG4gICAgZGlzY291bnRUZXh0LnRleHQgPSB0aGlzLmRpc2NvdW50K1wiJVwiO1xyXG4gICAgZGlzY291bnRUZXh0LmFuY2hvci5zZXRUbygwLjUsMCk7XHJcblxyXG4gICAgdmFyIHRleHRCb25vID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsYm9ub1N0eWxlKTtcclxuICAgIHRleHRCb25vLnkgPSBkaXNjb3VudFRleHQueSArIHRleHRCb25vLmhlaWdodCArIDE1O1xyXG4gICAgdGV4dEJvbm8uYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuICAgIHRleHRCb25vLnRleHQgPSBcIlJlY2liZSB1biBib25vIGRlIGRlc2N1ZW50byBlbiBjdWFscXVpZXIgcHJvZHVjdG8gZGUgbnVlc3RyYXMgdGllbmRhcy5cIjtcclxuXHJcbiAgICB2YXIgd29yZCA9IHRoaXMuYWRkLnRleHQoZ2VuZXJhbFgsIDAsICcnLHdvcktleSk7XHJcbiAgICB3b3JkLnkgPSAgdGV4dEJvbm8ueSArIHdvcmQuaGVpZ2h0IC8gNDtcclxuICAgIHdvcmQudGV4dCA9IFN0cmluZyh0aGlzLndvcmQpO1xyXG4gICAgd29yZC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuICAgIHZhciBtc2cgPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyxsZWdhbFN0eWxlKTtcclxuICAgIG1zZy55ID0gIHdvcmQueSArIG1zZy5oZWlnaHQgKyAxNTtcclxuICAgIG1zZy50ZXh0ID0gU3RyaW5nKHRoaXMubXNnKTtcclxuICAgIG1zZy5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxufTtcclxuXHJcbldpblN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXaW5TdGF0ZTtcclxuIiwiLy8gUEhBU0VSIElTIElNUE9SVEVEIEFTIEFOIEVYVEVSTkFMIEJVTkRMRSBJTiBJTkRFWC5IVE1MXHJcblBoYXNlci5EZXZpY2Uud2hlblJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICB2YXIgUGxheVN0YXRlICA9IHJlcXVpcmUoJy4vUGxheVN0YXRlJyk7XHJcbiAgdmFyIFdpblN0YXRlICA9IHJlcXVpcmUoJy4vV2luU3RhdGUnKTtcclxuICB2YXIgVHV0b3JpYWxTdGF0ZSAgPSByZXF1aXJlKCcuL1R1dG9yaWFsU3RhdGUnKTtcclxuXHJcbiAgaWYgKCFQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgIHZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDY0MCwgMTE1MiwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IDB4MDAwMDAwO1xyXG5cclxuICAgIGdhbWUuc2NhbGUuc2V0TWluTWF4KDY0MCwgMTE1Mik7XHJcbiAgICBnYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICBnYW1lLnNjYWxlLmZ1bGxTY3JlZW5TY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG5cclxuICAgIGdhbWUuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDExNTIsIDY0MCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgICBnYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IDB4MDAwMDAwO1xyXG5cclxuICAgIGdhbWUuc2NhbGUuc2V0TWluTWF4KDExNTIsIDY0MCk7XHJcbiAgICBnYW1lLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuU0hPV19BTEw7XHJcbiAgICBnYW1lLnNjYWxlLmZ1bGxTY3JlZW5TY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG5cclxuICAgIGdhbWUuc2NhbGUuZm9yY2VPcmllbnRhdGlvbihmYWxzZSwgdHJ1ZSk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGdhbWUuc3RhdGUuYWRkKCdQbGF5JywgICBQbGF5U3RhdGUpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCd3aW4nLCAgIFdpblN0YXRlKTtcclxuICBnYW1lLnN0YXRlLmFkZCgnVHV0b3JpYWwnLCAgIFR1dG9yaWFsU3RhdGUpO1xyXG5cclxuICBnYW1lLnN0YXRlLnN0YXJ0KCdUdXRvcmlhbCcpO1xyXG59KVxyXG4iXX0=
