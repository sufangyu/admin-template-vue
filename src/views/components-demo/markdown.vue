<template>
  <div class="markdown-demo">
    <div class="alert">
      此 Markdown 示例是基于 <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">simplemde-markdown-editor</a>，
      使用 <a href="https://www.npmjs.com/package/showdown" target="_blank">showdown</a> 转换成 HTML.
    </div>

    <div class="editor-container">
      <markdown-editor
        id="contentEditor"
        ref="contentEditor"
        v-model="content"
        :height="370"
        :zIndex="20"
      ></markdown-editor>
      <div style="margin-top:20px;">
        <el-button @click="markdown2Html" type="primary" icon="el-icon-document">转成 HTML</el-button>
      </div>
      <div style="margin-top:20px;" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor';

const content = `**this is test**
* vue
* element
* webpack

## Simplemde`;

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      content,
      html: '',
    };
  },
  methods: {
    markdown2Html() {
      import('showdown').then((showdown) => {
        const converter = new showdown.Converter();
        this.html = converter.makeHtml(this.content);
      });
    },
  },
};
</script>

<style lang="scss">
.markdown-demo {
  padding: 20px;
  border-radius: 3px;
  background-color: #fff;

  .alert {
    background: #eef1f6;
    padding: 10px;
    margin-bottom: 25px;
    display: block;
    line-height: 1.5;
    border-radius: 3px;
    font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
  }
}
</style>
