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
        for (let i = 0; i < 10; i++) {
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
        newBean.active = true
        newBean.getComponent(cc.BoxCollider).enabled = true
    },
    onCollsionEnter: function (other, self) {
        //如果是豆子
        if (other.tag == 200) {
            other.node.active = false
            this.beanPool.push(other.node)
        }
    },

    recycle: function (node) {
        if (node) {
            node.active = false
            this.beanPool.push(node)
        }
    },

    recycleAll: function (currentY) {
        var self = this
        let offSet = currentY - cc.winSize.height
        this.node.children.forEach(function (item) {
            if ((item.y < (currentY - cc.winSize.height)) && item.y !== 0) {
                //console.log('recycle bean  item.y = ' + item.y + ' currentY = ' + currentY)
                item.active = false
                self.beanPool.push(item)
            }
        })
    },

    clear: function () {
        this.node.children.forEach(function (item) {
            item.destroy()
        })
    }

});
