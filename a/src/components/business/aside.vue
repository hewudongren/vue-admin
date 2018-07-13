/**
 *页面左侧导航栏
 *
 *@author gill
 *@date 2018-05-02
 */

<template>
  <div class="jw-aside" :style="toAsideWidth()">
    <el-menu
      unique-opened
      background-color="#32323a"
      active-text-color="#ffd04b"
      text-color="#fff"
      :collapse="isCollapse"
      :default-active="toActiveItem()"
      @select="onAsideSelection">
      <el-submenu
        v-for="menu in menus"
        v-if="menu.children"
        :key="menu.code"
        :index="menu.code"
        v-show="menu.isDisplay">
        <template slot="title">
          <i :class="menu.icon + ' icon first-icon-fix'"></i><span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item
          v-for="submenu in menu.children"
          :index="submenu.code"
          :key="submenu.code"
          v-show="submenu.isDisplay">
          <i :class="submenu.icon + ' icon sub-icon-fix'"></i><span>{{submenu.name}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="menu.code" :key="menu.code" v-show="menu.isDisplay">
        <i :class="menu.icon + ' icon first-icon-fix'"></i><span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
    <div v-show="menus.length" class="aside-collapse" v-on:click="onAsideCollapse">
      <i :class="{ 'icon-right': isCollapse, 'icon-back': !isCollapse }"/>
    </div>
  </div>
</template>

<script>
import i18nService from "jw_services/i18n/index"
import userMenuModel from "jw_models/aside"
let currentActive = ""

export default {
  name: "jw-aside",

  props: ["asideWidth","refreshTag"],

  data() {
    return {
      isCollapse: false,
      menus: []
    };
  },

  created() {

    this.merageMenus()
  },

  mounted() {
    const MIN_WIDTH = 850
    const MIN_COUNT = 5
    let oldWinWidth = 0
    let resizeCount = 0

    window.addEventListener("resize" ,(event)=>{
      let nowWidth = window.innerWidth

      if(oldWinWidth===0) {
        oldWinWidth = nowWidth
      }else{
        if(nowWidth<oldWinWidth) {
          oldWinWidth = nowWidth
          resizeCount++

          if(resizeCount>MIN_COUNT && !this.isCollapse && nowWidth<MIN_WIDTH) {
            oldWinWidth = 0
            resizeCount = 0
            this.onAsideCollapse()
          }
        }else{
          oldWinWidth = 0
          resizeCount = 0
        }
      }
    }, false)
  },

  watch: {

    refreshTag() {

      this.menus = [].concat(this.menus)
    }
  },

  updated() {

    let menuList = userMenuModel.getResult()
    this.menus = this.fromatMenuData(menuList)
  },

  methods: {

    toActiveItem() {

      if(_.isEmpty(currentActive)) {

        currentActive = i18nService.getI18nTitle().code
      }

      return currentActive;
    },

    clearActiveItem() {
      currentActive = ''
    },

    toAsideWidth() {
      if (this.isCollapse) {
        //收缩
        return {
          width: "auto",
          "overflow-x": "inherit"
        };
      }

      return { width: this.asideWidth };
    },

    onAsideCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit("on-collapse", { collapse: this.isCollapse })
    },

    onAsideSelection(code) {
      let path = null
      let children = []
      let menus = this.menus

      currentActive = code
      for(let i=0,len=this.menus.length;i<len;i++) {
        if(menus[i].code === code) {
          path = menus[i].path
          break
        }

        if(_.isArray(menus[i].children)) {
          children = menus[i].children

          for(let j=0,jlen=children.length;j<jlen;j++) {
            if(children[j].code === code) {
              path = children[j].path
              break
            }
          }
        }

        if(_.isString(path)) {
          break
        }
      }

      this.$emit("on-aside-select", path)
    },

    merageMenus() {
      let { menu: menus } = i18nService.getLanguageMap();

      userMenuModel
        .execute()
        .then(menuList => {

          this.menus = this.fromatMenuData(menuList)
        })
        .catch(() => {

          this.menusNetworkErrorHandler()
        });
    },

    fromatMenuData(menuList) {
      let { menu: menus } = i18nService.getLanguageMap()

      _.each(menus, m => {
        m.isDisplay = !!_.find(menuList, menu => {
          return menu.code === m.code;
        });
        //m.code == "home" && (m.isDisplay = true);

        if (m.children) {
          _.each(m.children, c => {
            c.isDisplay = !!_.find(menuList, menu => {
              return menu.code === c.code
            })
          })
        }
      })

      return menus
    },

    menusNetworkErrorHandler() {
      let lang = i18nService.getOtherLanguageMap();

      this.$alert(lang["newworkFail"], lang["prompt"]).then(() => {
        this.merageMenus();
      });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/variable.less";

.el-menu--vertical {
  .icon {
    color: #fff;
    margin-right: 10px;
  }
}

.jw-aside {
  position: absolute;
  background-color: #32323a;
  top: @header-height;
  bottom: 1.714rem;
  left: 0;
  overflow-x: hidden;

  .el-menu-item, .el-submenu__title {
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: @font-large;
  }

  .icon {
    color: #fff;
    font-size: 1.5rem;
    margin-right: 10px;
  }

  .horizontal-collapse-transition {
    .el-menu-item,
    .el-submenu__title {
      span {
        visibility: hidden;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }

    .sub-icon-fix {
      display: none;
    }
  }

  .first-icon-fix {
    vertical-align: middle;
    width: 1.5rem;
    display: inline-block;
    text-align: center;
  }

  .aside-collapse {
    position: relative;
    border-top: 1px solid #909399;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 2rem;

    i {
      position: absolute;
      color: #fff;
      top: -15px;
      left: 50%;
      margin-left: -15px;
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      border-radius: 1rem;
      background-color: #32323a;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-submenu__icon-arrow {
    font-size: inherit;
    color: #fff;
  }
}
</style>
