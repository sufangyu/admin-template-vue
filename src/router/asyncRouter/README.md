```javascript
/*
 * 单个路由自定义配置
 * hidden: true                   是否在 sidebar 显示. 默认 false
 * alwaysShow: true               是否总是在一级菜单显示, 不管是否有子路由. 没有设置, 则只有子路由时才会在菜单中显示
 * redirect: noredirect           redirect:noredirect 时,在面包屑中不会重定向
 * name: 'router-name'            在 <keep-alive> 使用 (必须设置!!!)
 * meta : {
    requireAuth: true,           需要登录验证
    roles: ['admin','editor']    控制页面可访问的角色. 为空表示所有用户都可以访问
    title: 'title'               页面标题. 在子菜单 和 面包屑中显示 (推荐设置)
    icon: 'svg-name'             sidebar 显示的图标名称
    noCache: true                是否缓存页面. 默认是false
   }
 */
```