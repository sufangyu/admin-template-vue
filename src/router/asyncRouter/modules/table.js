// 表格
import Layout from '@/views/layout/';

export default {
  path: '/table',
  name: 'table',
  component: Layout,
  redirect: 'table/dynamic-table',
  alwaysShow: true,
  meta: {
    title: '表格',
    icon: 'table',
  },
  children: [
    {
      path: 'dynamic-table',
      name: 'dynamicTable',
      component: () => import('@/views/table/dynamicTable/index'),
      meta: {
        title: '动态表格',
      },
    },
    {
      path: 'drag-table',
      name: 'dragTable',
      component: () => import('@/views/table/dragTable'),
      meta: {
        title: '拖拽表格',
      },
    },
  ],
};
