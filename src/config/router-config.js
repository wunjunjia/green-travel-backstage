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
    name: 'merchandise',
    icon: 'icon-shangpingouwudai2',
    component: Layout,
    redirect: '/merchandise/add',
    meta: {
      title: '商品管理',
    },
    children: [
      {
        path: 'add',
        name: 'merchandiseAdd',
        component: () => import('@/views/merchandise/add.vue'),
        meta: { title: '新增商品' },
      },
      {
        path: 'list',
        name: 'merchandiseList',
        component: () => import('@/views/merchandise/list.vue'),
        meta: { title: '商品列表' },
      },
      {
        path: 'conversion',
        name: 'conversion',
        component: () => import('@/views/conversion/list.vue'),
        meta: { title: '兑换列表' },
      },
    ],
  },
  {
    path: '/advertisement',
    name: 'advertisement',
    icon: 'icon-ico_AD',
    component: Layout,
    redirect: '/advertisement/add',
    meta: {
      title: '广告管理',
    },
    children: [
      {
        path: 'add',
        name: 'advertisementAdd',
        component: () => import('@/views/advertisement/upload.vue'),
        meta: { title: '新增广告' },
      },
      {
        path: 'list',
        name: 'advertisementList',
        component: () => import('@/views/advertisement/list.vue'),
        meta: { title: '广告列表' },
      },
    ],
  },
  {
    path: '/publicWelfare',
    name: 'publicWelfare',
    icon: 'icon-gongyizhongxin',
    component: Layout,
    redirect: '/publicWelfare/list',
    meta: { title: '公益管理' },
    children: [
      {
        path: 'list',
        name: 'publicWelfareList',
        component: () => import('@/views/publicWelfare/list.vue'),
        meta: { title: '公益列表' },
      },
    ],
  },
  {
    path: '/coupon',
    name: 'coupon',
    icon: 'icon-f-coupon',
    component: Layout,
    redirect: '/coupon/add',
    meta: { title: '优惠卷管理' },
    children: [
      {
        path: 'add',
        name: 'couponAdd',
        component: () => import('@/views/coupon/add.vue'),
        meta: { title: '新增优惠卷' },
      },
      {
        path: 'list',
        name: 'couponList',
        component: () => import('@/views/coupon/list.vue'),
        meta: { title: '优惠卷列表' },
      },
    ],
  },
  {
    path: '/task',
    name: 'task',
    icon: 'icon-renwu',
    component: Layout,
    redirect: '/task/add',
    meta: { title: '任务管理' },
    children: [
      {
        path: 'add',
        name: 'taskAdd',
        component: () => import('@/views/task/add.vue'),
        meta: { title: '新增任务' },
      },
      {
        path: 'list',
        name: 'taskList',
        component: () => import('@/views/task/list.vue'),
        meta: { title: '任务列表' },
      },
    ],
  },
];

export default routes;