/**
 * json-server
 *
 * https://github.com/typicode/json-server#example
 * https://www.jianshu.com/p/7094c477207d
 * https://github.com/typicode/json-server#add-custom-routes
 */
const fs = require('fs');
const path = require('path');
const UUID = require('uuid');
const jsonServer = require('../node_modules/_json-server@0.14.0@json-server');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const server = jsonServer.create();
const middleware = jsonServer.defaults();
server.use(middleware);
server.use(jsonServer.bodyParser);


// 支持加载多个db json文件
const mockDir = path.join(__dirname, 'data');
const base = {};
const files = fs.readdirSync(mockDir);
files.forEach((file) => {
  Object.assign(base, require(path.resolve(mockDir, file)));
});

const router = jsonServer.router(base);

// 用户信息
server.get('/api/account', (req, res) => {
  const headers = req.headers;
  const accesstoken = headers['access-token'];
  if (!accesstoken) {
    res.status(401).send({
      success: false,
      message: '会话失效，请重新登录',
    });
  } else {
    const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
    const DBRoles = low(new FileSync(path.resolve(mockDir, 'roles.json')));
    const account = DB.get('accounts')
      .find({ token: accesstoken })
      .value();
    const role = DBRoles.get('roles')
      .find({ id: account.role })
      .value();

    let menus = [];
    if (role) {
      role.menus.forEach((menu) => {
        menu.extraRules = [...menu.extraRulesChecked];
        // delete menu.extraRulesChecked;
        delete menu.extraRulesCheckedValues;
      });
      menus = role.menus;
    }

    delete account.password;
    res.send({
      success: true,
      message: 'success',
      data: {
        account,
        menus,
      },
    });
  }
});
// 用户 - 获取列表
server.get('/api/accounts', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  let accounts = DB.get('accounts').value();
  // 初始化创建
  if (!accounts) {
    DB.defaults({ accounts: [] })
      .write();

    accounts = [];
  }

  res.send({
    success: true,
    message: 'success',
    data: {
      list: accounts,
    },
  });
});
// 用户 - 添加
server.post('/api/accounts', (req, res) => {
  const {
    username,
    password,
    nickname,
    mobile = '',
    avatarUrl = '',
    roles = [],
    rolesShow = [],
    isSuperAdmin = false,
    status = '0',
    role = '',
    roleName = '',
  } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  const account = DB.get('accounts')
    .find({ username })
    .value();

  if (account) {
    res.send({
      success: false,
      message: '用户名已存在',
    });
  } else {
    if (isSuperAdmin) {
      if (!roles.includes('admin')) {
        roles.push('admin');
      }
    }
    const newAccount = {
      id: UUID.v1(),
      token: UUID.v1(),
      username,
      password,
      nickname,
      status,
      mobile,
      avatar_url: avatarUrl,
      roles,
      rolesShow,
      role,
      roleName,
      created_at: new Date(),
    };

    DB.get('accounts')
      .push(newAccount)
      .write();

    res.send({
      success: true,
      message: '添加成功',
    });
  }
});
// 用户 - 编辑
server.put('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    nickname,
    mobile = '',
    avatarUrl = '',
    isSuperAdmin = false,
    status,
    roles = [],
    rolesShow = [],
    role,
    roleName,
  } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  const menu = DB.get('accounts')
    .find({ id })
    .value();

  if (!menu) {
    res.send({
      success: false,
      message: '用户不存在',
    });
  } else {
    if (isSuperAdmin) {
      const hasRole = roles.find(roleItem => roleItem === 'admin');
      if (!hasRole) {
        roles.push('admin');
      }
    } else {
      const index = roles.indexOf('admin');
      if (index > -1) {
        roles.splice(index, 1);
      }
    }
    const newAccount = {
      username,
      password,
      nickname,
      mobile,
      avatar_url: avatarUrl,
      isSuperAdmin,
      status,
      roles,
      rolesShow,
      role,
      roleName,
    };
    DB.get('accounts')
      .find({ id })
      .assign(newAccount)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});
