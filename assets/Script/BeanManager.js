var Bean = require('Bean')
cc.Class({
    extends: cc.Component,

    properties: {
        bean: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init: function () {
        this.beanPool = new cc.NodePool()
        //this.schedule(this.creatBean, 3, cc.macro.REPEAT_FOREVER, 0)
    },
    createBean: function () {
        var newBean = null
        if(this.beanPool.size() == 0) {
            newBean = cc.instantiate(this.bean)
        }
        else {
            newBean = this.beanPool.get()
        }
        newBean.y = cc.winSize.height / 2 + newBean.height / 2
        var randomPositon = 150 * Math.floor(5 * Math.random()) + 50 + newBean.width / 2
        // var randomPositon =  Math.floor(cc.winSize.width * Math.random())
        // if (randomPositon < newBean.width / 2) {
        //     randomPositon = newBean.width / 2
        // } else if (randomPositon > cc.winSize.width - newBean.width / 2) {
        //     randomPositon = cc.winSize.width - newBean.width / 2
        // }
        newBean.x = randomPositon
        newBean.getComponent('Bean').init()
        this.node.addChild(newBean)
    },
    onCollsionEnter: function(other, self){
        //如果是豆子
        if(other.tag == 200) {
            this.beanPool.put(other.node)
        }
    },

});
