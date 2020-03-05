import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
Vue.use(VueRouter);
let allowedRoutes;
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
  return token;
}

function isAllowedRoute(to, from) {
  return !allowedRoutes.includes(from.path) && allowedRoutes.includes(to.path) ||
    allowedRoutes.includes(to.path) || to.params.id;
}

function getBackward(to, from) {
  return allowedRoutes.includes(to.path) ? to : allowedRoutes.includes(from.path) ? from : "/blogger";
}

function doRedirect({ to, from, callback, token }) {
  if (checkToken(token)) {
    const backwardUrl = getBackward(to, from);
    callback(backwardUrl);
  } else {
    callback("/login");
  }
}

function getNextPath(to, token) {
  if (checkToken(token) && to.includes("login")) return "/blogger";
  if (!checkToken(token) && to.includes("blogger")) return "/login";
  return null;
}

function getRoutes(routes, nextRoute) {
  if (nextRoute.path === "*") return routes;

  const rootPath = nextRoute.path;
  const formattedRoutes = nextRoute.children.map((childRoute) => {

    const formattedRoute = !childRoute.path ? rootPath : `${rootPath}/${childRoute.path}`
    return formattedRoute;
  });
  
  return routes.concat(formattedRoutes);
}

function getToken(to) {
  const token = to.query.token || localStorage.getItem("token") || null;
  return token;
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
  allowedRoutes = Router.options.routes.reduce(getRoutes, []);

  Router.beforeEach((to, from, next) => {
    const token = getToken(to);

    if (!isAllowedRoute(to, from)) {
      return doRedirect({ to, from, callback: next, token });
    }
    const nextPath = getNextPath(to.path, token);
    nextPath ? next(nextPath) : next();
  });

  return Router;
}
