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
          ref="loginForm"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              autoComplete="off"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              name="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              placeholder="密码"
            />
            <span class="pwd-toggle" @click="togglePwd">
              {{ passwordType === 'password' ? '显示' : '隐藏'}}
              <!-- <svg-icon icon-class="eye" /> -->
            </span>
          </el-form-item>

          <div class="form-item-extra flex row-flex-middle row-flex-space-between">
            <div><el-checkbox v-model="loginForm.autoLogin">自动登录</el-checkbox></div>
            <div><router-link :to="{path: 'findpass'}">忘记密码？</router-link></div>
          </div>

          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >{{'登录'}}</el-button>
        </el-form>

        <div class="form-item-other flex row-flex-middle row-flex-space-between">
          <div>
            其他登录方式
            <i>QQ</i>
            <i>微信</i>
            <i>支付宝</i>
          </div>
          <div><router-link :to="{path: 'dashboard'}">注册账户</router-link></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('密码不能为空'));
      } else if (value.trim().length < 6) {
        callback(new Error('密码长度不能小于 6 位数'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: '',
        autoLogin: true,
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
    togglePwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password';
    },
    handleLogin() {
      console.log(this.$router.replace);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('loginByUsername', this.loginForm).then((res) => {
            console.log('loginByUsername res', res);
            this.loading = false;
            const redirectUrl = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/';
            this.$router.replace({ path: redirectUrl });
          }).catch((err) => {
            this.loading = false;
            this.$message.error(err.message);
          });
        }
        return false;
      });
    },
  },
};
</script>
