// zip 导出导入
import Layout from '@/views/layout/';

export default {
  path: '/components',
  name: 'components',
  component: Layout,
  redirect: 'components/tinymce',
  alwaysShow: true,
  meta: {
    title: '组件',
    icon: 'component',
  },
  children: [
    {
      path: 'tinymce',
      name: 'componentsTinymce',
      component: () => import('@/views/components-demo/tinymce'),
      meta: {
        title: '富文本',
      },
    },
    {
      path: 'count-to',
      name: 'componentsCountTo',
      component: () => import('@/views/components-demo/countTo'),
      meta: {
        title: 'CountTo',
      },
    },
  ],
};
