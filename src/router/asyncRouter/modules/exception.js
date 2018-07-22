// 异常页
import Layout from '@/views/layout/';

export default {
  path: '/exception',
  name: 'exception',
  component: Layout,
  redirect: '/exception/index',
  alwaysShow: true,
  meta: {
    title: '异常页',
    icon: 'exception',
  },
  children: [
    {
      path: 'index',
      name: 'exceptionIndex',
      component: () => import('@/views/exception/index'),
      meta: {
        title: '请求异常',
      },
    },
    {
      path: '401',
      name: 'exception401',
      component: () => import('@/views/exception/401'),
      meta: {
        title: '401',
        pageHeader: [],
      },
    },
    {
      path: '404',
      name: 'exception404',
      component: () => import('@/views/exception/404'),
      meta: {
        title: '404',
        pageHeader: [],
      },
    },
    {
      path: '500',
      name: 'exception500',
      component: () => import('@/views/exception/500'),
      meta: {
        title: '500',
        pageHeader: [],
      },
    },
  ],
};
