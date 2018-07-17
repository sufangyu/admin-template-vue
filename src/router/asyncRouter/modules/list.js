// 列表页
import Layout, { LayoutEmpty } from '@/views/layout/';

export default {
  path: '/list',
  name: 'list',
  component: Layout,
  redirect: '/list/table-list',
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
      path: 'large-list',
      name: 'largeList',
      component: () => import('@/views/list/largeList'),
      meta: {
        title: '大量数据列表',
      },
    },
    {
      path: '/list/search',
      name: 'searchList',
      redirect: '/list/search/articles',
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
};
