cc.Class({
    extends: cc.Component,

    properties: {
        sprite: cc.Sprite,
        label: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.sprite.node.active = false
    },

    init: function (index) {
        var self = this
        this.num = 0
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            //console.log('type : ' + cc.global.mapType)
            cc.global.inputNumberDialog.mapItem = self
            cc.global.inputNumberDialog.show()
        }, this)
    },

    set: function (num) {
        this.num = num
        this.label.string = num
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
})
