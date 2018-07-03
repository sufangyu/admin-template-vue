// 权限控制
import Layout from '@/views/layout/';

export default {
  path: '/auth',
  name: '权限控制',
  component: Layout,
  redirect: 'auth/index',
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
      },
    },
    {
      path: 'admin',
      name: 'authAdmin',
      component: () => import('@/views/auth/admin'),
      meta: {
        title: '管理员可见',
        roles: ['admin'],
      },
    },
    {
      path: 'editor',
      name: 'authEditor',
      component: () => import('@/views/auth/editor'),
      meta: {
        title: '运营编辑',
        roles: ['editor'],
      },
    },
    {
      path: 'dev',
      name: 'authDev',
      component: () => import('@/views/auth/dev'),
      meta: {
        title: '开发者',
        roles: ['dev'],
      },
    },
  ],
};
