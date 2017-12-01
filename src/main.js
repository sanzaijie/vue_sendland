import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Axios from "axios";
import change from './api/change'
Vue.prototype.change = change
// import Mock from './mock'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
// Axios.defaults.baseURL = 'http://192.168.64.216:9091/api/rest/1.0/'
Axios.defaults.baseURL = 'http://10.3.30.149:9091/api/rest/1.0/'
Axios.defaults.timeout = 5000;
Vue.prototype.$http = Axios
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        localStorage.removeItem('sign');
        localStorage.removeItem('userName');
        localStorage.removeItem('uid');
        localStorage.removeItem('userPwd');
    }
    let user = JSON.parse(localStorage.getItem('sign'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')