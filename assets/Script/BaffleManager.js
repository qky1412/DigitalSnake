var Baffle = require('Baffle')
cc.Class({
    extends: cc.Component,

    properties: {
        baffle: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function() {
        this.status = 1
        this.bafflePool = []
        for (var i = 0; i < 10; i++) {
            let newBaffle = cc.instantiate(this.baffle)
            newBaffle.parent = this.node
            newBaffle.active = false
            this.bafflePool.push(newBaffle)
        }
    },

    create: function (currentY, value, row, col) {
        var self = this

        var newBaffle = null
        if (this.bafflePool.length == 0) {
            newBaffle = cc.instantiate(this.baffle)
        } else {
            newBaffle = this.bafflePool.pop()
        }
        newBaffle.y = currentY + 3 / 2 * cc.winSize.height - (150 / 2 + row * 150)
        newBaffle.x = 150 * (col + 1) - newBaffle.width / 2
        newBaffle.getComponent('Baffle').init()
        newBaffle.active = true
        newBaffle.getComponent(cc.BoxCollider).enabled = true
    },
    clear: function () {
        this.node.children.forEach(function (item) {
            item.destroy()
        })
    },
    recycleAll: function (currentY) {
        var self = this
        let offSet = currentY - cc.winSize.height / 2
        this.node.children.forEach(function (item) {
            if (item.y < offSet && item.y !== 0) {
                self.recycle(item)
            }
        })
    },
    recycle: function (node) {
        if (!this.bafflePool.contains(node)) {
            this.bafflePool.push(node)
        }
    }
});
