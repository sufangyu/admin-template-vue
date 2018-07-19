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
      path: 'users',
      name: 'adminUsers',
      component: () => import('@/views/admin/users'),
      meta: {
        title: '用户管理',
      },
    },
    {
      path: '/admin/roles',
      name: 'adminRules',
      component: LayoutEmpty,
      redirect: '/admin/roles/list',
      meta: {
        title: '权限角色',
      },
      children: [
        {
          path: 'list',
          name: 'adminRulesList',
          component: () => import('@/views/admin/roles/list'),
          meta: {
            title: '权限角色',
          },
        },
        {
          path: 'create',
          name: 'adminRulesCreate',
          component: () => import('@/views/admin/roles/create'),
          hidden: true,
          meta: {
            title: '添加',
          },
        },
        {
          path: 'edit/:id',
          name: 'adminRulesEdit',
          component: () => import('@/views/admin/roles/edit'),
          hidden: true,
          meta: {
            title: '编辑',
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
      },
    },
  ],
};
