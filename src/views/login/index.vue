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
          :model="form"
          :rules="rules"
          ref="form"
          status-icon
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="form.username"
              autoComplete="off"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              name="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
              v-model="form.password"
              placeholder="密码"
            />
            <span class="pwd-toggle" @click="togglePwd">
              {{ passwordType === 'password' ? '显示' : '隐藏'}}
              <!-- <svg-icon icon-class="eye" /> -->
            </span>
          </el-form-item>

          <div class="form-item-extra flex row-flex-middle row-flex-space-between">
            <div><el-checkbox v-model="form.autoLogin">自动登录</el-checkbox></div>
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
          <div><router-link :to="{path: 'register'}">注册账户</router-link></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { validateMin } from '@/utils/validateRules';

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        autoLogin: true,
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validate: validateMin, min: 6, message: '密码长度不能小于6位数', trigger: 'blur' },
        ],
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
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            const res = await this.$store.dispatch('loginByUsername', this.form);
            this.loading = false;
            if (!res.success) {
              this.$message.error(res.message || '登录失败，请重试');
            } else {
              const redirectUrl = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '/';
              this.$router.replace({ path: redirectUrl });
            }
          } catch (error) {
            console.error('handleLogin error=>>', error);
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>
