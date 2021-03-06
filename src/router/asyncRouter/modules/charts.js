// 可视化图表
import Layout, { LayoutEmpty } from '@/views/layout/';

export default {
  path: '/charts',
  name: 'charts',
  component: Layout,
  redirect: '/charts/line',
  alwaysShow: true,
  meta: {
    title: '可视化图表',
    icon: 'chart',
  },
  children: [
    {
      path: 'line',
      name: 'lineChart',
      component: () => import('@/views/charts/line'),
      meta: {
        title: '折线图',
      },
    },
    {
      path: 'histogram',
      name: 'histogramChart',
      component: () => import('@/views/charts/histogram'),
      meta: {
        title: '柱状图',
      },
    },
    {
      path: 'bar',
      name: 'barChart',
      component: () => import('@/views/charts/bar'),
      meta: {
        title: '条形图',
      },
    },
    {
      path: 'pie',
      name: 'pieChart',
      component: () => import('@/views/charts/pie'),
      meta: {
        title: '饼图',
      },
    },
    {
      path: 'ring',
      name: 'ringChart',
      component: () => import('@/views/charts/ring'),
      meta: {
        title: '环图',
      },
    },
    {
      path: '/charts/more',
      name: 'moreChart',
      component: LayoutEmpty,
      redirect: '/charts/more/event',
      alwaysShow: true,
      meta: {
        title: '更多',
      },
      children: [
        {
          path: 'event',
          name: 'eventChart',
          component: () => import('@/views/charts/more/event'),
          meta: {
            title: '绑定事件',
          },
        },
        {
          path: 'toggle',
          name: 'toggleChart',
          component: () => import('@/views/charts/more/toggle'),
          meta: {
            title: '图表切换',
          },
        },
      ],
    },
  ],
};
