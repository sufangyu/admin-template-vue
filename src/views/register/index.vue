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
          status-icon
          :model="form"
          :rules="rules"
          ref="form"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              name="username"
              type="text"
              v-model="form.username"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              name="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
              v-model="form.password"
              placeholder="至少6位密码，区分大小写"
            />
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input
              name="checkPassword"
              :type="passwordType"
              v-model="form.checkPassword"
              placeholder="确认密码"
            />
          </el-form-item>

          <el-form-item prop="mobile">
            <el-input
              name="mobile"
              type="text"
              v-model="form.mobile"
              placeholder="手机号码"
            />
          </el-form-item>

          <div class="form-item-code flex row-flex-middle row-flex-space-between">
            <el-form-item class="code flex-1" prop="code">
              <el-input
                name="code"
                type="text"
                v-model="form.code"
                placeholder="验证码"
              />
            </el-form-item>
            <div class="code-get">
              <count-down @click.native="getSMSCode" :disabled="form.mobile ===''" />
            </div>
          </div>

          <div class="form-item-extra">
            <div>
              <el-checkbox v-model="form.agree">
                我已阅读并
                <router-link :to="{path: 'document/101'}">同意服务协议</router-link>
                和
                <router-link :to="{path: 'document/102'}">隐私声明</router-link>
              </el-checkbox>
            </div>
          </div>

          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleRegister"
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
import CountDown from '@/components/CountDown';
import { validateMin, validateMobile } from '@/utils/validateRules';

export default {
  name: 'register',
  components: {
    CountDown,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== '') {
        this.$refs.form.validateField('checkPassword');
        callback();
      }
    };
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      form: {
        username: '',
        password: '',
        checkPassword: '',
        mobile: '',
        code: '',
        agree: false,
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validateMin, min: 6, message: '密码不能小于6位数', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, message: '再次确认密码', trigger: 'blur' },
          { validator: validateMin, min: 6, message: '确认密码不能小于6位数', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: validateMobile, message: '手机号码格式有误', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
      },
      passwordType: 'password',
      loading: false,
    };
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.agree) {
            this.$message.error('请勾选同意协议');
            return;
          }

          console.log('提交...');
        }
      });
    },
    getSMSCode() {
      if (this.form.mobile === '') {
        this.$message.error('请输入手机号');
      }
      console.log('获取验证码...');
    },
  },
};
</script>
