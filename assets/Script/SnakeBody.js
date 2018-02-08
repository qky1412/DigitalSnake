cc.Class({
    extends: cc.Component,

    properties: {
        beforeBody: cc.Node,
        nextBody: cc.Node,
        duration: 500
    },

    // use this for initialization
    onLoad: function () {

    },

    /**
     * 回收节点后执行
     */
    unuse: function () {
    },

    /**
     * 从对象池获取节点后执行
     */
    reuse: function () {
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var x = this.beforeBody.x
        var y = this.beforeBody.y
        var node = this.node

        var deltaX = x - node.x
        var deltaY = y - node.y
        var distance = Math.pow((deltaX * deltaX + deltaY * deltaY), 0.5);

        if (distance <= 42)
        {
            return
        }

        // if (this.duration <= 0)
        // {
        //     return
        // }

        var newx = node.x + this.duration * deltaX / distance / 55
        var newy = node.y + this.duration * deltaY / distance / 55

        node.x = newx
        node.y = newy

        if (this.nextBody)
        {
            this.nextBody.getComponent('SnakeBody').duration = this.duration    
        }
    }
})
