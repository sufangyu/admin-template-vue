// 系统管理
import Layout, { LayoutEmpty } from '@/views/layout/';

export default {
  path: '/admin',
  name: 'admin',
  component: Layout,
  redirect: '/admin/users',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'admin',
    requireAuth: true,
    roles: ['admin'],
  },
  children: [
    {
      path: 'accounts',
      name: 'adminAccounts',
      component: () => import('@/views/admin/accounts'),
      meta: {
        title: '帐号管理',
        requireAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '/admin/roles',
      name: 'adminRoles',
      component: LayoutEmpty,
      redirect: '/admin/roles/list',
      meta: {
        title: '权限角色',
        requireAuth: true,
        roles: ['admin'],
      },
      children: [
        {
          path: 'list',
          name: 'adminRolesList',
          component: () => import('@/views/admin/roles/list'),
          meta: {
            title: '权限角色',
            requireAuth: true,
            roles: ['admin'],
          },
        },
        {
          path: 'create',
          name: 'adminRolesCreate',
          component: () => import('@/views/admin/roles/create'),
          hidden: true,
          meta: {
            title: '添加',
            requireAuth: true,
            roles: ['admin'],
          },
        },
        {
          path: 'edit/:id',
          name: 'adminRolesEdit',
          component: () => import('@/views/admin/roles/edit'),
          hidden: true,
          meta: {
            title: '编辑',
            requireAuth: true,
            roles: ['admin'],
          },
        },
      ],
    },
    {
      path: 'menus',
      name: 'adminMenus',
      component: () => import('@/views/admin/menus'),
      meta: {
        title: '权限菜单',
        requireAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
