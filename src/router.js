import Vue from "vue";
import Router from "vue-router";
import BigScreen from "./views/ScreenOne/index";
import overviewGis from "./views/ScreenGis/overviewGis";

Vue.use(Router);

export default new Router({
  routes: [
    /* {
      path: "/",
      name: "home",
      component: Home
    }, */
    {
      path: "/",
      name: "bigscreen",
      component: BigScreen
    },
    {
      path: "/overviewGis",
      name: "overviewGis",
      component: overviewGis
    }
  ]
});
