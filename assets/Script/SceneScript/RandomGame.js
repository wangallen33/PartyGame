
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad :function() {
        this.WordListArr = [];
        this.initListWord();
    },


    update:function (dt) {},

    onClickExit: function(){
       require("SceneManager").LoadScene("EnterScene.fire");
    },

    onClickStart: function(){
        // 开始转动转盘
        var endArea = this.returnRandomNum();
        var circle = this.returnRandomCircle();
        if(circle <= 3){
            circle = 6;
        }
        // Canvas/Dial/Finger
        var fingerNode = this.node.getChildByName("Dial").getChildByName("Finger");
        var speed = 0.002;
        fingerNode.stopAllActions();
        var time = (speed*(circle*360+endArea));
        var dushu = (circle*360+endArea);
        var finishFunc = cc.callFunc(function(){
            var str = "";
            var Num = parseInt(endArea / 45);
            str = this.WordListArr[Num];
            this.node.getChildByName("Title").getComponent(cc.Label).string = str;
        }.bind(this));
        fingerNode.runAction(cc.sequence(cc.rotateBy(time,dushu).easing(cc.easeBackIn()),cc.rotateTo(0.001,endArea),finishFunc));
    },
    onFinishEditBox: function(event,custom){
        this.WordListArr[parseInt(custom)] = event.string;
    },
    returnRandomNum: function(){
        return Math.floor(Math.random() * 360);
    },
    returnRandomCircle: function(){
        return Math.floor(Math.random() * 15);
    },
    onClickRandomWord: function(){
        var wordNum = Math.floor(Math.random() * 100);
        this.node.getChildByName("Title").getComponent(cc.Label).string = "";
    },
    initListWord: function(){
        // Canvas/WordList/Btn0/PutIn
        this.btnWord0 = this.node.getChildByName("WordList").getChildByName("Btn0").getChildByName("PutIn");
        this.btnWord1 = this.node.getChildByName("WordList").getChildByName("Btn1").getChildByName("PutIn");
        this.btnWord2 = this.node.getChildByName("WordList").getChildByName("Btn2").getChildByName("PutIn");
        this.btnWord3 = this.node.getChildByName("WordList").getChildByName("Btn3").getChildByName("PutIn");
        this.btnWord4 = this.node.getChildByName("WordList").getChildByName("Btn4").getChildByName("PutIn");
        this.btnWord5 = this.node.getChildByName("WordList").getChildByName("Btn5").getChildByName("PutIn");
        this.btnWord6 = this.node.getChildByName("WordList").getChildByName("Btn6").getChildByName("PutIn");
        this.btnWord7 = this.node.getChildByName("WordList").getChildByName("Btn7").getChildByName("PutIn");
        this.btnWord0.getComponent(cc.EditBox).string = "pass";
        this.WordListArr.push("pass");
        this.btnWord1.getComponent(cc.EditBox).string = "下家喝一杯";
        this.WordListArr.push("下家喝一杯");
        this.btnWord2.getComponent(cc.EditBox).string = "上家喝一杯";
        this.WordListArr.push("上家喝一杯");
        this.btnWord3.getComponent(cc.EditBox).string = "自己喝两杯";
        this.WordListArr.push("自己喝两杯");
        this.btnWord4.getComponent(cc.EditBox).string = "自己喝一半";
        this.WordListArr.push("自己喝一半");
        this.btnWord5.getComponent(cc.EditBox).string = "加满";
        this.WordListArr.push("加满");
        this.btnWord6.getComponent(cc.EditBox).string = "大家干杯";
        this.WordListArr.push("大家干杯");
        this.btnWord7.getComponent(cc.EditBox).string = "指定喝光";
        this.WordListArr.push("指定喝光");
    },


});
