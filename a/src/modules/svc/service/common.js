/**
 * 公共资源模块
 */

import publicWidget from './public'
import utils from 'jw_common/util'
import i18nService from 'jw_services/i18n/index'

export default {
  name: 'common',
  mixins: [ publicWidget ],

  methods: {

    getModlueTitle() {
      let { lang } = i18nService.getLanguageMap()

      if(!utils.isIE9()) {
        return null
      }

      return lang["platform.svc.common"] + ' / ' + lang["platform.svc.commonDesc"]
    },

    getCategory() {

      return "common"
    }
  }
}