var getParameterByName = function (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}

var User = null

const configs = {
    BASE_URL: 'http://192.168.199.121:8007',
    pf: getParameterByName('pf') || 'local',
    h: getParameterByName('h'),
    setUser: function (user) {
        if (User) {
            User = Object.assign(User, user)
        } else {
            User = user
        }
    },
    getUser: function () {
        return User
    }
}

module.exports = configs