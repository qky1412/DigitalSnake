cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.camera = this.getComponent(cc.Camera)
        this.lastY = 0
    },

    // onEnable () {
    //     cc.director.getCollisionManager().attachDebugDrawToCamera(this.camera)
    // },

    // onDisable () {
    //     cc.director.getCollisionManager().detachDebugDrawToCamera(this.camera)
    // },

    lateUpdate: function (dt) {
        
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO)
        let currentY = this.node.parent.convertToNodeSpaceAR(targetPos).y
        this.node.y = currentY
    }
});
