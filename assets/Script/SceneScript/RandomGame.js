
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad :function() {},


    update:function (dt) {},

    onClickExit: function(){
       cc.WZL.SceneManager.LoadScene("EnterScene.fire");
    },


});
