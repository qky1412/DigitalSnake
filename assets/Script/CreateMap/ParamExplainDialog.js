cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        if (!cc.global) {
            cc.global = {}
        }
        cc.global.paramExplainDialog = this

        var self = this
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            self.hide()
        }, this)

        this.node.scaleX = 1
        this.node.scaleY = 1
        this.node.active = false
    },

    show: function () {
        this.node.active = true
    },

    hide: function () {
        this.node.active = false
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
