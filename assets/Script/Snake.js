cc.Class({
    extends: cc.Component,

    properties: {
        score: 4,
        scoreLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    onCollisionEnter: function(other, self) {
        //如果是bean
        cc.global.game.isCollision = true
        if (other.tag == 100) {
            cc.global.game.ct = 0
            let bean = other.node.getComponent('Bean')
            this.score += bean.score
            this.scoreLabel.string = this.score
            
        } else if (other.tag == 200) {
            cc.global.game.ct = 1
            var otherAabb = other.world.aabb
            var otherPreAabb = other.world.preAabb.clone()

            var selfAabb = self.world.aabb
            var selfPreAabb = self.world.preAabb.clone()

            selfPreAabb.x = selfAabb.x
            otherPreAabb.x = otherAabb.x

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                if (selfPreAabb.xMax > otherPreAabb.xMax) {
                    cc.global.game.co = 2
                    console.log('碰到block的右边')
                    console.log('otherPreAabb.xMax = ' + otherPreAabb.xMax)
                    this.node.x = otherPreAabb.xMax + selfPreAabb.width / 2 - this.node.parent.x
                } else if (selfPreAabb.xMin < otherPreAabb.xMin) {
                    cc.global.game.co = 1
                    console.log('碰到block的左边')
                    console.log('otherPreAabb.xMin = ' + otherPreAabb.xMin)
                    this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - this.node.parent.x
                }
            } else {
                cc.global.game.co = 3
                console.log('碰到block的底部')
                other.node.getComponent('Block').beginBlock()
            }
        }
    },
    onCollisionExit: function (other, self) {
        console.log('onCollisionExit')
        cc.global.game.isCollision = false
        cc.global.game.ct = 1
        cc.global.game.co = 0
    }
});
