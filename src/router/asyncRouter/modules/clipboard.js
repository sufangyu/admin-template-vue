// 复制剪贴板
import Layout from '@/views/layout/';

export default {
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
};
