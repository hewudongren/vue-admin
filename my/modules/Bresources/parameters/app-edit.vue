<template>
  <el-form ref="jwForm" class="app-base-wrapper" :model="entity" :rules="rules" label-position="right" label-width="100px">
    <el-form-item :label="'所属科室'||appLang['platform.app_app.name']" prop="department">
      <el-input v-model="entity.department" :placeholder="'请选择科室'||appLang['platform.app_app.name']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="'参数名称'||appLang['platform.app_app.version']" prop="name">
      <el-input v-model="entity.name" :placeholder="'请选择参数名称'||appLang['platform.app_app.version']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="'显示名称'||appLang['platform.app_app.index']" prop="showName">
      <el-input v-model="entity.showName" :placeholder="'请选择显示名称'||appLang['platform.app_app.index']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="'取值方式'||appLang['platform.app_app.icon']" prop='getWay'>
       <el-input v-model="entity.getWay" :placeholder="'请选择取值方式'||appLang['platform.app_app.index']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="'大类'||appLang['platform.app_app.keywords']" prop="bigClass">
      <el-input v-model="entity.bigClass" :placeholder="'请选择大类'||appLang['platform.app_app.keywords']" :maxlength="maxLength"></el-input>
    </el-form-item>
    <el-form-item :label="'分类'||appLang['platform.app_app.docCenter']" prop="category">
      <el-input v-model="entity.category" :placeholder="'请选择分类'||appLang['platform.app_app.docCenter']"></el-input>
    </el-form-item>
 
     <el-form-item :label="'状态'||appLang['platform.app_app.category']" prop="status">
      <el-select v-model="entity.status" placeholder="select..." class="select" >
        <el-option v-for="item in getStaticCategory()" :key="item.code" :value="item.code" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="'单位'||appLang['platform.svc.gitRepo']" prop="unit">
      <el-input v-model="entity.unit" :placeholder="'请选择单位'||appLang['platform.svc.gitRepo']"></el-input>
    </el-form-item> 

    <el-form-item :label="'initialValue'||appLang['platform.svc.gitRepo']" prop="initialValue">
      <el-input v-model="entity.initialValue" :placeholder="'请选择分类'||appLang['platform.svc.gitRepo']"></el-input>
    </el-form-item> 

    <el-form-item :label="'备注'||appLang['platform.common.desc']" prop="note">
      <el-input type="textarea" :maxlength="descMaxLength" v-model="entity.note" :placeholder="'请备注'||appLang['platform.common.desc']"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import cookie from 'jw_common/cookie'
import staticData from 'jw_common/data'
import validate from './validate'

const CATEGORIES = [
  { code: "0", name: "草稿" },
  { code: "1", name: "使用中" },
  { code: "2", name: "废弃" }
]


const MAX_UPLOAD_COUNT = 3

let disabledUploadState = false

export default {
  props: ['entity' , 'isCategoryDisabled'],

  data() {
    // let { lang } = i18nService.getLanguageMap()
    let lang = i18nService.getOtherLanguageMap()

    disabledUploadState = false
    return {
      lock: false, //使previewList只初始化一次 

      appLang: lang,
      previewList: [],
      maxLength: staticData.inputMaxLength,
      descMaxLength: staticData.descMaxLength,
      action: `${Jw.gateway}/storage/common/upload`,

      rules: {
        department: [{ validator: validate.department, trigger: 'blur', required: true }],
        name: [{ validator: validate.name, trigger: 'blur', required: true }],
        showName: [{ validator: validate.showName, trigger: 'blur', required: true }],
        getWay: [{ message: lang['notEmpty'], trigger: 'blur', required: true }],
        bigClass: [{ required: true, message: lang['role-message-name'], trigger: 'blur'  }]
      }
    }
  },

  updated() {

    // this.initPreviewList()
  },

  methods: {

    initPreviewList() {
      let entity = this.entity
      let previews = []

      for(let i=1;i<4;i++) {
        
        if(!_.isEmpty(entity[`preview${i}`])) {
          previews.push({
            name: entity[`preview${i}`],
            servername: entity[`preview${i}`],
            url: this.getUploadedImgUrl(entity[`preview${i}`])
          })
        }
      }

      if(!this.lock && previews.length) {
        disabledUploadState = previews.length === MAX_UPLOAD_COUNT
        this.previewList = previews
        this.lock = true
      }
    },

    getUploadClass() {

      return {
        'upload-demo':true, 
        'upload-disabled': disabledUploadState
      }
    },

    getPreviewList() {

      return this.previewList
    },

    getToken() {
      
      return { token: cookie.getCookie('token') }
    },

    onIconUploadSuccess(res, file) {

      this.entity.icon = res.result["0"].servername
    },

    getUploadedImgUrl(name) {
      name = encodeURIComponent(name);
      return `${Jw.gateway}/storage/common/download?filename=${name}`;
    },

    getStaticCategory() {

      return CATEGORIES
    },

    onPreviewUploadSuccess(file) {

      this.previewList.push({
        name: file.result["0"].originName,
        servername: file.result["0"].servername,
        url: this.getUploadedImgUrl(file.result["0"].servername)
      })

      if (this.previewList.length === MAX_UPLOAD_COUNT) {
        disabledUploadState = true
      }
    },

    onPreviewUploadedRemove(file, fileList) {

      disabledUploadState = false
      this.previewList = _.extend ([],fileList)
    },

    validate() {

      return this.$refs.jwForm.validate()
    },

    onUploadValidate(file) {
      if(_.isString(file)) {
        return /.jpg|.jpeg|.png|.gif/.test(file)
      }

      let isImg = /^image/.test(file.type);
      let isLt500KB = file.size / 1024 < 500;

      if (!isImg) {

        this.$message.error("只能上传图片!");
        return false
      }

      if (!isLt500KB) {

        this.$message.error("上传头像图片大小不能超过 500KB!");
        return false
      }

      return true
    }
  }
};
</script>
<style lang="less">
// @import "../../../assets/css/variable.less";

.app-base-wrapper {
  width: 60%;
}

.upload-disabled {

  .el-upload,
  .el-upload__tip {
    visibility: hidden; //visibility 
  }
}

.el-upload__tip {
  padding-left: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  vertical-align: top;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px!important;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
 