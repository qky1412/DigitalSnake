var STATE = cc.Enum({
    NONE: 0,
    NORMAL:1,
    BLOCKING: 2,
    FINISH: 3
})

const BgColor = ['#340099', '#f990ff', '#fa023f', '#f0f5f', '#00ffff', '#f1a000']

cc.Class({
    extends: cc.Component,

    properties: {
        score: 1,
        scoreLabel: cc.Label,
        sprite: cc.Sprite,
        state:{
            default: STATE.NONE,
            type: STATE,
            visible: false
        }
    },

    onLoad: function () {
        this.maxColor = [245, 245, 64]
        this.middleColor = [64, 245, 64]
        this.minColor = [64, 245, 245]
        this.offsetColor = 12
    },

    init: function (score) {
        this.state = STATE.NORMAL
        let s = Math.abs(score)
        let currentSnakeScore = cc.global.game.snake.score
        if (s == 201) {
            this.score = Math.floor(Math.random()*( Math.min(50, currentSnakeScore + 20) - Math.max(currentSnakeScore - 10, 1) + 1) + Math.max(currentSnakeScore - 10, 1))
        } else if (s == 202) {
            this.score = Math.floor(Math.random()*currentSnakeScore) + 1
        } else if (s == 203) {
            this.score = Math.floor(Math.random()*(50 - currentSnakeScore + 1) + currentSnakeScore)
        } else {
            this.score = s > 50 ? 50 : s
        }
        this.scoreLabel.string = this.score + ''
        this.sprite.node.color = this.getBgColor(this.score)
    },
    beginBlock: function () {
        //console.log('beginBlock')
        this.state = STATE.BLOCKING
        cc.global.game.blockManager.addBlock(this.node)
        this.block()
        this.schedule(this.block, 0.15, this.score, 0)
    },

    block: function () {
        cc.global.game.snakeManager.destroyBody()
        if (cc.global.game.blockManager.getStatus() == 0) {
            this.unschedule(this.block)
            return
        }

        if (this.state != STATE.BLOCKING) {
            return
        }
        // if (!cc.global.game.isCollision) {
        //     cc.global.game.blockManager.status = 1
        //     return
        // }
        cc.global.game.score++
        cc.global.game.scoreLabel.string = cc.global.game.score
        this.score -= 1
        this.sprite.node.color = this.getBgColor(this.score)
        // cc.global.actionManager.blockAction(this.sprite.node)
        this.scoreLabel.string = this.score
        if (this.score == 0) {
            this.state = STATE.FINISH
            cc.global.game.blockManager.removeBlock(this.node)
            this.getComponent(cc.BoxCollider).enabled = false
            cc.global.game.blockManager.recycle(this.node)
        }
        cc.global.game.snake.score -= 1
        cc.global.game.snake.scoreLabel.string = cc.global.game.snake.score
        if (cc.global.game.snake.score <= 0) {
            //game over
           
            cc.global.game.gameOver()
            this.unschedule(this.block)
            return
        }
    },
    onCollisionExit: function(other, self) {
        //如果是snake
        if(other.tag == 0) {
            //console.log('block onCollisionExit')
            if (this.node && this.state != STATE.FINISH) {
                //console.log('block still exist')
                cc.global.game.blockManager.removeBlock(this.node)
                this.unschedule(this.block)
            }
        }
    },

    /**
     * 根据数值显示背景颜色
     */
    getBgColor: function (score) {
        let offset = 0
        let color = 0
        if (score >= 35) {
            offset = Math.floor(this.offsetColor * (score - 35))
            color = this.maxColor[1] - offset
            if (color < 64) {
                color = 64
            }
            return new cc.Color(this.maxColor[0], color, this.maxColor[2])
        } else if (score >= 18) {
            offset = Math.floor(this.offsetColor * (score - 18))
            color = this.middleColor[0] + offset
            if (color > 245) {
                color = 245
            }
            return new cc.Color(color, this.middleColor[1], this.middleColor[2])
        } else {
            offset = Math.floor(this.offsetColor * (score - 1))
            color = this.minColor[2] - offset
            if (color < 64) {
                color = 64
            }
            return new cc.Color(this.minColor[0], this.minColor[1], color)
        }
    }
});
