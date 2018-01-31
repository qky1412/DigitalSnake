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
            this.node.y -= 200 * dt;
        }
    },
    init: function () {
        this.state = STATE.NORMAL
        this.score = 1 +  Math.floor(19 * Math.random())
        this.scoreLabel.string = this.score + ''
    },
    beginBlock: function () {
        cc.global.game.blockManager.status = 2
        this.state = STATE.BLOCKING
        // this.getComponent(cc.BoxCollider).enabled = false
       // this.schedule(this.block, 0.2, this.score, 0)
        this.taskId = setInterval(this.block.bind(this), 200)
    },
    block: function () {
        console.log(cc.global.game.blockManager.status)
        if (cc.global.game.blockManager.status == 0) {
            console.log(this.taskId)
            if (this.taskId) {
                console.log('fuck u')
                clearInterval(this.taskId)
            }
            return
        }
        if (!cc.global.game.isCollision) {
            cc.global.game.blockManager.status = 1
            return
        }
        this.score -= 1
        this.scoreLabel.string = this.score
        if (this.score == 0) {
            cc.global.game.blockManager.status = 1
            this.node.destroy()
            cc.global.game.isCollision = false
        }
        cc.global.game.snake.score -= 1
        cc.global.game.snake.scoreLabel.string = cc.global.game.snake.score
        if (cc.global.game.snake.score <= 0) {
            //game over
            cc.global.game.blockManager.status = 0
            return
        }
        
    }
});
