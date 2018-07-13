/**
 *表格头部控制块
 *
 *@author gill
 *@date 2018-05-08
 */

<template>
  <div class="control-header">
    <PanelTitle :title="title" />
    <div class="right">
      <el-upload
        class="upload-btn"
        name="import"
        :headers="getAccessToken()"
        v-for="(item,i) in buttons"
        v-if="item.type === 'upload'"
        :show-file-list="false"
        :key="i"
        :action="item.uploadUrl"
        :on-success="onUploadSuccess"
        :on-error="onUploadError">
        <el-button size="mini" :type="item.btnType||null">{{item.txt}}</el-button>
      </el-upload>
      <el-input
        v-else-if="item.type === 'input'"
        :placeholder="item.placeholder"
        :prefix-icon="item.icon"
        :class="getInputCls(item)"
        :clearable="true"
        :ref="'inputRef'+i"
        @input="(value)=>{onInputChange(item,value)}"
      />
      <el-button
        v-else
        :key="i"
        size="mini"
        :type="item.btnType||null"
        @click="()=>{onButtonClick(item)}"
        :icon="item.icon">
        {{item.txt}}
      </el-button>
    </div>
  </div>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import PanelTitle from 'jw_components/panel-title'
import cookie from 'jw_common/cookie'

export default {
  name: 'control-header',

  props: ['title', 'buttons'],

  components: {
    PanelTitle
  },

  methods: {
    emptyInputs() {
      let refs = this.$refs

      _.each(refs,(inputRef,refName)=>{
        if(/inputRef/.test(refName)) {
          inputRef.setCurrentValue('')
        }
      })
    },
    getAccessToken() {

      return {
        accesstoken: cookie.getAuth()
      }
    },
    
    getInputCls(item) {

      if(item.cls) {
        return 'search-box ' + item.cls
      }

      return 'search-box'
    },

    onButtonClick(buttonItem) {

      this.$emit('on-header-button',buttonItem)
    },

    onInputChange(item,value) {
      
      this.$emit('on-input-change',value,item)
    },

    onUploadSuccess(data) {
      let lang = i18nService.getOtherLanguageMap()
      let successCode = 0

      this.$emit('on-upload-success')
      this.$success(lang['uploadSuccess'])
    },

    onUploadError(message) {
      let lang = i18nService.getOtherLanguageMap()

      this.$emit('on-upload-fail')
      this.$error(message || lang['uploadError'])
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.control-header {
  width: 100%;
  padding-bottom: @jw10px;
  display: table;
  line-height: 2.071rem;
  border-bottom: 1px solid #c4c6cc;
  box-sizing: border-box;

  .panel-title {
    padding-bottom: 0;
    border-bottom: none;
    float: left;
  }

  .upload-btn {
    display: inline-block;
  }

  // .el-button {
  //   margin-left: @jw10px;
  // }

  .search-box {
    display: inline-block;
    width: 150px;

    .el-input__icon {
      line-height: 2rem;
    }

    .el-input__inner {
      height: 2rem;
      line-height: 2rem;
    }
  }

  .el-button [class*=el-icon-]+span {
    margin-left: 3px;
  }
}
</style>