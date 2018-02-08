 var Snake = require('Snake')
 var BeanManager = require('BeanManager')
 var BlockManager = require('BlockManager')
 var SnakeManager = require('SnakeManager')
 var BaffleManager = require('BaffleManager')
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
        baffleManager: BaffleManager,
        speed: 300,
        screenLine: cc.Node,
        score: 0,
        scoreLabel: cc.Label,
        gameOverDialog: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        cc.global = {}
        cc.global.game = this
        cc.global.game.isCollision = false
        cc.global.game.ct = CollisionType.BEAN
        cc.global.game.co = CollisionOrientation.NONE
        this.status = GameStatus.welcome

        
        cc.director.getCollisionManager().enabled = true
        //cc.director.getCollisionManager().enabledDebugDraw = true
        
        this.initAction()
        // cc.find('Canvas').on("touchend", this.clickEnd, this)
    },

    clickEnd: function (dt) {
        console.log('__________________________')
        console.log(cc.global.snakeManager.head)
        var snake = cc.global.snakeManager.head.node
        var next = snake.getComponent('Snake').nextBody
        if (next) console.log(next.getComponent('SnakeBody'))
        
        while (next)
        {
            let newNext = next.getComponent('SnakeBody').nextBody

            if (newNext)
            {
                console.log(newNext.getComponent('SnakeBody'))    
            }
            
            next = newNext
        }
    },

    // called every frame
    update: function (dt) {
        if (cc.global.game.blockManager.status == 1 && cc.global.game.baffleManager.status == 1) {
            if (this.snake && this.screenLine) {
                let distance = this.snake.node.y - this.screenLine.y
                if (distance > this.offset && !this.isCreating) {
                    this.isCreating = true
                    this.screenLine.y = this.snake.node.y
                    let currentY = this.snake.node.y
                    this.create(currentY)
                    this.isCreating = false
                }
            }
        }
    },

    reset: function () {

    },

    create: function (currentY) {
        if (this.beanManager && this.blockManager && this.baffleManager) {
            this.beanManager.create(currentY)
            this.blockManager.create(currentY)
            this.baffleManager.create(currentY)
        }
    },

    initAction: function () {
        if (this.snake && this.screenLine) {
            this.snake.node.x = 0
            this.snake.node.y = cc.winSize.height / 2
            this.screenLine.y = cc.winSize.height
        }
        if (this.beanManager) {
            this.beanManager.init()
        }
        if (this.blockManager) {
            this.blockManager.init()
        }

        if (this.baffleManager) {
            this.baffleManager.init()
        }
        this.score = 0
        if (this.scoreLabel) {
            this.scoreLabel.string = this.score
        }
        
        this.status = GameStatus.begin
        if (this.snake) {
            this.offset = (cc.winSize.height / 2)
            cc.find('Canvas').on("touchmove", this.dragMove, this)
        }
    },
    dragMove: function (event) {
        let preX = event.touch.getPreviousLocation().x
        let currentX = event.touch.getLocationX()
        let maxX = this.node.width / 2 - this.snake.node.width / 2
        let minX = -maxX
        this.distance = currentX - preX
        let maxSpeed = 30
        if (Math.abs(this.distance) > maxSpeed) {
            this.distance = this.distance < 0 ? -maxSpeed : maxSpeed
        } 


        if (this.distance > 0 && cc.global.game.isCollision && cc.global.game.ct == 1 && cc.global.game.co == 1) {
            return
        }

        if (this.distance < 0 && cc.global.game.isCollision && cc.global.game.ct == 1 && cc.global.game.co == 2) {
            return
        }

        if (this.distance > 0 && cc.global.game.isCollision && cc.global.game.ct == 2 && cc.global.game.co == 1) {

            return
        }

        if (this.distance < 0 && cc.global.game.isCollision && cc.global.game.ct == 2 && cc.global.game.co == 2) {
            return
        }

        if (this.snake.node.x + this.distance <= maxX && this.snake.node.x + this.distance >= minX) {
            this.snake.node.x += this.distance

            this.snake.nextBody.getComponent('SnakeBody').duration = Math.max(Math.abs(this.distance * 100), 100)

            console.log('distance:' + this.distance)    
        }
    },
    gameOver: function () {
        this.status = GameStatus.end
        this.gameOverDialog.active = true
    },

    gameRestart: function () {
        //remove screen's other components if exist
        this.gameOverDialog.active = false
        if (this.beanManager && this.blockManager && this.baffleManager) {
            this.beanManager.clear()
            this.blockManager.clear()
            this.baffleManager.clear()
        }
        this.initAction()
    }
});
