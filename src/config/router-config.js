import Layout from '@/layout';

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: 'Login' },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        icon: 's-home',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        hidden: true,
        component: () => import('@/views/analysis/index.vue'),
        icon: 's-tools',
        meta: { title: 'Analysis' },
      },
    ],
  },
  {
    path: '/merchandise',
    name: '商品管理',
    icon: 's-goods',
    component: Layout,
    redirect: '/merchandise/add',
    children: [
      {
        path: 'add',
        name: '新增商品',
        component: () => import('@/views/merchandise/add.vue'),
        meta: { title: '新增商品' },
      },
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/merchandise/list.vue'),
        meta: { title: '商品列表' },
      },
    ],
  },
];

export default routes;