var Bean = require('Bean')
cc.Class({
    extends: cc.Component,

    properties: {
        bean: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    init: function () {
        this.beanPool = new cc.NodePool()
        for (let i = 0; i < 10; i++) {
            let newBean = cc.instantiate(this.bean)
            this.beanPool.put(newBean)
        }
    },
    createBean: function (currentY) {
        var self = this
        this.node.children.forEach(function (item) {
            if (item.y < currentY) {
                console.log('recycle bean')
                self.beanPool.put(item)
            }
        })

        let randomNumer = Math.floor(3 * Math.random()) + 1
        for (let i = 0; i < randomNumer; i++) {
            var newBean = null
            if (this.beanPool.size() == 0) {
                newBean = cc.instantiate(this.bean)
            }
            else {
                newBean = this.beanPool.get()
            }
            newBean.parent = this.node
            newBean.y = cc.winSize.height / 2 + newBean.height / 2 + currentY - 200
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
            this.beanPool.put(other.node)
        }
    },

    recycle: function (node) {
        if (node) {
            node.active = false
            this.beanPool.put(node)
        }
    }

});
