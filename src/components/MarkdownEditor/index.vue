<template>
  <div class="simplemde-container" :style="{height:height+'px',zIndex:zIndex}">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
// import 'font-awesome/css/font-awesome.min.css';
import 'simplemde/dist/simplemde.min.css';
import SimpleMDE from 'simplemde';

export default {
  name: 'SimplemdeMD',
  props: {
    value: String,
    id: {
      type: String,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 150,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    toolbar: {
      type: Array,
    },
  },
  data() {
    return {
      // simplemde obj
      simplemde: null,
      hasChange: false,
    };
  },
  mounted() {
    this.simplemde = new SimpleMDE({
      element: document.getElementById(this.id || `markdown-editor-${+new Date()}`),
      // autoDownloadFontAwesome: false,
      autofocus: this.autofocus,
      toolbar: this.toolbar,
      spellChecker: false,
      insertTexts: {
        link: ['[', ']( )'],
      },
      // hideIcons: ['guide', 'heading', 'quote', 'image', 'preview', 'side-by-side', 'fullscreen'],
      placeholder: this.placeholder,
    });

    // init value
    if (this.value) {
      this.simplemde.value(this.value);
    }

    // listener change event
    this.simplemde.codemirror.on('change', () => {
      if (this.hasChange) {
        this.hasChange = true;
      }
      this.$emit('input', this.simplemde.value());
    });
  },
  destroyed() {
    this.simplemde.toTextArea();
    this.simplemde = null;
  },
};
</script>

<style scoped>
.simplemde-container>>>.CodeMirror {
  min-height: 300px;
  /* height: 200px; */
  line-height: 1.5;
}
.simplemde-container>>>.CodeMirror-scroll {
  min-height: 300px;
}
.simplemde-container>>>.CodeMirror-code {
  padding-bottom: 0;
}
.simplemde-container>>>.editor-statusbar {
  display: none;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
  color: #1890ff;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
  color: #2d3b4d;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
  padding: 0 2px;
  color: #E61E1E;
}
.simplemde-container >>> .editor-toolbar.fullscreen,
.simplemde-container >>> .CodeMirror-fullscreen,
.simplemde-container >>> .editor-preview-active-side {
  z-index: 1003;
}
</style>
