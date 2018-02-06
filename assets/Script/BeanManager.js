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
    create: function (currentY) {
        var self = this
        this.node.children.forEach(function (item) {
            if (item.y < currentY - (cc.winSize.height / 2)) {
                item.active = false
                self.beanPool.push(item)
            }
        })

        let randomNumer = Math.floor(3 * Math.random()) + 1
        for (let i = 0; i < randomNumer; i++) {
            var newBean = null
            if (this.beanPool.length == 0) {
                newBean = cc.instantiate(this.bean)
            }
            else {
                newBean = this.beanPool.pop()
            }
            //newBean.parent = this.node
            newBean.y = cc.winSize.height / 2 + newBean.height / 2 + currentY
            //var randomPositon = 150 * Math.floor(5 * Math.random()) + 50 + newBean.width / 2
            let positionX = 150 * i + 50 + newBean.width / 2
            newBean.x = positionX
            newBean.getComponent('Bean').init()
            newBean.active = true
            newBean.getComponent(cc.BoxCollider).enabled = true
        }

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
    }

});
