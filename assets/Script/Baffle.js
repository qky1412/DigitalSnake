var STATE = cc.Enum({
    NORMAL:1,
    BLOCKING: 2,
    STOPING: 3
})
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function () {
        this.state = STATE.NORMAL
    },

    // update (dt) {},

    stop: function () {
        this.state = STATE.STOPING
        cc.global.game.baffleManager.status = 2
    },

    onCollisionExit: function(other, self) {
        if (other.tag == 0) {
            this.state = STATE.NORMAL
            cc.global.game.baffleManager.status = 1
        }
    }
});
