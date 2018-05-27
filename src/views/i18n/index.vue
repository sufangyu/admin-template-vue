<template>
  <div class="app-internation">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <icon-svg name="international" />
        <span style='margin-left:10px;'>{{$t('i18nView.title')}}</span>
      </div>
      <div>
        <el-radio-group v-model="lang" size="small">
          <el-radio label="zh" border>简体中文</el-radio>
          <el-radio label="en" border>English</el-radio>
        </el-radio-group>
      </div>
      <el-tag style='margin-top: 15px; display: block;' type="info">{{$t('i18nView.note')}}</el-tag>
    </el-card>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.compTitle')}}</span>
          </div>
          <div>
            <div class="block">
              <el-date-picker
                v-model="date"
                type="date"
                :placeholder="$t('i18nView.datePlaceholder')"
              ></el-date-picker>
            </div>
            <div class="block">
              <el-pagination
                background
                :current-page="currentPage"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="400"
              ></el-pagination>
            </div>
            <div class="block">
              <el-button
                class="item-btn"
                size="small"
              >
                {{$t('i18nView.default')}}
              </el-button>
              <el-button
                class="item-btn"
                size="small"
                type="primary"
              >
                {{$t('i18nView.primary')}}
              </el-button>
              <el-button
                class="item-btn"
                size="small"
                type="success"
              >
                {{$t('i18nView.success')}}
              </el-button>
              <el-button
                class="item-btn"
                size="small"
                type="info"
              >
                {{$t('i18nView.info')}}
              </el-button>
              <el-button
                class="item-btn"
                size="small"
                type="warning"
              >
                {{$t('i18nView.warning')}}
              </el-button>
              <el-button
                class="item-btn"
                size="small"
                type="danger"
              >
                {{$t('i18nView.danger')}}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.tableTitle')}}</span>
          </div>
          <div>
            <el-table :data="tableData" fit highlight-current-row border style="width: 100%">
              <el-table-column
                prop="name"
                :label="$t('i18nView.tableName')"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="date"
                :label="$t('i18nView.tableDate')"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="address"
                :label="$t('i18nView.tableAddress')"
              ></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.htmlFormatTitle')}}</span>
          </div>
          <div>
            <p v-html="$t('i18nView.htmlFormat')"></p>
            <p v-html="$t('i18nView.namedFormat', { name: $t('i18nView.namedFormatName') })"></p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.pluralizationTitle')}}</span>
          </div>
          <div>
            <p>1: {{ $tc('i18nView.car', 1) }}</p>
            <p>2: {{ $tc('i18nView.car', 2) }}</p>

            <p>{{ $tc('i18nView.apple', 0) }}</p>
            <p>{{ $tc('i18nView.apple', 1) }}</p>
            <p>{{ $tc('i18nView.apple', 10, { count: 100 }) }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.datetimeTitle')}}</span>
          </div>
          <div>
            <p>{{ $d(new Date(), 'short') }}</p>
            <p>{{ $d(new Date(), 'long', 'zh') }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('i18nView.numberTitle')}}</span>
          </div>
          <div>
            <!-- 随语言切换 -->
            <p>{{ $n(100, 'currency') }}</p>
            <!-- 指定语言, 不会随语言切换 -->
            <p>{{ $n(100, 'currency', 'zh') }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import local from './local';

const viewName = 'i18nView';

export default {
  name: 'i18n',
  data() {
    return {
      date: '',
      currentPage: 5,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      }],
    };
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.app.language;
      },
      set(lang) {
        this.$i18n.locale = lang;
        this.$store.dispatch('setLanguage', lang);
      },
    },
  },
  created() {
    // 没有全局配置, 合并当前语言配置
    if (!this.$i18n.getLocaleMessage('en')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en);
      this.$i18n.mergeLocaleMessage('zh', local.zh);
    }
  },
};
</script>

<style scoped>
.box-card {
  margin: 10px auto;
}
.block {
  padding: 20px 0;
}
</style>
