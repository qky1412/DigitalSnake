cc.Class({
    extends: cc.Component,

    properties: {
        beforeBody: cc.Node,
        nextBody: cc.Node,
        duration: 30
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
        this.duration = this.beforeBody.duration
        setTimeout(function () {
            node.x = x
            // node.y = y
        }, this.duration)
    },
})
