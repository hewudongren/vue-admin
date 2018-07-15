/**
 * 公共资源模块
 */

<template>
<div class="auth-wrapper">
  <JwTableControl :class="{ 'empty-collapse-header':!collapseData.length }" :title="getModlueTitle()" :buttons="getTableControl()" @on-header-button="onModuleCreation"/>
  <el-collapse v-show="collapseData.length">
    <el-collapse-item v-for="(item,j) in collapseData" :key="j" :title="item.collapseName" :name="item.collapseName">
    <table style="width: 100%" class="auth-table" cellspacing="0">
      <tr>
        <th>Name</th>
        <th>Url</th>
        <th>Method</th>
        <th>Description</th>
        <th style="width: 50px;"><i class="el-icon-circle-plus-outline" @click="add(item.collapseName)"></i></th>
      </tr>
      <tr v-for="(t ,i) in item.list" :key="i">
        <td><el-input v-model="t.name"></el-input></td>
        <td><el-input v-model="t.urlRegex"></el-input></td>
        <td>
          <el-select v-model="t.method" placeholder="请选择">
            <el-option value="GET"></el-option>
            <el-option value="POST"></el-option>
            <el-option value="DELETE"></el-option>
            <el-option value="PUT"></el-option>
            <el-option value="*" label="ALL"></el-option>
          </el-select>
        </td>
        <td><el-input v-model="t.desc"></el-input></td>
        <td><i @click="destroy(t)" class="el-icon-delete"></i></td>
      </tr>
    </table>
    </el-collapse-item>
  </el-collapse>
  <jw-dialog ref="dialog" />
</div>
</template>

<script>
import JwTableControl from 'jw_components/table/control-header'
import JwDialog from "jw_components/dialog"
import util from "jw_common/util"

import i18nService from "jw_services/i18n/index";

const CATEGORY = "auth"
const COLLAPSE_ITEM = {
  desc: '',
  name: '',
  method: '',
  category: CATEGORY
  //urlRegex: ''
}

export default {
  name: "auth",
  props: ["serviceEntity"],

  data() {
    let { lang } = i18nService.getLanguageMap()

    return {
      btnTxt: lang["platform.common.add"],
      apis: this.serviceEntity.apis
    }
  },

  computed: {

    collapseData() {
      let collapses = []
      let { lang } = i18nService.getLanguageMap()

      this.btnTxt = lang["platform.common.add"]
      _.each(this.apis, api => {
        if(api.category === CATEGORY) {
          let collapseName = api.urlRegex.replace(/[^/]+$/, "")
          let exist = _.find(collapses,x => x.collapseName == collapseName)
  
          exist ? exist.list.push(api):collapses.push({ collapseName, list: [api] })
        }
      });

      return collapses
    }
  },

  components: {
    "jw-dialog": JwDialog,
    JwTableControl
  },

  methods: {

    getModlueTitle() {
      let { lang } = i18nService.getLanguageMap()

      if(!util.isIE9()) {
        return null
      }

      return lang["platform.svc.auth"] + ' / ' + lang["platform.svc.authDesc"]
    },

    getTableControl() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        icon: 'el-icon-plus',
        type: 'add',
        txt: lang['platform.common.add']
      }]
    },

    validate() {

      return null    //success
    },
    
    showDialog() {
      let dialog = this.$refs.dialog
      let options = {
        title: 'Add Module',
        list: [{ name: 'Module Name', prop: 'urlRegex' }],
        form: { urlRegex: '' }
      }

      dialog
      .show(options)
      .then((data)=>{
        
        this.add(data.urlRegex + '/*')
      })
      .catch(()=>{})
    },

    destroy(row) {
      let apiIndex = _.findIndex(this.apis,(api)=>{ return api === row })

      this.apis.splice(apiIndex, 1)
    },

    add(collapseName) {

      this.apis.push(_.extend({urlRegex: collapseName },COLLAPSE_ITEM))
    },

    onModuleCreation() {
      
      this.showDialog()
    }
  }
};
</script>
<style lang="less">
@import "../../../assets/css/variable.less";

.ie-fix {
  .panel-title {
    font-size: 1rem;
  }
}

.empty-collapse-header {
  .right {
    float: none;
    text-align: center;
  }

  .el-button {
    padding: 7px 50px;
  }
}

.auth-wrapper {
  .el-collapse {
    width: 100%;
  }

  .control-header {
    padding-top: 0.714rem;
    border-top: 1px solid #c4c6cc;
    border-bottom: #eee;
  }

  .auth-table {
    border-top: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    width: 100%;

    .el-input__inner {
      height: 2.5rem;
      line-height: 2.5rem;
    }
  }

  .auth-table th {
    background: #eee;
    line-height: 42px;
  }

  .auth-table td {
    padding: @jw10px @jw5px;
    border-bottom: 1px solid #dcdfe6;
    text-align: center;
  }

  .auth-table tr:last-child td {
    border: none;
  }

  .auth-table .el-select {
    width: 100%;
  }
}
</style>
