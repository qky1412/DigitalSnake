 var Snake = require('Snake')
 var BeanManager = require('BeanManager')
 var BlockManager = require('BlockManager')
 var SnakeManager = require('SnakeManager')
 var BaffleManager = require('BaffleManager')
 var Config = require('Config')
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
Array.prototype.contains = function(elem) {
    for (var i in this) {
        if (this[i] == elem) return true
    }
    return false
}
 cc.Class({
    extends: cc.Component,

    properties: {
        snake: Snake,
        beanManager: BeanManager,
        blockManager: BlockManager,
        snakeManager: SnakeManager,
        baffleManager: BaffleManager,
        speed:  {
            default: 250,
            visible: false
        },
        screenLine: cc.Node,
        score: {
            default: 0,
            visible: false
        },
        scoreLabel: cc.Label,
        gameOverDialog: cc.Node,
        gameOverScoreLabel: cc.Label,
        gameOverHighestScoreLabel: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        cc.global = {}
        cc.global.http = require('Network')
        cc.global.game = this
        cc.global.game.isCollision = false
        cc.global.game.ct = CollisionType.BEAN
        cc.global.game.co = CollisionOrientation.NONE
        this.status = GameStatus.welcome

        //this.map = [[0,0,0,0,0],[-9,-20,-10,-5,-20],[0,-100,0,0,-100],[0,5,0,-100,0],[0,0,203,3,0],[2,100,1,201,0],[202,0,201,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        this.map = [[202,203,202,201,203],[102,100,0,100,0],[0,0,100,0,0],[102,0,101,0,102],[0,102,0,102,0],
        [100,0,100,0,102],[202,203,202,201,202],[0,100,100,100,0],[0,100,0,0,102],[100,100,0,102,100],
        [0,101,102,0,0],[100,0,202,100,0],[0,100,0,100,0],[202,203,201,202,203],[100,100,102,100,102],
        [100,100,201,100,0],[0,0,102,100,0],[100,0,0,0,102],[102,0,100,0,0],[0,102,0,102,0],
        [100,0,100,0,0],[202,201,203,201,202],[102,100,100,102,0],[100,0,100,100,102],[0,102,100,0,0],
        [0,0,100,0,0],[0,0,101,0,102],[0,100,0,100,0],[100,102,0,100,102],[100,102,100,0,0],
        [100,0,100,0,0],[201,202,203,202,203],[102,100,0,100,102],[0,0,201,0,102],[102,0,102,100,0],
        [102,100,0,100,0],[0,100,102,100,0],[0,100,0,0,102],[102,0,0,0,0],[0,0,0,0,0]]
        
        cc.director.getCollisionManager().enabled = true
        //cc.director.getCollisionManager().enabledDebugDraw = true
        
        cc.global.http.login({platform_id: 'qky1412@gmail.com'}, function (resp) {
            //console.log(resp.data)
            if (resp.data.token) {
                Config.setUser(resp.data)
            }
        })
        
        this.initAction()
    },

    // called every frame
    update: function (dt) {
        if (cc.global.game.blockManager.getStatus() == 1 && cc.global.game.baffleManager.status == 1) {
            if (this.snake && this.screenLine) {
                let snakeY = this.snake.node.y
                let lineY = this.screenLine.y
                let distance = snakeY - lineY
                if (distance >= this.offset && !this.isCreating) {
                    //console.log('distance = ' + distance)
                    //console.log('create map')
                    this.isCreating = true
                    this.screenLine.y = snakeY
                    this.create(snakeY)
                    this.isCreating = false
                }
            }
        }
    },

    reset: function () {

    },

    create: function (currentY) {
        var self = this
        if (this.beanManager && this.blockManager && this.baffleManager) {
            this.beanManager.recycleAll(currentY)
            this.blockManager.recycleAll(currentY)
            this.baffleManager.recycleAll(currentY)
            let randomNumber = parseInt(Math.random()*7)
            let currentMap =  this.map.slice(randomNumber*6, randomNumber*6 + 5)
            
            currentMap.forEach(function (mapItem, row) {
                mapItem.forEach(function (value, col) {
                    if (value == 100) {
                        self.baffleManager.create(currentY, value, row, col)
                    } else {
                        return
                    }
                })
            })

            currentMap.forEach(function (mapItem, row) {
                mapItem.forEach(function (value, col) {
                    if ((value > 0 && value < 100) || value == 102) {
                        self.beanManager.create(currentY, value, row, col)
                    } else {
                        return
                    }

                })
            })
            currentMap.forEach(function (mapItem, row) {
                mapItem.forEach(function (value, col) {
                    if ((value < 0) || value == 201 || value == 202 || value == 203) {
                        self.blockManager.create(currentY, value, row, col)
                    } else {
                        return
                    }

                })
            })
            
        }
    },

    initAction: function () {
        this.offset = (cc.winSize.height)
        if (this.snake && this.screenLine) {
            this.snake.node.x = 0
            this.snake.node.y =  0
            this.screenLine.y = -cc.winSize.height
            this.snake.score = this.snake.defaultScore
            this.snake.scoreLabel.string = this.snake.score
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
        }
    },
    gameOver: function () {
        this.status = GameStatus.end
        this.gameOverDialog.active = true
        this.gameOverScoreLabel.string = this.score
        this.gameOverHighestScoreLabel.string = this.getHighestLocalScore()
        this.setLocalScore(this.score)
        
        // cc.global.http.uploadScore(this.score, function (resp) {
        //     //console.log(resp.data)
        // })
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
    },

    getHighestLocalScore: function () {
        return cc.sys.localStorage.getItem('local_score') || 0
    },

    setLocalScore: function (score) {
        let localScore = this.getHighestLocalScore()
        if (score > localScore) {
            cc.sys.localStorage.setItem('local_score', parseInt(score))
        }
    }
});
