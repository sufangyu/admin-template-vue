// 表单页
import Layout from '@/views/layout/';

export default {
  path: '/form',
  name: 'form',
  component: Layout,
  redirect: 'noredirect',
  meta: {
    title: '表单页',
    icon: 'form',
  },
  children: [
    {
      path: 'basic-form',
      name: 'basicForm',
      component: () => import('@/views/form/base'),
      meta: {
        title: '基础表单',
        desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
      },
    },
    {
      path: 'step-form',
      name: 'stepForm',
      component: () => import('@/views/form/step'),
      meta: {
        title: '分步表单',
        desc: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      },
    },
  ],
};
