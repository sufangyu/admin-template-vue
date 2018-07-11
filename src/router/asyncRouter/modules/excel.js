// excel 导出导入
import Layout from '@/views/layout/';

export default {
  path: '/excel',
  name: 'excel',
  component: Layout,
  redirect: 'excel/export-excel',
  alwaysShow: true,
  meta: {
    title: 'Excel',
    icon: 'excel',
  },
  children: [
    {
      path: 'export-excel',
      name: 'exportExcel',
      component: () => import('@/views/excel/exportExcel'),
      meta: {
        title: '导出excel表',
      },
    },
    {
      path: 'select-excel',
      name: 'selectExcel',
      component: () => import('@/views/excel/selectExcel'),
      meta: {
        title: '导出指定数据',
      },
    },
    {
      path: 'upload-excel',
      name: 'uploadExcel',
      component: () => import('@/views/excel/uploadExcel'),
      meta: {
        title: '上传excel表',
      },
    },
  ],
};
