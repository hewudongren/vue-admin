<template>
  <el-form ref="form" class="width-fix" :rules="rules" :model="entity" label-position="right" label-width="100px">
    <el-form-item prop="basepath" :label="lang['platform.svc.basepath']">
      <el-input v-model="entity.basepath" :maxlength="maxLength" :placeholder="lang['platform.svc.basepath']"></el-input>
    </el-form-item>
    <el-form-item prop="name" :label="lang['platform.svc.name']">
      <el-input v-model="entity.name" :maxlength="maxLength" :placeholder="lang['platform.svc.name']"></el-input>
    </el-form-item>
    <el-form-item prop="endpoint" :label="lang['platform.svc.endpoint']">
      <el-input v-model="entity.endpoint" :maxlength="maxLength" :placeholder="lang['platform.svc.endpoint']"></el-input>
    </el-form-item>
    <el-form-item prop="gitRepo" :label="lang['platform.svc.gitRepo']">
      <el-input v-model="entity.gitRepo" :maxlength="maxLength" :placeholder="lang['platform.svc.gitRepo']"></el-input>
    </el-form-item>
    <el-form-item prop="keywords" :label="lang['platform.app_app.keywords']">
      <el-input v-model="entity.keywords" :maxlength="maxLength" :placeholder="lang['platform.app_app.keywords']"></el-input>
    </el-form-item>
    <el-form-item prop="docIndex" :label="lang['platform.app_app.docCenter']">
      <el-input v-model="entity.docIndex" :maxlength="maxLength" :placeholder="lang['platform.app_app.docCenter']"></el-input>
    </el-form-item>
    <el-form-item :label="lang['platform.app_app.icon']">
      <el-upload
        class="avatar-uploader"
        accept="image/gif,image/jpeg,image/png,image/jpg"
        :action="action"
        :headers="getToken()"
        :show-file-list="false"
        :on-success="onIconUploadSuccess">
          <img v-if="entity.icon" :src="getUploadedImgUrl(entity.icon)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item prop="desc" :label="lang['platform.common.desc']">
      <el-input v-model="entity.desc" type="textarea" :maxlength="maxLength" :placeholder="lang['platform.common.desc']"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import i18nService from 'jw_services/i18n/index'
import staticData from 'jw_common/data'
import cookie from 'jw_common/cookie'

export default {
  props: { serviceEntity: Object },

  data() {
    let { lang } = i18nService.getLanguageMap()
    let otherLang = i18nService.getOtherLanguageMap()

    return {
      lang,
      entity: this.serviceEntity,
      maxLength: staticData.inputMaxLength,
      action: `${Jw.gateway}/storage/common/upload`,
      rules: {
        basepath: { required: true, message: otherLang.notEmpty },
        name: { required: true, message: otherLang.notEmpty },
        endpoint: { required: true, message: otherLang.notEmpty }
      }
    }
  },

  watch: {

    serviceEntity(newEntity) {
      this.entity = newEntity
    }
  },

  methods: {

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

    validate() {

      return this.$refs.form.validate()
    },
    
    getValue() {

      return this.entity
    }
  }
}
</script>