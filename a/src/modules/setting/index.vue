<template>
  <div class="panel setting-wrapper">
    <jw-panel-title @back="back" :back="true" :title="getTitle()" />
    <div class="setting-panel">
      <div class="user-box">
        <el-upload :headers="customHeader" :action="uploadUrl" accept=".jpg,.png,.jpeg,.gif" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-loading="loadingAvatar">
          <img class="avatar" :src="avatar" v-loading="true" />
          <a href="javascript:void(0);">{{getAvatorTxt()}}</a>
        </el-upload>
      </div> 
      <div class="user-info-list">
        <div class="info-box" v-for="(item,i) in userInfoData" :key="i">
          <span>{{item.label}}:</span>
          <span v-html="item.value"></span>
          <span class="right btn-wrapper">
            <el-button v-if="item.showBut" @click="edit(item.key)">{{getModifyTxt()}}</el-button>
          </span>
        </div>
      </div>
      <el-dialog :title="formTitle" :visible.sync="dialogTableVisible" size="tiny" class="dialog-box">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item v-for="(item,j) in formList" :key="j" :label="item.label" :prop="item.key">
            <el-input :type="item.type" v-model="form[item.key]" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="buttons">
          <el-button type="primary" @click="save">{{getConfirmTxt()}}</el-button>
          <el-button @click="dialogTableVisible=false">{{getCancelTxt()}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import cookieParser from "jw_common/cookie.js";
import getValidateConfig from "jw_modules/setting/validate";
import profileModify from "jw_models/setting/modify-profile";
import passwordModify from "jw_models/setting/modify-password";
import i18nService from "jw_services/i18n/index";
import PanelTitle from "jw_components/panel-title";

export default {
  data() {
    return {
      token: cookieParser.getAuth(),
      dialogTableVisible: false,
      loadingAvatar: false,
      userInfoData: [],
      formTitle: "",
      formType: "",
      formList: [],
      rules: {},
      form: {}
    };
  },

  props: ["user"],

  components: {
    'jw-panel-title': PanelTitle
  },

  created() {

    this.updateUserInfo();
  },

  methods: {
    getConfirmTxt() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.common.ok']
    },

    getCancelTxt() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.common.cancel']
    },

    getAvatorTxt() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.user_setting.modifyAvatar']
    },

    getModifyTxt() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.common.modify']
    },

    getTitle() {
      let lang = i18nService.getOtherLanguageMap()

      return lang.setting
    },

    back() {

      this.$emit('on-refresh','refresh-aside')
      this.$router.back()
    },

    handleAvatarSuccess(res, file) {
      let imageUrl = res.result[0].servername;
      let lang = i18nService.getOtherLanguageMap();

      this.loadingAvatar = true;
      profileModify
        .execute({ avatar: imageUrl })
        .then(() => {
          this.$warning(lang["operateSuccess"]);
          this.$emit("on-refresh",'refresh-user');
          this.loadingAvatar = false;
        })
        .catch(() => {
          this.$warning(lang["operateError"]);
          this.loadingAvatar = false;
        });
    },

    beforeAvatarUpload(file) {
      if (_.isString(file)) {
        if (/.jpeg|.png|.jpg|.jpeg/.test(file)) {
          return true;
        } else {
          this.$warning("上传头像图片只能是 JPG或PNG 格式!");
          return false;
        }
      }

      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!(isJPG || isPNG)) {
        this.$warning("上传头像图片只能是 JPG或PNG 格式!");
      }

      if (!isLt2M) {
        this.$warning("上传头像图片大小不能超过 2MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },

    updateUserInfo() {
      let { lang } = i18nService.getLanguageMap()
      let setting = lang['platform.common.setted']

      _.extend(this.form, this.user)
      if (this.user.account) {
        this.userInfoData = [
          {
            label: lang['platform.common.userName'],
            key: "account",
            value: this.user["account"],
            showBut: false
          },{
            label: lang['platform.common.password'],
            key: "password",
            value: `<i class='tips'>${setting}</i>`,
            showBut: true
          },{
            label: lang['platform.user_setting.name'],
            key: "name",
            value: this.user["name"],
            showBut: true
          },{
            label: lang['platform.app_user.mobile'],
            key: "mobile",
            value: this.user["mobile"],
            showBut: true
          },{
            label: lang['platform.app_user.email'],
            key: "email",
            value: this.user["email"],
            showBut: true
          }     
        ];        
      }    
    },

    edit(k) {
      let { lang } = i18nService.getLanguageMap()
      let item = _.find(this.userInfoData, userItem => {
        return userItem.key === k
      })

      this.formType = k
      this.rules = getValidateConfig(k).rules
      this.formList = getValidateConfig(k).formList
      this.formTitle = `${lang['platform.common.modify']} ${item.label}`

      if (k === "password") {
        this.rules = _.extend(
          {
            password: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("请输入密码"));
                  } else {
                    if (this.form.checkPass !== "") {
                      this.$refs.form.validateField("checkPass");
                    }
                    callback();
                  }
                },
                trigger: "blur"
              }
            ],
            checkPass: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (value === "") {
                    callback(new Error("请再次输入密码"));
                  } else if (value !== this.form.password) {
                    callback(new Error("两次输入密码不一致!"));
                  } else {
                    callback();
                  }
                },
                trigger: "blur"
              }
            ]
          },
          getValidateConfig(k).rules
        );
      }

      this.dialogTableVisible = true;
    },

    save() {
      let lang = i18nService.getOtherLanguageMap();

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formType === "password") {
            let passw = {
              oldPassword: this.form.passwordOld,
              newPassword: this.form.password
            };

            passwordModify
              .execute(passw)
              .then(() => {
                this.$emit("on-refresh",'refresh-user');
                this.dialogTableVisible = false;
                this.$success(lang["operateSuccess"]);
              })
              .catch(data => {
                this.$error(data.message);
              });
          } else {
            let profile = {    
              [this.formType]: this.form[this.formType]
            };

            profileModify
              .execute(profile)
              .then(() => {
                this.$emit("on-refresh",'refresh-user');
                this.dialogTableVisible = false;
                this.$success(lang["operateSuccess"]);
              })
              .catch((error) => {
                this.$error(lang["operateError"]);
              });
          }
        }
      });
    }
  },
  computed: {
    customHeader() {
      return { token: this.token };
    },

    uploadUrl() {
      return `${Jw.gateway}/storage/common/upload?token=${this.token}`;
    },

    avatar() {
      let file;

      if (this.user.avatar) {
        file = `${Jw.gateway}/storage/common/download?filename=${encodeURIComponent(this.user.avatar)}`;
      } else {
        let fileName = parseInt(this.user.gender)
          ? "avatar_male.png"
          : "avatar_female.png";

        file = require("../../assets/img/" + fileName);
      }

      return file;
    }
  },
  watch: {
    user() {
      this.updateUserInfo();
    },

    dialogTableVisible() {
      if (!this.dialogTableVisible) {
        this.$refs.form.clearValidate();
      }
    }
  }
};
</script>
<style lang="less">

.setting-wrapper {

  .btn-wrapper {

    .el-button {
      width: 100%;
    }
  }

  .user-box {
    padding: 50px 0;
    width: 180px;
    text-align: left;
    display: inline-block;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
    }

    a {
      display: inline-block;
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f5f5f5;
      border-radius: 4px;
      text-decoration: none;
      font-size: 14px;
      color: #9b9b9b;
      margin-top: 20px;
    }
  }

  .info-box {
    height: 41px;
    display: flex;
    padding: 15px 0;
    line-height: 41px;
    border-bottom: 1px solid #ebeef5;

    .tips {
      font-style: normal;
      color: #7ed321;
    }

    span:first-child {
      color: #909399;
      width: 100px;
    }

    span:nth-child(2) {
      color: #606266;
      flex: 1;
    }

    .btn-wrapper {
      width: 120px;     
    }
  }

  .user-info-list {
    display: inline-block;
    vertical-align: top;
    width: calc(~'100% - 185px');
  }

  .buttons {
    text-align: right;
  }
}
</style>