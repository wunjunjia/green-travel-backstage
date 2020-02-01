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
        icon: 'icon-homepageselected',
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
    icon: 'icon-shangpingouwudai2',
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
  {
    path: '/advertisement',
    name: '广告管理',
    icon: 'icon-ico_AD',
    component: Layout,
    redirect: '/advertisement/add',
    children: [
      {
        path: 'add',
        name: '新增广告',
        component: () => import('@/views/advertisement/add.vue'),
        meta: { title: '新增广告' },
      },
    ],
  },
];

export default routes;