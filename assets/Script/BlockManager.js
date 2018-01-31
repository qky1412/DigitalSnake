cc.Class({
    extends: cc.Component,

    properties: {
        status: 0,
        block: cc.Prefab
    },

    onLoad () {

    },

    start () {

    },

    // update (dt) {},

    init: function () {
        this.status = 1
        this.blockPool = new cc.NodePool()
        this.schedule(this.createBlock, 3, cc.macro.REPEAT_FOREVER, 0)
    },

    createBlock: function () {
        var newBlock = null
        if(this.blockPool.size() == 0) {
            newBlock = cc.instantiate(this.block)
        }
        else {
            newBlock = this.blockPool.get()
        }
        newBlock.y = cc.winSize.height / 2 + newBlock.height / 2
        let randomPositon =  newBlock.width * Math.floor(5 * Math.random()) + newBlock.width / 2
        newBlock.x = randomPositon
        newBlock.getComponent('Block').init()
        this.node.addChild(newBlock)
    }
});
