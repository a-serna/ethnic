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
    this.currentTime = 21;
    this.levelWins = 1;

    this.startTime = new Date();
    this.totalTime = 21;
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
    this.totalTime = 21;
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
        game.totalTime = 21;
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
        this.totalTime = 21;
        this.timeElapsed = 0;
        this.currentTime = 21;
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
        game.totalTime = 21;
        game.timeElapsed = 0;
        game.currentTime = 21;
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
        piece.alpha = 0.003;
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
        var boundsA = currentSprite.getBounds();
        boundsA.width = 30;
        boundsA.height = 30;
        var boundsB = endSprite.getBounds();
        boundsB.width = 30;
        boundsB.height = 30;
        if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
            currentSprite.input.draggable = false;
            scope._vPiecesClones.push(currentSprite);
            currentSprite.position.copyFrom(endSprite.position); 
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
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
                "Mascaras", "Madera"
            ]
        },
        {
            discount: 20, words: [
                "Festejo", "Plumas"
            ]
        },
        {
            discount: 25, words: [
                "Musica", "Indios"
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
    textBono.text = "Recibe un bono de descuento en referencias seleccionadas.";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0hPTUUvQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvcGhhc2VyLW5vZGUta2l0L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9QbGF5U3RhdGUuanMiLCJidWlsZC9qcy9UdXRvcmlhbFN0YXRlLmpzIiwiYnVpbGQvanMvV2luU3RhdGUuanMiLCJidWlsZC9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy81QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImZ1bmN0aW9uIFBsYXlTdGF0ZSgpIHtcclxuXHRQaGFzZXIuU3RhdGUuY2FsbCh0aGlzKTtcclxufVxyXG5cclxuLyoqIEB0eXBlIFBoYXNlci5TdGF0ZSAqL1xyXG5QbGF5U3RhdGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQaGFzZXIuU3RhdGUucHJvdG90eXBlKTtcclxuUGxheVN0YXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBsYXlTdGF0ZTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc011dGUgPSBmYWxzZTtcclxuICAgIHRoaXMuY3VycmVudFRpbWUgPSAyMTtcclxuICAgIHRoaXMubGV2ZWxXaW5zID0gMTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnRvdGFsVGltZSA9IDIxO1xyXG4gICAgdGhpcy50aW1lRWxhcHNlZCA9IDA7XHJcblxyXG4gICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVscyA9IFtcclxuICAgICAgICAgICAgeyBsZXZlbDogMSwgcXVhbnRpdHk6IDQgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNiwgeTogMC42IH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMiwgcXVhbnRpdHk6IDYgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNiwgeTogMC42IH0gfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogMywgcXVhbnRpdHk6IDggLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMSwgeTogMSB9LCBwaWVjZVNjYWxlOiB7IHg6IDAuNSwgeTogMC41IH0gIH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDQsIHF1YW50aXR5OiA5ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjYsIHk6IDAuNiB9ICB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiA1LCBxdWFudGl0eTogMTIgLCBiYWNrZ3JvdW5kU2NhbGU6IHsgeDogMC43LCB5OiAwLjcgfSwgcGllY2VTY2FsZTogeyB4OiAwLjUsIHk6IDAuNSB9ICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy50b3RlbUxldmVsU2NhbGUgPSB7IHg6IDAuOCwgeTogMC44IH07XHJcblxyXG4gICAgICAgIHRoaXMuYmFyU2NhbGUgPSB7IHg6IDAuNiwgeTogMC42IH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucXVhbnRpdHlQdXp6bGVMZXZlbHMgPSBbXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDEsIHF1YW50aXR5OiA0ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9IH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDIsIHF1YW50aXR5OiA2ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9IH0sXHJcbiAgICAgICAgICAgIHsgbGV2ZWw6IDMsIHF1YW50aXR5OiA4ICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9ICB9LFxyXG4gICAgICAgICAgICB7IGxldmVsOiA0LCBxdWFudGl0eTogOSAsIGJhY2tncm91bmRTY2FsZTogeyB4OiAxLCB5OiAxIH0sIHBpZWNlU2NhbGU6IHsgeDogMC4zLCB5OiAwLjMgfSAgfSxcclxuICAgICAgICAgICAgeyBsZXZlbDogNSwgcXVhbnRpdHk6IDEyICwgYmFja2dyb3VuZFNjYWxlOiB7IHg6IDAuMzUsIHk6IDAuMzUgfSwgcGllY2VTY2FsZTogeyB4OiAwLjMsIHk6IDAuMyB9ICB9XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdGhpcy50b3RlbUxldmVsU2NhbGUgPSB7IHg6IDAuOCwgeTogMC44IH07XHJcblxyXG4gICAgICAgIHRoaXMuYmFyU2NhbGUgPSB7IHg6IDAuNiwgeTogMC4zIH07XHJcbiAgICB9XHJcblxyXG4gIHRoaXMuX3ZQaWVjZXNQdXp6bGUgPSBbXTtcclxuICB0aGlzLl92UGllY2VzQ2xvbmVzID0gW107XHJcbn07XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbG9hZFN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6ICc3ZW0gVGltZXMgUm9tYW4nLFxyXG4gICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICBhbGlnbjogJ2NlbnRlcidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XHJcbiAgICB2YXIgbG9hZFRleHRZID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gMzAwIDogdGhpcy53b3JsZC5jZW50ZXJZO1xyXG4gICAgdmFyIGxvYWRUZXh0ID0gdGhpcy5hZGQudGV4dCgwLCAwLCAnJywgbG9hZFN0eWxlKTtcclxuICAgIGxvYWRUZXh0LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyBsb2FkVGV4dFkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyO1xyXG4gICAgbG9hZFRleHQueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuICAgIGxvYWRUZXh0LmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3NCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIHZhciBsb2RpbmdCYXIgPSB0aGlzLmFkZC5ncmFwaGljcygzMzAsIC0xNTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDAsNTAwLDMwMCwzMCwxMCk7XHJcbiAgICAgICAgbG9kaW5nQmFyLmVuZEZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKGZ1bmN0aW9uKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpe1xyXG4gICAgICAgIGxvYWRUZXh0LnNldFRleHQocHJvZ3Jlc3MrJyUnKTtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2FkID0gcHJvZ3Jlc3MgKyAxOTQ7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmxpbmVTdHlsZSgzLCAnMHgyYjNmNjgnKTtcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuYmVnaW5GaWxsKCcweDJiM2Y2OCcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmRyYXdSb3VuZGVkUmVjdCgxMDMsNTAxLGxvYWQsMjcsMSk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmVuZEZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAvLyBwaWVjZXNcclxuICAgIC8vIHB1enpsZSAxXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMS90b3RlbS0xLTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMS90b3RlbS0xLTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMS90b3RlbS0xLTMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QxLTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlMS90b3RlbS0xLTQucG5nJyk7XHJcblxyXG4gICAgLy8gcHV6emxlIDJcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItMS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItMicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItMi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItMycsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItNC5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItNScsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItNS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDItNicsICdhc3NldHMvcHV6emxlcy9wdXp6bGUyL3RvdGVtLTItNi5wbmcnKTtcclxuXHJcbiAgICAvLyBwdXp6bGUgM1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My0xJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy0xLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My0yJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy0yLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy0zLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My00JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy00LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My01JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy01LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My02JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy02LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My03JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy03LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0My04JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTMvdG90ZW0tMy04LnBuZycpO1xyXG5cclxuICAgIC8vIHB1enpsZSA0XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTEnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTMnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTMucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTQnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTYnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTYucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTcnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTcucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTgnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTgucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q0LTknLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNC90b3RlbS00LTkucG5nJyk7XHJcblxyXG4gICAgLy8gcHV6emxlIDVcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTInLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTAyLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0zJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wMy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtNCcsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTUnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA1LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS02JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wNi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtNycsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMDcucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTgnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTA4LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS05JywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0wOS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgndDUtMTAnLCAnYXNzZXRzL3B1enpsZXMvcHV6emxlNS90b3RlbS1uaXZlbC01LTEwLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0NS0xMScsICdhc3NldHMvcHV6emxlcy9wdXp6bGU1L3RvdGVtLW5pdmVsLTUtMTEucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LTEyJywgJ2Fzc2V0cy9wdXp6bGVzL3B1enpsZTUvdG90ZW0tbml2ZWwtNS0xMi5wbmcnKTtcclxuXHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQtYnJvd24uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdiYXInLCdhc3NldHMvYmFyL2Jhci13aGl0ZS5qcGcnKTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXMgbGV2ZWxzXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0MS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMS1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0Mi1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMi1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMy1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NC1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNC1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNS1vZmYucG5nJyk7XHJcblxyXG4gICAgICAgIC8vIGl0ZW1zIGxldmVsc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDEtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwMS1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDItb24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0My1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy90b3RlbS1uaXZlbDAzLW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDQtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvdG90ZW0tbml2ZWwwNC1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL3RvdGVtLW5pdmVsMDUtb24ucG5nJyk7XHJcblxyXG4gICAgICAgIC8vYmFja2dyb3VuZCB0b3RlbVxyXG5cdFx0dGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnYXNzZXRzL2J1dHRvbnMvc291bmQucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdtdXRlJywgJ2Fzc2V0cy9idXR0b25zL211dGUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdwYXVzZScsICdhc3NldHMvYnV0dG9ucy9wYXVzZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnYXNzZXRzL2J1dHRvbnMvcGxheS5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3dXaW4nLCAnYXNzZXRzL3BvcHVwcy9wb3B1cHNXaW4uanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3dGYWlsJywgJ2Fzc2V0cy9wb3B1cHMvcG9wdXBzRmFpbC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ25leHQtbGV2ZWwnLCAnYXNzZXRzL2J1dHRvbnMvbmV4dC1sZXZlbC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3JlcGx5JywgJ2Fzc2V0cy9idXR0b25zL3JlcGx5LmpwZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL3N0b3JlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm9vdCcsICdhc3NldHMvYnV0dG9ucy9ib290LnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1wb3B1cCcsICdhc3NldHMvcG9wdXBzL2ZhaWxXaW5kb3dzLmpwZycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9tb2JpbGUvYmFja2dyb3VuZC1icm93bi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhcicsJ2Fzc2V0cy9iYXIvbW9iaWxlL2Jhci13aGl0ZS5qcGcnKTtcclxuXHJcbiAgICAgICAgLy8gaXRlbXMgbGV2ZWxzXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0MS1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDEtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDItb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAyLW9mZi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QzLW9mZicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMy1vZmYucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NC1vZmYnLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDQtb2ZmLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDUtb2ZmJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA1LW9mZi5wbmcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0MS1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwMS1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3QyLW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDAyLW9uLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgndDMtb24nLCAnYXNzZXRzL3RvdGVtcy1sZXZlbHMvbW9iaWxlL3RvdGVtLW5pdmVsMDMtb24ucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0NC1vbicsICdhc3NldHMvdG90ZW1zLWxldmVscy9tb2JpbGUvdG90ZW0tbml2ZWwwNC1vbi5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3Q1LW9uJywgJ2Fzc2V0cy90b3RlbXMtbGV2ZWxzL21vYmlsZS90b3RlbS1uaXZlbDA1LW9uLnBuZycpO1xyXG5cclxuICAgICAgICAvL2JhY2tncm91bmQgdG90ZW1zXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd0b3RlbUNvbnRhaW5lcicsICdhc3NldHMvdG90ZW1zLWJhY2tncm91bmRzL3RvdGVtLWNvbnRhaW5lci5wbmcnKTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uc1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc291bmQnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3NvdW5kLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnbXV0ZScsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvbXV0ZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BhdXNlJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9wYXVzZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3BsYXknLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3BsYXkucG5nJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93V2luJywgJ2Fzc2V0cy9wb3B1cHMvbW9iaWxlL3BvcHVwc1dpbi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvd0ZhaWwnLCAnYXNzZXRzL3BvcHVwcy9tb2JpbGUvcG9wdXBzRmFpbC5qcGcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCduZXh0LWxldmVsJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9uZXh0LWxldmVsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgncmVwbHknLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3JlcGx5LnBuZycpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3N0b3JlJywgJ2Fzc2V0cy9idXR0b25zL21vYmlsZS9zdG9yZS5wbmcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2Jvb3QnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL2Jvb3QucG5nJyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnZmFpbC1wb3B1cCcsICdhc3NldHMvcG9wdXBzL21vYmlsZS9mYWlsV2luZG93LmpwZycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMicsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsMycsICdhc3NldHMvbXVzaWMvVHJpYmFsMi5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNCcsICdhc3NldHMvbXVzaWMvVHJpYmFsMy5tcDMnKTtcclxuICAgIHRoaXMubG9hZC5hdWRpbygndHJpYmFsNScsICdhc3NldHMvbXVzaWMvVHJpYmFsMS5tcDMnKTtcclxufTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvbnQgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAnM2VtIEFtZXJpY2FuJyA6ICczZW0gQW1lcmljYW4nO1xyXG4gICAgdmFyIHN0eWxlID0ge1xyXG4gICAgICAgIGZvbnQ6IGZvbnQsXHJcbiAgICAgICAgZmlsbDogJyMyYjNmNjgnLFxyXG4gICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2JhY2tncm91bmQnKTtcclxuXHJcblx0XHR2YXIgdG90ZW1Db250YWluZXIgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3RvdGVtQ29udGFpbmVyJyk7XHJcblx0XHRpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG5cdFx0dG90ZW1Db250YWluZXIuc2NhbGUuc2V0KDAuOCk7XHJcblx0XHR0b3RlbUNvbnRhaW5lci55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMiArIDMwO1xyXG5cdFx0dG90ZW1Db250YWluZXIueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6IHRoaXMud29ybGQuY2VudGVyWCAvIDIgKyAzMDtcclxuXHRcdHRvdGVtQ29udGFpbmVyLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dG90ZW1Db250YWluZXIuc2NhbGUuc2V0KDAuNSk7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyICsgMzA7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcblx0XHRcdHRvdGVtQ29udGFpbmVyLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cdFx0fVxyXG5cclxuICAgIHRoaXMuYmFyID0gdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2JhcicpO1xyXG4gICAgdGhpcy5iYXIuYW5jaG9yLnNldFRvKDApO1xyXG4gICAgdGhpcy5iYXIuc2NhbGUuc2V0VG8odGhpcy5iYXJTY2FsZS54LCB0aGlzLmJhclNjYWxlLnkpO1xyXG4gICAgdGhpcy5sZXZlbCA9IDE7XHJcblxyXG4gICAgdGhpcy5hdWRpbyA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnc291bmQnKTtcclxuICAgIHRoaXMuYXVkaW8uYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5hdWRpby5zY2FsZS5zZXQoMSkgOiB0aGlzLmF1ZGlvLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5hdWRpby54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIHRoaXMuYXVkaW8ud2lkdGggOiB0aGlzLmdhbWUud29ybGQud2lkdGggLyAyO1xyXG4gICAgdGhpcy5hdWRpby55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5iYXIuaGVpZ2h0IC8gMiA6IHRoaXMuYXVkaW8uaGVpZ2h0IC8gMjtcclxuXHJcbiAgICB0aGlzLnBhdXNlID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdwYXVzZScpO1xyXG4gICAgdGhpcy5wYXVzZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLnBhdXNlLnNjYWxlLnNldCgxKSA6IHRoaXMucGF1c2Uuc2NhbGUuc2V0KDAuNCk7XHJcbiAgICB0aGlzLnBhdXNlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLndpZHRoIC0gdGhpcy5wYXVzZS53aWR0aCAtIHRoaXMuYXVkaW8ud2lkdGggLSAyMCA6ICh0aGlzLmdhbWUud29ybGQud2lkdGggLyAyKSAtIHRoaXMuYXVkaW8ud2lkdGggLSAxMDtcclxuICAgIHRoaXMucGF1c2UueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuYmFyLmhlaWdodCAvIDIgOiB0aGlzLnBhdXNlLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5hdWRpby5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5hdWRpby5pbnB1dC5waXhlbFBlcmZlY3RPdmVyID0gdHJ1ZTtcclxuICAgIHRoaXMuYXVkaW8uaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLmF1ZGlvLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlcigpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBhdXNlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnBhdXNlLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5wYXVzZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHRoaXMucGF1c2UuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucGF1c2VNYW5hZ2VyKCk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX3ZUb3RlbXNMZXZlbHMgPSBbXTtcclxuICAgIHRoaXMuX3ZUcmliYWxNdXNpY3MgPSBbXTtcclxuICAgIHZhciBvZmZzZXQgPSB0aGlzLmJhci5oZWlnaHQgKyAxMDtcclxuXHJcbiAgICB2YXIgbGV2ZWwgPSB0aGlzLmFkZC50ZXh0KDUwLCAwLCAnTml2ZWwnLCBzdHlsZSk7XHJcbiAgICBsZXZlbC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIGxldmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogbGV2ZWwuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDw9IDU7IGluZGV4KyspIHtcclxuICAgICAgICB2YXIgbmFtZSA9IFN0cmluZygndCcgKyBpbmRleCkgKyAnLW9mZic7XHJcbiAgICAgICAgdmFyIHRyaWJhbE11c2ljID0gdGhpcy5hZGQuYXVkaW8oU3RyaW5nKCd0cmliYWwnICsgaW5kZXgpKTtcclxuICAgICAgICB0cmliYWxNdXNpYy5sb29wID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGVtTGV2ZWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgbmFtZSk7XHJcbiAgICAgICAgdG90ZW1MZXZlbC5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuICAgICAgICB0b3RlbUxldmVsLnNjYWxlLnNldFRvKHRoaXMudG90ZW1MZXZlbFNjYWxlLngsICB0aGlzLnRvdGVtTGV2ZWxTY2FsZS55KTtcclxuXHJcbiAgICAgICAgdG90ZW1MZXZlbC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gNTAgOiAzMjtcclxuICAgICAgICB0b3RlbUxldmVsLnkgPSBvZmZzZXQ7XHJcblxyXG4gICAgICAgIG9mZnNldCArPSB0b3RlbUxldmVsLmhlaWdodCArIDEwO1xyXG5cclxuICAgICAgICB0aGlzLl92VG90ZW1zTGV2ZWxzLnB1c2godG90ZW1MZXZlbCk7XHJcbiAgICAgICAgdGhpcy5fdlRyaWJhbE11c2ljcy5wdXNoKHRyaWJhbE11c2ljKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl92VHJpYmFsTXVzaWNzW3RoaXMubGV2ZWwgLSAxXS5wbGF5KCk7XHJcbiAgICB0aGlzLmNyZWF0ZVRpbWVyKCk7XHJcblxyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudG90YWxUaW1lID0gMjE7XHJcbiAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLnRpbWVyID0gIHRoaXMudGltZS5ldmVudHMubG9vcCgxMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBnYW1lLmNoZWNrVGltZSgpO1xyXG4gICAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVQaWVjZXMoKTtcclxuXHJcbiAgIHRoaXMuYnRuQm9vdCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnYm9vdCcpO1xyXG4gICB0aGlzLmJ0bkJvb3QueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDUwIDogKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIpICsgMTA7XHJcbiAgIHRoaXMuYnRuQm9vdC55ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLSA1MCA6IHRoaXMuZ2FtZS53b3JsZC5oZWlnaHQgLyAyICsgMzAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICB0aGlzLmJ0bkJvb3QuYW5jaG9yLnNldCgwLjUpO1xyXG4gICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNSkgOnRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC40KTtcclxuICAgdGhpcy5idG5Cb290LmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgIHRoaXMuYnRuQm9vdC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgdGhpcy5idG5Cb290LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnRuU3RvcmUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3N0b3JlJyk7XHJcbiAgICB0aGlzLmJ0blN0b3JlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gNTAgOiAzNTtcclxuICAgIHRoaXMuYnRuU3RvcmUueSA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgIHRoaXMuYnRuU3RvcmUuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gIHRoaXMuYnRuU3RvcmUuc2NhbGUuc2V0KDAuNSkgOiB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjQpO1xyXG4gICAgdGhpcy5idG5TdG9yZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5TdG9yZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmJ0blN0b3JlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbiA9IFwiaHR0cHM6Ly93d3cuYW1lcmljYW5pbm8uY29tL1wiO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLndpbmRvd1dpbiA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnd2luZG93V2luJyk7XHJcbiAgICB0aGlzLndpbmRvd1dpbi54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgICB0aGlzLndpbmRvd1dpbi55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5oZWlnaHQvMiA6IHRoaXMud29ybGQuaGVpZ2h0LzQgKyAzMDtcclxuICAgIHRoaXMud2luZG93V2luLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dXaW4uc2NhbGUuc2V0VG8oMC41KSA6IHRoaXMud2luZG93V2luLnNjYWxlLnNldFRvKDAuODcsIDAuOSk7XHJcbiAgICB0aGlzLndpbmRvd1dpbi52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIG5leHRMZXZlbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnbmV4dC1sZXZlbCcpO1xyXG4gICAgbmV4dExldmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd1dpbi5oZWlnaHQgLyAyICsgdGhpcy53aW5kb3dXaW4uaGVpZ2h0IC8gNCAgLSBuZXh0TGV2ZWwuaGVpZ2h0IDogKHRoaXMud2luZG93V2luLmhlaWdodCAvIDQgKSArIG5leHRMZXZlbC5oZWlnaHQgO1xyXG4gICAgbmV4dExldmVsLmFuY2hvci5zZXQoMC41KTtcclxuICAgIG5leHRMZXZlbC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgbmV4dExldmVsLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy53aW5kb3dXaW4uYWRkQ2hpbGQobmV4dExldmVsKTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICBuZXh0TGV2ZWwuZXZlbnRzLm9uSW5wdXREb3duLmFkZChmdW5jdGlvbigpe1xyXG4gICAgICAgIGdhbWUud2luZG93V2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBnYW1lLnJlc3RvcmVQdXp6bGUoKTtcclxuICAgICAgICBnYW1lLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgZ2FtZS50b3RhbFRpbWUgPSAyMTtcclxuICAgICAgICBnYW1lLnRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICBnYW1lLmVuZFRpbWUgPSBmYWxzZTtcclxuICAgICAgICBnYW1lLmxldmVsV2lucysrO1xyXG4gICAgICAgIGdhbWUudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgICAgICAgZ2FtZS53b3JsZC5hZGRDaGlsZEF0KGdhbWUud2luZG93V2luLCBnYW1lLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gICAgfSx0aGlzKTtcclxuXHJcbiAgICB0aGlzLndpbmRvd0ZhaWwgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3dpbmRvd0ZhaWwnKTtcclxuICAgIHRoaXMud2luZG93RmFpbC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuaGVpZ2h0LzIgOiB0aGlzLndvcmxkLmhlaWdodC80ICsgMzA7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd0ZhaWwuc2NhbGUuc2V0VG8oMC41KSA6IHRoaXMud2luZG93RmFpbC5zY2FsZS5zZXRUbygwLjg3LCAwLjkpO1xyXG4gICAgdGhpcy53aW5kb3dGYWlsLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB0aGlzLndpbmRvd0ZhaWwudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICB2YXIgcmVwbHkgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ25leHQtbGV2ZWwnKTtcclxuICAgIHJlcGx5LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gMiArIHRoaXMud2luZG93RmFpbC5oZWlnaHQgLyA0ICAtIHJlcGx5LmhlaWdodCA6ICh0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCApICsgcmVwbHkuaGVpZ2h0IC8gMiA7XHJcbiAgICByZXBseS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICByZXBseS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgcmVwbHkuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcblxyXG4gICAgdGhpcy53aW5kb3dGYWlsLmFkZENoaWxkKHJlcGx5KTtcclxuXHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcbiAgICByZXBseS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy53aW5kb3dGYWlsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJlc3RvcmVQdXp6bGUoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy50b3RhbFRpbWUgPSAyMTtcclxuICAgICAgICB0aGlzLnRpbWVFbGFwc2VkID0gMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMjE7XHJcbiAgICAgICAgZ2FtZS50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgIH0sdGhpcyk7XHJcblxyXG4gICB0aGlzLmZhaWxTdGF0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnZmFpbC1wb3B1cCcpO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC53aWR0aC8yIDogdGhpcy53b3JsZC53aWR0aC80ICsgMjA7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodC8yIDogdGhpcy53b3JsZC5oZWlnaHQvNCArIDMwO1xyXG4gICB0aGlzLmZhaWxTdGF0ZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/dGhpcy5mYWlsU3RhdGUuc2NhbGUuc2V0VG8oMC41KSA6dGhpcy5mYWlsU3RhdGUuc2NhbGUuc2V0VG8oMC4zKTtcclxuICAgdGhpcy5mYWlsU3RhdGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgdGhpcy5mYWlsU3RhdGUuaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgIHRoaXMuZmFpbFN0YXRlLnZpc2libGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICB2YXIgcmVwbHlMZXZlbCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAncmVwbHknKTtcclxuICAgcmVwbHlMZXZlbC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53aW5kb3dGYWlsLmhlaWdodCAvIDIgKyB0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCAgLSByZXBseUxldmVsLmhlaWdodCA6ICh0aGlzLndpbmRvd0ZhaWwuaGVpZ2h0IC8gNCApICsgcmVwbHlMZXZlbC5oZWlnaHQgO1xyXG4gICByZXBseUxldmVsLmFuY2hvci5zZXQoMC41KTtcclxuICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gIHJlcGx5TGV2ZWwuc2NhbGUuc2V0KDEpIDogcmVwbHlMZXZlbC5zY2FsZS5zZXQoMSk7XHJcbiAgIHJlcGx5TGV2ZWwuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgcmVwbHlMZXZlbC5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgIHRoaXMuZmFpbFN0YXRlLmFkZENoaWxkKHJlcGx5TGV2ZWwpO1xyXG5cclxuICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICByZXBseUxldmVsLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBnYW1lLmZhaWxTdGF0ZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgZ2FtZS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGdhbWUudG90YWxUaW1lID0gMjE7XHJcbiAgICAgICAgZ2FtZS50aW1lRWxhcHNlZCA9IDA7XHJcbiAgICAgICAgZ2FtZS5jdXJyZW50VGltZSA9IDIxO1xyXG4gICAgICAgIGdhbWUuZ2FtZS5zdGF0ZS5yZXN0YXJ0KCk7XHJcbiAgICAgICAgZ2FtZS50aW1lci50aW1lci5yZXN1bWUoKTtcclxuICAgfSx0aGlzKTtcclxuIH07XHJcblxyXG4gUGxheVN0YXRlLnByb3RvdHlwZS5hdWRpb01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5pc011dGUpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLmxvYWRUZXh0dXJlKCdtdXRlJywwKTtcclxuICAgICAgICB0aGlzLmdhbWUuc291bmQubXV0ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc011dGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5sb2FkVGV4dHVyZSgnc291bmQnLDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zb3VuZC5tdXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc011dGUgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS5jaGVja1RpbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIHRpbWVEaWZmZXJlbmNlID0gdGhpcy5zdGFydFRpbWUuZ2V0VGltZSgpIC0gY3VycmVudFRpbWUuZ2V0VGltZSgpO1xyXG5cclxuICAgIC8vVGltZSBlbGFwc2VkIGluIHNlY29uZHNcclxuICAgIHRoaXMudGltZUVsYXBzZWQgPSBNYXRoLmFicyh0aW1lRGlmZmVyZW5jZSAvIDEwMDApO1xyXG5cclxuICAgIC8vVGltZSByZW1haW5pbmcgaW4gc2Vjb25kc1xyXG4gICAgdmFyIHRpbWVSZW1haW5pbmcgPSB0aGlzLnRvdGFsVGltZSAtIHRoaXMudGltZUVsYXBzZWQ7XHJcblxyXG4gICAgLy9Db252ZXJ0IHNlY29uZHMgaW50byBtaW51dGVzIGFuZCBzZWNvbmRzXHJcbiAgICB2YXIgbWludXRlcyA9IE1hdGguZmxvb3IodGltZVJlbWFpbmluZyAvIDYwKTtcclxuICAgIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcih0aW1lUmVtYWluaW5nKSAtICg2MCAqIG1pbnV0ZXMpO1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHNlY29uZHM7XHJcblxyXG4gICAgLy9EaXNwbGF5IG1pbnV0ZXMsIGFkZCBhIDAgdG8gdGhlIHN0YXJ0IGlmIGxlc3MgdGhhbiAxMFxyXG4gICAgdmFyIHJlc3VsdCA9IChtaW51dGVzIDwgMTApID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlcztcclxuXHJcbiAgICAvL0Rpc3BsYXkgc2Vjb25kcywgYWRkIGEgMCB0byB0aGUgc3RhcnQgaWYgbGVzcyB0aGFuIDEwXHJcbiAgICByZXN1bHQgKz0gKHNlY29uZHMgPCAxMCkgPyBcIjowXCIgKyBzZWNvbmRzIDogXCI6XCIgKyBzZWNvbmRzO1xyXG5cclxuICAgIGlmIChtaW51dGVzIDwgMCkge1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRpbWVMYWJlbC50ZXh0ID0gcmVzdWx0O1xyXG59XHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLnBhdXNlTWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmlzUGF1c2UgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnBhdXNlLmxvYWRUZXh0dXJlKCdwbGF5JywgMCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnBhdXNlZCA9IHRoaXMuaXNQYXVzZTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHRoaXMuY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lci50aW1lci5wYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBhdXNlLmxvYWRUZXh0dXJlKCdwYXVzZScsIDApO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSB0aGlzLmlzUGF1c2U7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudGltZXIudGltZXIucmVzdW1lKCk7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5QbGF5U3RhdGUucHJvdG90eXBlLmNyZWF0ZVRpbWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50aW1lTGFiZWwgPSB0aGlzLmdhbWUuYWRkLnRleHQoMCwgMCwgXCIwMDowMFwiLCB7Zm9udDogXCI0ZW0gQW1lcmljYW4gYm9sZFwiLGZpbGw6IFwiIzJiM2Y2OFwifSk7XHJcbiAgICB0aGlzLnRpbWVMYWJlbC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgdGhpcy50aW1lTGFiZWwuYWxpZ24gPSAnY2VudGVyJztcclxuXHJcblxyXG4gICAgdGhpcy50aW1lTGFiZWwueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgKyB0aGlzLmdhbWUud29ybGQud2lkdGggLyA0IDogIHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIgLSB0aGlzLmdhbWUud29ybGQud2lkdGggLyA0ICsgdGhpcy50aW1lTGFiZWwuaGVpZ2h0IC8gMjtcclxuICAgIHRoaXMudGltZUxhYmVsLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJhci5oZWlnaHQgLyAyIDogdGhpcy50aW1lTGFiZWwuaGVpZ2h0IC8gMjtcclxufVxyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUucmVzdG9yZVB1enpsZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fdlRvdGVtc0xldmVsc1t0aGlzLmxldmVsIC0gMV0ubG9hZFRleHR1cmUoU3RyaW5nKCd0JyArIHRoaXMubGV2ZWwpICsgJy1vbicsIDApO1xyXG4gICAgdGhpcy5fdlRyaWJhbE11c2ljc1t0aGlzLmxldmVsIC0gMV0uc3RvcCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdkFsbFBpZWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuX3ZBbGxQaWVjZXNbaV0uZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3ZQaWVjZXNQdXp6bGUgPSBbXTtcclxuICAgIHRoaXMuX3ZQaWVjZXNDbG9uZXMgPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5sZXZlbCAhPT0gNSkge1xyXG4gICAgICAgIHRoaXMubGV2ZWwrKztcclxuICAgICAgICB2YXIgaW5kZXhNdXNpYyA9IHRoaXMubGV2ZWwgLSAxO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGllY2VzKCk7XHJcbiAgICAgICAgdGhpcy5fdlRyaWJhbE11c2ljc1tpbmRleE11c2ljXS5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3dpbicsIHRydWUsIHRydWUsIHRoaXMubGV2ZWxXaW5zKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy53aW5kb3dXaW4sIHRoaXMud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiB9O1xyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUuY3JlYXRlUGllY2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG9mZnNldEJhciA9IHRoaXMuYmFyLmhlaWdodCArIDEwO1xyXG4gICAgdmFyIHF1YW50aXR5UGllY2VzID0gdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucXVhbnRpdHk7XHJcbiAgICB0aGlzLl92QWxsUGllY2VzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8PSBxdWFudGl0eVBpZWNlczsgaW5kZXgrKykge1xyXG4gICAgICAgIHZhciBuYW1lID0gU3RyaW5nKCd0JyArIHRoaXMubGV2ZWwgKyAnLScgKyBpbmRleCk7XHJcblxyXG4gICAgICAgIHZhciBwaWVjZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCBuYW1lKTtcclxuICAgICAgICBwaWVjZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBwaWVjZS5zY2FsZS5zZXRUbyh0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLngsICB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5waWVjZVNjYWxlLnkpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUocGllY2UpO1xyXG4gICAgICAgIHBpZWNlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgcGllY2UucG9zID0ge307XHJcbiAgICAgICAgcGllY2UuYWxwaGEgPSAwLjAwMztcclxuICAgICAgICBwaWVjZS50aW50PSAweGVlZTBjYTtcclxuXHJcbiAgICAgICAgdmFyIG9mZnNldE9iaiA9IGdldE9mZnNldEJ5THZsKG9mZnNldEJhciwgdGhpcy5sZXZlbCk7XHJcbiAgICAgICAgdmFyIGluaXRpYWxQb3NQaWVjZSA9IGluaXRpYWxQb3NpdGlvbkJ5THZsKHBpZWNlLCB0aGlzLmxldmVsLCBpbmRleCk7XHJcbiAgICAgICAgdmFyIGluaXRpYWxQb3NDbG9uZSA9IGluaXRpYWxQb3NpdGlvbihwaWVjZSwgdGhpcy5sZXZlbCwgaW5kZXgpO1xyXG5cclxuICAgICAgICBwaWVjZS54ID0gaW5pdGlhbFBvc1BpZWNlLng7XHJcbiAgICAgICAgcGllY2UueSA9IGluaXRpYWxQb3NQaWVjZS55O1xyXG5cclxuICAgICAgICBwaWVjZS54ICs9IG9mZnNldE9iai54O1xyXG4gICAgICAgIHBpZWNlLnkgKz0gb2Zmc2V0T2JqLnk7XHJcblxyXG4gICAgICAgIGxldCB4MSA9IGluaXRpYWxQb3NDbG9uZS54O1xyXG4gICAgICAgIGxldCB5MSA9IGluaXRpYWxQb3NDbG9uZS55O1xyXG5cclxuICAgICAgICB4MSArPSBvZmZzZXRPYmoueDtcclxuICAgICAgICB5MSArPSBvZmZzZXRPYmoueTtcclxuXHJcbiAgICAgICAgbGV0IHBpZWNlQ2xvbiA9IHRoaXMuYWRkLnNwcml0ZSh4MSwgeTEsIG5hbWUpO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgICBwaWVjZUNsb24uc2NhbGUuc2V0VG8odGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS54LCAgdGhpcy5xdWFudGl0eVB1enpsZUxldmVsc1t0aGlzLmxldmVsIC0gMV0ucGllY2VTY2FsZS55KTtcclxuICAgICAgICB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUuZW5hYmxlKHBpZWNlQ2xvbik7XHJcblxyXG4gICAgICAgIHBpZWNlQ2xvbi5wYXJlbnRJbmRleCA9IHBpZWNlLmluZGV4O1xyXG4gICAgICAgIHBpZWNlQ2xvbi5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHBpZWNlQ2xvbi5pbnB1dC5lbmFibGVEcmFnKCk7XHJcbiAgICAgICAgcGllY2VDbG9uLm9yaWdpbmFsUG9zaXRpb24gPSBwaWVjZUNsb24ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBwaWVjZUNsb24uaW5wdXQuZW5hYmxlU25hcChwaWVjZUNsb24ud2lkdGgsIHBpZWNlQ2xvbi5oZWlnaHQsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICBwaWVjZUNsb24uZXZlbnRzLm9uRHJhZ1N0b3AuYWRkKGZ1bmN0aW9uKGN1cnJlbnRTcHJpdGUpe1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BEcmFnKGN1cnJlbnRTcHJpdGUpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl92UGllY2VzUHV6emxlLnB1c2gocGllY2UpO1xyXG4gICAgICAgIHRoaXMuX3ZBbGxQaWVjZXMucHVzaChwaWVjZSk7XHJcbiAgICAgICAgdGhpcy5fdkFsbFBpZWNlcy5wdXNoKHBpZWNlQ2xvbik7XHJcbiAgICB9XHJcbiB9O1xyXG5cclxuIFBsYXlTdGF0ZS5wcm90b3R5cGUuc3RvcERyYWcgPSAgZnVuY3Rpb24gKGN1cnJlbnRTcHJpdGUpIHtcclxuXHRcdFxyXG5cdFx0dmFyIHNjb3BlID0gdGhpcztcbiAgICAgICAgdmFyIGVuZFNwcml0ZSA9IHRoaXMuX3ZQaWVjZXNQdXp6bGVbY3VycmVudFNwcml0ZS5wYXJlbnRJbmRleCAtIDFdO1xuICAgICAgICB2YXIgYm91bmRzQSA9IGN1cnJlbnRTcHJpdGUuZ2V0Qm91bmRzKCk7XG4gICAgICAgIGJvdW5kc0Eud2lkdGggPSAzMDtcbiAgICAgICAgYm91bmRzQS5oZWlnaHQgPSAzMDtcbiAgICAgICAgdmFyIGJvdW5kc0IgPSBlbmRTcHJpdGUuZ2V0Qm91bmRzKCk7XG4gICAgICAgIGJvdW5kc0Iud2lkdGggPSAzMDtcbiAgICAgICAgYm91bmRzQi5oZWlnaHQgPSAzMDtcbiAgICAgICAgaWYgKFBoYXNlci5SZWN0YW5nbGUuaW50ZXJzZWN0cyhib3VuZHNBLCBib3VuZHNCKSkge1xuICAgICAgICAgICAgY3VycmVudFNwcml0ZS5pbnB1dC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNjb3BlLl92UGllY2VzQ2xvbmVzLnB1c2goY3VycmVudFNwcml0ZSk7XG4gICAgICAgICAgICBjdXJyZW50U3ByaXRlLnBvc2l0aW9uLmNvcHlGcm9tKGVuZFNwcml0ZS5wb3NpdGlvbik7IFxuICAgICAgICAgICAgY3VycmVudFNwcml0ZS5hbmNob3Iuc2V0VG8oZW5kU3ByaXRlLmFuY2hvci54LCBlbmRTcHJpdGUuYW5jaG9yLnkpOyBcbiAgICAgICAgfVxyXG4gfTtcclxuXHJcblBsYXlTdGF0ZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG59O1xyXG5cclxuUGxheVN0YXRlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoICh0aGlzLl92UGllY2VzQ2xvbmVzICYmICB0aGlzLl92UGllY2VzQ2xvbmVzLmxlbmd0aCA+PSB0aGlzLnF1YW50aXR5UHV6emxlTGV2ZWxzW3RoaXMubGV2ZWwgLSAxXS5xdWFudGl0eSkpIHtcclxuICAgICAgICBpZiAodGhpcy5sZXZlbCA+PSA1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCd3aW4nLCB0cnVlLCB0cnVlLCB0aGlzLmxldmVsV2lucyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aW5kb3dXaW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZW5kVGltZSkge1xyXG4gICAgICAgIGlmICh0aGlzLndpbmRvd1dpbi52aXNpYmxlID09PSBmYWxzZSAmJiB0aGlzLmxldmVsIDwgNSkge1xyXG4gICAgICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy53aW5kb3dGYWlsLCB0aGlzLndvcmxkLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB0aGlzLndpbmRvd0ZhaWwudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLnRpbWVyLnBhdXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGV2ZWxXaW5zIDw9IDEgJiYgdGhpcy5sZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmFkZENoaWxkQXQodGhpcy5mYWlsU3RhdGUsIHRoaXMud29ybGQuY2hpbGRyZW4ubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxTdGF0ZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZXIudGltZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kVGltZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFdpbnMtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ3dpbicsIHRydWUsIHRydWUsIHRoaXMubGV2ZWxXaW5zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gUGxheVN0YXRlO1xyXG5cclxuZnVuY3Rpb24gaW5pdGlhbFBvc2l0aW9uQnlMdmwgKHBpZWNlLCBsZXZlbCwgaW5kZXgpIHtcclxuICAgIHZhciB2UG9zaXRpb25zSW5pdGlhbDtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS41LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDJ9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuNSwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuNSwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuNSwgeTogcGllY2UuaGVpZ2h0ICogNCB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjEsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuMSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNS4xLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjEsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjEsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjEsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjEsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjEsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjEsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUuMywgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNi4zLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LjMsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LjMsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAxLjQsIHk6IHBpZWNlLmhlaWdodCAqIDIuMzUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjQsIHk6IHBpZWNlLmhlaWdodCAqIDIuMzUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAxLjQsIHk6IHBpZWNlLmhlaWdodCAqIDMuMzUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjQsIHk6IHBpZWNlLmhlaWdodCAqIDMuMzUgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNCwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNCwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNCwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNCwgeTogcGllY2UuaGVpZ2h0ICogNSB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDIuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogMi4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy41LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDMuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogNC4zIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNC41LCB5OiBwaWVjZS5oZWlnaHQgKiA0LjMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDUuMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0ICogNS4zIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gNSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDIuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogMi44IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogMy44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiAzLjggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiA0LjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDQuOCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLjYsIHk6IHBpZWNlLmhlaWdodCAqIDUuOCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNiwgeTogcGllY2UuaGVpZ2h0ICogNS44IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIuNiwgeTogcGllY2UuaGVpZ2h0ICogNi44IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMy42LCB5OiBwaWVjZS5oZWlnaHQgKiA2LjggfSxcclxuXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMi42LCB5OiBwaWVjZS5oZWlnaHQgKiA3LjggfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjYsIHk6IHBpZWNlLmhlaWdodCAqIDcuOCB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdlBvc2l0aW9uc0luaXRpYWxbaW5kZXggLSAxXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbFBvc2l0aW9uIChwaWVjZSwgbGV2ZWwsIGluZGV4KSB7XHJcbiAgICB2YXIgdlBvc2l0aW9uc0luaXRpYWw7XHJcblxyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LjUsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQuNSwgeTogcGllY2UuaGVpZ2h0IH0sXHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAzKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDJ9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDgsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiA0IH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogMiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDMgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA3LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiAxIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMiwgeTogcGllY2UuaGVpZ2h0IH1cclxuXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSAgZWxzZSBpZiAobGV2ZWwgPT09IDUpIHtcclxuICAgICAgICAgICAgdlBvc2l0aW9uc0luaXRpYWwgPSBbXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogNCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDIgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiAyIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDYgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogOCwgeTogcGllY2UuaGVpZ2h0ICogNiB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA4LCB5OiBwaWVjZS5oZWlnaHQgKiA1IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNCB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGgsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9ICBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICB2UG9zaXRpb25zSW5pdGlhbCA9IFtcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogNi41IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA2LjUgfVxyXG5cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSA0KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDEuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDQgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiAxLjUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAzLjUsIHk6IHBpZWNlLmhlaWdodCAqIDEuNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDUsIHk6IHBpZWNlLmhlaWdodCAqIDUgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA1LCB5OiBwaWVjZS5oZWlnaHQgKiA3IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMS41LCB5OiBwaWVjZS5oZWlnaHQgKiA3IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNCwgeTogcGllY2UuaGVpZ2h0ICogNyB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDMuNSwgeTogcGllY2UuaGVpZ2h0ICogNyB9XHJcblxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0gIGVsc2UgaWYgKGxldmVsID09PSA1KSB7XHJcbiAgICAgICAgICAgIHZQb3NpdGlvbnNJbml0aWFsID0gW1xyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiAzIH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogNiwgeTogcGllY2UuaGVpZ2h0ICogNSB9LFxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDYsIHk6IHBpZWNlLmhlaWdodCAqIDcgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA2LCB5OiBwaWVjZS5oZWlnaHQgKiA5IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDQsIHk6IHBpZWNlLmhlaWdodCAqIDkgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiAyLCB5OiBwaWVjZS5oZWlnaHQgKiA5IH0sXHJcbiAgICAgICAgICAgICAgICB7IHg6IHBpZWNlLndpZHRoICogMywgeTogcGllY2UuaGVpZ2h0ICogMTEgfSxcclxuICAgICAgICAgICAgICAgIHsgeDogcGllY2Uud2lkdGggKiA0LCB5OiBwaWVjZS5oZWlnaHQgKiA4IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgeyB4OiBwaWVjZS53aWR0aCAqIDIsIHk6IHBpZWNlLmhlaWdodCAqIDggfVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdlBvc2l0aW9uc0luaXRpYWxbaW5kZXggLSAxXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0QnlMdmwgKG9mZnNldCwgbGV2ZWwpIHtcclxuICAgIHZhciB4ID0gMDtcclxuICAgIHZhciB5ID0gMDtcclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDEpIHtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHkgPSAtKG9mZnNldCAvIDIpO1xyXG4gICAgICAgICAgICB4ID0gb2Zmc2V0IC8gMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gKG9mZnNldCAvIDYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDIpIHtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHggPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHkgPSAtKG9mZnNldCAvIDIgLSAxMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeCA9IC1vZmZzZXQgLSAzMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxldmVsID09PSAzKSB7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB5ID0gLShvZmZzZXQgLyAyKTtcclxuICAgICAgICAgICAgeCA9IChvZmZzZXQgLyAyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB4ID0gLW9mZnNldCAtIChvZmZzZXQgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChsZXZlbCA9PT0gNCkge1xyXG4gICAgICAgIGlmICghUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHggPSAtKG9mZnNldCAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobGV2ZWwgPT09IDUpIHtcclxuICAgICAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgIHggPSAxMDtcclxuICAgICAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeSA9IChvZmZzZXQgLyAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHgsIHkgfTtcclxufVxyXG4iLCJmdW5jdGlvbiBUdXRvcmlhbFN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlID0gIE9iamVjdC5jcmVhdGUoUGhhc2VyLlN0YXRlLnByb3RvdHlwZSk7XHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVHV0b3JpYWxTdGF0ZTtcclxuXHJcblR1dG9yaWFsU3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0dGhpcy50dXRvcmlhbFBhcnQgPSAxO1xyXG4gICAgdGhpcy5wb3B1cCA9IG51bGw7XHJcbn07XHJcblxyXG5UdXRvcmlhbFN0YXRlLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxvYWRTdHlsZSA9IHtcclxuICAgICAgICBmb250OiAnN2VtIFRpbWVzIFJvbWFuJyxcclxuICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdmFyIGxvYWRUZXh0WSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDMwMCA6IHRoaXMud29ybGQuY2VudGVyWTtcclxuICAgIHZhciBsb2FkVGV4dCA9IHRoaXMuYWRkLnRleHQoMCwgMCwgJycsIGxvYWRTdHlsZSk7XHJcbiAgICBsb2FkVGV4dC55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gbG9hZFRleHRZIDogdGhpcy53b3JsZC5jZW50ZXJZIC8gMjtcclxuICAgIGxvYWRUZXh0LnggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclggOiB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcbiAgICBsb2FkVGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICB2YXIgbG9kaW5nQmFyID0gdGhpcy5hZGQuZ3JhcGhpY3MoMzMwLCAtMTUwKTtcclxuICAgICAgICBsb2RpbmdCYXIubGluZVN0eWxlKDMsICcweDJiM2Y2OCcpO1xyXG4gICAgICAgIGxvZGluZ0Jhci5kcmF3Um91bmRlZFJlY3QoMTAwLDUwMCwzMDAsMzAsMTApO1xyXG4gICAgICAgIGxvZGluZ0Jhci5lbmRGaWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZChmdW5jdGlvbihwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKXtcclxuICAgICAgICBsb2FkVGV4dC5zZXRUZXh0KHByb2dyZXNzKyclJyk7XHJcbiAgICAgICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgICAgICB2YXIgbG9hZCA9IHByb2dyZXNzICsgMTk0O1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5jbGVhcigpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5saW5lU3R5bGUoMywgJzB4MmIzZjY4Jyk7XHJcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmJlZ2luRmlsbCgnMHgyYjNmNjgnLDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5kcmF3Um91bmRlZFJlY3QoMTAzLDUwMSxsb2FkLDI3LDEpO1xyXG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5lbmRGaWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzEnLCAnYXNzZXRzL3R1dG9yaWFsL3ZlbnRhbmEtdHV0b3JpYWwwMS5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzInLCAnYXNzZXRzL3R1dG9yaWFsL3ZlbnRhbmEtdHV0b3JpYWwwMi5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzMnLCAnYXNzZXRzL3R1dG9yaWFsL3ZlbnRhbmEtdHV0b3JpYWwwMy5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzQnLCAnYXNzZXRzL3R1dG9yaWFsL3ZlbnRhbmEtdHV0b3JpYWwwNC5qcGcnKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93MScsICdhc3NldHMvdHV0b3JpYWwvbW9iaWxlL3ZlbnRhbmEtdHV0b3JpYWwwMS1tYmwuanBnJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCd3aW5kb3cyJywgJ2Fzc2V0cy90dXRvcmlhbC9tb2JpbGUvdmVudGFuYS10dXRvcmlhbDAyLW1ibC5qcGcnKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ3dpbmRvdzMnLCAnYXNzZXRzL3R1dG9yaWFsL21vYmlsZS92ZW50YW5hLXR1dG9yaWFsMDMtbWJsLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93NCcsICdhc3NldHMvdHV0b3JpYWwvbW9iaWxlL3ZlbnRhbmEtdHV0b3JpYWwwNC1tYmwuanBnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzdHJlZXQnLCdhc3NldHMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCduZXh0JywgJ2Fzc2V0cy90dXRvcmlhbC9uZXh0LmpwZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdjbG9zZScsJ2Fzc2V0cy90dXRvcmlhbC9jbG9zZS5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnYnV0dG9uLXBsYXknLCdhc3NldHMvdHV0b3JpYWwvYnV0dG9uLXBsYXkuanBnJyk7XHJcblxyXG59O1xyXG5cclxuVHV0b3JpYWxTdGF0ZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdHJlZXQgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwnc3RyZWV0Jyk7XHJcbiAgICB0aGlzLnN0cmVldC5zY2FsZS5zZXRUbygwLjcpO1xyXG5cclxuICAgIHZhciBwb3B1cCA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnd2luZG93MScpO1xyXG4gICAgaWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuICAgICAgICBwb3B1cC54ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy53b3JsZC5jZW50ZXJYIDogdGhpcy53b3JsZC5jZW50ZXJYIC8gMiArIDE1O1xyXG4gICAgICAgIHBvcHVwLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclkgOiB0aGlzLndvcmxkLmNlbnRlclkgLyAyICsgMzA7XHJcbiAgICAgICAgcG9wdXAuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICAgICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gcG9wdXAuc2NhbGUuc2V0VG8oMC43KSA6IHBvcHVwLnNjYWxlLnNldFRvKDAuMjYpO1xyXG4gICAgICAgIHBvcHVwLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHRcdFx0cG9wdXAueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMud29ybGQuY2VudGVyWCA6ICB0aGlzLndvcmxkLmNlbnRlclggLyAyICsgMzA7XHJcblx0XHRcdHBvcHVwLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmNlbnRlclkgOiAgdGhpcy53b3JsZC5jZW50ZXJZIC8gMiArIDQwO1xyXG5cdFx0XHRwb3B1cC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHRcdFx0UGhhc2VyLkRldmljZS5kZXNrdG9wID8gcG9wdXAuc2NhbGUuc2V0VG8oMC4zKSA6IHBvcHVwLnNjYWxlLnNldCgwLjMpO1xyXG5cdFx0XHRwb3B1cC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvayA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCAnbmV4dCcpO1xyXG4gICAgb2suYW5jaG9yLnNldFRvKDAuNSk7XHJcblx0XHRpZihQaGFzZXIuRGV2aWNlLmRlc2t0b3Ape1xyXG5cdFx0UGhhc2VyLkRldmljZS5kZXNrdG9wID8gb2suc2NhbGUuc2V0KDEpIDogb2suc2NhbGUuc2V0KDIpO1xyXG5cdCAgICBvay5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cdCAgICBvay5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHQgICAgcG9wdXAuYWRkQ2hpbGQob2spO1xyXG5cdCAgICBvay55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gKHBvcHVwLmhlaWdodCAvIDIpIDogcG9wdXAuaGVpZ2h0ICsgKHBvcHVwLmhlaWdodCAvIDYpO1xyXG5cdCAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG5cdFx0UGhhc2VyLkRldmljZS5kZXNrdG9wID8gb2suc2NhbGUuc2V0KDEuMikgOiBvay5zY2FsZS5zZXQoMik7XHJcblx0ICAgIG9rLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcblx0ICAgIG9rLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgIHBvcHVwLmFkZENoaWxkKG9rKTtcclxuXHQgICAgb2sueSA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IChwb3B1cC5oZWlnaHQgLyAyKSA6IHBvcHVwLmhlaWdodCArIChwb3B1cC5oZWlnaHQgLyAzKTtcclxuXHQgICAgdGhpcy50dXRvcmlhbFBhcnQgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbG9zZSA9IHRoaXMuYWRkLnNwcml0ZSgzMjUsIDIwLCAnY2xvc2UnKTtcclxuaWYoUGhhc2VyLkRldmljZS5kZXNrdG9wKXtcclxuICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IGNsb3NlLnNjYWxlLnNldCgxKSA6IGNsb3NlLnNjYWxlLnNldCgxKTtcclxuICAgIGNsb3NlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICBjbG9zZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICAgIHBvcHVwLmFkZENoaWxkKGNsb3NlKTtcclxuICAgIGNsb3NlLnggPSAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gKHBvcHVwLndpZHRoIC8gMikgKyBjbG9zZS53aWR0aCA6IHBvcHVwLndpZHRoICsgY2xvc2Uud2lkdGggLSAyNTtcclxuICAgIGNsb3NlLnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyAtcG9wdXAuaGVpZ2h0IC8gMiA6IC1wb3B1cC5oZWlnaHQgKiAyICsgY2xvc2UuaGVpZ2h0ICogMiAtIGNsb3NlLmhlaWdodDtcclxufSBlbHNle1xyXG4gICAgUGhhc2VyLkRldmljZS5kZXNrdG9wID8gY2xvc2Uuc2NhbGUuc2V0KDAuNSkgOiBjbG9zZS5zY2FsZS5zZXQoMC41KTtcclxuXHRcdGNsb3NlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICBjbG9zZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxufVxyXG5cclxuICAgIGNsb3NlLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCdQbGF5Jyk7XHJcbiAgICB9LHRoaXMpO1xyXG5cclxuICAgIHZhciBnYW1lID0gdGhpcztcclxuICAgIG9rLmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMudHV0b3JpYWxQYXJ0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC5sb2FkVGV4dHVyZSgnd2luZG93MicsMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgIHBvcHVwLmxvYWRUZXh0dXJlKCd3aW5kb3czJywwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHV0b3JpYWxQYXJ0ID0gMztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMgOlxyXG4gICAgICAgICAgICAgICAgcG9wdXAubG9hZFRleHR1cmUoJ3dpbmRvdzQnLDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvcmlhbFBhcnQgPSA0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNCA6XHJcbiAgICAgICAgICAgICAgICBwb3B1cC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1dG9yaWFsUGFydCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdQbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSwgdGhpcyk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFR1dG9yaWFsU3RhdGU7XHJcbiIsImZ1bmN0aW9uIFdpblN0YXRlKCkge1xyXG5cdFBoYXNlci5TdGF0ZS5jYWxsKHRoaXMpO1xyXG59XHJcblxyXG4vKiogQHR5cGUgUGhhc2VyLlN0YXRlICovXHJcbldpblN0YXRlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoUGhhc2VyLlN0YXRlLnByb3RvdHlwZSk7XHJcbldpblN0YXRlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFdpblN0YXRlO1xyXG5cclxuV2luU3RhdGUucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAobGV2ZWwpIHtcclxuXHJcbiAgICBpZiAoUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICAgICAgdmFyIG1zZ0V0aG5pY3MgPSBbXHJcbiAgICAgICAgICAgIFwiRXJlcyBmdWVydGUsIHBvZGVyb3NhIHkgbm9ibGUuIENhcmFjdGVyw61zdGljYXMgZGUgbG9zIHJleWVzIHkgZ29iZXJuYW50ZXMuXCIsXHJcbiAgICAgICAgICAgIFwiSGFzIGxvZ3JhZG8gZm9ydGFsZWNlciB0dSBlc3DDrXJpdHUgZGUgaW5kZXBlbmRlbmNpYSB5IGF2ZW50dXJhLlwiLFxyXG4gICAgICAgICAgICBcIlR1IHBlcnNldmVyYW5jaWEgZW4gbGEgbHVjaGEsIGFwb3J0YSBlbmVyZ8OtYSBleHRyYSBhIHRvZG9zIGxvcyB0dXlvcy4gXFxuIGxvZ3Jhc3RlIGNvbnF1aXN0YXIgbG9zIGVzcMOtcml0dXMgw6l0bmljb3MgcXVlIGF0cmFlbiB5IG1hbnRpZW5lbiBhbWlnb3MuXCIsXHJcbiAgICAgICAgICAgIFwiTG9zIGVzcMOtcml0dXMgw6l0bmljb3Mgbm9zIGRpY2VuIHF1ZSBlcmVzIGRlIGxhcyBxdWUgc2FsZW4gZGUgdG9kYXMgbGFzIGRpZmljdWx0YWRlcyBjb24gYXJ0ZSB5IGVsZWdhbmNpYS5cIixcclxuICAgICAgICAgICAgXCJWZXMgbGEgdmlkYSBkZXNkZSB1bmEgcGVyc3BlY3RpdmEgbcOhcyBzYWJpYSB5IGVsZXZhZGEuIFxcbiBoYXMgbG9ncmFkbyBjb21wcmVuZGVyIHR1IGRlc3Rpbm8geSBsb3MgY2ljbG9zIHZpdmlkb3MuXCJcclxuICAgICAgICBdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbXNnRXRobmljcyA9IFtcclxuICAgICAgICAgICAgXCJFcmVzIGZ1ZXJ0ZSwgcG9kZXJvc2EgeSBub2JsZS4gXFxuIENhcmFjdGVyw61zdGljYXMgZGUgbG9zIHJleWVzIHkgZ29iZXJuYW50ZXMuXCIsXHJcbiAgICAgICAgICAgIFwiSGFzIGxvZ3JhZG8gZm9ydGFsZWNlciB0dSBlc3DDrXJpdHUgXFxuIGRlIGluZGVwZW5kZW5jaWEgeSBhdmVudHVyYS5cIixcclxuICAgICAgICAgICAgXCJUdSBwZXJzZXZlcmFuY2lhIGVuIGxhIGx1Y2hhLCBhcG9ydGEgIFxcbiBlbmVyZ8OtYSBleHRyYSBhIHRvZG9zIGxvcyB0dXlvcy4gXFxuIGxvZ3Jhc3RlIGNvbnF1aXN0YXIgbG9zIGVzcMOtcml0dXMgw6l0bmljb3MgXFxuIHF1ZSBhdHJhZW4geSBtYW50aWVuZW4gYW1pZ29zLlwiLFxyXG4gICAgICAgICAgICBcIkxvcyBlc3DDrXJpdHVzIMOpdG5pY29zIG5vcyBkaWNlbiBxdWUgIFxcbiBlcmVzIGRlIGxhcyBxdWUgc2FsZW4gZGUgdG9kYXMgXFxuIGxhcyBkaWZpY3VsdGFkZXMgY29uIGFydGUgeSBlbGVnYW5jaWEuXCIsXHJcbiAgICAgICAgICAgIFwiVmVzIGxhIHZpZGEgZGVzZGUgdW5hIHBlcnNwZWN0aXZhIG3DoXMgc2FiaWEgeSBlbGV2YWRhLiBcXG4gaGFzIGxvZ3JhZG8gY29tcHJlbmRlciB0dSBkZXN0aW5vIHkgbG9zIGNpY2xvcyB2aXZpZG9zLlwiXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGlzY291bnRPYmogPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNjb3VudDogMCwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiTmFkYVwiLCBcIk5hZGFcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAxNSwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiTWFzY2FyYXNcIiwgXCJNYWRlcmFcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc2NvdW50OiAyMCwgd29yZHM6IFtcclxuICAgICAgICAgICAgICAgIFwiRmVzdGVqb1wiLCBcIlBsdW1hc1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzY291bnQ6IDI1LCB3b3JkczogW1xyXG4gICAgICAgICAgICAgICAgXCJNdXNpY2FcIiwgXCJJbmRpb3NcIlxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmxldmVsID0gcGFyc2VJbnQobGV2ZWwpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5sZXZlbCkge1xyXG4gICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDE1O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY291bnQgPSAyMDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICB0aGlzLmRpc2NvdW50ID0gMjA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDI1O1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5kaXNjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkaXNjb3VudE9iai5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZGlzY291bnRPYmpbaW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC5kaXNjb3VudCA9PSB0aGlzLmRpc2NvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZCA9IGVsZW1lbnQud29yZHNbdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCAxKV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1zZyA9IG1zZ0V0aG5pY3NbdGhpcy5nYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCA0KV07XHJcbn07XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChQaGFzZXIuRGV2aWNlLmRlc2t0b3ApIHtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoJ2JhY2tncm91bmQnLCdhc3NldHMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93JywnYXNzZXRzL3BvcHVwcy93aW5kb3ctd2luLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvc3RvcmUucG5nJyk7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKCdib290JywgJ2Fzc2V0cy9idXR0b25zL2Jvb3QucG5nJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYmFja2dyb3VuZCcsJ2Fzc2V0cy9iYWNrZ3JvdW5kL21vYmlsZS9iYWNrZ3JvdW5kLWJyb3duLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnd2luZG93JywnYXNzZXRzL3BvcHVwcy9tb2JpbGUvd2luZG93V2luLmpwZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnc3RvcmUnLCAnYXNzZXRzL2J1dHRvbnMvbW9iaWxlL3N0b3JlLnBuZycpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZSgnYm9vdCcsICdhc3NldHMvYnV0dG9ucy9tb2JpbGUvYm9vdC5wbmcnKTtcclxuICAgIH1cclxufTtcclxuXHJcbldpblN0YXRlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdiYWNrZ3JvdW5kJyk7XHJcbiAgdmFyIHdpbmRvdyA9IHRoaXMuYWRkLnNwcml0ZSgwLDAsJ3dpbmRvdycpO1xyXG4gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHdpbmRvdy5zY2FsZS5zZXQoMC43MykgOiB3aW5kb3cuc2NhbGUuc2V0KDAuMjksIDAuMjkxKTtcclxuICB3aW5kb3cueSA9IDA7XHJcbiAgd2luZG93LnggPSAwO1xyXG4gICAgaWYgKFBoYXNlci5EZXZpY2UuZGVza3RvcCkge1xyXG4gICAgICAgIHZhciBib25vU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcyZW0gQW1lcmljYW4gQm9sZCcsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGRpc2NvdW50U3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICc1ZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB3b3JLZXkgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICc1ZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBsZWdhbFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMi4yZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBib25vU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICcxZW0gQW1lcmljYW4gQm9sZCcsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjMmIzZjY4JyxcclxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGRpc2NvdW50U3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICczZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciB3b3JLZXkgPSB7XHJcbiAgICAgICAgICAgIGZvbnQ6ICczZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBsZWdhbFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250OiAnMS4yZW0gQW1lcmljYW4nLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzJiM2Y2OCcsXHJcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5idG5Cb290ID0gdGhpcy5hZGQuc3ByaXRlKDAsIDAsICdib290Jyk7XHJcbiAgICB0aGlzLmJ0bkJvb3QueCA9IFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IHRoaXMuZ2FtZS53b3JsZC53aWR0aCAtIDUwIDogKHRoaXMuZ2FtZS53b3JsZC53aWR0aCAvIDIpICsgMTA7XHJcbiAgICB0aGlzLmJ0bkJvb3QueSA9ICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC0gNTAgOiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiArIDMwLyogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgLSAzMCAqLztcclxuICAgIHRoaXMuYnRuQm9vdC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLmJ0bkJvb3Quc2NhbGUuc2V0KDAuNSkgOnRoaXMuYnRuQm9vdC5zY2FsZS5zZXQoMC40KTtcclxuICAgIHRoaXMuYnRuQm9vdC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5Cb290LmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgdGhpcy5idG5Cb290LmV2ZW50cy5vbklucHV0RG93bi5hZGQoZnVuY3Rpb24oKXtcclxuICAgICB0aGlzLnN0YXRlLnN0YXJ0KCdUdXRvcmlhbCcpO1xyXG4gICAgIH0sdGhpcyk7XHJcblxyXG4gICAgIHRoaXMuYnRuU3RvcmUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgJ3N0b3JlJyk7XHJcbiAgICAgdGhpcy5idG5TdG9yZS54ID0gIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/IDUwIDogMzU7XHJcbiAgICAgdGhpcy5idG5TdG9yZS55ID0gUGhhc2VyLkRldmljZS5kZXNrdG9wID8gdGhpcy5nYW1lLndvcmxkLmhlaWdodCAtIDUwIDogdGhpcy5nYW1lLndvcmxkLmhlaWdodCAvIDIgKyAzMCAvKiB0aGlzLmdhbWUud29ybGQuaGVpZ2h0IC8gMiAtIDMwICovO1xyXG4gICAgIHRoaXMuYnRuU3RvcmUuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgIFBoYXNlci5EZXZpY2UuZGVza3RvcCA/ICB0aGlzLmJ0blN0b3JlLnNjYWxlLnNldCgwLjUpIDogdGhpcy5idG5TdG9yZS5zY2FsZS5zZXQoMC40KTtcclxuICAgICB0aGlzLmJ0blN0b3JlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICAgdGhpcy5idG5TdG9yZS5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgdGhpcy5idG5TdG9yZS5ldmVudHMub25JbnB1dERvd24uYWRkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uID0gXCJodHRwczovL3d3dy5hbWVyaWNhbmluby5jb20vXCI7XHJcbiAgICAgfSx0aGlzKTtcclxuXHJcbiAgICB2YXIgZ2VuZXJhbFggPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLndpZHRoIC8gMiA6IHRoaXMud29ybGQud2lkdGggLyA0ICsgMjA7XHJcbiAgICB2YXIgdGV4dGZpcnN0ID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsIGxlZ2FsU3R5bGUpO1xyXG4gICAgdGV4dGZpcnN0LnkgPSBQaGFzZXIuRGV2aWNlLmRlc2t0b3AgPyB0aGlzLndvcmxkLmhlaWdodCAvIDIuNSA6IHRoaXMud29ybGQuaGVpZ2h0IC8gNTtcclxuICAgIHRleHRmaXJzdC50ZXh0ID0gXCJMb2dyYXN0ZSBsaWJlcmFyIGEgbG9zIGVzcHJpdGl0dXMgZXRuaWNvcy5cIjtcclxuICAgIHRleHRmaXJzdC5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG5cclxuXHJcbiAgICB2YXIgZGlzY291bnRUZXh0ID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsZGlzY291bnRTdHlsZSk7XHJcbiAgICBkaXNjb3VudFRleHQueSA9IHRleHRmaXJzdC55ICsgZGlzY291bnRUZXh0LmhlaWdodCAvIDM7XHJcbiAgICBkaXNjb3VudFRleHQudGV4dCA9IHRoaXMuZGlzY291bnQrXCIlXCI7XHJcbiAgICBkaXNjb3VudFRleHQuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbiAgICB2YXIgdGV4dEJvbm8gPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyxib25vU3R5bGUpO1xyXG4gICAgdGV4dEJvbm8ueSA9IGRpc2NvdW50VGV4dC55ICsgdGV4dEJvbm8uaGVpZ2h0ICsgMTU7XHJcbiAgICB0ZXh0Qm9uby5hbmNob3Iuc2V0VG8oMC41LDApO1xyXG4gICAgdGV4dEJvbm8udGV4dCA9IFwiUmVjaWJlIHVuIGJvbm8gZGUgZGVzY3VlbnRvIGVuIHJlZmVyZW5jaWFzIHNlbGVjY2lvbmFkYXMuXCI7XHJcblxyXG4gICAgdmFyIHdvcmQgPSB0aGlzLmFkZC50ZXh0KGdlbmVyYWxYLCAwLCAnJyx3b3JLZXkpO1xyXG4gICAgd29yZC55ID0gIHRleHRCb25vLnkgKyB3b3JkLmhlaWdodCAvIDQ7XHJcbiAgICB3b3JkLnRleHQgPSBTdHJpbmcodGhpcy53b3JkKTtcclxuICAgIHdvcmQuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbiAgICB2YXIgbXNnID0gdGhpcy5hZGQudGV4dChnZW5lcmFsWCwgMCwgJycsbGVnYWxTdHlsZSk7XHJcbiAgICBtc2cueSA9ICB3b3JkLnkgKyBtc2cuaGVpZ2h0ICsgMTU7XHJcbiAgICBtc2cudGV4dCA9IFN0cmluZyh0aGlzLm1zZyk7XHJcbiAgICBtc2cuYW5jaG9yLnNldFRvKDAuNSwwKTtcclxuXHJcbn07XHJcblxyXG5XaW5TdGF0ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gV2luU3RhdGU7XHJcbiIsIi8vIFBIQVNFUiBJUyBJTVBPUlRFRCBBUyBBTiBFWFRFUk5BTCBCVU5ETEUgSU4gSU5ERVguSFRNTFxyXG5QaGFzZXIuRGV2aWNlLndoZW5SZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIFBsYXlTdGF0ZSAgPSByZXF1aXJlKCcuL1BsYXlTdGF0ZScpO1xyXG4gIHZhciBXaW5TdGF0ZSAgPSByZXF1aXJlKCcuL1dpblN0YXRlJyk7XHJcbiAgdmFyIFR1dG9yaWFsU3RhdGUgID0gcmVxdWlyZSgnLi9UdXRvcmlhbFN0YXRlJyk7XHJcblxyXG4gIGlmICghUGhhc2VyLkRldmljZS5kZXNrdG9wKSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg2NDAsIDExNTIsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnNldE1pbk1heCg2NDAsIDExNTIpO1xyXG4gICAgZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgxMTUyLCA2NDAsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gICAgZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAweDAwMDAwMDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLnNldE1pbk1heCgxMTUyLCA2NDApO1xyXG4gICAgZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG4gICAgZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5TSE9XX0FMTDtcclxuXHJcbiAgICBnYW1lLnNjYWxlLmZvcmNlT3JpZW50YXRpb24oZmFsc2UsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ1BsYXknLCAgIFBsYXlTdGF0ZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3dpbicsICAgV2luU3RhdGUpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdUdXRvcmlhbCcsICAgVHV0b3JpYWxTdGF0ZSk7XHJcblxyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ1R1dG9yaWFsJyk7XHJcbn0pXHJcbiJdfQ==
