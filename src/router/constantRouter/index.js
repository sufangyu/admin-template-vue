import Layout from '@/views/layout';

export default [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        icon: 'home',
        title: '控制台',
        noCache: true,
        requireAuth: true,
        roles: ['admin', 'editor'],
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    name: 'NoAuthority',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
  },
];
