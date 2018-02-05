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

    start () {

    },

    update (dt) {
        if(cc.global.game.blockManager.status == 1) {
            this.node.y -= cc.global.game.speed * dt;
        }
    },
    init: function () {
        this.state = STATE.NORMAL
        this.score = 1 +  Math.floor(10 * Math.random())
        this.scoreLabel.string = this.score + ''
    },
    beginBlock: function () {
        console.log('beginBlock')
        this.state = STATE.BLOCKING
        cc.global.game.blockManager.addBlock(this.node)
        // this.getComponent(cc.BoxCollider).enabled = false
        this.score -= 1
        this.scoreLabel.string = this.score
        if (this.score == 0) {
            this.state = STATE.FINISH
            cc.global.game.blockManager.removeBlock(this.node)
            this.node.destroy()
        }
        cc.global.game.snake.score -= 1
        cc.global.game.snake.scoreLabel.string = cc.global.game.snake.score
        if (cc.global.game.snake.score <= 0) {
            //game over
            cc.global.game.status = 3
            return
        }

        this.schedule(this.block, 0.15, this.score, 0)
    },

    block: function () {
        cc.global.game.snakeManager.destroyBody()
        if (cc.global.game.blockManager.status == 0) {
            this.unschedule(this.block)
            return
        }
        // if (!cc.global.game.isCollision) {
        //     cc.global.game.blockManager.status = 1
        //     return
        // }
        this.score -= 1
        this.scoreLabel.string = this.score
        if (this.score == 0) {
            this.state = STATE.FINISH
            cc.global.game.blockManager.removeBlock(this.node)
            this.node.destroy()
        }
        cc.global.game.snake.score -= 1
        cc.global.game.snake.scoreLabel.string = cc.global.game.snake.score
        if (cc.global.game.snake.score <= 0) {
            //game over
            cc.global.game.status = 3
            return
        }
    },
    onCollisionExit: function(other, self) {
        //如果是snake
        if(other.tag == 0) {
            console.log('block onCollisionExit')
            this.unschedule(this.block)
            cc.global.game.co = 0
        }
    },
});
