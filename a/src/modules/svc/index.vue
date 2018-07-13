<template>
  <div class="panel">
    <jw-control
      :title="getTitle()"
      :buttons="getControlConfig()"
      @on-upload-success="onImportSuccess"
      @on-header-button="onHeaderButtonClick"
    />
    <jw-table
      ref="table"
      v-loading="loading"
      :currentPage = "currentPage"
      :header="getTableHeader()"
      :totalCount="totalCount"
      :showPagination=true
      :pageSize="pageSize"
      :isRowCheckBox=true
      :opsList="getTableOperateList()"
      :isSelection=true
      :data="rows"
      @on-operate-click="onOperateClick"
      @on-page-change="onPageIndexChange"/>
    <JwDialog ref="detailDialog" top="50px" :readOnly="true" class="app-detail-dialog"/>
  </div>
</template>

<script>
import JwTableControl from 'jw_components/table/control-header'
import JwTable from 'jw_components/table/table'
import JwDialog from 'jw_components/dialog'

import serviceDeleteModel from 'jw_models/svc/service-delete'
import serviceReadModel from 'jw_models/svc/service-read'
import i18nService from 'jw_services/i18n/index'
import baseStore from 'jw_stores/common'
import staticData from 'jw_common/data'
import util from 'jw_common/util'

function imgLoaderFailHandler(event) {
  let target = event.target

  target.style.display = 'none';
}

let loadingTimerId = 0
const DEFAULT_ROW = {
  basepath: '---',
  name: '---',
  endpoint: '---',
  creatorName: '---'
}

