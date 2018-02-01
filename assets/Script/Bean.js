var STATE = cc.Enum({
    NONE: 0,
    NORMAL:1,
    FINISH: 2
})
cc.Class({
    extends: cc.Component,

    properties: {
       score: 0,
       scoreLabel: cc.Label,
       nodeBgColor: cc.Node,
       state:{
            default: STATE.NONE,
            type: STATE,
            visible: false
        }
    },

    update (dt) {
        if(cc.global.game.blockManager.status == 1){
            this.node.y -= 200 * dt;
        }
    },

    init: function () {
        this.state = STATE.NORMAL
        this.score = 1 +  Math.floor(5 * Math.random())
        this.scoreLabel.string = this.score + ''
    },
    onCollisionEnter: function(other, self) {
        if (other.tag == 0) {
            this.getComponent(cc.BoxCollider).enabled = false
            this.node.destroy()
        }
    },

});
