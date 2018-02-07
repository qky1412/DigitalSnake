cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: 6,
            visible: false
        },
        scoreLabel: cc.Label,
        nextBody: cc.Node,
        lastBody: cc.Node,
        duration: 30
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.defaultScore = 6
    },

    update (dt) {
        if (cc.global.game.blockManager.getStatus() == 1 && cc.global.game.baffleManager.status == 1) {
            this.node.y += cc.global.game.speed * dt
        }
    },
    onCollisionEnter: function(other, self) {
        //如果是bean
        cc.global.game.isCollision = true
        let distance = cc.global.game.distance
        if (other.tag == 100) {
            cc.global.game.isCollision = false
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
            let blockRank = Math.floor((otherAabb.x ) / 150 + 1 )

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                cc.global.game.co = 3
                console.log('碰到block' + blockRank + other.node.uuid + '的底部')
                this.node.y = otherPreAabb.yMin - selfPreAabb.height / 2 - this.node.parent.y
                other.node.getComponent('Block').beginBlock()
                return
            }

             //如果当前已经是处于blocking状态，那么这时候无视后续逻辑
             if (cc.global.game.blockManager.getStatus() == 2) {
                 console.log('碰到block' + blockRank + other.node.uuid + '的底部' + '已经是处于blocking状态')
                 cc.global.game.blockManager.addBlock(other.node)
                 if (cc.global.game.co == 3) {
                    other.node.getComponent('Block').beginBlock()
                 }
                return
            }

            selfPreAabb.x = selfAabb.x
            otherPreAabb.x = otherAabb.x

            if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
                if (distance < 0 && selfPreAabb.xMax >= otherPreAabb.xMax) {
                    cc.global.game.co = 2
                    console.log('碰到block' + blockRank + other.node.uuid + '的右边')
                    this.node.x = otherPreAabb.xMax + selfPreAabb.width / 2 - this.node.parent.x
                } else if (distance > 0 && selfPreAabb.xMin <= otherPreAabb.xMin) {
                    cc.global.game.co = 1
                    console.log('碰到block' + blockRank + other.node.uuid + '的左边')
                    this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - this.node.parent.x
                }
                return
            } 
        } else if (other.tag == 150) {
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
                if (distance < 0 && selfPreAabb.xMax >= otherPreAabb.xMax) {
                    cc.global.game.co = 2
                    console.log('碰到右边')
                    console.log('other xMax = ' + otherPreAabb.xMax)
                    console.log('snake x = ' + (self.node.x + 375))
                    this.node.x = otherPreAabb.xMax + selfPreAabb.width / 2 - this.node.parent.x
                } else if (distance > 0 && selfPreAabb.xMin <= otherPreAabb.xMin) {
                    cc.global.game.co = 1
                    console.log('碰到左边')
                    console.log('other xMin = ' + otherPreAabb.xMin)
                    console.log('snake x = ' + (self.node.x + 375))
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
        if (other.tag == 200) {
            console.log('snake block onCollisionExit')
        } else if (other.tag == 150) {
            console.log('snake baffle onCollisionExit')
            if (cc.global.game.blockManager.getStatus() == 1) {
                cc.global.game.co = 0
            }
        }
        
        cc.global.game.isCollision = false
        
    }
});
