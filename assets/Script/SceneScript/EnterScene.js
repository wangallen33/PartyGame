
cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad:function () {

    },
    onClickPokerGame: function(){
        require("SceneManager").LoadScene("PokerScene.fire");
    },
    onClickRandomGame: function(){
        require("SceneManager").LoadScene("RandomScene.fire");
    },
});
