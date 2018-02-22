cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Node,
        prefab: cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
        if (!cc.global) {
            cc.global = {}
        }
        cc.global.snakeManager = this
        this.bodys = []
        this.head = this.head.getComponent('Snake')

        this.snakeBodyPool = new cc.NodePool()
        let initCount = 30
        for (let i = 0; i < initCount; ++i) {
            let body = cc.instantiate(this.prefab)
            this.snakeBodyPool.put(body)
        }

        // this.addBody(3)
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
        // for (let i = 0; i < count; i++) {
        //     this.createBody()
        // }
    },

    createBody: function () {
        ////console.log('create body')
        let body = null
        if (this.snakeBodyPool.size() > 0) {
            body = this.snakeBodyPool.get()
        } else {
            body = cc.instantiate(this.prefab)
        }
        body.parent = this.head.node.parent
        if (this.head.lastBody) {
            var last = this.head.lastBody
            body.y = last.y - 55
            body.x = last.x
            last.nextBody = body
            body.getComponent('SnakeBody').beforeBody = last
            this.head.lastBody = body
        } else {
            body.y = this.head.node.y - 55
            body.x = this.head.node.x
            this.head.nextBody = body
            body.getComponent('SnakeBody').beforeBody = this.head.node
            this.head.lastBody = body
        }
        this.bodys.push(body)
    },

    destroyBody: function () {
        ////console.log('destroy body')
        this.snakeBodyPool.put(this.bodys.pop())
        this.head.lastBody = this.bodys[this.bodys.length - 1]
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //
    // },
})
