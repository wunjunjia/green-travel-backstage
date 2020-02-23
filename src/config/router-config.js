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
      {
        path: 'conversion',
        name: '兑换列表',
        component: () => import('@/views/conversion/list.vue'),
        meta: { title: '兑换列表' },
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
        component: () => import('@/views/advertisement/upload.vue'),
        meta: { title: '新增广告' },
      },
      {
        path: 'list',
        name: '广告列表',
        component: () => import('@/views/advertisement/list.vue'),
        meta: { title: '广告列表' },
      },
    ],
  },
  {
    path: '/publicWelfare',
    name: '公益管理',
    icon: 'icon-gongyizhongxin',
    component: Layout,
    redirect: '/publicWelfare/list',
    children: [
      {
        path: 'list',
        name: '公益列表',
        component: () => import('@/views/publicWelfare/list.vue'),
        meta: { title: '公益列表' },
      },
    ],
  },
];

export default routes;