// zip 导出导入
import Layout from '@/views/layout/';

export default {
  path: '/exception',
  name: 'exception',
  component: Layout,
  redirect: 'exception/401',
  alwaysShow: true,
  meta: {
    title: '异常页',
    icon: 'exception',
  },
  children: [
    {
      path: '401',
      name: 'exception401',
      component: () => import('@/views/exception/401'),
      meta: {
        title: '401',
        breadcrumb: false,
        pageInfo: false,
      },
    },
    {
      path: '404',
      name: 'exception404',
      component: () => import('@/views/exception/404'),
      meta: {
        title: '404',
        breadcrumb: false,
        pageInfo: false,
      },
    },
    {
      path: '500',
      name: 'exception500',
      component: () => import('@/views/exception/500'),
      meta: {
        title: '500',
        breadcrumb: false,
        pageInfo: false,
      },
    },
  ],
};
