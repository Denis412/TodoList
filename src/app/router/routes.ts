import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout/components/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/index-page/components/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/error-not-found/components/ErrorNotFound.vue'),
  },
];

export default routes;
