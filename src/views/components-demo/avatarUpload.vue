<template>
  <div class="avatar-upload-demo">
    <el-card shadow="hover" class="card-bottom card-header-border-none">
      <div slot="header" class="card-header clearfix">
        <h3 class="card-header-title">个人资料</h3>
      </div>
      <div class="avatar-wrapper">
        <img class="avatar" v-show="avatar" :src="avatar" />
        <div class="avatar-upload">
          <p class="hint">支持 jpg、png 格式大小 5M 以内的图片</p>
          <el-button type="primary" @click="toggleShow">设置头像</el-button>
        </div>
      </div>
    </el-card>

    <!-- 上传组件 -->
    <avatar-upload
      v-model="uploadShow"
      field="avatar"
      :width="300"
      :height="300"
      img-format="png"
      url="/api/upload/avatar"
      :params="params"
      :headers="headers"
      @crop-success="handleCropSuccess"
      @crop-upload-success="handleCropUploadSuccess"
      @crop-upload-fail="handleCropUploadFail"
    ></avatar-upload>
  </div>
</template>

<script>
import AvatarUpload from 'vue-image-crop-upload/upload-2.vue';

export default {
  components: {
    AvatarUpload,
  },
  data() {
    return {
      avatar: 'https://avatars1.githubusercontent.com/u/1852629?s=460&v=4',
      avatarTemp: '',
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      uploadShow: false,
    };
  },
  methods: {
    toggleShow() {
      this.uploadShow = !this.uploadShow;
    },
    // 图片截取完成事件（上传前), 参数(image, field)
    handleCropSuccess(image) {
      this.avatarTemp = image;
    },
    // 上传成功， 参数(jsonData, field)
    handleCropUploadSuccess(jsonData) {
      console.log('handleCropUploadSuccess =>>', jsonData);
      this.avatar = this.avatarTemp;
      this.avatarTemp = '';
    },
    // 上传失败， 参数(status, field)
    handleCropUploadFail(status) {
      console.log('handleCropUploadFail =>>', status);
    },
  },
};
</script>

<style lang="scss">
.avatar-upload-demo {

  .avatar-wrapper {
    display: flex;

    img.avatar {
      display: block;
      width: 120px;
      height: 120px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.09);
    }

    .avatar-upload {
      margin-left: 25px;

      .hint {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
