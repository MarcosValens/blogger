import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
const allowedRoutes = [
  "/login",
  "/blogger",
  "/blogger/create",
  "/blogger/calorieCalculator"
]
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

function checkToken(token) {
  // TODO: Validate token in java
  return false;
}

function doRedirect(callback) {
  const token = localStorage.getItem("token")
  if (checkToken(token)) {
    callback("/blogger");
  } else {
    callback("/login");
  }
}

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach(({path}, from, next) => {
    /*
    if (!allowedRoutes.includes(path)) {
      return doRedirect(next);
    }
    */
    next();
  });

  Router.afterEach((to, from, done) => {
    console.log(from)
  })

  return Router;
}
