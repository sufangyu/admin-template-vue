// 系统管理
import Layout from '@/views/layout/';

export default {
  path: '/admin',
  name: 'admin',
  component: Layout,
  redirect: 'admin/user',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'admin',
  },
  children: [
    {
      path: 'user',
      name: 'adminUser',
      component: () => import('@/views/admin/user'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: 'menu',
      name: 'adminMenu',
      component: () => import('@/views/admin/menu'),
      meta: {
        title: '权限菜单',
      },
    },
  ],
};
