cc.Class({
    extends: cc.Component,

    properties: {
        score: 30,
        scoreLabel: cc.Label,
        nextBody: cc.Node,
        lastBody: cc.Node,
        duration: 30
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if (cc.global.game.blockManager.status == 1 && cc.global.game.baffleManager.status == 1) {
            this.node.y += cc.global.game.speed * dt
        }
    },
    onCollisionEnter: function(other, self) {
        //如果是bean
        cc.global.game.isCollision = true
        if (other.tag == 100) {
            cc.global.game.ct = 0
            let bean = other.node.getComponent('Bean')
            this.score += bean.score
            this.scoreLabel.string = this.score
            cc.global.game.snakeManager.addBody(bean.score)
            return
        } else if (other.tag == 200) {
            //console.log('snake block onCollisionEnter')
            cc.global.game.ct = 1
            var otherAabb = other.world.aabb
            var otherPreAabb = other.world.preAabb.clone()

            var selfAabb = self.world.aabb
            var selfPreAabb = self.world.preAabb.clone()
            
            //check y-axis collision first
            selfPreAabb.y = selfAabb.y
            otherPreAabb.y = otherAabb.y
            //let blockRank = ((otherAabb.x ) / 150 + 1 )

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                //console.log('碰到block' + blockRank + '的底部')
                this.node.y = otherPreAabb.yMin - selfPreAabb.height / 2 - this.node.parent.y
                other.node.getComponent('Block').beginBlock()
                return
            }

             //如果当前已经是处于blocking状态，那么这时候无视后续逻辑
             if (cc.global.game.blockManager.status == 2) {
                 //console.log('已经是处于blocking状态')
                 other.node.getComponent('Block').beginBlock()
                return
            }

            selfPreAabb.x = selfAabb.x
            otherPreAabb.x = otherAabb.x

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                if (cc.global.game.distance < 0 && selfPreAabb.xMax > otherPreAabb.xMax) {
                    cc.global.game.co = 2
                    //console.log('碰到block' + blockRank + '的右边')
                    this.node.x = otherPreAabb.xMax + selfPreAabb.width / 2 - this.node.parent.x
                } else if (cc.global.game.distance > 0 && selfPreAabb.xMin < otherPreAabb.xMin) {
                    cc.global.game.co = 1
                    //console.log('碰到block' + blockRank + '的左边')
                    this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - this.node.parent.x
                }
                return
            } 
        } else if (other.tag == 300) {
            console.log('snake baffle onCollisionEnter')
            cc.global.game.ct = 2
            var otherAabb = other.world.aabb
            var otherPreAabb = other.world.preAabb.clone()

            var selfAabb = self.world.aabb
            var selfPreAabb = self.world.preAabb.clone()
            
            selfPreAabb.x = selfAabb.x
            otherPreAabb.x = otherAabb.x
           
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                console.log('碰到baffle')
                if (cc.global.game.distance < 0 && selfPreAabb.xMax > otherPreAabb.xMax) {
                    cc.global.game.co = 2
                    console.log('碰到右边')
                    this.node.x = otherPreAabb.xMax + selfPreAabb.width / 2 - this.node.parent.x
                } else if (cc.global.game.distance > 0 && selfPreAabb.xMin < otherPreAabb.xMin) {
                    cc.global.game.co = 1
                    console.log('碰到左边')
                    this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - this.node.parent.x
                } else {
                    console.log('啥都不是')
                }
                return
            } 
            
            selfPreAabb.y = selfAabb.y
            otherPreAabb.y = otherAabb.y
            
            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                console.log('碰到baffle底部')
                if (selfPreAabb.yMin < otherPreAabb.yMin) {
                    this.node.y = otherPreAabb.yMin - selfPreAabb.height / 2 - this.node.parent.y
                    other.node.getComponent('Baffle').stop()
                }
                return
            }

        }
    },
    onCollisionExit: function (other, self) {
        cc.global.game.co = 0
    }
});
