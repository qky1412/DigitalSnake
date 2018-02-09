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

    init: function (score) {
        this.state = STATE.NORMAL
        this.score = score
        if (score == 102) {
            this.score = Math.floor(Math.random() * 5) + 1
        }
        this.scoreLabel.string = this.score + ''
    }

});
