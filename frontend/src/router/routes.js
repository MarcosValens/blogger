
function checkToken(token) {
  // TODO: Validate token in java
  return true;
}

function doRedirect(callback) {
  const token = localStorage.getItem("token")
  if (checkToken(token)) {
    callback("/blogger");
  } else {
    callback("/login");
  }
}

function notFoundHandler(to, from, next) {
  doRedirect(next);
}
const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), beforeEnter(to, from, next) {
        const token = localStorage.getItem("token");
        if (checkToken(token)) {
          return next("/blogger");
        }
        next();
      } }
    ]
  },
  {
    path: '/blogger',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter(to, from, next) {
      const token = localStorage.getItem("token");
      if (checkToken(token)) {
        return next();
      }
      next("/login");
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'create', component: () => import('pages/BlogForm.vue') },
      { path: 'update/:id', component: () => import('pages/BlogForm.vue') },
      { path: 'calorieCalculator', component: () => import('pages/CalorieCalculator.vue') },
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
    beforeEnter: notFoundHandler
  });
}

export default routes;
