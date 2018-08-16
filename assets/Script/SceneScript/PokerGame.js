cc.Class({
    extends: cc.Component,

    properties: {
        PokerPre: cc.Prefab,
        PokerAtals: cc.SpriteAtlas,
    },
    onLoad: function () {
        this.btnWord = cc.find("Canvas/Play/Word");
        this.playerNum = 8;
        this.initUI();

    },
    update: function (dt) {
    },
    onClickExit: function () {
        require("SceneManager").LoadScene("EnterScene.fire");
    },
    onClickComfire: function () {
        var num = this.node.getChildByName("PlayerNum").getComponent(cc.EditBox).string;
        if(num == ""){
            num =8;
        }
        num = parseInt(num);
        if (num <= 1 || num > 8) {
            num = 8;
        }

        this.node.getChildByName("PlayerNum").getComponent(cc.EditBox).string = num;
        this.playerNum = num;
        this.initUI();
    },
    onClickPlay: function () {
        this.initPoker();
    },
    initUI: function () {
        this.pokerArr = [];
        this.node.getChildByName("PokerShowArea").removeAllChildren();
        this.PlayerArr = [];
        for (var i = 0; i < this.playerNum; i++) {
            var str = "玩家" + (i + 1);
            this.PlayerArr.push(str);
        }
        this.plyaerPoint = 0;
        this.btnWord.getComponent(cc.Label).string = "请"+this.PlayerArr[this.plyaerPoint]+"点击";
        this.pokerNumber = 52;
    },
    returnPos: function (plyaerPoint) {
        var startPos = [0,0, -80, -160, -240, -320, -400, -480, -560];
        var mul = 160;
        if (plyaerPoint == 0) {
            return startPos[this.playerNum];
        } else {
            return startPos[this.playerNum] + mul * plyaerPoint;
        }
    },
    initPoker: function () {
        if (this.plyaerPoint == 0) {
            this.node.getChildByName("PokerShowArea").removeAllChildren();
        }
        var poker = cc.instantiate(this.PokerPre);
        this.node.getChildByName("PokerShowArea").addChild(poker);
        poker.setPositionX(this.returnPos(this.plyaerPoint));
        this.plyaerPoint++;
        if (this.plyaerPoint == this.playerNum) {
            this.plyaerPoint = 0;
        }
        this.returnPokerNum();
        var pokerNum = this.pokerNum;
        this.pokerAction(poker,pokerNum);
        this.btnWord.getComponent(cc.Label).string = "请"+this.PlayerArr[this.plyaerPoint]+"点击";
        this.node.getChildByName("Leave").getComponent(cc.Label).string = "剩余" + this.pokerNumber + "张";
        this.node.getChildByName("WordShow").getComponent(cc.Label).string = this.pokerWord(pokerNum);
        if (this.pokerNumber <= 0) {
            this.initUI();
        }
    },
    returnPokerNum: function () {
        var func = function () {
            var pokerNum = Math.floor(Math.random() * 52 + 1);
            var isEqu = false;

            if (this.pokerArr.length == 52) {
                this.restartGame();
            } else {
                for (var i = 0; i < this.pokerArr.length; i++) {
                    if (this.pokerArr[i] == pokerNum) {
                        isEqu = true;
                    }
                }
                if (isEqu == false) {
                    if (pokerNum != 0) {
                        this.pokerArr.push(pokerNum);
                        this.pokerNum = pokerNum;
                        this.pokerNumber--;
                    } else {
                        func();
                    }
                } else {
                    func();
                }
            }

        }.bind(this);
        func();
    },
    restartGame: function () {
        this.pokerArr = [];
        this.pokerNumber = 52;
    },
    pokerAction: function(node,numStr){
        node.getComponent(cc.Sprite).spriteFrame = this.PokerAtals.getSpriteFrame(numStr);
        var orignalPos = node.getPosition();
        node.stopAllActions();
        var finishFunc = cc.callFunc(function(){
            node.getChildByName("BG").active = false;
        }.bind(this));
        node.setPosition(-700,-560);
        node.runAction(cc.sequence(cc.moveTo(0.3,orignalPos),finishFunc));
    },
    pokerWord: function(pokerNum){
        this.wordArr = [
            "",
            "张斐然脱裤子", "张斐然脱衣服", "", "指定一个人喝",
            "小姐牌，陪别人喝", "小姐牌，陪别人喝", "小姐牌，陪别人喝", "小姐牌，陪别人喝",
            "逛三园游戏","逛三园游戏","逛三园游戏","逛三园游戏",
            "猜拳",  "猜拳",  "猜拳",  "猜拳",
            "照相机游戏","照相机游戏","照相机游戏","照相机游戏",
            "摸鼻子","摸鼻子","摸鼻子","摸鼻子",
            "PASS","PASS","PASS","PASS",
            "对家喝", "对家喝", "对家喝", "对家喝",
            "自己干杯", "自己干杯", "自己干杯", "自己干杯",
            "神经病游戏",  "神经病游戏",  "神经病游戏",  "神经病游戏",
            "上家喝",  "上家喝",  "上家喝",  "上家喝",
            "下家喝","下家喝","下家喝","下家喝",
            "第四张喝两杯","第四张喝两杯","第四张喝两杯","第四张喝两杯",
        ];
        if(this.plyaerPoint == 0){
            var index  = this.playerNum;
        }else{
            var index  = this.plyaerPoint;
        }
        return this.PlayerArr[index-1] + ":" + this.wordArr[pokerNum];
    },

});
