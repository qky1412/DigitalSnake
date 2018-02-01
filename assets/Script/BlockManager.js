Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
      if(this[i] == val) {
        this.splice(i, 1);
        break;
      }
    }
  }
cc.Class({
    extends: cc.Component,

    properties: {
        status: 0,
        block: cc.Prefab
    },
    
    update (dt) {
        this.status = this.getStatus()
    },

    init: function () {
        this.status = 1
        this.blockPool = new cc.NodePool()
        this.blockings = []
    },

    getStatus: function () {
        if (cc.global.game.status != 1) {
            return 0
        }
        if (this.blockings.length == 0) {
            return 1
        } else {
            return 2
        }
    },

    addBlock: function (blockNode) {
        this.blockings.push(blockNode.uuid)
    },

    removeBlock: function (blockNode) {
        this.blockings.removeByValue(blockNode.uuid)
    },

    createBlock: function (number) {
        if (number) {
            var newBlock = null
            if(this.blockPool.size() == 0) {
                newBlock = cc.instantiate(this.block)
            }
            else {
                newBlock = this.blockPool.get()
            }
            newBlock.y = cc.winSize.height / 2 + newBlock.height / 2 + cc.global.game.speed
            let randomPositon =  newBlock.width * Math.floor(5 * Math.random()) + newBlock.width / 2
            newBlock.x = randomPositon
            newBlock.getComponent('Block').init()
            this.node.addChild(newBlock)
        } else {
            for(let i = 0; i < 5; i++) {
                var newBlock = null
                if(this.blockPool.size() == 0) {
                    newBlock = cc.instantiate(this.block)
                }
                else {
                    newBlock = this.blockPool.get()
                }
                newBlock.y = cc.winSize.height / 2 + newBlock.height / 2 + cc.global.game.speed
                let positionX = i * newBlock.width + newBlock.width / 2
                newBlock.x = positionX
                newBlock.getComponent('Block').init()
                this.node.addChild(newBlock)
            }
        }
    }
});
