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
    
    // update (dt) {
    //     this.status = this.getStatus()
    // },

    init: function () {
        this.status = 1
        this.blockPool = []
        for(let i = 0; i < 20; i++) {
            let newBlock = cc.instantiate(this.block)
            newBlock.parent = this.node
            newBlock.active = false
            this.blockPool.push(newBlock)
        }
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
        console.log('add block ' + blockNode.uuid)
        if (this.blockings.indexOf(blockNode.uuid) == -1) {
            this.blockings.push(blockNode.uuid)
        }
    },

    removeBlock: function (blockNode) {
        console.log('remove block ' + blockNode.uuid)
        this.blockings.removeByValue(blockNode.uuid)
    },

    create: function (currentY, value, row, col) {
        //remove previous blocks
        var self = this


        var newBlock = null
        if(this.blockPool.length == 0) {
            newBlock = cc.instantiate(this.block)
        }
        else {
            newBlock = this.blockPool.pop()
        }
        newBlock.y = currentY + 3 / 2 * cc.winSize.height - (newBlock.height / 2 + row * newBlock.height)
        newBlock.x = newBlock.width / 2 + col * newBlock.width
        newBlock.getComponent('Block').init(value)
        newBlock.active = true
        newBlock.getComponent(cc.BoxCollider).enabled = true
    },
    recycle: function (node) {
        if (node) {
            node.active = false
            this.blockPool.push(node)
        }
    },
    clear: function () {
        this.node.children.forEach(function (item) {
            item.destroy()
        })
    },

    recycleAll: function (currentY) {
        var self = this
        let offSet = currentY - cc.winSize.height
        this.node.children.forEach(function (item) {
            
            if ((item.y < offSet) && item.y !== 0) {
                //console.log('recycle block  item.y = ' + item.y + ' currentY = ' + currentY)
                item.active = false
                self.blockPool.push(item)
                
            }
        })
    }
});
