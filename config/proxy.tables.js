/**
 * 配置 请求本地代理
 * 
 * 可通过以下两种命令行运行
 * npm start -- -- --env.proxy=api
 * npm run dev -- --env.proxy=api
 */ 
'use strict'

module.exports = {
  api: {
    '/api': {
      target: 'http://localhost:9090',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
      }
    }
  },
  sit: {
    '/api': {
      target: 'http://sit.api.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
      }
    }
  },
  prod: {
    '/api': {
      target: 'http://prod.api.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
      }
    }
  },
};