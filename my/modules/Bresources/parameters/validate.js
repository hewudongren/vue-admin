//配置公共验证规则
import i18nService from 'jw_services/i18n/index'


export default {

  department(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-name']))
    }

    callback()
  },

  name(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['notEmpty']))
    }

    callback()
  },

  showName(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['notEmpty']))
    }

    callback()
  },

  code(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-code']))
    }

    callback()
  },

  desc(rule, value, callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-desc']))
    }

    callback()
  },

  appId(rule,value,callback) {
    let lang = i18nService.getOtherLanguageMap()

    if(_.isEmpty(value)) {

      return callback(new Error(lang['role-message-appId']))
    }

    callback()
  }
}