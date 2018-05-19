<template>
  <div class="account-container">
    <div class="account-content">
      <div class="account-top">
        <div class="header">Admin Template</div>
        <div class="desc">根据账户不同权限显示不同管理菜单的控制台</div>
      </div>
      <div class="account-main">
        <el-form
          class="account-form"
          autoComplete="off"
          :model="loginForm"
          :rules="loginRules"
          ref="accountForm"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              autoComplete="on"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              name="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              placeholder="至少6位密码，区分大小写"
            />
          </el-form-item>

          <el-form-item prop="repassword">
            <el-input
              name="repassword"
              type="text"
              v-model="loginForm.repassword"
              placeholder="确认密码"
            />
          </el-form-item>

          <div class="form-item-code flex row-flex-middle row-flex-space-between">
            <div class="code flex-1" prop="code">
              <el-input
                name="code"
                type="text"
                v-model="loginForm.code"
                placeholder="验证码"
              />
            </div>
            <div class="code-get"><el-button>获取验证码</el-button></div>
          </div>

          <div class="form-item-extra">
            <div>
              <el-checkbox v-model="loginForm.agree">
                我已阅读并
                <router-link :to="{path: 'document/101'}">同意服务协议</router-link>
                和
                <router-link :to="{path: 'document/101'}">隐私声明</router-link>
              </el-checkbox>
            </div>
          </div>

          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >{{'提交注册'}}</el-button>
        </el-form>

        <div class="form-item-other flex row-flex-middle row-flex-center">
          <div>已有账号？<router-link :to="{path: 'login'}">立即登录</router-link></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        repassword: '',
        agree: true,
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      passwordType: 'password',
      loading: false,
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
          }).catch(() => {
            this.loading = false;
          });
        }
        return false;
      });
    },
  },
};
</script>

// <style lang="scss" scoped>
// $bg:#2d3a4b;
// $dark_gray:#889aa4;
// $light_gray:#eee;

// /* reset element-ui css */
// .account-container {
//   .el-input {
//     display: inline-block;
//     height: 47px;
//     width: 85%;
//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       &:-webkit-autofill {
//         -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: #fff !important;
//       }
//     }
//   }
//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
//   }
// }

// .account-container {
//   position: fixed;
//   height: 100%;
//   width: 100%;
//   background-color: $bg;
//   .account-form {
//     position: absolute;
//     left: 0;
//     right: 0;
//     width: 520px;
//     padding: 35px 35px 15px 35px;
//     margin: 120px auto;
//   }
//   .tips {
//     font-size: 14px;
//     color: #fff;
//     margin-bottom: 10px;
//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }
//   .svg-container {
//     padding: 6px 5px 6px 15px;
//     color: $dark_gray;
//     vertical-align: middle;
//     width: 30px;
//     display: inline-block;
//     &_login {
//       font-size: 20px;
//     }
//   }
//   .title-container {
//     position: relative;
//     .title {
//       font-size: 26px;
//       font-weight: 400;
//       color: $light_gray;
//       margin: 0px auto 40px auto;
//       text-align: center;
//       font-weight: bold;
//     }
//     .set-language {
//       color: #fff;
//       position: absolute;
//       top: 5px;
//       right: 0px;
//     }
//   }
//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: $dark_gray;
//     cursor: pointer;
//     user-select: none;
//   }
//   .thirdparty-button {
//     position: absolute;
//     right: 35px;
//     bottom: 28px;
//   }
// }
// </style>
