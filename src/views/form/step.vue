<template>
  <div class="form-step">
    <el-card shadow="hover">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        status-icon
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
        :label-position="device === 'mobile' ? 'top' : 'right'"
        class="demo-form-step"
        v-show="active === 0"
      >
        <el-form-item label="付款账户" prop="paymentAccount">
          <el-input placeholder="请输入付款账户" v-model="form.paymentAccount"></el-input>
        </el-form-item>
        <el-form-item label="收款账户" prop="payeeAccount">
          <el-input placeholder="请输入收款账户" v-model="form.payeeAccount" class="input-with-select">
            <el-select v-model="form.select" slot="prepend" placeholder="请选择">
              <el-option label="支付宝" value="1"></el-option>
              <el-option label="银行账户" value="2"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="收款人姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="转账金额" prop="money">
          <el-input v-model="form.money">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextForm('form')">下一步</el-button>
        </el-form-item>
      </el-form>

      <el-form
        status-icon
        :model="form"
        :rules="rules2"
        ref="form2"
        label-width="100px"
        :label-position="device === 'mobile' ? 'top' : 'right'"
        class="demo-form-step"
        v-show="active === 1 || active === 2"
      >
        <el-form-item label="付款账户">
          <el-input disabled placeholder="请输入付款账户" v-model="form.paymentAccount"></el-input>
        </el-form-item>
        <el-form-item label="收款账户">
          <el-input
            disabled
            placeholder="请输入收款账户"
            v-model="form.payeeAccount"
            class="input-with-select"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款人姓名">
          <el-input disabled v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="转账金额">
          <el-input disabled v-model="form.money">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="支付密码"  prop="password">
          <el-input type="password" placeholder="请输入支付密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            type="primary"
            @click="handleSubmit('form2')"
          >提交</el-button>
          <el-button @click="prevForm">上一步</el-button>
        </el-form-item>
      </el-form>

      <div class="result" v-if="active === 3">
        <div class="icon"></div>
        <div class="title">操作成功</div>
        <div class="description">预计两小时内到账</div>
        <div class="extra">
          <div class="information">
            <el-row :gutter="5">
              <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="res-label">付款账户：</div>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                <div class="res-text">{{form.paymentAccount}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="res-label">收款账户：</div>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                <div class="res-text">{{form.payeeAccount}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="res-label">收款人姓名：</div>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                <div class="res-text">{{form.name}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="res-label">转账金额：</div>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
                <div class="res-text">{{form.money}}元</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="actions">
          <el-button type="primary" @click="active = 0">再转一笔</el-button>
          <el-button>查看账单</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      active: 0,
      submitting: false,
      form: {
        paymentAccount: 'from@email.com',
        payeeAccount: 'to@email.com',
        select: '1',
        name: '张三疯',
        money: '125',
        password: '',
      },
      rules: {
        paymentAccount: [
          { required: true, message: '付款账户不能为空', trigger: 'blur' },
        ],
        payeeAccount: [
          { required: true, message: '收款账户不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '收款人姓名不能为空', trigger: 'blur' },
        ],
        money: [
          { required: true, message: '转账金额不能为空', trigger: 'blur' },
        ],
      },
      rules2: {
        password: [
          { required: true, message: '支付密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'device',
    ]),
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.submitting = true;
          this.nextStep();

          setTimeout(() => {
            this.submit();
          }, 2500);
        } else {
          console.log('error submit!!');
        }
      });
    },
    submit() {
      this.active = 3;
      this.submitting = false;
    },
    nextForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextStep();
        } else {
          console.log('error submit!!');
        }
      });
    },
    nextStep() {
      this.active += 1;
    },
    prevForm() {
      this.active -= 1;
      this.$refs.form2.resetFields();
    },
  },
};
</script>

<style lang="scss">
.form-step {

  .demo-form-step {
    margin-top: 25px;
  }

  .el-select .el-input {
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-with-select .el-select .el-input__validateIcon {
    display: none;
  }

  .el-input.is-disabled {
    .el-input__inner {
      background-color: transparent;
      border-color: transparent;
      color: #606266;
      opacity: 0.8;
    }
    .el-input__validateIcon {
      display: none;
    }

    .el-input-group__prepend {
      background-color: transparent;
      border: none;
      padding: 0 0 0 15px;
      margin-right: -15px;
    }
  }

  .el-input-group.is-disabled {
    .el-input__inner {
      padding-left: 0;
    }
  }

  .res-label {
    line-height: 1.8;
    text-align: right;
  }
  .res-text {
    line-height: 1.8;
    opacity: 0.8;
  }
}
</style>
