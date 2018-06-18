<template>
  <div
    class="excel-upload"
    :class="{actived: actived}"
    @click="handleUpload"
    @drop="handleDrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
    @dragleave="handleDragleave"
  >
    <i class="el-icon-upload"></i>
    <div class="excel-upload-drop" slot="tip">将文件拖到此处，或<em>点击上传</em></div>
    <input
      class="excel-upload-input"
      ref="excelUploadInput"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  data() {
    return {
      uploading: false,
      actived: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();

      this.actived = false;
      if (this.uploading) {
        return;
      }
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error('只支持上传一个文件');
        return;
      }
      const itemFile = files[0];
      this.readerData(itemFile);
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      this.actived = true;
    },
    handleDragleave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.actived = false;
    },
    handleUpload(e) {
      e.stopPropagation();
      this.$refs.excelUploadInput.click();
    },
    async handleChange(e) {
      const files = e.target.files;
      const itemFile = files[0]; // only use files[0]
      if (!itemFile) {
        return;
      }
      await this.readerData(itemFile);
      // fix can't select the same excel
      this.$refs.excelUploadInput.value = null;
    },
    readerData(itemFile) {
      if (!/.xls|.xlsx/.test(itemFile.name)) {
        this.$message.error('只能上传 xls 或 xlsx 格式文件');
        return false;
      }
      this.uploading = true;
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const fixedData = this.fixdata(data);
          const workbook = XLSX.read(btoa(fixedData), { type: 'base64' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.get_header_row(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateDate({ header, results });
          this.uploading = false;
          resolve();
        };
        reader.readAsArrayBuffer(itemFile);
      });
    },
    generateDate({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.$emit('success', this.excelData);
    },
    fixdata(data) {
      let o = '';
      let l = 0;
      const w = 10240;
      /* eslint-disable no-plusplus */
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)));
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    get_header_row(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r; /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        /* find the cell in the first row */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        // <-- replace with your desired default
        let hdr = `UNKNOWN ${C}`;
        if (cell && cell.t) {
          hdr = XLSX.utils.format_cell(cell);
        }
        headers.push(hdr);
      }
      return headers;
    },
  },
};
</script>

<style lang="scss">
.excel-upload {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  // width: 360px;
  min-height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.25s;

  &:hover,
  &.actived, {
    border-color: #409eff;
  }

  &-input {
    display: none;
  }

  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }

  &-drop {
    color: #606266;
    font-size: 14px;
    text-align: center;

    em {
      color: #409eff;
      font-style: normal;
    }
  }
}
</style>
