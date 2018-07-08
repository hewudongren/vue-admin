/**
 *操作状态组件，包含输入框，下拉框，按钮
 *
 *@author gill
 *@date 2018-05-08
 */

<template>
  <div class="control-header" >
  
    <!-- 右侧信息 -->
    <el-row  class="search mgb">
      <el-col v-for="(item,i) in list"
      :key="i" :span="8">      
      <!-- 循环遍历buttons,所以得情况在这里统一处理，upload:上传组件，input:输入框，button:按钮 -->

      <span   class="name">{{item.txt}}</span>  
      <el-input
      
        v-if="item.type === 'input'"
        :placeholder="item.placeholder"
        :prefix-icon="item.icon"
        :class="getInputCls(item)"
        :clearable="true"
        :ref="'inputRef'+i"
        @input="(value)=>{onInputChange(item,value)}"
      />
       <el-select  @change='(value)=>{onChange(item,value)}' v-model="item.ppp"  placeholder="请选择"  v-else-if="item.type === 'select'">
            <el-option
            v-for="(a) in item.options"
            :key="a"
           
            :value="a">
            </el-option>
       </el-select>
      <el-button
       
        v-else
        :key="i"
        size="small"
        :type='item.color'
        @click="()=>{onButtonClick(item)}"
        :icon="item.icon">
        {{item.txt}}
      </el-button>
      </el-col>
     </el-row>
  </div>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import PanelTitle from 'jw_components/panel-title'
import cookie from 'jw_common/cookie'

export default {
  name: 'control-header',
  data(){
      return {
          ppp:''
      }
  },

  props: ['list'],

  components: {
    PanelTitle
  },
  created(){
    
    
  },

  methods: {
    onChange(item,value){
        
       this.$emit('onChange',value,item)
    },  
    emptyInputs() {
      let refs = this.$refs

      _.each(refs,(inputRef,refName)=>{
        if(/inputRef/.test(refName)) {
          inputRef.clear()
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
    //提交所有按钮点击事件
    onButtonClick(buttonItem) {
      
      this.$emit('on-header-button',buttonItem)
    },
    //提交输入框事件
    onInputChange(item,value) {
      
      this.$emit('on-input-change',value,item)
    },
    //文件上传处理事件
    onUploadSuccess(data) {
      //国际化文本
      let lang = i18nService.getOtherLanguageMap()
      let successCode = 0

      if(data.code === successCode) {
        this.$emit('on-upload-success')
        this.$success(lang['uploadSuccess'])
      }else{
        this.onUploadError(data.message)
      }
    },

    onUploadError(message) {
      let lang = i18nService.getOtherLanguageMap()

      this.$emit('on-upload-fail')
      this.$error(message || lang['uploadError'])
    },
    onBack(){
      this.$emit('back')
    }
  }
}
</script>

<style lang="less">

.lineBlock{
  display: inline-block;
}
.control-header {
  width: 100%;
  padding-bottom: 10px;
  display: table;
  line-height: 2.071rem;
  // border-bottom: 1px solid #c4c6cc;
  box-sizing: border-box;

  .panel-title {
    padding-bottom: 0;
    border-bottom: none;
    float: left;
  }

  .upload-btn {
    display: inline-block;
  }

  .el-button-left {
    margin-left: 10px;
  }
  .el-button-right {
    margin-right: 10px;
  }


  .search-box {
    display: inline-block;
    // width: 150px;

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