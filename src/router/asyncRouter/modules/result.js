// 结果页
import Layout from '@/views/layout/';

export default {
  path: '/result',
  name: 'result',
  component: Layout,
  redirect: 'result/success',
  alwaysShow: true,
  meta: {
    title: '结果页',
    icon: 'result',
  },
  children: [
    {
      path: 'success',
      name: 'resultSuccess',
      component: () => import('@/views/result/success'),
      meta: {
        title: '成功',
      },
    },
    {
      path: 'fail',
      name: 'resultFail',
      component: () => import('@/views/result/fail'),
      meta: {
        title: '失败',
      },
    },
    {
      path: 'dealing',
      name: 'resultDealing',
      component: () => import('@/views/result/dealing'),
      meta: {
        title: '处理中',
      },
    },
    {
      path: 'waring',
      name: 'resultWaring',
      component: () => import('@/views/result/waring'),
      meta: {
        title: '警告',
      },
    },
  ],
};
