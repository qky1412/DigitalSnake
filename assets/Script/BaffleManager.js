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
        for (let i = 0; i < 10; i++) {
            let newBaffle = cc.instantiate(this.baffle)
            newBaffle.parent = this.node
            newBaffle.active = false
            this.bafflePool.push(newBaffle)
        }
    },

    create: function (currentY) {
        var self = this
        this.node.children.forEach(function (item) {
            if (item.y < currentY - (cc.winSize.height / 2)) {
                item.active = false
                self.bafflePool.push(item)
            }
        })

        let randomNumer = Math.floor(3 * Math.random()) + 1
        for (let i = 0; i < randomNumer; i++) {
            var newBaffle = null
            if (this.bafflePool.length == 0) {
                newBaffle = cc.instantiate(this.baffle)
            }
            else {
                newBaffle = this.bafflePool.pop()
            }
            newBaffle.height = i * 50 + 200
            newBaffle.getComponent(cc.BoxCollider).size.height = newBaffle.height
            //newBean.parent = this.node
            newBaffle.y = cc.winSize.height / 2 + 150 / 2 + currentY + 200 - 75 - newBaffle.height / 2
            //var randomPositon = 150 * Math.floor(5 * Math.random()) + 50 + newBean.width / 2
            let positionX = 150 * (i + 1) - newBaffle.width / 2 + 1
            newBaffle.x = positionX
            newBaffle.getComponent('Baffle').init()
            newBaffle.active = true
            newBaffle.getComponent(cc.BoxCollider).enabled = true
        }
    }
});
