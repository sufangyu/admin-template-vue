import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/';
import LayoutEmpty from '@/views/layoutEmpty/';


Vue.use(Router);

/* eslint-disable max-len */
/*
 * 单个路由自定义配置
 * hidden: true                   是否在 sidebar 显示. 默认 false
 * alwaysShow: true               是否总是在一级菜单显示, 不管是否有子路由. 没有设置, 则只有子路由时才会在菜单中显示
 * redirect: noredirect           redirect:noredirect 时,在面包屑中不会重定向
 * name: 'router-name'            在 <keep-alive> 使用 (必须设置!!!)
 * meta : {
     roles: ['admin','editor']    控制页面可访问的角色. 为空表示所有用户都可以访问
     title: 'title'               页面标题. 在子菜单 和 面包屑中显示 (推荐设置)
     icon: 'svg-name'             sidebar 显示的图标名称
     noCache: true                是否缓存页面. 默认是false
   }
 */
// 静态路由. 不需要权限检测
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        icon: 'home',
        title: '控制台',
        noCache: true,
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

// 异步动态路由
export const asyncRouterMap = [
  // 图表
  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'charts',
  //   meta: {
  //     title: 'charts',
  //     icon: 'chart',
  //   },
  //   children: [
  //     {
  //       path: 'keyboard',
  //       component: () => import('@/views/charts/keyboard'),
  //       name: 'keyboardChart',
  //       meta: {
  //         title: 'keyboardChart',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'line',
  //       component: () => import('@/views/charts/line'),
  //       name: 'lineChart',
  //       meta: {
  //         title: 'lineChart',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'mixchart',
  //       component: () => import('@/views/charts/mixChart'),
  //       name: 'mixChart',
  //       meta: {
  //         title: 'mixChart',
  //         noCache: true,
  //       },
  //     },
  //   ],
  // },

  // 表单页
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '表单页',
      icon: 'form',
    },
    children: [
      {
        path: 'basic-form',
        name: 'basicForm',
        component: () => import('@/views/form/base'),
        meta: {
          title: '基础表单',
          desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
        },
      },
      {
        path: 'step-form',
        name: 'stepForm',
        component: () => import('@/views/form/step'),
        meta: {
          title: '分步表单',
          desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
        },
      },
    ],
  },

  // 列表页
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: 'list/table-list',
    alwaysShow: true,
    meta: {
      title: '列表页',
      icon: 'list',
    },
    children: [
      {
        path: 'table-list',
        name: 'tableList',
        component: () => import('@/views/list/tableList'),
        meta: {
          title: '查询表格',
        },
      },
      {
        path: 'basic-list',
        name: 'basicList',
        component: () => import('@/views/list/basicList'),
        meta: {
          title: '标准列表',
        },
      },
      {
        path: 'card-list',
        name: 'cardList',
        component: () => import('@/views/list/cardList'),
        meta: {
          title: '卡片列表',
        },
      },
      {
        path: 'thumbs-list',
        name: 'thumbsList',
        component: () => import('@/views/list/thumbsList'),
        meta: {
          title: '缩略图列表',
        },
      },
      {
        path: '/list/search',
        name: 'searchList',
        redirect: 'list/search/articles',
        component: LayoutEmpty,
        meta: {
          title: '三级菜单',
        },
        children: [
          {
            path: 'articles',
            name: 'searchListArticles',
            component: () => import('@/views/list/tableList'),
            meta: {
              title: '三级页面',
            },
          },
          {
            path: 'projects',
            name: 'searchListProjects',
            component: () => import('@/views/list/basicList'),
            meta: {
              title: '三级页面',
            },
          },
          {
            path: 'applications',
            name: 'searchListApplications',
            component: () => import('@/views/list/cardList'),
            meta: {
              title: '三级页面',
            },
          },
        ],
      },
    ],
  },

  // 结果页
  {
    path: '/result',
    name: 'result',
    component: Layout,
    redirect: 'result/success',
    alwaysShow: true,
    meta: {
      title: '结果页',
      icon: 'result',
    },
    children: [
      {
        path: 'success',
        name: 'resultSuccess',
        component: () => import('@/views/result/success'),
        meta: {
          title: '成功',
        },
      },
      {
        path: 'fail',
        name: 'resultFail',
        component: () => import('@/views/result/fail'),
        meta: {
          title: '失败',
        },
      },
      {
        path: 'dealing',
        name: 'resultDealing',
        component: () => import('@/views/result/dealing'),
        meta: {
          title: '处理中',
        },
      },
      {
        path: 'waring',
        name: 'resultWaring',
        component: () => import('@/views/result/waring'),
        meta: {
          title: '警告',
        },
      },
    ],
  },

  // 复制剪贴板
  {
    path: '/clipboard',
    name: 'clipboard',
    component: Layout,
    redirect: 'clipboard/index',
    alwaysShow: true,
    meta: {
      title: '复制剪贴板',
      icon: 'clipboard',
    },
    children: [
      {
        path: 'index',
        name: 'clipboardDemo',
        component: () => import('@/views/clipboard/index'),
        meta: {
          title: '剪贴板示例',
        },
      },
    ],
  },

  // excel 导出导入
  {
    path: '/excel',
    name: 'excel',
    component: Layout,
    redirect: 'excel/export-excel',
    alwaysShow: true,
    meta: {
      title: 'Excel',
      icon: 'excel',
    },
    children: [
      {
        path: 'export-excel',
        name: 'exportExcel',
        component: () => import('@/views/excel/exportExcel'),
        meta: {
          title: '导出excel表',
        },
      },
      {
        path: 'select-excel',
        name: 'selectExcel',
        component: () => import('@/views/excel/selectExcel'),
        meta: {
          title: '导出指定数据',
        },
      },
      {
        path: 'upload-excel',
        name: 'uploadExcel',
        component: () => import('@/views/excel/uploadExcel'),
        meta: {
          title: '上传excel表',
        },
      },
    ],
  },

  // zip 导出导入
  {
    path: '/zip',
    name: 'zip',
    component: Layout,
    redirect: 'zip/index',
    alwaysShow: true,
    meta: {
      title: 'Zip',
      icon: 'zip',
    },
    children: [
      {
        path: 'index',
        name: 'zipIndex',
        component: () => import('@/views/zip/index'),
        meta: {
          title: '导出Zip',
        },
      },
    ],
  },

  // 权限控制
  {
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
  },

  // 国际化多语言
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n/index'),
        name: 'i18n',
        meta: {
          title: 'i18n',
          icon: 'international',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
