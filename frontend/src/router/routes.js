
const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/blogger/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
<<<<<<< HEAD
      { path: 'all', component: () => import('pages/Index.vue') },
      { path: 'create', component: () => import('pages/BlogForm.vue') }
=======
      { path: '', component: () => import('pages/Index.vue')},
      { path: 'create', component: () => import('pages/BlogForm.vue')},
      { path: 'calorieCalculator', component: () => import('pages/CalorieCalculator.vue')}
>>>>>>> eba1a82b995f45f3bff05bbba1b014c6e6d6f176
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
