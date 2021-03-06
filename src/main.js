import babelpolyfill from "babel-polyfill";
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";
import VueRouter from "vue-router";
import store from "./vuex/store";
import Vuex from "vuex";
import routes from "./routes";
import Axios from "axios";
import change from "./api/change";
//
Vue.prototype.change = change;
//Vue.prototype.$dateFormat = dateFormat
// import Mock from './mock'
import "font-awesome/css/font-awesome.min.css";
import locale from "element-ui/lib/mixins/locale";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Axios.defaults.baseURL = "http://8.8.8.8:9091/api/rest/1.0/";'
Axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8"
};

Axios.defaults.timeout = 6000;

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    if (location.href.indexOf("?") > -1) {
      location.href += "&_v=" + new Date().getTime();
    } else {
      location.href += "?_v=" + new Date().getTime();
    }
    return response;
  },
  error => {
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      // ElementUI.Message.error("请求超时")
      return error;
      // var res = {
      //     status: 408,
      //     data: "请求超时"
      // }
      // return Promise.reject(res);
      // Message.error("wizzds");
      // debugger;
      // Axios.response.Message({
      //     showClose: true,
      //     message: error,
      //     type: "error.data.error.message"
      //   });
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

Vue.prototype.$http = Axios;
const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.path == "/login") {
//     localStorage.clear();
//   }
//   let user = JSON.parse(localStorage.getItem("sign"));
//   if (!user && to.path != "/login") {
//     next({
//       path: "/login"
//     });
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
