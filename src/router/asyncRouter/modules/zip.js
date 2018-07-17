// zip 导出导入
import Layout from '@/views/layout/';

export default {
  path: '/zip',
  name: 'zip',
  component: Layout,
  redirect: '/zip/index',
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
};
