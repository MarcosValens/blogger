import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
Vue.use(VueRouter);
let allowedRoutes;

function isAllowedRoute(to, from) {
  return !allowedRoutes.includes(from.path) && allowedRoutes.includes(to.path) ||
    allowedRoutes.includes(to.path) || to.params.id;
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

export default function () {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });
  allowedRoutes = Router.options.routes.reduce(getRoutes, []);

  Router.beforeEach((to, from, next) => {

    if (!isAllowedRoute(to, from)) {
      return next("/blogger")
    }
    next();
  });

  return Router;
}
