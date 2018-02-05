cc.Class({
    extends: cc.Component,

    properties: {
        prefab: cc.Prefab,
        editBox: cc.EditBox,
        layout: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        if (!cc.global) {
            cc.global = {}
        }
        cc.global.createMap = this
        cc.global.mapType = -1
    },

    selectType: function (event, data) {
        var type = parseInt(data)
        cc.global.mapType = type
    },

    createGrid: function () {
        this.line = this.editBox.string
        if (this.line.length == 0) {
            console.log('请输入数字')
            return
        }
        this.line = Math.floor(this.line)
        if (this.line > 50) {
            console.log('输入的数字太大')
            return
        }
        for (let i = 0; i < this.line * 5; i++) {
            let itemPrefab = cc.instantiate(this.prefab)
            itemPrefab.getComponent('MapItem').init(i)
            itemPrefab.parent = this.layout
        }
    },

    revert: function () {

    },

    clean: function () {
        this.layout.children.forEach(function (item) {
            item.destroy()
        })
    },

    createMap: function () {
        var dataSet = []
        var line = 0
        var children = this.layout.children
        while (line < this.line) {
            var lineDataSet = []
            for (let i = 5 * line; i <= 5 * line + 4; i++) {
                lineDataSet.push(children[i].getComponent('MapItem').num)
            }
            dataSet[line] = lineDataSet
            line++
        }
        console.log(dataSet)
    },

    paramExplain: function () {
        cc.global.paramExplainDialog.show()
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
})
