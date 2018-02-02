cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Node,
        prefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        this.bodys = []
        this.bodys.push(this.head)

        this.snakeBodyPool = new cc.NodePool()
        let initCount = 30
        for (let i = 0; i < initCount; ++i) {
            let body = cc.instantiate(this.prefab)
            this.snakeBodyPool.put(body)
        }
    },

    onDestroy: function () {
        this.snakeBodyPool.clear()
    },

    snakeMove: function (distance) {
        this.bodys.forEach(function (item, index) {
            setTimeout(function () {
                item.x += distance
            }, 200 * index)
        })
    },

    addBody: function (count) {
        for (var i = 0; i < count; i++) {
            this.createBody()
        }
    },

    createBody: function () {
        let body = null
        if (this.snakeBodyPool.size() > 0) {
            body = this.snakeBodyPool.get()
        } else {
            body = cc.instantiate(this.prefab)
        }
        body.parent = this.head.parent
    },

    destroyBody: function () {
        if (this.bodys.length == 1) return
        this.snakeBodyPool.put(this.bodys.pop())
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
})
