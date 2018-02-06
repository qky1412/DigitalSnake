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
        this.blockPool = []
        for(let i = 0; i < 20; i++) {
            let newBlock = cc.instantiate(this.block)
            newBlock.parent = this.node
            newBlock.active = false
            this.blockPool.push(newBlock)
        }
        this.blockingNumber = 0
    },

    getStatus: function () {
        if (cc.global.game.status != 1) {
            return 0
        }
        if (this.blockingNumber == 0) {
            return 1
        } else {
            return 2
        }
    },

    addBlock: function (blockNode) {
        this.blockingNumber++
    },

    removeBlock: function (blockNode) {
        this.blockingNumber--
        if (this.blockingNumber < 0) {
            this.blockingNumber = 0
        }
    },

    create: function (currentY) {
        //remove previous blocks
        var self = this
        this.node.children.forEach(function (item) {
            if (item.y < currentY - (cc.winSize.height / 2)) {
                item.active = false
                self.blockPool.push(item)
            }
        })

        for(let i = 0; i < 5; i++) {
            var newBlock = null
            if(this.blockPool.length == 0) {
                newBlock = cc.instantiate(this.block)
            }
            else {
                newBlock = this.blockPool.pop()
            }
            //newBlock.parent = this.node
            newBlock.y = cc.winSize.height / 2 + newBlock.height / 2 + currentY + 200
            let positionX = i * newBlock.width + newBlock.width / 2
            newBlock.x = positionX
            newBlock.getComponent('Block').init()
            newBlock.active = true
            newBlock.getComponent(cc.BoxCollider).enabled = true
        }
    },
    recycle: function (node) {
        if (node) {
            node.active = false
            this.blockPool.push(node)
        }
    }
});
