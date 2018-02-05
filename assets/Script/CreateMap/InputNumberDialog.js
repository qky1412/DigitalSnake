cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox
    },

    // use this for initialization
    onLoad: function () {
        if (!cc.global) {
            cc.global = {}
        }
        cc.global.inputNumberDialog = this
        cc.global.mapType = -1
        this.node.on(cc.Node.EventType.TOUCH_END, function () {

        }, this)

        this.node.scaleX = 1
        this.node.scaleY = 1
        this.node.active = false
    },

    onEnable: function () {
        if (cc.global.mapType === 100) {
            // 墙
            this.editBox.node.active = false
        } else {
            this.editBox.node.active = true
        }
    },

    show: function () {
        if (!this.node.active) {
            this.node.active = true
        }
    },

    hide: function () {
        if (this.node.active) {
            this.node.active = false
        }
    },

    confirm: function () {
        if (cc.global.mapType === 100) {
            // wall
            this.mapItem.set(100)
            this.editBox.string = ''
            this.hide()
            return
        }
        var num = this.editBox.string
        if (num.length == 0) {
            console.log('请输入数字')
            return
        }
        num = Math.floor(num)
        if (num === 0) {
            console.log('请输入不为0的数字')
            return
        }
        if (cc.global.mapType === 1) {
            // bean
            if (num > 5) {
                console.log('请输入小于5的数字')
                return
            }
        }
        this.mapItem.set(num * cc.global.mapType)
        this.editBox.string = ''
        this.hide()
    },

    cancel: function () {
        this.hide()
    },

    selectType: function (event, data) {
        var type = parseInt(data)
        cc.global.mapType = type
        if (cc.global.mapType === 100) {
            // 墙
            this.editBox.node.active = false
        } else {
            this.editBox.node.active = true
        }
    },

    directInput: function (event, data) {
        this.mapItem.set(parseInt(data))
        this.editBox.string = ''
        this.hide()
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
})
