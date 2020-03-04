
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
const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/blogger',
    component: () => import('layouts/MainLayout.vue'),
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
    beforeEnter(to, from, next) {
      doRedirect(next);
    }
  });
}

export default routes;