// 用户 - 删除
server.delete('/api/accounts', (req, res) => {
  const { accounts } = req.body;

  if (accounts.length === 0) {
    res.send({
      success: false,
      message: '用户ID不能为空',
    });
    return;
  }

  let hasAdmin = false;

  accounts.forEach((account) => {
    const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
    // 防止删除超级管理员
    const willDelAccount = DB.get('accounts')
      .find({ id: account })
      .value();
    if (willDelAccount && willDelAccount.username === 'admin') {
      hasAdmin = true;
      return;
    }

    DB.get('accounts')
      .remove({ id: account })
      .write();
  });

  console.log(accounts.length === 1, hasAdmin);
  let response = {};
  if (accounts.length === 1 && hasAdmin) {
    response = {
      success: false,
      message: '超级管理员不能删除',
    };
  } else if (accounts.length > 1 && hasAdmin) {
    response = {
      success: true,
      message: '删除成功，剩余超级管理员不能删除',
    };
  } else {
    response = {
      success: true,
      message: '删除成功',
    };
  }

  res.send(response);
});
// 用户 - 更新信息
server.patch('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
  const { info } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  const account = DB.get('accounts')
    .find({ id })
    .value();

  if (!account) {
    res.send({
      success: false,
      message: '用户不存在',
    });
  } else {
    const newAccount = info;
    DB.get('accounts')
      .find({ id })
      .assign(newAccount)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});


// 登录
server.post('/api/accounts/login', (req, res) => {
  const { username, password } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  const account = DB.get('accounts')
    .find({
      username,
      password,
    })
    .value();

  if (!account) {
    res.send({
      success: false,
      message: '账号或者密码不正确',
    });
  } else {
    if (account.status !== '1') {
      res.send({
        success: false,
        message: '帐号未启用，请联系管理员',
      });
      return;
    }
    delete account.password;
    res.send({
      success: true,
      message: 'success',
      data: account,
    });
  }
});

// 注册
// server.post('/api/accounts/create', (req, res) => {
//   const body = req.body;
//   const db = router.db;
//   const data = db.get('accounts').value();
//   const account = data.filter(user => user.username === body.username);

//   if (account.length > 0) {
//     res.send({
//       success: false,
//       message: '用户名已存在',
//     });
//   } else {
//     const newAccount = {
//       id: UUID.v1(),
//       token: UUID.v1(),
//       mobile: body.mobile,
//       password: body.password,
//       username: body.username,
//       nickname: body.nickname || '',
//       avatar_url: '',
//       roles: [1], // 角色. 0: 管理员; 1: 编辑人员
//       status: '0', // 状态. 0: 禁用; 1: 启用
//       created_at: new Date(),
//     };
//     const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
//     DB.get('accounts')
//       .push(newAccount)
//       .write();

//     res.send({
//       success: true,
//       message: '注册成功',
//     });
//   }
// });


// 验证码
server.post('/api/global/sms', (req, res) => {
  const body = req.body;
  if (body.mobile === '') {
    res.send({
      success: false,
      message: '手机号码不能为空',
    });
  } else {
    res.send({
      success: true,
      message: 'success',
      data: {
        code: '12138',
      },
    });
  }
});


// 文章
server.get('/api/articles', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'articles.json')));
  const articles = DB.get('articles').value();

  res.send({
    success: true,
    message: 'success',
    data: articles,
  });
});


// 未读信息
server.get('/api/messages/unread', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'messages.json')));
  const unreadMessages = DB.get('unread').value();

  res.send({
    success: true,
    message: 'success',
    data: unreadMessages || [],
  });
});


// 上传图片
server.post('/api/upload/avatar', (req, res) => {
  const body = req.body;
  console.log(body);

  setTimeout(() => {
    res.send({
      success: true,
      message: 'success',
    });
  }, 1500);
});


// 返回异常
server.get('/api/exception', (req, res) => {
  const { status = 200 } = req.query;

  setTimeout(() => {
    res.status(status).send();
  }, 1500);
});


