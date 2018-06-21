
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad:function () {

    },




    onClickPokerGame: function(){
        cc.WZL.SceneManager.LoadScene("PokerScene.fire");
    },
    onClickRandomGame: function(){
        cc.WZL.SceneManager.LoadScene("RandomScene.fire");
    },
});
