// 国际化多语言
import Layout from '@/views/layout/';

export default {
  path: '/i18n',
  name: 'i18n',
  component: Layout,
  meta: {
    title: 'i18n',
    icon: 'international',
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/i18n/index'),
      name: 'i18nIndex',
      meta: {
        title: 'i18n',
        icon: 'international',
      },
    },
  ],
};
