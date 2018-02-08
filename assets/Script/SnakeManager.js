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
        let initCount = 40
        for (let i = 0; i < initCount; ++i) {
            let body = cc.instantiate(this.prefab)
            body.name = 'name_' + i
            this.snakeBodyPool.put(body)
        }

        this.addBody(30)
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
        for (let i = 0; i < count; i++) {
            this.createBody()
        }


    },

    createBody: function () {
        //console.log('create body')
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

            // console.log(last)

            this.head.lastBody.getComponent('SnakeBody').nextBody = body
            body.getComponent('SnakeBody').beforeBody = this.head.lastBody
            this.head.lastBody = body
            // cc.global.game.clickEnd()
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
        // console.log('destroy body')
        // this.snakeBodyPool.put(this.bodys.pop())

        var next = this.head.nextBody
        if (next)
        {
            var nextNextBody = next.getComponent('SnakeBody').nextBody

            if (nextNextBody)
            {
                nextNextBody.getComponent('SnakeBody').beforeBody = this.head.node
            } else
            {
                this.head.lastBody = null
            }

            this.head.nextBody = nextNextBody

            next.getComponent('SnakeBody').nextBody = null
            next.getComponent('SnakeBody').beforeBody = null
            // next.active = false
            this.snakeBodyPool.put(next)            
        }


        // this.snakeBodyPool.put(this.bodys.pop())
        // console.log
        // cc.global.game.clickEnd()

        // this.head.lastBody = this.bodys[this.bodys.length - 1]
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //
    // },
})
