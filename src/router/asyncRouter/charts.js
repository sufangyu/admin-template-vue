// 可视化图表
import Layout from '@/views/layout/';

export default {
  path: '/charts',
  name: 'charts',
  component: Layout,
  redirect: 'charts/line',
  alwaysShow: true,
  meta: {
    title: '可视化图表',
    icon: 'chart',
  },
  children: [
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'lineChart',
      meta: {
        title: '折线图',
        noCache: true,
      },
    },
    {
      path: 'histogram',
      component: () => import('@/views/charts/histogram'),
      name: 'histogramChart',
      meta: {
        title: '柱状图',
        noCache: true,
      },
    },
    // {
    //   path: 'keyboard',
    //   component: () => import('@/views/charts/keyboard'),
    //   name: 'keyboardChart',
    //   meta: {
    //     title: 'keyboardChart',
    //     noCache: true,
    //   },
    // },
    // {
    //   path: 'mixchart',
    //   component: () => import('@/views/charts/mixChart'),
    //   name: 'mixChart',
    //   meta: {
    //     title: 'mixChart',
    //     noCache: true,
    //   },
    // },
  ],
};
