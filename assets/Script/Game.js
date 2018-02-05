 var Snake = require('Snake')
 var BeanManager = require('BeanManager')
 var BlockManager = require('BlockManager')
 var SnakeManager = require('SnakeManager')
 var GameStatus = cc.Enum({
     welcome: 0,
     begin: 1,
     pause: 2,
     end: 3
 })
 var CollisionType = cc.Enum({
     BEAN: 0,
     BLOCK: 1,
     BAFFLE: 2
 })
 var CollisionOrientation = cc.Enum({
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
    BOTTOM: 3
})
 cc.Class({
    extends: cc.Component,

    properties: {
        snake: Snake,
        beanManager: BeanManager,
        blockManager: BlockManager,
        snakeManager: SnakeManager,
        speed: 300
    },

    // use this for initialization
    onLoad: function () {
        cc.global = {}
        cc.global.game = this
        cc.global.game.isCollision = false
        cc.global.game.ct = CollisionType.BEAN
        cc.global.game.co = CollisionOrientation.NONE
        this.distance = 0
        this.status = 0

        this.initAction()
        cc.director.getCollisionManager().enabled = true
        cc.director.getPhysicsManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true
        if (this.beanManager) {
            this.beanManager.init()
        }
        if (this.blockManager) {
            this.blockManager.init()
        }
    },

    // called every frame
    update: function (dt) {
        if ((cc.global.game.blockManager.status == 1)) {
            this.distance += (cc.global.game.speed / 60)
            if (Math.floor(this.distance / cc.global.game.speed) == 4) {
                this.distance = 0
                this.createBeanAndBlock()
            }
        }
    },

    createBeanAndBlock: function () {
        if (this.beanManager && this.blockManager) {
            this.beanManager.createBean()
            this.blockManager.createBlock()
        }
    },

    initAction: function () {
        this.status = 1
        if (this.snake) {
            this.node.on("touchmove", this.dragMove, this);
        }
    },
    dragMove: function (event) {
        let preX = event.touch.getPreviousLocation().x
        let currentX = event.touch.getLocationX()
        let maxX = this.node.width / 2 - this.snake.node.width / 2
        let minX = -maxX
        let distance = currentX - preX

        if (distance > 0 && cc.global.game.isCollision && cc.global.game.ct == 1 && cc.global.game.co == 1) {
            return
        }

        if (distance < 0 && cc.global.game.isCollision && cc.global.game.ct == 1 && cc.global.game.co == 2) {
            return
        }

        if (this.snake.node.x + distance <= maxX && this.snake.node.x + distance >= minX) {
            // this.snakeManager.snakeMove(distance)
            this.snake.node.x += distance
        }
    }
});
