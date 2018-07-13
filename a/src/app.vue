
<template>
  <div id="app">
    <jw-header :userData="user" :title="title" :docUrl="docUrl" @on-language-change="onLanguageChange"/>
    <div class="jw-container">
      <jw-aside
        ref="jwAside"
        :refreshTag="asideRefreshTag"
        :asideWidth="adjustAsideWidth()"
        v-on:on-aside-select="onAsideSelection"
        v-on:on-collapse="onAsideCollapse"
      />
      <div class="jw-main" :style="{ 'margin-left': mainMarginLeftWidth() }">
        <transition name="fade" mode="out-in" appear>
          <router-view :user="user" @on-refresh="onRefresh"></router-view>
        </transition>
      </div>
    </div>
    <footer class="jw-footer">{{footerTxt}}</footer>
  </div>
</template>

<script>
import JwHeader from "jw_components/business/header/index"
import JwAside from "jw_components/business/aside"

import i18nService from "jw_services/i18n/index"
import userModel from "jw_models/user"
import util from "jw_common/util"

import jwConfig from "jw_config"

const ENGLIST_ASIDE_WIDTH = "16.428rem" //230px
const CHINESE_ASIDE_WIDTH = "13rem" //182px
const MAIN_MARGIN_LEFT = "4.642rem" //65px

let defaultProps = {
  children: "children",
  label: "name"
};

export default {
  name: "app",
  data() {

    return {
      footerTxt: jwConfig.footerTxt,
      title: jwConfig.headerTitle,
      docUrl: jwConfig.docUrl,
      isCollapse: false,
      user: {}
    }
  },

  components: {
    "jw-header": JwHeader,
    "jw-aside": JwAside
  },

  created() {
    
    this.fetchUserInfo()
    this.asideRefreshTag = {}
  },

  methods: {
    onRefresh(type) {

      if(type === 'refresh-user') {
        this.fetchUserInfo()
      }else if(type === 'refresh-page') {
        this.refreshPage()
      }else if(type === 'refresh-aside') {
        this.refreshAside()
      }
    },

    onLanguageChange() {

      this.refreshPage()
    },

    refreshPage() {

      //仅仅为了触发页面模块重绘
      this.user = _.clone(this.user)
    },

    refreshAside() {

      this.asideRefreshTag = {}
    },

    onAsideSelection(key,pathKey) {

      this.$router.push({ path: key })
    },

    onAsideCollapse(event) {
      
      this.isCollapse = event.collapse
      this.refreshPage()
    },

    fetchUserInfo() {
      userModel
        .execute()
        .then(currentUser => {
          this.user = currentUser
        })
        .catch(() => {

          this.networkErrorHandler()
        })
    },

    networkErrorHandler() {
      let lang = i18nService.getOtherLanguageMap()

      this.$alert(lang['newworkFail'],lang['prompt']).then(()=>{

        this.fetchUserInfo()
      })
    },

    //根据不同的语言，设置不同Aside宽度
    adjustAsideWidth() {
      let selectedCode = i18nService.getSelectedLanguageCode()

      if (selectedCode.indexOf("zh-") > -1) {
        return CHINESE_ASIDE_WIDTH;
      }

      return ENGLIST_ASIDE_WIDTH;
    },

    mainMarginLeftWidth() {
      if (this.isCollapse) {
        return MAIN_MARGIN_LEFT;
      }

      return this.adjustAsideWidth();
    }
  }
};
</script>

<style lang="less">
@import "assets/css/variable.less";

.jw-container {
  height: 100%;
  width: 100%;
  padding-top: @header-height;
  padding-bottom: @footer-height;
  box-sizing: border-box;
  position: relative;
  min-width: 700px;
}

.jw-footer {
  background: #32323a;
  padding: @jw5px 0;
  font-size: @font-small;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: lightgray;

  height: 1rem;
  line-height: 1rem;
}

.jw-main {
  position: relative;
  display: block;
  height: 100%;
  overflow-y: auto;
  background: #eee;
  box-sizing: border-box;
  padding: 15px;
  overflow-x: hidden;

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
