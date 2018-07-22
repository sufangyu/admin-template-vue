// 权限控制
import Layout from '@/views/layout/';

export default {
  path: '/auth',
  name: 'auth',
  component: Layout,
  redirect: '/auth/index',
  alwaysShow: true,
  meta: {
    title: '权限控制',
    icon: 'auth',
  },
  children: [
    {
      path: 'index',
      name: 'authDemo',
      component: () => import('@/views/auth/index'),
      meta: {
        title: '所有用户可见',
        desc: '不同权限的用户, 显示不同的菜单入口',
        requireAuth: true,
      },
    },
    {
      path: 'admin',
      name: 'authAdmin',
      component: () => import('@/views/auth/admin'),
      meta: {
        title: '管理员可见',
        requireAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'editor',
      name: 'authEditor',
      component: () => import('@/views/auth/editor'),
      meta: {
        title: '运营编辑',
        requireAuth: true,
        roles: ['editor'],
      },
    },
    {
      path: 'dev',
      name: 'authDev',
      component: () => import('@/views/auth/dev'),
      meta: {
        title: '开发者',
        requireAuth: true,
        roles: ['dev'],
      },
    },
  ],
};
