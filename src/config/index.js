export default {
  // api 前置路径
  API_BASE: process.env.API_BASE,

  // 国际化多语言配置
  LANGUAGES: [
    { name: '中文简体', lang: 'zh' },
    { name: 'English', lang: 'en' },
  ],

  // 权限控制的方式. roles: 用户角色;  menus: 路由菜单
  PERMISSION_TYPE: 'roles',
  // 是否异步匹配路由角色信息
  IS_ASYNC_ROUTER_ROLES: true,
};
