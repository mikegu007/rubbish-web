import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

Vue.filter('timeFilter', function (val) {
    let min = parseInt(val / 60)
    min = min < 10 ? `0${min}` : min
    let second = val % 60
    second = second < 10 ? `0${second}` : second
    return `${min}:${second}`
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
