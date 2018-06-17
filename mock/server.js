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
server.get('/api/account', (req, res) => {
  const headers = req.headers;
  const accesstoken = headers['access-token'];
  if (!accesstoken) {
    res.status(401).send({
      success: false,
      message: '会话失效，请重新登录',
    });
  } else {
    const DB = low(new FileSync(path.resolve(mockDir, 'account.json')));
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
server.post('/api/account/login', (req, res) => {
  const body = req.body;
  const DB = low(new FileSync(path.resolve(mockDir, 'account.json')));
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
server.post('/api/account/create', (req, res) => {
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
    const DB = low(new FileSync(path.resolve(mockDir, 'account.json')));
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

server.use(router);

server.listen(9090, () => {
  console.log('JSON Server is running');
});
