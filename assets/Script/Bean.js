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

    init: function () {
        this.state = STATE.NORMAL
        this.score = 1 +  Math.floor(5 * Math.random())
        this.scoreLabel.string = this.score + ''
    },
    onCollisionEnter: function(other, self) {
        if (other.tag == 0) {
            this.getComponent(cc.BoxCollider).enabled = false
            cc.global.game.beanManager.recycle(this.node)
        }
    },

});
