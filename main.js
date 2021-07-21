import Vue from 'vue'
import App from './App'

import Highlight from './utils/highlight.js'

Vue.config.productionTip = false
Vue.use(Highlight)
App.mpType = 'app'
// 定义baseurl
Vue.prototype.baseurl='http://mrling.top:8889'
Vue.prototype.wsurl='ws://mrling.top:8889'
// Vue.prototype.baseurl='http://192.168.0.105:8889'
// Vue.prototype.wsurl='ws://192.168.0.105:8889'

const app = new Vue({
    ...App
})
app.$mount()
