var Config = require('Config')
var RequestMehod = cc.Enum({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
})
cc.Class({
    extends: cc.Component,
    statics: {
        sendRequest: function(requestMethod, requestUrl, data, handler) {
            var self = this
            var xhr = cc.loader.getXMLHttpRequest()
            if (Config.getUser()) {
                if (requestUrl.includes('?')) {
                    requestUrl += ('&auth=' + Config.getUser().token)
                } else {
                    requestUrl += ('?auth=' + Config.getUser().token)
                }
            }
            xhr.open(requestMethod, requestUrl, true)
            xhr.setRequestHeader('X_REQUESTED_WITH', 'xmlhttprequest')
            xhr.setRequestHeader('Content-Type', 'application/json')
            
            xhr.timeout = 10000
            xhr.ontimeout = function () {
                //console.log('HTTP TIME OUT')
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    var ret = JSON.parse(xhr.responseText)
                    if (handler !== null) {
                        handler(ret)
                    }
                } else if (xhr.readyState === 4) {
                    //console.log('网络异常，请稍后重试')
                }
            }
            if (data) {
                xhr.send(JSON.stringify(data))
            } else {
                xhr.send()
            }

        },
        login: function (params, callback) {
            this.sendRequest(RequestMehod.POST, Config.BASE_URL + '/api/v1/user/login', params, callback)
        },
        userInfo: function (callback) {
            this.sendRequest(RequestMehod.GET, Config.BASE_URL + '/api/v1/user', null, callback)
        },
        uploadScore: function (score, callback) {
            this.sendRequest(RequestMehod.POST, Config.BASE_URL + '/api/v1/submit/game/score', {score: score}, callback)
        },
        rankList: function (callback) {
            this.sendRequest(RequestMehod.GET, Config.BASE_URL + '/api/v1/game/score/rank', null, callback)
        }
    }
});
