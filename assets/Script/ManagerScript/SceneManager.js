var SceneManager = cc.Class({});
SceneManager.LoadScene = function (SceneName) {
    if(cc.director.getScene().name == SceneName){
        return;
    }
    this._loadScene(SceneName);
};
SceneManager._loadScene = function (SceneName) {
    if(this.startLoadScene != true){
        this.startLoadScene = true;
        cc.director.loadScene(SceneName,function () {
           this.startLoadScene = false;
        }.bind(this));
    }
};
cc.WZL.SceneManager = SceneManager;
module.exports = SceneManager;