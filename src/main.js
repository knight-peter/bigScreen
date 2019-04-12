// require("../static/js/polyfill.min.js");
// require("../static/js/mod.js");
// require("../static/js/lib.js");
require("../static/fonts/iconfont.css");

// import "../static/js/ueditor/ueditor.config.js";
// import "../static/js/ueditor/ueditor.all.min.js";
// import "../static/js/ueditor/lang/zh-cn/zh-cn.js";
// import "../static/js/ueditor/ueditor.parse.min.js";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import $ from "jquery";
import Vuebar from "vuebar";
Vue.use(Vuebar);

import Cue from "cue/src/index.js";
require("cue/packages/theme/index.less");
// require("../static/css/layout.less");
// import "leaflet.chinatmsproviders/lib/leaflet.js";
// import "leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders.js";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.use(Cue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
