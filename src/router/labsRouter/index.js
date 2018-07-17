import Layout from '@/views/layout';

export default [
  {
    path: '/labs',
    name: 'labs',
    component: Layout,
    redirect: '/labs/tree',
    alwaysShow: true,
    meta: {
      icon: 'labs',
      title: '实验室',
    },
    children: [
      {
        path: 'tree',
        name: 'labsTree',
        component: () => import('@/views/labs/tree'),
        meta: {
          title: '树结构',
        },
      },
    ],
  },
];