// 权限菜单 - 获取列表
server.get('/api/admin/menus', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'menus.json')));
  const menus = DB.get('menus').value();

  res.send({
    success: true,
    message: 'success',
    data: menus,
  });
});
// 权限菜单 - 添加
server.post('/api/admin/menus', (req, res) => {
  const { name, parentId, unique, extraRules = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus.json')));
  const menu = DB.get('menus')
    .find({ unique })
    .value();

  if (menu) {
    res.send({
      success: false,
      message: '菜单唯一标识已存在',
    });
  } else {
    const newMenu = {
      id: UUID.v1(),
      name,
      parentId,
      unique,
      extraRules,
      created_at: new Date(),
    };

    DB.get('menus')
      .push(newMenu)
      .write();

    res.send({
      success: true,
      message: '添加成功',
    });
  }
});
// 权限菜单 - 编辑
server.put('/api/admin/menus/:id', (req, res) => {
  const { id } = req.params;
  const { name, parentId, unique, extraRules = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus.json')));
  const menu = DB.get('menus')
    .find({ id })
    .value();

  const menuSameUnique = DB.get('menus')
    .filter(item => item.id !== id)
    .find({ unique })
    .value();

  if (!menu) {
    res.send({
      success: false,
      message: '权限菜单不存在',
    });
  } else if (menuSameUnique) {
    res.send({
      success: false,
      message: '菜单唯一标识已存在',
    });
  } else {
    const newMenu = {
      id,
      name,
      parentId,
      unique,
      extraRules,
    };
    DB.get('menus')
      .find({ id })
      .assign(newMenu)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});
// 权限菜单 - 删除
server.delete('/api/admin/menus/:id', (req, res) => {
  const { id } = req.params;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus.json')));
  const menu = DB.get('menus')
    .find({ id })
    .value();

  if (!menu) {
    res.send({
      success: false,
      message: '权限菜单不存在',
    });
  } else {
    DB.get('menus')
      .remove({ id })
      .write();

    res.send({
      success: true,
      message: '删除成功',
    });
  }
});


// 角色 - 获取列表
server.get('/api/admin/roles', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'roles.json')));
  const roles = DB.get('roles').value();

  res.send({
    success: true,
    message: 'success',
    data: roles,
  });
});
// 角色 - 信息
server.get('/api/admin/roles/:id', (req, res) => {
  const { id } = req.params;
  const DB = low(new FileSync(path.resolve(mockDir, 'roles.json')));
  const role = DB.get('roles')
    .find({ id })
    .value();

  if (!role) {
    res.send({
      success: false,
      message: '不存在角色',
    });
  } else {
    res.send({
      success: true,
      message: '成功',
      data: role,
    });
  }
});
// 角色 - 添加
server.post('/api/admin/roles', (req, res) => {
  const { name, status, menus = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'roles.json')));
  const role = DB.get('roles')
    .find({ name })
    .value();

  if (role) {
    res.send({
      success: false,
      message: '已存在同名角色',
    });
  } else {
    const newRole = {
      id: UUID.v1(),
      name,
      status,
      menus,
      created_at: new Date(),
    };

    DB.get('roles')
      .push(newRole)
      .write();

    res.send({
      success: true,
      message: '添加成功',
    });
  }
});
// 角色 - 编辑
server.put('/api/admin/roles/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, menus = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'roles.json')));
  const role = DB.get('roles')
    .find({ id })
    .value();

  if (!role) {
    res.send({
      success: false,
      message: '不存在角色',
    });
  } else {
    const newRole = {
      id,
      name,
      status,
      menus,
    };
    DB.get('roles')
      .find({ id })
      .assign(newRole)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});
// 角色 - 批量删除
server.delete('/api/admin/roles', (req, res) => {
  const { roles } = req.body;

  if (roles.length === 0) {
    res.send({
      success: false,
      message: '角色ID不能为空',
    });
    return;
  }

  roles.forEach((role) => {
    const DB = low(new FileSync(path.resolve(mockDir, 'roles.json')));
    DB.get('roles')
      .remove({ id: role })
      .write();
  });

  res.send({
    success: true,
    message: '删除成功',
  });
});