export default {
  data() {

    return {
      pageSize: staticData.tablePageSize,
      currentPage: 1,
      totalCount: 0,
      loading: true,
      rows: [DEFAULT_ROW]
    }
  },

  created() {
    
    this.fetch()
  },

  components: {
    'jw-control': JwTableControl,
    'jw-table': JwTable,
    JwDialog
  },

  methods: {
    getTableOperateList() {
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()

      return {
        list:[{
          display: lang['platform.common.detail'],
          type: 'detail',
          icon: 'icon-list'
        },{
          display: otherLang.edit,
          type: 'edit',
          icon: 'el-icon-edit'
        },{
          display: otherLang.delete,
          type: 'delete',
          icon: 'el-icon-delete'
        }]
      }
    },

    getSelectionIds() {
      let rows = this.$refs.table.getSelection()

      return _.map(rows,(row)=>{
        return row.id
      })
    },

    // basepath:"workbench"
    // createdDate:"2018-04-26T12:05:07.000Z"
    // creatorId:"559c862e-42f5-11e8-842f-0ed5f89f718b"
    // creatorName:"陈志国"
    // desc:null
    // docIndex:null
    // endpoint:"http://localhost:5007"
    // gitRepo:null
    // icon:null
    // id:"0fc86900-494a-11e8-9390-ffcf85a5dee2"
    // isAuth:false
    // isValid:true
    // keywords:null
    // name:"workbench"
    
    showDetailBoard(row) {
      let { lang } = i18nService.getLanguageMap()

      this.$refs.detailDialog.show({
        list:[{
          name: lang['platform.common.creatorName'],
          prop: 'creatorName'
        },{
          name: lang['platform.app_app.name'],
          prop: 'name'
        },{
          name: 'ID',
          prop: 'id'
        },{
          name: lang['platform.common.creatorDate'],
          prop: 'createdDate'
        },{
          name: lang['platform.app_app.creatorId'],
          prop: 'creatorId'
        },{
          name: lang['platform.svc.gitRepo'],
          prop: 'gitRepo'
        },{
          name: lang['platform.svc.endpoint'],
          prop: 'endpoint'
        },{
          name: lang['platform.svc.basepath'],
          prop: 'basepath'
        },{
          name: lang['platform.app_app.docCenter'],
          prop: 'docIndex'
        },{
          name: lang['platform.common.desc'],
          prop: 'desc'
        },{
          name: lang['platform.app_app.keywords'],
          prop: 'keywords'
        },{
          name: lang['platform.app_app.icon'],
          prop: 'icon'
        }],
        form: row
      })
    },

    getAllIds() {
      
      return _.map(this.rows,(row)=>{
        return row.id
      })
    },
    
    onOperateClick(menuItem, row) {

      if(menuItem.type === 'edit') {
        this.edit(row)
      }

      if(menuItem.type === 'delete') {
        this.delete(row)
      }

      if(menuItem.type === 'detail') {
        this.showDetailBoard(row)
      }
    },

    getTableHeader() {
      let { lang } = i18nService.getLanguageMap()
      let otherLang = i18nService.getOtherLanguageMap()

      return [{
        prop: 'basepath',
        display: lang['platform.svc.basepath']   
      },{
        prop: 'name',
        display: lang['platform.svc.name']
      },{
        prop: 'endpoint',
        display: lang['platform.svc.endpoint']
      },{
        prop: 'creatorName',
        width: i18nService.isChinese()? 100 : 130,
        display: lang['platform.common.creatorName']
      },{
        prop: 'icon',
        width: '100',
        display: lang['platform.app_app.icon'],
        formatter: function(row,col,value) {
          let h = this.$createElement

          if(_.isEmpty(value)) {
            return null
          }

          value = encodeURIComponent(value)
          value = `${Jw.gateway}/storage/common/download?filename=${value}`
          return <div class="app-icon-wrapper"><img src={value} onError={imgLoaderFailHandler} /></div>
        }
      }]    
    },
    
    onHeaderButtonClick(btnType) {
      
      if(btnType.type === 'add') {
        this.$router.push({ path: "/service/edit/0" })
      }else if(btnType.type === 'export') {
        this.export()
      }
    },

    getControlConfig() {
      let { lang } = i18nService.getLanguageMap()

      return [{
        icon: 'el-icon-plus',
        type: 'add',
        txt: lang['platform.common.add']
      }, {
        type: 'import',
        uploadUrl: `${Jw.gateway}/platform/svc/service/import`,
        type: 'upload',
        txt: lang['platform.common.import']
      }, {
        type: 'export',
        txt: lang['platform.common.export']
      }]
    },

    getTitle() {

      return i18nService.getI18nTitle().title
    },

    fetch() {
      
      this.showLoading()
      serviceReadModel
      .execute(this.currentPage)
      .then((result)=>{
        
        this.totalCount = result.count
        this.rows = result.rows
        this.hideLoading()
      })
      .catch(()=>{
        let lang = i18nService.getOtherLanguageMap()

        this.hideLoading(true)
        this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{

          this.fetch()
        })
      })
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

    onPageIndexChange(pageIndex) {
      let lang = i18nService.getOtherLanguageMap()

      this.showLoading()
      serviceReadModel
      .execute(pageIndex)
      .then((result)=>{
        
        this.currentPage = pageIndex
        this.rows = result.rows
        this.hideLoading()
      })
      .catch(()=>{
          
        this.hideLoading(true)
        this.$error(lang['operateError'])
      })
    },

    edit(row) {

      baseStore.set('svc-row-data',row)
      this.$router.push({ path: `/service/edit/${row.id}` })
    },

    onImportSuccess() {
      let firstPageIndex = 1
      
      this.currentPage = firstPageIndex
      this.fetch()
    },

    export() {
      let ids = this.getSelectionIds()
      let lang = i18nService.getOtherLanguageMap()

      if (ids.length===0) {
        ids = this.getAllIds()
      }

      util.download(`${Jw.gateway}/platform/svc/service/export`,{svcIds: ids.join(",")})
    },

    delete(row) {
      let lang = i18nService.getOtherLanguageMap()

      this.$alert(lang['deleteWarning'], 'Warning', {
        showCancelButton: true,
        confirmButtonText: lang['confirm'],
        cancelButtonText: lang['cancel']
      })
      .then(()=>{
        
        return serviceDeleteModel.execute(row)
      })
      .then(()=>{
        let index = _.findIndex(this.rows,(current)=>{ return current.id === row.id })

        this.rows.splice(index,1)
      })
      .catch((error)=>{
        (error!=='cancel') && this.$error(lang['operateError'])    
      })
    }
  }
};
</script>
<style lang="less">
@import '../../assets/css/variable.less';

.app-edit {
  .el-icon-delete {
    margin-left: @jw5px;
  }
}
</style>

