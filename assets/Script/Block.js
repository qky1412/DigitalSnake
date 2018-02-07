var STATE = cc.Enum({
    NONE: 0,
    NORMAL:1,
    BLOCKING: 2,
    FINISH: 3
})
cc.Class({
    extends: cc.Component,

    properties: {
        score: 1,
        scoreLabel: cc.Label,
        state:{
            default: STATE.NONE,
            type: STATE,
            visible: false
        }
    },

    init: function () {
        this.state = STATE.NORMAL
        this.score = 1 +  Math.floor(10 * Math.random())
        this.scoreLabel.string = this.score + ''
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
});
