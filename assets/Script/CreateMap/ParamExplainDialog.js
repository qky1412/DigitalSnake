cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        if (!cc.global) {
            cc.global = {}
        }
        cc.global.paramExplainDialog = this
        this.label.string = '100：右边存在墙\n' + '101：当前可能为星星\n' + '201-203：利用公式随机生成 block\n' + '小于0的数：指定的 block'
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