// 权限菜单(菜单配置) - 获取列表
server.get('/api/admin-menus/menus', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'menus2.json')));
  let menus = DB.get('menus').value();
  // 初始化创建
  if (!menus) {
    DB.defaults({ menus: [] })
      .write();

    menus = [];
  }

  res.send({
    success: true,
    message: 'success',
    data: menus,
  });
});
// 权限菜单(菜单配置) - 添加
server.post('/api/admin-menus/menus', (req, res) => {
  const { name, parentId, unique, roles = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus2.json')));
  const menu = DB.get('menus')
    .find({ unique })
    .value();

  if (menu) {
    res.send({
      success: false,
      message: '菜单唯一标识已存在',
    });
  } else {
    const newMenu = {
      id: UUID.v1(),
      name,
      parentId,
      unique,
      roles,
      created_at: new Date(),
    };

    DB.get('menus')
      .push(newMenu)
      .write();

    res.send({
      success: true,
      message: '添加成功',
    });
  }
});
// 权限菜单(菜单配置) - 编辑
server.put('/api/admin-menus/menus/:id', (req, res) => {
  const { id } = req.params;
  const { name, parentId, unique, roles = [] } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus2.json')));
  const menu = DB.get('menus')
    .find({ id })
    .value();

  const menuSameUnique = DB.get('menus')
    .filter(item => item.id !== id)
    .find({ unique })
    .value();

  if (!menu) {
    res.send({
      success: false,
      message: '权限菜单不存在',
    });
  } else if (menuSameUnique) {
    res.send({
      success: false,
      message: '菜单唯一标识已存在',
    });
  } else {
    const newMenu = {
      id,
      name,
      parentId,
      unique,
      roles,
    };
    DB.get('menus')
      .find({ id })
      .assign(newMenu)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});
// 权限菜单(菜单配置) - 删除
server.delete('/api/admin-menus/menus/:id', (req, res) => {
  const { id } = req.params;
  const DB = low(new FileSync(path.resolve(mockDir, 'menus2.json')));
  const menu = DB.get('menus')
    .find({ id })
    .value();

  if (!menu) {
    res.send({
      success: false,
      message: '权限菜单不存在',
    });
  } else {
    DB.get('menus')
      .remove({ id })
      .write();

    res.send({
      success: true,
      message: '删除成功',
    });
  }
});


// 角色(菜单配置) - 列表
server.get('/api/admin-menus/roles', (req, res) => {
  const DB = low(new FileSync(path.resolve(mockDir, 'roles2.json')));
  let roles = DB.get('roles').value();
  // 初始化创建
  if (!roles) {
    DB.defaults({ roles: [] })
      .write();

    roles = [];
  }

  res.send({
    success: true,
    message: 'success',
    data: roles,
  });
});
// 角色(菜单配置) - 添加
server.post('/api/admin-menus/roles', (req, res) => {
  const { name, value, status } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'roles2.json')));
  const role = DB.get('roles')
    .find({ value })
    .value();

  if (role) {
    res.send({
      success: false,
      message: '已存在同标识角色',
    });
  } else {
    const newRole = {
      id: UUID.v1(),
      name,
      value,
      status,
      created_at: new Date(),
    };

    DB.get('roles')
      .push(newRole)
      .write();

    res.send({
      success: true,
      message: '添加成功',
    });
  }
});
// 角色(菜单配置) - 编辑
server.put('/api/admin-menus/roles/:id', (req, res) => {
  const { id } = req.params;
  const { name, status, value } = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'roles2.json')));
  const role = DB.get('roles')
    .find({ id })
    .value();

  const sameValueRole = DB.get('roles')
    .filter(item => item.id !== id)
    .find({ value })
    .value();

  if (!role) {
    res.send({
      success: false,
      message: '不存在角色',
    });
  } else if (sameValueRole) {
    res.send({
      success: false,
      message: '已存在同标识角色',
    });
  } else {
    const newRole = {
      id,
      name,
      value,
      status,
    };
    DB.get('roles')
      .find({ id })
      .assign(newRole)
      .write();

    res.send({
      success: true,
      message: '修改成功',
    });
  }
});
// 角色(菜单配置) - 批量删除
server.delete('/api/admin-menus/roles', (req, res) => {
  const { roles } = req.body;

  if (roles.length === 0) {
    res.send({
      success: false,
      message: '角色ID不能为空',
    });
    return;
  }

  roles.forEach((role) => {
    const DB = low(new FileSync(path.resolve(mockDir, 'roles2.json')));
    DB.get('roles')
      .remove({ id: role })
      .write();
  });

  res.send({
    success: true,
    message: '删除成功',
  });
});


server.use(router);

server.listen(9090, () => {
  console.log('JSON Server is running');
});
