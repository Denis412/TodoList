import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout/components/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage/components/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound/components/ErrorNotFound.vue'),
  },
];

export default routes;
