// 系统管理 - 菜单配置角色
import Layout from '@/views/layout/';

export default {
  path: '/admin-menus',
  name: 'adminWithMenus',
  component: Layout,
  redirect: '/admin-menus/users',
  alwaysShow: true,
  meta: {
    title: '系统管理 - 菜单配置角色',
    icon: 'admin',
    requireAuth: true,
    roles: ['admin'],
  },
  children: [
    {
      path: 'accounts',
      name: 'adminWithMenusAccounts',
      component: () => import('@/views/admin-menus/accounts'),
      meta: {
        title: '帐号管理',
        requireAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'menus',
      name: 'adminWithMenusMenus',
      component: () => import('@/views/admin-menus/menus'),
      meta: {
        title: '权限菜单',
        requireAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'roles',
      name: 'adminWithMenusRoles',
      component: () => import('@/views/admin-menus/roles'),
      meta: {
        title: '权限角色',
        requireAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
