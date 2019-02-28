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
        this.load.image('sound', 'assets/buttons/sound.png');
        this.load.image('mute', 'assets/buttons/mute.png');
        this.load.image('pause', 'assets/buttons/pause.png');
        this.load.image('play', 'assets/buttons/play.png');

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
        pieceClon.input.enableSnap(pieceClon.width, pieceClon.height, true, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2x1aXNzZXJuYS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9waGFzZXItbm9kZS1raXQvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImJ1aWxkL2pzL1BsYXlTdGF0ZS5qcyIsImJ1aWxkL2pzL1R1dG9yaWFsU3RhdGUuanMiLCJidWlsZC9qcy9XaW5TdGF0ZS5qcyIsImJ1aWxkL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZnVuY3Rpb24gUGxheVN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBoYXNlci5TdGF0ZS5wcm90b3R5cGUpO1xyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGxheVN0YXRlO1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTXV0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDMxO1xyXG4gICAgdGhpcy5sZXZlbFdpbnMgPSAxO1xyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudG90YWxUaW1lID0gMzE7XHJcbiAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuXHJcbiAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzID0gW1xyXG4gICAgICAgICAgICB7IGxldmVsOiAxLCBxdWFudGl0eTogNCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAyLCBxdWFudGl0eTogNiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC42LCB5OiAwLjYgfSB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiAzLCBxdWFudGl0eTogOCAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC41LCB5OiAwLjUgfSAgfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogNCwgcXVhbnRpdHk6IDkgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNiwgeTogMC42IH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDUsIHF1YW50aXR5OiAxMiAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAwLjcsIHk6IDAuNyB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNSwgeTogMC41IH0gIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGVtTGV2ZWxTY2FsZSA9IHsgeDogMC44LCB5OiAwLjggfTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXJTY2FsZSA9IHsgeDogMC42LCB5OiAwLjYgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVscyA9IFtcclxuICAgICAgICAgICAgeyBsZXZlbDogMSwgcXVhbnRpdHk6IDQgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMiwgcXVhbnRpdHk6IDYgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMywgcXVhbnRpdHk6IDggLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDQsIHF1YW50aXR5OiA5ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9ICB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiA1LCBxdWFudGl0eTogMTIgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMC4zNSwgeTogMC4zNSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuMywgeTogMC4zIH0gIH1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGVtTGV2ZWxTY2FsZSA9IHsgeDogMC44LCB5OiAwLjggfTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXJTY2FsZSA9IHsgeDogMC42LCB5OiAwLjMgfTtcclxuICAgIH1cclxuXHJcbiAgdGhpcy5fdlBpZWNlc1B1enpsZSA9IFtdO1xyXG4gIHRoaXMuX3ZQaWVjZXNDbG9uZXMgPSBbXTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkU3R5bGUgPSB7XHJcbiAgICAgICAgZm9udDogJzdlbSBUaW1lcyBSb21hbicsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIHZhciBsb2FkVGV4dFkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAzMDAgOiB0aGlzLndvcmxkLmNlbnRlclk7XHJcbiAgICB2YXIgbG9hZFRleHQgPSB0aGlzLmFkZC50ZXh0KDAsIDAsICcnLCBsb2FkU3R5bGUpO1xyXG4gICAgbG9hZFRleHQueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGxvYWRUZXh0WSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDI7XHJcbiAgICBsb2FkVGV4dC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDMwO1xyXG4gICAgbG9hZFRleHQuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBwcm9ncmVzc0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgdmFyIGxvZGluZ0JhciA9IHRoaXMuYWRkLmdyYXBoaWNzKDMzMCwgLTE1MCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICBsb2RpbmdCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMCw1MDAsMzAwLDMwLDEwKTtcclxuICAgICAgICBsb2RpbmdCYXIuZW5kRmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQoZnVuY3Rpb24ocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcyl7XHJcbiAgICAgICAgbG9hZFRleHQuc2V0VGV4dChwcm9ncmVzcysnJScpO1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgdmFyIGxvYWQgPSBwcm9ncmVzcyArIDE5NDtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5iZWdpbkZpbGwoJzB4MmIzZjY4JywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZHJhd1JvdW5kZWRSZWN0KDEwMyw1MDEsbG9hZCwyNywxKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZW5kRmlsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIC8vIHBpZWNlc1xyXG4gICAgLy8gcHV6emxlIDFcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDEtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGUxL3RvdGVtLTEtNC5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgMlxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0xLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0yLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi0zLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi00LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0Mi02JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTIvdG90ZW0tMi02LnBuZycpO1xyXG5cclxuICAgIC8vIHB1enpsZSAzXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTYucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTcnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTcucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLTgnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMy90b3RlbS0zLTgucG5nJyk7XHJcblxyXG4gICAgLy8gcHV6emxlIDRcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtNycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtNy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtOCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtOC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDQtOScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU0L3RvdGVtLTQtOS5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgNVxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTAzLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA2LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS03JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtOCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDgucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTknLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA5LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xMCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMTAucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTExJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0xMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTEyLnBuZycpO1xyXG5cclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL2JhY2tncm91bmQvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhcicsJ2Fzc2V0cy9iYXIvYmFyLXdoaXRlLmpwZycpO1xyXG5cclxuICAgICAgICAvLyBpdGVtcyBsZXZlbHNcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAxLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAyLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAzLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDA0LW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDA1LW9mZi5wbmcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGl0ZW1zIGxldmVsc1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDEtb24ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMi1vbi5wbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAzLW9uLnBuZycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDQtb24ucG5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNS1vbi5wbmcnKTtcclxuXHJcbiAgICAgICAgLy9iYWNrZ3JvdW5kIHRvdGVtXHJcblx0XHRcdFx0dGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnYXNzZXRzL2J1dHRvbnMvc291bmQucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdtdXRlJywgJ2Fzc2V0cy9idXR0b25zL211dGUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZScsICdhc3NldHMvYnV0dG9ucy9wYXVzZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnYXNzZXRzL2J1dHRvbnMvcGxheS5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3dXaW4nLCAnYXNzZXRzL3BvcHVwcy9wb3B1cHNXaW4uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3dGYWlsJywgJ2Fzc2V0cy9wb3B1cHMvcG9wdXBzRmFpbC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQtbGV2ZWwnLCAnYXNzZXRzL2J1dHRvbnMvbmV4dC1sZXZlbC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlcGx5JywgJ2Fzc2V0cy9idXR0b25zL3JlcGx5LmpwZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL3N0b3JlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm9vdCcsICdhc3NldHMvYnV0dG9ucy9ib290LnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1wb3B1cCcsICdhc3NldHMvcG9wdXBzL2ZhaWxXaW5kb3dzLmpwZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9tb2JpbGUvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhcicsJ2Fzc2V0cy9iYXIvbW9iaWxlL2Jhci13aGl0ZS5qcGcnKTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXMgbGV2ZWxzXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0MS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDEtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAyLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMy1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NC1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDQtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA1LW9mZi5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0MS1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMS1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAyLW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDMtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDMtb24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NC1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwNC1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA1LW9uLnBuZycpO1xyXG5cclxuXHJcbiAgICAgICAgLy9iYWNrZ3JvdW5kIHRvdGVtc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndG90ZW1Db250YWluZXInLCAnYXNzZXRzL3RvdGVtcy1iYWNrZ3JvdW5kcy90b3RlbS1jb250YWluZXIucG5nJyk7XHJcblxyXG4gICAgICAgICAvLyBidXR0b25zXHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3NvdW5kLnBuZycpO1xyXG4gICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ211dGUnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL211dGUucG5nJyk7XHJcbiAgICAgICAgIHRoaXMubG9hZC5pbWFnZSgncGF1c2UnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3BhdXNlLnBuZycpO1xyXG4gICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3BsYXkucG5nJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd1dpbicsICdhc3NldHMvcG9wdXBzL21vYmlsZS9wb3B1cHNXaW4uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3dGYWlsJywgJ2Fzc2V0cy9wb3B1cHMvbW9iaWxlL3BvcHVwc0ZhaWwuanBnJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbmV4dC1sZXZlbCcsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvbmV4dC1sZXZlbC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlcGx5JywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9yZXBseS5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdG9yZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9ib290LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2ZhaWwtcG9wdXAnLCAnYXNzZXRzL3BvcHVwcy9tb2JpbGUvZmFpbFdpbmRvdy5qcGcnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ3RyaWJhbDEnLCAnYXNzZXRzL211c2ljL1RyaWJhbDEubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ3RyaWJhbDInLCAnYXNzZXRzL211c2ljL1RyaWJhbDIubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ3RyaWJhbDMnLCAnYXNzZXRzL211c2ljL1RyaWJhbDIubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ3RyaWJhbDQnLCAnYXNzZXRzL211c2ljL1RyaWJhbDMubXAzJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW8oJ3RyaWJhbDUnLCAnYXNzZXRzL211c2ljL1RyaWJhbDEubXAzJyk7XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb250ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gJzNlbSBBbWVyaWNhbicgOiAnM2VtIEFtZXJpY2FuJztcclxuICAgIHZhciBzdHlsZSA9IHtcclxuICAgICAgICBmb250OiBmb250LFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgIHRoaXMuYWRkLnNwcml0ZSgwLDAsICdiYWNrZ3JvdW5kJyk7XHJcblxyXG5cdFx0dmFyIHRvdGVtQ29udGFpbmVyID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICd0b3RlbUNvbnRhaW5lcicpO1xyXG5cdFx0aWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuXHRcdHRvdGVtQ29udGFpbmVyLnNjYWxlLnNldCgwLjgpO1xyXG5cdFx0dG90ZW1Db250YWluZXIueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDIgKyAzMDtcclxuXHRcdHRvdGVtQ29udGFpbmVyLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcblx0XHR0b3RlbUNvbnRhaW5lci5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLnNjYWxlLnNldCgwLjUpO1xyXG5cdFx0XHR0b3RlbUNvbnRhaW5lci55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMiArIDMwO1xyXG5cdFx0XHR0b3RlbUNvbnRhaW5lci54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDMwO1xyXG5cdFx0XHR0b3RlbUNvbnRhaW5lci5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHRcdH1cclxuXHJcbiAgICB0aGlzLmJhciA9IHRoaXMuYWRkLnNwcml0ZSgwLDAsICdiYXInKTtcclxuICAgIHRoaXMuYmFyLmFuY2hvci5zZXRUbygwKTtcclxuICAgIHRoaXMuYmFyLnNjYWxlLnNldFRvKHRoaXMuYmFyU2NhbGUueCwgdGhpcy5iYXJTY2FsZS55KTtcclxuICAgIHRoaXMubGV2ZWwgPSAxO1xyXG5cclxuICAgIHRoaXMuYXVkaW8gPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3NvdW5kJyk7XHJcbiAgICB0aGlzLmF1ZGlvLmFuY2hvci5zZXQoMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYXVkaW8uc2NhbGUuc2V0KDEpIDogdGhpcy5hdWRpby5zY2FsZS5zZXQoMC40KTtcclxuICAgIHRoaXMuYXVkaW8ueCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQud2lkdGggLSB0aGlzLmF1ZGlvLndpZHRoIDogdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMjtcclxuICAgIHRoaXMuYXVkaW8ueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYmFyLmhlaWdodCAvIDIgOiB0aGlzLmF1ZGlvLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5wYXVzZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncGF1c2UnKTtcclxuICAgIHRoaXMucGF1c2UuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5wYXVzZS5zY2FsZS5zZXQoMSkgOiB0aGlzLnBhdXNlLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5wYXVzZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIHRoaXMucGF1c2Uud2lkdGggLSB0aGlzLmF1ZGlvLndpZHRoIC0gMjAgOiAodGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMikgLSB0aGlzLmF1ZGlvLndpZHRoIC0gMTA7XHJcbiAgICB0aGlzLnBhdXNlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogdGhpcy5wYXVzZS5oZWlnaHQgLyAyO1xyXG5cclxuXHJcbiAgICB0aGlzLmF1ZGlvLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmF1ZGlvLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5hdWRpby5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMuYXVkaW8uZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyKCk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMucGF1c2UuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMucGF1c2UuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLnBhdXNlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXVzZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wYXVzZU1hbmFnZXIoKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdGhpcy5fdlRvdGVtc0xldmVscyA9IFtdO1xyXG4gICAgdGhpcy5fdlRyaWJhbE11c2ljcyA9IFtdO1xyXG4gICAgdmFyIG9mZnNldCA9IHRoaXMuYmFyLmhlaWdodCArIDEwO1xyXG5cclxuICAgIHZhciBsZXZlbCA9IHRoaXMuYWRkLnRleHQoNTAsIDAsICdOaXZlbCcsIHN0eWxlKTtcclxuICAgIGxldmVsLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgbGV2ZWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYmFyLmhlaWdodCAvIDIgOiBsZXZlbC5oZWlnaHQgLyAyO1xyXG5cclxuICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPD0gNTsgaW5kZXgrKykge1xyXG4gICAgICAgIHZhciBuYW1lID0gU3RyaW5nKCd0JyArIGluZGV4KSArICctb2ZmJztcclxuICAgICAgICB2YXIgdHJpYmFsTXVzaWMgPSB0aGlzLmFkZC5hdWRpbyhTdHJpbmcoJ3RyaWJhbCcgKyBpbmRleCkpO1xyXG4gICAgICAgIHRyaWJhbE11c2ljLmxvb3AgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgdG90ZW1MZXZlbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCBuYW1lKTtcclxuICAgICAgICB0b3RlbUxldmVsLmFuY2hvci5zZXRUbygwLjUsIDApO1xyXG4gICAgICAgIHRvdGVtTGV2ZWwuc2NhbGUuc2V0VG8odGhpcy50b3RlbUxldmVsU2NhbGUueCwgIHRoaXMudG90ZW1MZXZlbFNjYWxlLnkpO1xyXG5cclxuICAgICAgICB0b3RlbUxldmVsLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyA1MCA6IDMyO1xyXG4gICAgICAgIHRvdGVtTGV2ZWwueSA9IG9mZnNldDtcclxuXHJcbiAgICAgICAgb2Zmc2V0ICs9IHRvdGVtTGV2ZWwuaGVpZ2h0ICsgMTA7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZUb3RlbXNMZXZlbHMucHVzaCh0b3RlbUxldmVsKTtcclxuICAgICAgICB0aGlzLl92VHJpYmFsTXVzaWNzLnB1c2godHJpYmFsTXVzaWMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3ZUcmliYWxNdXNpY3NbdGhpcy5sZXZlbCAtIDFdLnBsYXkoKTtcclxuICAgIHRoaXMuY3JlYXRlVGltZXIoKTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy50b3RhbFRpbWUgPSAzMTtcclxuICAgIHRoaXMudGltZUVsYXBzZWQgPSAwO1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIHRoaXMudGltZXIgPSAgdGhpcy50aW1lLmV2ZW50cy5sb29wKDEwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGdhbWUuY2hlY2tUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyKys7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVBpZWNlcygpO1xyXG5cclxuICAgdGhpcy5idG5Cb290ID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdib290Jyk7XHJcbiAgIHRoaXMuYnRuQm9vdC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gNTAgOiAodGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMikgKyAxMDtcclxuICAgdGhpcy5idG5Cb290LnkgPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDUwIDogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyAzMC8qIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyIC0gMzAgKi87XHJcbiAgIHRoaXMuYnRuQm9vdC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC41KSA6dGhpcy5idG5Cb290LnNjYWxlLnNldCgwLjQpO1xyXG4gICB0aGlzLmJ0bkJvb3QuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgdGhpcy5idG5Cb290LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICB0aGlzLmJ0bkJvb3QuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnVHV0b3JpYWwnKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdGhpcy5idG5TdG9yZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnc3RvcmUnKTtcclxuICAgIHRoaXMuYnRuU3RvcmUueCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyA1MCA6IDM1O1xyXG4gICAgdGhpcy5idG5TdG9yZS55ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA1MCA6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyICsgMzAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICAgdGhpcy5idG5TdG9yZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAgdGhpcy5idG5TdG9yZS5zY2FsZS5zZXQoMC41KSA6IHRoaXMuYnRuU3RvcmUuc2NhbGUuc2V0KDAuNCk7XHJcbiAgICB0aGlzLmJ0blN0b3JlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmJ0blN0b3JlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYnRuU3RvcmUuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uID0gXCJodHRwczovL3d3dy5hbWVyaWNhbmluby5jb20vXCI7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMud2luZG93V2luID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICd3aW5kb3dXaW4nKTtcclxuICAgIHRoaXMud2luZG93V2luLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLndpZHRoLzIgOiB0aGlzLndvcmxkLndpZHRoLzQgKyAyMDtcclxuICAgIHRoaXMud2luZG93V2luLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodC8yIDogdGhpcy53b3JsZC5oZWlnaHQvNCArIDMwO1xyXG4gICAgdGhpcy53aW5kb3dXaW4uYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd1dpbi5zY2FsZS5zZXRUbygwLjUpIDogdGhpcy53aW5kb3dXaW4uc2NhbGUuc2V0VG8oMC44NywgMC45KTtcclxuICAgIHRoaXMud2luZG93V2luLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgbmV4dExldmVsID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICduZXh0LWxldmVsJyk7XHJcbiAgICBuZXh0TGV2ZWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud2luZG93V2luLmhlaWdodCAvIDIgKyB0aGlzLndpbmRvd1dpbi5oZWlnaHQgLyA0ICAtIG5leHRMZXZlbC5oZWlnaHQgOiAodGhpcy53aW5kb3dXaW4uaGVpZ2h0IC8gNCApICsgbmV4dExldmVsLmhlaWdodCA7XHJcbiAgICBuZXh0TGV2ZWwuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgbmV4dExldmVsLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICBuZXh0TGV2ZWwuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLndpbmRvd1dpbi5hZGRDaGlsZChuZXh0TGV2ZWwpO1xyXG5cclxuICAgIHZhciBnYW1lID0gdGhpcztcclxuICAgIG5leHRMZXZlbC5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ2FtZS53aW5kb3dXaW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGdhbWUucmVzdG9yZVB1enpsZSgpO1xyXG4gICAgICAgIGdhbWUuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICBnYW1lLnRvdGFsVGltZSA9IDMxO1xyXG4gICAgICAgIGdhbWUudGltZUVsYXBzZWQgPSAwO1xyXG4gICAgICAgIGdhbWUuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgIGdhbWUubGV2ZWxXaW5zKys7XHJcbiAgICAgICAgZ2FtZS50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgICAgICBnYW1lLndvcmxkLmFkZENoaWxkQXQoZ2FtZS53aW5kb3dXaW4sIGdhbWUud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMud2luZG93RmFpbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnd2luZG93RmFpbCcpO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLndpZHRoLzIgOiB0aGlzLndvcmxkLndpZHRoLzQgKyAyMDtcclxuICAgIHRoaXMud2luZG93RmFpbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQvMiA6IHRoaXMud29ybGQuaGVpZ2h0LzQgKyAzMDtcclxuICAgIHRoaXMud2luZG93RmFpbC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud2luZG93RmFpbC5zY2FsZS5zZXRUbygwLjUpIDogdGhpcy53aW5kb3dGYWlsLnNjYWxlLnNldFRvKDAuODcsIDAuOSk7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMud2luZG93RmFpbC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMud2luZG93RmFpbC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG5cclxuICAgIHZhciByZXBseSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnbmV4dC1sZXZlbCcpO1xyXG4gICAgcmVwbHkueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyAyICsgdGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDQgIC0gcmVwbHkuaGVpZ2h0IDogKHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyA0ICkgKyByZXBseS5oZWlnaHQgLyAyIDtcclxuICAgIHJlcGx5LmFuY2hvci5zZXQoMC41KTtcclxuICAgIHJlcGx5LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICByZXBseS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuYWRkQ2hpbGQocmVwbHkpO1xyXG5cclxuICAgIHZhciBnYW1lID0gdGhpcztcclxuICAgIHJlcGx5LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLndpbmRvd0ZhaWwudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzdG9yZVB1enpsZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDMxO1xyXG4gICAgICAgIHRoaXMudGltZUVsYXBzZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAzMTtcclxuICAgICAgICBnYW1lLnRpbWVyLnRpbWVyLnJlc3VtZSgpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgIHRoaXMuZmFpbFN0YXRlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdmYWlsLXBvcHVwJyk7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLndpZHRoLzIgOiB0aGlzLndvcmxkLndpZHRoLzQgKyAyMDtcclxuICAgdGhpcy5mYWlsU3RhdGUueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuaGVpZ2h0LzIgOiB0aGlzLndvcmxkLmhlaWdodC80ICsgMzA7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID90aGlzLmZhaWxTdGF0ZS5zY2FsZS5zZXRUbygwLjUpIDp0aGlzLmZhaWxTdGF0ZS5zY2FsZS5zZXRUbygwLjMpO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgdGhpcy5mYWlsU3RhdGUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgIHZhciByZXBseUxldmVsID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdyZXBseScpO1xyXG4gICByZXBseUxldmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gMiArIHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyA0ICAtIHJlcGx5TGV2ZWwuaGVpZ2h0IDogKHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyA0ICkgKyByZXBseUxldmVsLmhlaWdodCA7XHJcbiAgIHJlcGx5TGV2ZWwuYW5jaG9yLnNldCgwLjUpO1xyXG4gICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAgcmVwbHlMZXZlbC5zY2FsZS5zZXQoMSkgOiByZXBseUxldmVsLnNjYWxlLnNldCgxKTtcclxuICAgcmVwbHlMZXZlbC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICByZXBseUxldmVsLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG5cclxuICAgdGhpcy5mYWlsU3RhdGUuYWRkQ2hpbGQocmVwbHlMZXZlbCk7XHJcblxyXG4gICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgIHJlcGx5TGV2ZWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIGdhbWUuZmFpbFN0YXRlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBnYW1lLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZ2FtZS50b3RhbFRpbWUgPSAzMTtcclxuICAgICAgICBnYW1lLnRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICBnYW1lLmN1cnJlbnRUaW1lID0gMzE7XHJcbiAgICAgICAgZ2FtZS5nYW1lLnN0YXRlLnJlc3RhcnQoKTtcclxuICAgICAgICBnYW1lLnRpbWVyLnRpbWVyLnJlc3VtZSgpO1xyXG4gICB9LHRoaXMpO1xyXG4gfTtcclxuXHJcbiBQbGF5U3RhdGUucHJvdG90eXBlLmF1ZGlvTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmlzTXV0ZSkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ubG9hZFRleHR1cmUoJ211dGUnLDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zb3VuZC5tdXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzTXV0ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLmxvYWRUZXh0dXJlKCdzb3VuZCcsMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnNvdW5kLm11dGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTXV0ZSA9IHRydWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNoZWNrVGltZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgdGltZURpZmZlcmVuY2UgPSB0aGlzLnN0YXJ0VGltZS5nZXRUaW1lKCkgLSBjdXJyZW50VGltZS5nZXRUaW1lKCk7XHJcblxyXG4gICAgLy9UaW1lIGVsYXBzZWQgaW4gc2Vjb25kc1xyXG4gICAgdGhpcy50aW1lRWxhcHNlZCA9IE1hdGguYWJzKHRpbWVEaWZmZXJlbmNlIC8gMTAwMCk7XHJcblxyXG4gICAgLy9UaW1lIHJlbWFpbmluZyBpbiBzZWNvbmRzXHJcbiAgICB2YXIgdGltZVJlbWFpbmluZyA9IHRoaXMudG90YWxUaW1lIC0gdGhpcy50aW1lRWxhcHNlZDtcclxuXHJcbiAgICAvL0NvbnZlcnQgc2Vjb25kcyBpbnRvIG1pbnV0ZXMgYW5kIHNlY29uZHNcclxuICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lUmVtYWluaW5nIC8gNjApO1xyXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmZsb29yKHRpbWVSZW1haW5pbmcpIC0gKDYwICogbWludXRlcyk7XHJcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcclxuXHJcbiAgICAvL0Rpc3BsYXkgbWludXRlcywgYWRkIGEgMCB0byB0aGUgc3RhcnQgaWYgbGVzcyB0aGFuIDEwXHJcbiAgICB2YXIgcmVzdWx0ID0gKG1pbnV0ZXMgPCAxMCkgPyBcIjBcIiArIG1pbnV0ZXMgOiBtaW51dGVzO1xyXG5cclxuICAgIC8vRGlzcGxheSBzZWNvbmRzLCBhZGQgYSAwIHRvIHRoZSBzdGFydCBpZiBsZXNzIHRoYW4gMTBcclxuICAgIHJlc3VsdCArPSAoc2Vjb25kcyA8IDEwKSA/IFwiOjBcIiArIHNlY29uZHMgOiBcIjpcIiArIHNlY29uZHM7XHJcblxyXG4gICAgaWYgKG1pbnV0ZXMgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5lbmRUaW1lID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMudGltZUxhYmVsLnRleHQgPSByZXN1bHQ7XHJcbn1cclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucGF1c2VNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuaXNQYXVzZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucGF1c2UubG9hZFRleHR1cmUoJ3BsYXknLCAwKTtcclxuICAgICAgICB0aGlzLmdhbWUucGF1c2VkID0gdGhpcy5pc1BhdXNlO1xyXG4gICAgICAgIHRoaXMudG90YWxUaW1lID0gdGhpcy5jdXJyZW50VGltZTtcclxuICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnBhdXNlKCk7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGF1c2UubG9hZFRleHR1cmUoJ3BhdXNlJywgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRoaXMuaXNQYXVzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgICAgICB0aGlzLmlzUGF1c2UgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlVGltZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRpbWVMYWJlbCA9IHRoaXMuZ2FtZS5hZGQudGV4dCgwLCAwLCBcIjAwOjAwXCIsIHtmb250OiBcIjRlbSBBbWVyaWNhbiBib2xkXCIsZmlsbDogXCIjMmIzZjY4XCJ9KTtcclxuICAgIHRoaXMudGltZUxhYmVsLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICB0aGlzLnRpbWVMYWJlbC5hbGlnbiA9ICdjZW50ZXInO1xyXG5cclxuXHJcbiAgICB0aGlzLnRpbWVMYWJlbC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMiArIHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDQgOiAgdGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMiAtIHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDQgKyB0aGlzLnRpbWVMYWJlbC5oZWlnaHQgLyAyO1xyXG4gICAgdGhpcy50aW1lTGFiZWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYmFyLmhlaWdodCAvIDIgOiB0aGlzLnRpbWVMYWJlbC5oZWlnaHQgLyAyO1xyXG59XHJcblxyXG4gUGxheVN0YXRlLnByb3RvdHlwZS5yZXN0b3JlUHV6emxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLl92VG90ZW1zTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5sb2FkVGV4dHVyZShTdHJpbmcoJ3QnICsgdGhpcy5sZXZlbCkgKyAnLW9uJywgMCk7XHJcbiAgICB0aGlzLl92VHJpYmFsTXVzaWNzW3RoaXMubGV2ZWwgLSAxXS5zdG9wKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl92QWxsUGllY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5fdkFsbFBpZWNlc1tpXS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdlBpZWNlc1B1enpsZSA9IFtdO1xyXG4gICAgdGhpcy5fdlBpZWNlc0Nsb25lcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLmxldmVsICE9PSA1KSB7XHJcbiAgICAgICAgdGhpcy5sZXZlbCsrO1xyXG4gICAgICAgIHZhciBpbmRleE11c2ljID0gdGhpcy5sZXZlbCAtIDE7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQaWVjZXMoKTtcclxuICAgICAgICB0aGlzLl92VHJpYmFsTXVzaWNzW2luZGV4TXVzaWNdLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnd2luJywgdHJ1ZSwgdHJ1ZSwgdGhpcy5sZXZlbFdpbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMud29ybGQuYWRkQ2hpbGRBdCh0aGlzLndpbmRvd1dpbiwgdGhpcy53b3JsZC5jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuIH07XHJcblxyXG4gUGxheVN0YXRlLnByb3RvdHlwZS5jcmVhdGVQaWVjZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgb2Zmc2V0QmFyID0gdGhpcy5iYXIuaGVpZ2h0ICsgMTA7XHJcbiAgICB2YXIgcXVhbnRpdHlQaWVjZXMgPSB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5xdWFudGl0eTtcclxuICAgIHRoaXMuX3ZBbGxQaWVjZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDw9IHF1YW50aXR5UGllY2VzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBTdHJpbmcoJ3QnICsgdGhpcy5sZXZlbCArICctJyArIGluZGV4KTtcclxuXHJcbiAgICAgICAgdmFyIHBpZWNlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsIG5hbWUpO1xyXG4gICAgICAgIHBpZWNlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgICAgIHBpZWNlLnNjYWxlLnNldFRvKHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnBpZWNlU2NhbGUueCwgIHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnBpZWNlU2NhbGUueSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZShwaWVjZSk7XHJcbiAgICAgICAgcGllY2UuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBwaWVjZS5wb3MgPSB7fTtcclxuICAgICAgICBwaWVjZS5hbHBoYSA9IDA7XHJcbiAgICAgICAgcGllY2UudGludD0gMHhlZWUwY2E7XHJcblxyXG4gICAgICAgIHZhciBvZmZzZXRPYmogPSBnZXRPZmZzZXRCeUx2bChvZmZzZXRCYXIsIHRoaXMubGV2ZWwpO1xyXG4gICAgICAgIHZhciBpbml0aWFsUG9zUGllY2UgPSBpbml0aWFsUG9zaXRpb25CeUx2bChwaWVjZSwgdGhpcy5sZXZlbCwgaW5kZXgpO1xyXG4gICAgICAgIHZhciBpbml0aWFsUG9zQ2xvbmUgPSBpbml0aWFsUG9zaXRpb24ocGllY2UsIHRoaXMubGV2ZWwsIGluZGV4KTtcclxuXHJcbiAgICAgICAgcGllY2UueCA9IGluaXRpYWxQb3NQaWVjZS54O1xyXG4gICAgICAgIHBpZWNlLnkgPSBpbml0aWFsUG9zUGllY2UueTtcclxuXHJcbiAgICAgICAgcGllY2UueCArPSBvZmZzZXRPYmoueDtcclxuICAgICAgICBwaWVjZS55ICs9IG9mZnNldE9iai55O1xyXG5cclxuICAgICAgICBsZXQgeDEgPSBpbml0aWFsUG9zQ2xvbmUueDtcclxuICAgICAgICBsZXQgeTEgPSBpbml0aWFsUG9zQ2xvbmUueTtcclxuXHJcbiAgICAgICAgeDEgKz0gb2Zmc2V0T2JqLng7XHJcbiAgICAgICAgeTEgKz0gb2Zmc2V0T2JqLnk7XHJcblxyXG4gICAgICAgIGxldCBwaWVjZUNsb24gPSB0aGlzLmFkZC5zcHJpdGUoeDEsIHkxLCBuYW1lKTtcclxuICAgICAgICBwaWVjZUNsb24uYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICAgICAgcGllY2VDbG9uLnNjYWxlLnNldFRvKHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnBpZWNlU2NhbGUueCwgIHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnBpZWNlU2NhbGUueSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBoeXNpY3MuYXJjYWRlLmVuYWJsZShwaWVjZUNsb24pO1xyXG5cclxuICAgICAgICBwaWVjZUNsb24ucGFyZW50SW5kZXggPSBwaWVjZS5pbmRleDtcclxuICAgICAgICBwaWVjZUNsb24uaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwaWVjZUNsb24uaW5wdXQuZW5hYmxlRHJhZygpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5vcmlnaW5hbFBvc2l0aW9uID0gcGllY2VDbG9uLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgcGllY2VDbG9uLmlucHV0LmVuYWJsZVNuYXAocGllY2VDbG9uLndpZHRoLCBwaWVjZUNsb24uaGVpZ2h0LCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgcGllY2VDbG9uLmV2ZW50cy5vbkRyYWdTdG9wLmFkZChmdW5jdGlvbihjdXJyZW50U3ByaXRlKXtcclxuICAgICAgICAgICAgdGhpcy5zdG9wRHJhZyhjdXJyZW50U3ByaXRlKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdlBpZWNlc1B1enpsZS5wdXNoKHBpZWNlKTtcclxuICAgICAgICB0aGlzLl92QWxsUGllY2VzLnB1c2gocGllY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZBbGxQaWVjZXMucHVzaChwaWVjZUNsb24pO1xyXG4gICAgfVxyXG4gfTtcclxuXHJcbiBQbGF5U3RhdGUucHJvdG90eXBlLnN0b3BEcmFnID0gIGZ1bmN0aW9uIChjdXJyZW50U3ByaXRlKSB7XHJcbiAgICAgICAgdmFyIHNjb3BlID0gdGhpcztcclxuICAgICAgICB2YXIgZW5kU3ByaXRlID0gdGhpcy5fdlBpZWNlc1B1enpsZVtjdXJyZW50U3ByaXRlLnBhcmVudEluZGV4IC0gMV07XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcChjdXJyZW50U3ByaXRlLCBlbmRTcHJpdGUsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGN1cnJlbnRTcHJpdGUuaW5wdXQuZHJhZ2dhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgc2NvcGUuX3ZQaWVjZXNDbG9uZXMucHVzaChjdXJyZW50U3ByaXRlKTtcclxuICAgICAgICBjdXJyZW50U3ByaXRlLnBvc2l0aW9uLmNvcHlGcm9tKGVuZFNwcml0ZS5wb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFNwcml0ZS5hbmNob3Iuc2V0VG8oZW5kU3ByaXRlLmFuY2hvci54LCBlbmRTcHJpdGUuYW5jaG9yLnkpO1xyXG4gICAgICB9KSkge1xyXG4gICAgICAgIGN1cnJlbnRTcHJpdGUucG9zaXRpb24uY29weUZyb20oY3VycmVudFNwcml0ZS5vcmlnaW5hbFBvc2l0aW9uKTtcclxuICAgICB9XHJcbiB9O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICggKHRoaXMuX3ZQaWVjZXNDbG9uZXMgJiYgIHRoaXMuX3ZQaWVjZXNDbG9uZXMubGVuZ3RoID49IHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHNbdGhpcy5sZXZlbCAtIDFdLnF1YW50aXR5KSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxldmVsID49IDUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3dpbicsIHRydWUsIHRydWUsIHRoaXMubGV2ZWxXaW5zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd1dpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50aW1lci50aW1lci5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93V2luLnZpc2libGUgPT09IGZhbHNlICYmIHRoaXMubGV2ZWwgPCA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGRBdCh0aGlzLndpbmRvd0ZhaWwsIHRoaXMud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIHRoaXMud2luZG93RmFpbC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbFdpbnMgPD0gMSAmJiB0aGlzLmxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYWRkQ2hpbGRBdCh0aGlzLmZhaWxTdGF0ZSwgdGhpcy53b3JsZC5jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFpbFN0YXRlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lci50aW1lci5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsV2lucy0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnd2luJywgdHJ1ZSwgdHJ1ZSwgdGhpcy5sZXZlbFdpbnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBQbGF5U3RhdGU7XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsUG9zaXRpb25CeUx2bCAocGllY2UsIGxldmVsLCBpbmRleCkge1xyXG4gICAgdmFyIHZQb3NpdGlvbnNJbml0aWFsO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICBpZiAobGV2ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjUsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogMn0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS41LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS41LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS41LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC4xLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjEsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuMSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuMSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuMSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDUpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYuMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDEuNCwgeTogcGllY2UuaGVpZ2h0ICogMi4zNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNCwgeTogcGllY2UuaGVpZ2h0ICogMi4zNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDEuNCwgeTogcGllY2UuaGVpZ2h0ICogMy4zNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNCwgeTogcGllY2UuaGVpZ2h0ICogMy4zNSB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi40LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy40LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi40LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy40LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi40LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy40LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogMi4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDMuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogMy4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiA0LjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDQuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogNS4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiA1LjMgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogMi44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiAyLjggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDMuOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDQuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogNC44IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogNS44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiA1LjggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiA2LjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDYuOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDcuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogNy44IH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2UG9zaXRpb25zSW5pdGlhbFtpbmRleCAtIDFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0aWFsUG9zaXRpb24gKHBpZWNlLCBsZXZlbCwgaW5kZXgpIHtcclxuICAgIHZhciB2UG9zaXRpb25zSW5pdGlhbDtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMn0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDQgfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDcsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA3LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDEgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiA2IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobGV2ZWwgPT09IDEpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDYuNSB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDQpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogMS41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDEuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogMS41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNSwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDcgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAxLjUsIHk6IHBpZWNlLmhlaWdodCAqIDcgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA3IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiA3IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDUpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogNyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDkgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogOSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDkgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAxMSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogOCB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2UG9zaXRpb25zSW5pdGlhbFtpbmRleCAtIDFdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPZmZzZXRCeUx2bCAob2Zmc2V0LCBsZXZlbCkge1xyXG4gICAgdmFyIHggPSAwO1xyXG4gICAgdmFyIHkgPSAwO1xyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeSA9IC0ob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQgLyAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSAob2Zmc2V0IC8gNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IG9mZnNldDtcclxuICAgICAgICAgICAgeSA9IC0ob2Zmc2V0IC8gMiAtIDEwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gLW9mZnNldCAtIDMwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDMpIHtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHkgPSAtKG9mZnNldCAvIDIpO1xyXG4gICAgICAgICAgICB4ID0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSAtb2Zmc2V0IC0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgaWYgKCFQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IC0ob2Zmc2V0IC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICAgICAgeCA9IDEwO1xyXG4gICAgICAgICAgICB5ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB5ID0gKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgeCwgeSB9O1xyXG59XHJcbiIsImZ1bmN0aW9uIFR1dG9yaWFsU3RhdGUoKSB7XHJcblx0UGhhc2VyLlN0YXRlLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKiBAdHlwZSBQaGFzZXIuU3RhdGUgKi9cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUgPSAgT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUdXRvcmlhbFN0YXRlO1xyXG5cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHR0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICB0aGlzLnBvcHVwID0gbnVsbDtcclxufTtcclxuXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbG9hZFN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6ICc3ZW0gVGltZXMgUm9tYW4nLFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgbG9hZFRleHRZID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gMzAwIDogdGhpcy53b3JsZC5jZW50ZXJZO1xyXG4gICAgdmFyIGxvYWRUZXh0ID0gdGhpcy5hZGQudGV4dCgwLCAwLCAnJywgbG9hZFN0eWxlKTtcclxuICAgIGxvYWRUZXh0LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBsb2FkVGV4dFkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyO1xyXG4gICAgbG9hZFRleHQueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuICAgIGxvYWRUZXh0LmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIHZhciBsb2RpbmdCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDAsNTAwLDMwMCwzMCwxMCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmVuZEZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKGZ1bmN0aW9uKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpe1xyXG4gICAgICAgIGxvYWRUZXh0LnNldFRleHQocHJvZ3Jlc3MrJyUnKTtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2FkID0gcHJvZ3Jlc3MgKyAxOTQ7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuYmVnaW5GaWxsKCcweDJiM2Y2OCcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDMsNTAxLGxvYWQsMjcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmVuZEZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MScsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAxLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MicsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAyLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MycsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDAzLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93NCcsICdhc3NldHMvdHV0b3JpYWwvdmVudGFuYS10dXRvcmlhbDA0LmpwZycpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cxJywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDAxLW1ibC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzInLCAnYXNzZXRzL3R1dG9yaWFsL21vYmlsZS92ZW50YW5hLXR1dG9yaWFsMDItbWJsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MycsICdhc3NldHMvdHV0b3JpYWwvbW9iaWxlL3ZlbnRhbmEtdHV0b3JpYWwwMy1tYmwuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3c0JywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDA0LW1ibC5qcGcnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0cmVldCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQnLCAnYXNzZXRzL3R1dG9yaWFsL25leHQuanBnJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Nsb3NlJywnYXNzZXRzL3R1dG9yaWFsL2Nsb3NlLmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdidXR0b24tcGxheScsJ2Fzc2V0cy90dXRvcmlhbC9idXR0b24tcGxheS5qcGcnKTtcclxuXHJcbn07XHJcblxyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnN0cmVldCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCdzdHJlZXQnKTtcclxuICAgIHRoaXMuc3RyZWV0LnNjYWxlLnNldFRvKDAuNyk7XHJcblxyXG4gICAgdmFyIHBvcHVwID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICd3aW5kb3cxJyk7XHJcbiAgICBpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgICAgIHBvcHVwLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMTU7XHJcbiAgICAgICAgcG9wdXAueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWSA6IHRoaXMud29ybGQuY2VudGVyWSAvIDIgKyAzMDtcclxuICAgICAgICBwb3B1cC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBwb3B1cC5zY2FsZS5zZXRUbygwLjcpIDogcG9wdXAuc2NhbGUuc2V0VG8oMC4yNik7XHJcbiAgICAgICAgcG9wdXAuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cdFx0XHRwb3B1cC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogIHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuXHRcdFx0cG9wdXAueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWSA6ICB0aGlzLndvcmxkLmNlbnRlclkgLyAyICsgNDA7XHJcblx0XHRcdHBvcHVwLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0XHRQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBwb3B1cC5zY2FsZS5zZXRUbygwLjMpIDogcG9wdXAuc2NhbGUuc2V0KDAuMyk7XHJcblx0XHRcdHBvcHVwLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9rID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICduZXh0Jyk7XHJcbiAgICBvay5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHRcdGlmKFBoYXNlci5EZXZpY2UuZGVza3RvcCl7XHJcblx0XHRQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBvay5zY2FsZS5zZXQoMSkgOiBvay5zY2FsZS5zZXQoMik7XHJcblx0ICAgIG9rLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblx0ICAgIG9rLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG5cdCAgICBwb3B1cC5hZGRDaGlsZChvayk7XHJcblx0ICAgIG9rLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAocG9wdXAuaGVpZ2h0IC8gMikgOiBwb3B1cC5oZWlnaHQgKyAocG9wdXAuaGVpZ2h0IC8gNik7XHJcblx0ICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgIH0gZWxzZSB7XHJcblx0XHRQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBvay5zY2FsZS5zZXQoMS4yKSA6IG9rLnNjYWxlLnNldCgyKTtcclxuXHQgICAgb2suaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuXHQgICAgb2suaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICAgICAgcG9wdXAuYWRkQ2hpbGQob2spO1xyXG5cdCAgICBvay55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gKHBvcHVwLmhlaWdodCAvIDIpIDogcG9wdXAuaGVpZ2h0ICsgKHBvcHVwLmhlaWdodCAvIDMpO1xyXG5cdCAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsb3NlID0gdGhpcy5hZGQuc3ByaXRlKDMyNSwgMjAsICdjbG9zZScpO1xyXG5pZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gY2xvc2Uuc2NhbGUuc2V0KDEpIDogY2xvc2Uuc2NhbGUuc2V0KDEpO1xyXG4gICAgY2xvc2UuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIGNsb3NlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgcG9wdXAuYWRkQ2hpbGQoY2xvc2UpO1xyXG4gICAgY2xvc2UueCA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAocG9wdXAud2lkdGggLyAyKSArIGNsb3NlLndpZHRoIDogcG9wdXAud2lkdGggKyBjbG9zZS53aWR0aCAtIDI1O1xyXG4gICAgY2xvc2UueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IC1wb3B1cC5oZWlnaHQgLyAyIDogLXBvcHVwLmhlaWdodCAqIDIgKyBjbG9zZS5oZWlnaHQgKiAyIC0gY2xvc2UuaGVpZ2h0O1xyXG59IGVsc2V7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBjbG9zZS5zY2FsZS5zZXQoMC41KSA6IGNsb3NlLnNjYWxlLnNldCgwLjUpO1xyXG5cdFx0Y2xvc2UuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIGNsb3NlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG59XHJcblxyXG4gICAgY2xvc2UuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ1BsYXknKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICAgb2suZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy50dXRvcmlhbFBhcnQpIHtcclxuICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLmxvYWRUZXh0dXJlKCd3aW5kb3cyJywwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzMnLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMyA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5sb2FkVGV4dHVyZSgnd2luZG93NCcsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0IDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1BsYXknKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LCB0aGlzKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVHV0b3JpYWxTdGF0ZTtcclxuIiwiZnVuY3Rpb24gV2luU3RhdGUoKSB7XHJcblx0UGhhc2VyLlN0YXRlLmNhbGwodGhpcyk7XHJcbn1cclxuXHJcbi8qKiBAdHlwZSBQaGFzZXIuU3RhdGUgKi9cclxuV2luU3RhdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuV2luU3RhdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gV2luU3RhdGU7XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChsZXZlbCkge1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgbXNnRXRobmljcyA9IFtcclxuICAgICAgICAgICAgXCJFcmVzIGZ1ZXJ0ZSwgcG9kZXJvc2EgeSBub2JsZS4gQ2FyYWN0ZXLDrXN0aWNhcyBkZSBsb3MgcmV5ZXMgeSBnb2Jlcm5hbnRlcy5cIixcclxuICAgICAgICAgICAgXCJIYXMgbG9ncmFkbyBmb3J0YWxlY2VyIHR1IGVzcMOtcml0dSBkZSBpbmRlcGVuZGVuY2lhIHkgYXZlbnR1cmEuXCIsXHJcbiAgICAgICAgICAgIFwiVHUgcGVyc2V2ZXJhbmNpYSBlbiBsYSBsdWNoYSwgYXBvcnRhIGVuZXJnw61hIGV4dHJhIGEgdG9kb3MgbG9zIHR1eW9zLiBcXG4gbG9ncmFzdGUgY29ucXVpc3RhciBsb3MgZXNww61yaXR1cyDDqXRuaWNvcyBxdWUgYXRyYWVuIHkgbWFudGllbmVuIGFtaWdvcy5cIixcclxuICAgICAgICAgICAgXCJMb3MgZXNww61yaXR1cyDDqXRuaWNvcyBub3MgZGljZW4gcXVlIGVyZXMgZGUgbGFzIHF1ZSBzYWxlbiBkZSB0b2RhcyBsYXMgZGlmaWN1bHRhZGVzIGNvbiBhcnRlIHkgZWxlZ2FuY2lhLlwiLFxyXG4gICAgICAgICAgICBcIlZlcyBsYSB2aWRhIGRlc2RlIHVuYSBwZXJzcGVjdGl2YSBtw6FzIHNhYmlhIHkgZWxldmFkYS4gXFxuIGhhcyBsb2dyYWRvIGNvbXByZW5kZXIgdHUgZGVzdGlubyB5IGxvcyBjaWNsb3Mgdml2aWRvcy5cIlxyXG4gICAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBtc2dFdGhuaWNzID0gW1xyXG4gICAgICAgICAgICBcIkVyZXMgZnVlcnRlLCBwb2Rlcm9zYSB5IG5vYmxlLiBcXG4gQ2FyYWN0ZXLDrXN0aWNhcyBkZSBsb3MgcmV5ZXMgeSBnb2Jlcm5hbnRlcy5cIixcclxuICAgICAgICAgICAgXCJIYXMgbG9ncmFkbyBmb3J0YWxlY2VyIHR1IGVzcMOtcml0dSBcXG4gZGUgaW5kZXBlbmRlbmNpYSB5IGF2ZW50dXJhLlwiLFxyXG4gICAgICAgICAgICBcIlR1IHBlcnNldmVyYW5jaWEgZW4gbGEgbHVjaGEsIGFwb3J0YSAgXFxuIGVuZXJnw61hIGV4dHJhIGEgdG9kb3MgbG9zIHR1eW9zLiBcXG4gbG9ncmFzdGUgY29ucXVpc3RhciBsb3MgZXNww61yaXR1cyDDqXRuaWNvcyBcXG4gcXVlIGF0cmFlbiB5IG1hbnRpZW5lbiBhbWlnb3MuXCIsXHJcbiAgICAgICAgICAgIFwiTG9zIGVzcMOtcml0dXMgw6l0bmljb3Mgbm9zIGRpY2VuIHF1ZSAgXFxuIGVyZXMgZGUgbGFzIHF1ZSBzYWxlbiBkZSB0b2RhcyBcXG4gbGFzIGRpZmljdWx0YWRlcyBjb24gYXJ0ZSB5IGVsZWdhbmNpYS5cIixcclxuICAgICAgICAgICAgXCJWZXMgbGEgdmlkYSBkZXNkZSB1bmEgcGVyc3BlY3RpdmEgbcOhcyBzYWJpYSB5IGVsZXZhZGEuIFxcbiBoYXMgbG9ncmFkbyBjb21wcmVuZGVyIHR1IGRlc3Rpbm8geSBsb3MgY2ljbG9zIHZpdmlkb3MuXCJcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkaXNjb3VudE9iaiA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAwLCB3b3JkczogW1xyXG4gICAgICAgICAgICAgICAgXCJOYWRhXCIsIFwiTmFkYVwiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzY291bnQ6IDE1LCB3b3JkczogW1xyXG4gICAgICAgICAgICAgICAgXCJNw6FzY2FyYXNcIiwgXCJNYWRlcmFcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAyMCwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiRmVzdGVqb1wiLCBcIlBsdW1hc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzY291bnQ6IDI1LCB3b3JkczogW1xyXG4gICAgICAgICAgICAgICAgXCJNw7pzaWNhXCIsIFwiSW5kaW9zXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5sZXZlbCA9IHBhcnNlSW50KGxldmVsKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMubGV2ZWwpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAxNTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMjA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDIwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAyNTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRpc2NvdW50T2JqLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkaXNjb3VudE9ialtpbmRleF07XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmRpc2NvdW50ID09IHRoaXMuZGlzY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy53b3JkID0gZWxlbWVudC53b3Jkc1t0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIDEpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXNnID0gbXNnRXRobmljc1t0aGlzLmdhbWUucm5kLmludGVnZXJJblJhbmdlKDAsIDQpXTtcclxufTtcclxuXHJcbldpblN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtYnJvd24uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cnLCdhc3NldHMvcG9wdXBzL3dpbmRvdy13aW4uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdG9yZScsICdhc3NldHMvYnV0dG9ucy9zdG9yZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Jvb3QnLCAnYXNzZXRzL2J1dHRvbnMvYm9vdC5wbmcnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYWNrZ3JvdW5kJywnYXNzZXRzL2JhY2tncm91bmQvbW9iaWxlL2JhY2tncm91bmQtYnJvd24uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cnLCdhc3NldHMvcG9wdXBzL21vYmlsZS93aW5kb3dXaW4uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdzdG9yZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9ib290LnBuZycpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuV2luU3RhdGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2JhY2tncm91bmQnKTtcclxuICB2YXIgd2luZG93ID0gdGhpcy5hZGQuc3ByaXRlKDAsMCwnd2luZG93Jyk7XHJcbiAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gd2luZG93LnNjYWxlLnNldCgwLjczKSA6IHdpbmRvdy5zY2FsZS5zZXQoMC4yOSwgMC4yOTEpO1xyXG4gIHdpbmRvdy55ID0gMDtcclxuICB3aW5kb3cueCA9IDA7XHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIGJvbm9TdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzJlbSBBbWVyaWNhbiBCb2xkJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgZGlzY291bnRTdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzVlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHdvcktleSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzVlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGxlZ2FsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcyLjJlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGJvbm9TdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzFlbSBBbWVyaWNhbiBCb2xkJyxcclxuICAgICAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgZGlzY291bnRTdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzNlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHdvcktleSA9IHtcclxuICAgICAgICAgICAgZm9udDogJzNlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGxlZ2FsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcxLjJlbSBBbWVyaWNhbicsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJ0bkJvb3QgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ2Jvb3QnKTtcclxuICAgIHRoaXMuYnRuQm9vdC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gNTAgOiAodGhpcy5nYW1lLndvcmxkLndpZHRoIC8gMikgKyAxMDtcclxuICAgIHRoaXMuYnRuQm9vdC55ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA1MCA6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyICsgMzAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICAgdGhpcy5idG5Cb290LmFuY2hvci5zZXQoMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC41KSA6dGhpcy5idG5Cb290LnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5idG5Cb290LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmJ0bkJvb3QuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLmJ0bkJvb3QuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbiAgICAgfSx0aGlzKTtcclxuXHJcbiAgICAgdGhpcy5idG5TdG9yZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnc3RvcmUnKTtcclxuICAgICB0aGlzLmJ0blN0b3JlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gNTAgOiAzNTtcclxuICAgICB0aGlzLmJ0blN0b3JlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwIC8qIHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyIC0gMzAgKi87XHJcbiAgICAgdGhpcy5idG5TdG9yZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gIHRoaXMuYnRuU3RvcmUuc2NhbGUuc2V0KDAuNSkgOiB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgIHRoaXMuYnRuU3RvcmUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICB0aGlzLmJ0blN0b3JlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG5cclxuICAgICB0aGlzLmJ0blN0b3JlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSBcImh0dHBzOi8vd3d3LmFtZXJpY2FuaW5vLmNvbS9cIjtcclxuICAgICB9LHRoaXMpO1xyXG5cclxuICAgIHZhciBnZW5lcmFsWCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQud2lkdGggLyAyIDogdGhpcy53b3JsZC53aWR0aCAvIDQgKyAyMDtcclxuICAgIHZhciB0ZXh0Zmlyc3QgPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJywgbGVnYWxTdHlsZSk7XHJcbiAgICB0ZXh0Zmlyc3QueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuaGVpZ2h0IC8gMi41IDogdGhpcy53b3JsZC5oZWlnaHQgLyA1O1xyXG4gICAgdGV4dGZpcnN0LnRleHQgPSBcIkxvZ3Jhc3RlIGxpYmVyYXIgYSBsb3MgZXNwcml0aXR1cyBldG5pY29zLlwiO1xyXG4gICAgdGV4dGZpcnN0LmFuY2hvci5zZXRUbygwLjUsMCk7XHJcblxyXG5cclxuICAgIHZhciBkaXNjb3VudFRleHQgPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyxkaXNjb3VudFN0eWxlKTtcclxuICAgIGRpc2NvdW50VGV4dC55ID0gdGV4dGZpcnN0LnkgKyBkaXNjb3VudFRleHQuaGVpZ2h0IC8gMztcclxuICAgIGRpc2NvdW50VGV4dC50ZXh0ID0gdGhpcy5kaXNjb3VudCtcIiVcIjtcclxuICAgIGRpc2NvdW50VGV4dC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuICAgIHZhciB0ZXh0Qm9ubyA9IHRoaXMuYWRkLnRleHQoZ2VuZXJhbFgsIDAsICcnLGJvbm9TdHlsZSk7XHJcbiAgICB0ZXh0Qm9uby55ID0gZGlzY291bnRUZXh0LnkgKyB0ZXh0Qm9uby5oZWlnaHQgKyAxNTtcclxuICAgIHRleHRCb25vLmFuY2hvci5zZXRUbygwLjUsMCk7XHJcbiAgICB0ZXh0Qm9uby50ZXh0ID0gXCJSZWNpYmUgdW4gYm9ubyBkZSBkZXNjdWVudG8gZW4gY3VhbHF1aWVyIHByb2R1Y3RvIGRlIG51ZXN0cmFzIHRpZW5kYXMuXCI7XHJcblxyXG4gICAgdmFyIHdvcmQgPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyx3b3JLZXkpO1xyXG4gICAgd29yZC55ID0gIHRleHRCb25vLnkgKyB3b3JkLmhlaWdodCAvIDQ7XHJcbiAgICB3b3JkLnRleHQgPSBTdHJpbmcodGhpcy53b3JkKTtcclxuICAgIHdvcmQuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbiAgICB2YXIgbXNnID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsbGVnYWxTdHlsZSk7XHJcbiAgICBtc2cueSA9ICB3b3JkLnkgKyBtc2cuaGVpZ2h0ICsgMTU7XHJcbiAgICBtc2cudGV4dCA9IFN0cmluZyh0aGlzLm1zZyk7XHJcbiAgICBtc2cuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbn07XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV2luU3RhdGU7XHJcbiIsIi8vIFBIQVNFUiBJUyBJTVBPUlRFRCBBUyBBTiBFWFRFUk5BTCBCVU5ETEUgSU4gSU5ERVguSFRNTFxyXG5QaGFzZXIuRGV2aWNlLndoZW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIFBsYXlTdGF0ZSAgPSByZXF1aXJlKCcuL1BsYXlTdGF0ZScpO1xyXG4gIHZhciBXaW5TdGF0ZSAgPSByZXF1aXJlKCcuL1dpblN0YXRlJyk7XHJcbiAgdmFyIFR1dG9yaWFsU3RhdGUgID0gcmVxdWlyZSgnLi9UdXRvcmlhbFN0YXRlJyk7XHJcblxyXG4gIGlmICghUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2NDAsIDExNTIsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnNldE1pbk1heCg2NDAsIDExNTIpO1xyXG4gICAgZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMTUyLCA2NDAsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnNldE1pbk1heCgxMTUyLCA2NDApO1xyXG4gICAgZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLmZvcmNlT3JpZW50YXRpb24oZmFsc2UsIHRydWUpO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBnYW1lLnN0YXRlLmFkZCgnUGxheScsICAgUGxheVN0YXRlKTtcclxuICBnYW1lLnN0YXRlLmFkZCgnd2luJywgICBXaW5TdGF0ZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ1R1dG9yaWFsJywgICBUdXRvcmlhbFN0YXRlKTtcclxuXHJcbiAgZ2FtZS5zdGF0ZS5zdGFydCgnVHV0b3JpYWwnKTtcclxufSlcclxuIl19
