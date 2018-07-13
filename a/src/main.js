/**
 * 系统入口
 * 
 * @author gill
 * @date 2018-05-09
 */

window.Promise = window.Promise || Promise

import _ from 'lodash'
import Vue from 'vue'
import Router from 'vue-router'

import injectElementUi from 'jw_common/inject-element-ui'
Vue.use(Router)
Jw.Vue = Vue
injectElementUi(Vue)

import util from 'jw_common/util'

import 'jw_assets/css/base.css'

import App from './app.vue'
import authCheck from 'jw_services/access-auth'
import i18nService from 'jw_services/i18n/index'
import systemRoutes from './jw.router.js'

//const DOMAIN = "jwis.cn";

(function () {
  
  //拉取多语言
  let fetchi18nLanguage = ()=>{
    i18nService
    .initLanguage()
    .then((data)=>{

      createView(data)
    })
    .catch(()=>{

      networkErrorHandler()
    })
  }
  
  //创建视图
  let createView = (data)=>{
    let router = new Router({ routes: systemRoutes })

    Jw._main_ = new Vue({
      el: '#app',
      template: '<App />',
      components: { App },
      router,
      data: { 
        langs: data.lang,
        menu: data.menu
      }
    })
  }

  let networkErrorHandler = ()=>{
    let lang = i18nService.getOtherLanguageMap()

    Vue.prototype.$alert(lang['newworkFail'],lang['prompt']).then(()=>{

      fetchi18nLanguage()
    })
  }

  Jw.start = ()=>{
    let authChecked = authCheck.initAuth();

    if(_.isString(Jw.__domain__) && Jw.__domain__.length) {
      document.domain = Jw.__domain__
    }

    if(authChecked) {
      
      authChecked
        .then(()=>{
  
          fetchi18nLanguage()
        })
        .catch(()=>{
          
          util.jumpToLogin()
        })
    }
  }
})()