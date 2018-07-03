// 可视化图表
import Layout from '@/views/layout/';

export default {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'charts',
  meta: {
    title: '可视化图表',
    icon: 'chart',
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'keyboardChart',
      meta: {
        title: 'keyboardChart',
        noCache: true,
      },
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'lineChart',
      meta: {
        title: 'lineChart',
        noCache: true,
      },
    },
    {
      path: 'mixchart',
      component: () => import('@/views/charts/mixChart'),
      name: 'mixChart',
      meta: {
        title: 'mixChart',
        noCache: true,
      },
    },
  ],
};
