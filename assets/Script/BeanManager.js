var Bean = require('Bean')
cc.Class({
    extends: cc.Component,

    properties: {
        bean: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init: function () {
        this.beanPool = []
        for (var i = 0; i < 10; i++) {
            let newBean = cc.instantiate(this.bean)
            newBean.parent = this.node
            newBean.active = false
            this.beanPool.push(newBean)
        }
    },
    create: function (currentY, value, row, col) {
        var self = this


        var newBean = null
        if (this.beanPool.length == 0) {
            newBean = cc.instantiate(this.bean)
        }
        else {
            newBean = this.beanPool.pop()
        }
        newBean.y = currentY + 3 / 2 * cc.winSize.height - (150 / 2 + row * 150)
        newBean.x = 150 / 2 + col * 150
        newBean.getComponent('Bean').init(value)
        newBean.getComponent('Bean').nodeBgColor.color = cc.hexToColor('#ffffff')
        newBean.active = true
        newBean.getComponent(cc.BoxCollider).enabled = true
    },

    hide: function (node) {
        if (node) {
            //node.getComponent('Bean').nodeBgColor.color = cc.hexToColor('#000000')
            node.getComponent(cc.BoxCollider).enabled = false
            node.active = false
            //this.beanPool.push(node)
        }
    },

    recycleAll: function (currentY) {
        var self = this
        let offSet = currentY - cc.winSize.height / 2
        this.node.children.forEach(function (item) {
            if (item.y < offSet && item.y !== 0) {
                //item.active = false
                self.recycle(item)
            }
        })
    },

    clear: function () {
        this.node.children.forEach(function (item) {
            item.destroy()
        })
    },
    recycle: function (node) {
        if (!this.beanPool.contains(node)) {
            this.beanPool.push(node)
        }
    }

});
