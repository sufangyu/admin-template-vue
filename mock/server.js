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
const jsonServer = require('json-server');
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
server.get('/api/accounts', (req, res) => {
  const headers = req.headers;
  const accesstoken = headers['access-token'];
  if (!accesstoken) {
    res.status(401).send({
      success: false,
      message: '会话失效，请重新登录',
    });
  } else {
    const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
    const account = DB.get('accounts')
      .find({ token: accesstoken })
      .value();

    delete account.password;
    res.send({
      success: true,
      message: 'success',
      data: account,
    });
  }
});

// 登录
server.post('/api/accounts/login', (req, res) => {
  const body = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
  const account = DB.get('accounts')
    .find({ username: body.username, password: body.password })
    .value();

  if (!account) {
    res.send({
      success: false,
      message: '账号或者密码不正确',
    });
  } else {
    delete account.password;
    res.send({
      success: true,
      message: 'success',
      data: account,
    });
  }
});

// 注册
server.post('/api/accounts/create', (req, res) => {
  const body = req.body;
  const db = router.db;
  const data = db.get('accounts').value();
  const account = data.filter(user => user.username === body.username);

  if (account.length > 0) {
    res.send({
      success: false,
      message: '用户名已存在',
    });
  } else {
    const newAccount = {
      id: UUID.v1(),
      token: UUID.v1(),
      mobile: body.mobile,
      password: body.password,
      username: body.username,
      name: '',
      avatar_url: '',
      created_at: new Date(),
      roles: [1],
    };
    const DB = low(new FileSync(path.resolve(mockDir, 'accounts.json')));
    DB.get('accounts')
      .push(newAccount)
      .write();

    res.send({
      success: true,
      message: '注册成功',
    });
  }
});

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
    .filter({ id: !id })
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
// 角色 - 删除
server.delete('/api/admin/roles', (req, res) => {
  const { roles } = req.body;
  console.log(roles);

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


server.use(router);

server.listen(9090, () => {
  console.log('JSON Server is running');
});
