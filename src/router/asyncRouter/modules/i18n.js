// 国际化多语言
import Layout from '@/views/layout/';

export default {
  path: '/i18n',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/i18n/index'),
      name: 'i18n',
      meta: {
        title: 'i18n',
        icon: 'international',
      },
    },
  ],
};
