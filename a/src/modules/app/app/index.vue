<template>
  <div class="panel app" v-loading="loading">
    <jw-table-control
      :title="getTitle()"
      :buttons="getHeaderControl()"
      @on-header-button="onHeaderButtonClick"
    />
    <jw-table
      ref="jwTable"
      :data="rows"
      :isSelection=true
      :isRowCheckBox=true
      :pageSize="pageSize"
      :showPagination="true"
      :totalCount="totalCount"
      :header="getTableHeader()"
      :currentPage="currentPage"
      :opsList="getTableOperateList()"
      @on-page-change="onPageChange"
      @on-operate-click="onOperateClick">
    </jw-table>
    <JwDialog ref="detailDialog" top="50px" :readOnly="true" class="app-detail-dialog"/>
  </div>
</template>

<script>
  import util from 'jw_common/util'
  import staticData from 'jw_common/data'
  import i18nService from 'jw_services/i18n/index'

  import JwDialog from 'jw_components/dialog'
  import JwTable from 'jw_components/table/table'
  import JwTableHeaderControl from 'jw_components/table/control-header'

  import appStore from 'jw_stores/common'
  import getAppConfig from './app-config.js'
  import tableModel from 'jw_models/app/app-read'
  import tableRowDeleteModel from 'jw_models/app/recod-delete'

  let defaultPageIndex = 1
  let loadingTimerId = 0

  const DEFAULT_ROW = {
    name: '--',
    key: '--',
    secret: '--',
    appkey: '--',
    creatorName: '--'
  }

  export default {
    data() {

      return {
        totalCount: 0,
        loading: true,
        rows: [ DEFAULT_ROW ],
        currentPage: defaultPageIndex,
        pageSize: staticData.tablePageSize
      }
    },

    created() {

      this.fetch()
    },

    components: {
      JwDialog,
      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl
    },

    methods: {

      getTableOperateList() {
        let otherLang = i18nService.getOtherLanguageMap()
        let { lang } = i18nService.getLanguageMap()

        return {
          list: [{
            icon: 'el-icon-delete',
            display: otherLang.delete,
            type: 'delete' 
          },{
            icon: 'icon-list',
            display: lang['platform.common.detail'],
            type: 'detail'
          },{
            icon: 'el-icon-edit',
            display: lang['platform.app_app.editApp'],
            type: 'edit'
          },{
            icon: 'icon-user-setting',
            display: lang['platform.app_app.permission'],
            type: 'operateConf'
          },{
            icon: 'icon-cloud',
            display: lang['platform.app_app.auth'],
            type: 'microServices'
          },{
            icon: 'icon-selected-user',
            display: lang['platform.app_role.role'],
            type: 'role'
          }]
        }
      },

      getTableHeader() {

        return getAppConfig().tableHeader
      },

      getHeaderControl() {
        
        return getAppConfig().tableHeaderControl
      },

      showLoading() {

        clearTimeout(loadingTimerId)
        this.loading = true
      },

      hideLoading(is) {
        if(is) {
          this.loading = false
        }else{
          loadingTimerId = setTimeout(()=>{ this.loading = false },500)
        }
      },

      getTitle() {

        return i18nService.getI18nTitle().title
      },

      onPageChange(pageCount) {

        this.showLoading()
        tableModel.setPageIndex(pageCount)
        this.currentPage = pageCount
        tableModel
          .execute()
          .then((data)=>{
            this.rows = data.rows
            this.hideLoading()
          })
          .catch(()=>{
            let lang = i18nService.getOtherLanguageMap()
            this.hideLoading(true)
            this.$warning(lang['loadingFail'])
          })
      },

      onHeaderButtonClick(buttonClicked) {

        if(buttonClicked.type === 'add') {
          this.add()
        }else if(buttonClicked.type === 'export'){
          this.export()
        }
      },

      onOperateClick(menuItem, row) {
        
        if(menuItem.type === 'edit') {
          this.edit(row)
        }

        if(menuItem.type === 'delete') {
          this.delete(row)
        }

        if(menuItem.type === 'microServices') {
          this.goServiceAuthorize(row)
        }

        if(menuItem.type === 'operateConf') {
          this.goOperateConf(row)
        }

        if(menuItem.type === 'role') {
          this.goRole(row)
        }

        if(menuItem.type === 'detail') {
          this.showDetailCard(row)
        }
      },

      showDetailCard(row) {
        let { lang } = i18nService.getLanguageMap()

        this.$refs.detailDialog.show({
          list:[{
            name: lang['platform.common.creatorName'],
            prop: 'creatorName'
          },{
            name: lang['platform.app_app.name'],
            prop: 'name'
          },{
            name: lang['platform.common.creatorDate'],
            prop: 'createdDate'
          },{
            name: lang['platform.app_app.creatorId'],
            prop: 'creatorId'
          },{
            name: lang['platform.app_app.secret'],
            prop: 'secret'
          },{
            name: lang['platform.app_app.key'],
            prop: 'key'
          },{
            name: lang['platform.app_app.docCenter'],
            prop: 'docCenter'
          },{
            name: lang['platform.svc.gitRepo'],
            prop: 'gitRepo'
          },{
            name: lang['platform.app_app.icon'],
            prop: 'icon'
          },{
            name: lang['platform.app_app.category'],
            prop: 'category'
          },{
            name: lang['platform.app_app.version'],
            prop: 'version'
          },{
            name: lang['platform.common.desc'],
            prop: 'description'
          },{
            name: lang['platform.app_app.keywords'],
            prop: 'keywords'
          },{
            name: lang['platform.app_app.videoDemo'],
            prop: 'videoDemo'
          }],
          form: row
        })
      },

      fetch () {
        
        this.showLoading()
        tableModel.setPageIndex(defaultPageIndex)
        tableModel
          .execute()
          .then((data)=>{
    
            this.totalCount = data.count
            this.rows = data.rows
            this.hideLoading()
          })
          .catch(()=>{
            let lang = i18nService.getOtherLanguageMap()

            this.totalCount = 0
            this.rows = []
            this.hideLoading(true)

            this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{

              this.fetch()
            })
        })
      },

      add() {

        this.$router.push({path: '/app/edit/0'})
      },

      edit(row) {

        appStore.set('row-data',row)
        this.$router.push({path: `/app/edit/${row.id}`})
      },

      goServiceAuthorize(row) {

        appStore.set('row-data',row)
        this.$router.push({ path: `/app/service/${row.id}` })
      },

      goOperateConf(row) {
        appStore.set('row-data',row)
        this.$router.push({ path: `/app/permission/edit/${row.id}` })
      },

      goRole(row) {
        appStore.set('row-data',row)
        this.$router.push({path: `/app/role/index`})
      },

      delete(row) {
        let lang = i18nService.getOtherLanguageMap()
        let deleteRecodFromServer = (row)=>{

          tableRowDeleteModel.setParam(row)
          tableRowDeleteModel
            .execute()
            .then(()=>{
              let index = _.findIndex(this.rows,(current)=>{ return current === row })
              
              this.rows.splice(index,1)
              this.$success(lang['deleteRecodSuccess'])
            })
            .catch(()=>{
              this.$error(lang['deleteRecodFail'])
            })
        }
        
        this.$alert(lang['deleteWarning'], 'Warning').then(()=>{

          deleteRecodFromServer(row)
        })
        .catch(()=>{})
      },

      getSelectionIds() {
        let jwTable = this.$refs.jwTable
        let selections = jwTable.getSelection()

        return _.map(selections,(select)=>{
          return select.id
        })
      },

      getAllIds() {

        return _.map(this.rows,(row)=>{
          return row.id
        })
      },

      export() {
        let selections = this.getSelectionIds()
        let lang = i18nService.getOtherLanguageMap()

        if(selections.length===0) {
          return this.$error(lang['recordSelected'])
        }

        util.download(`${Jw.gateway}/platform/app/app/export`,{ appIds: selections.join(',') })
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/css/variable.less";

  .app-icon-wrapper {
    //width: 80px;
    height: 80px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .app-detail-dialog {

    .el-form {
      margin-top: 20px;
      max-height: 560px;
      overflow-y: auto;
    }

    .el-form-item {
      margin-bottom: 0;
      //border-bottom: 1px dashed #eee;
    }

    .el-dialog__footer {
      display: none;
    }
    .el-dialog__header {
      padding: 0;
    }
  }

  .app {

    .el-icon-delete {
      margin-left: @jw5px;
    }
  }
</style>
