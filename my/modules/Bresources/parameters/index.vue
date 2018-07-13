<template>
  <div class="panel resource">
    <!-- 表头 -->
    <jw-table-control class="mgb" :title="getTitle()" :buttons="getHeaderControl()" @on-header-button="onHeaderButtonClick" />
    <div class="main">
      <!-- 搜索区 -->
      <el-row class="mgb">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">科室</span>
            <el-select @change="changeDepartment" v-model="department" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">状态</span>
            <el-select @change="changeStatus" v-model="status" placeholder="请选择">
              <el-option v-for="item in statusPptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8" class="toright">
          <div class="clearfix">
            <span class="name">创建时间</span>
            <el-date-picker style="width: calc(100% - 110px)" @change="changeTime" v-model="timeBucket" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="mgb">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">类型</span>
            <el-select @change="changeCcategory" v-model="bigClass" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">创建者</span>
            <el-input @input="inputCreator" style="width:217px" v-model="createBy" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8" class="toright">
          <div class="grid-content bg-purple">
            <span class="name">关键字 </span>
            <el-input @input="inputGxName" class="input" style="width: calc(100% - 110px)"  v-model="keyword" placeholder="创建人，名称，显示名称"></el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 状态去 -->
      <jw-table-control class="mgb" float="left" :buttons="getTableState()" @on-header-button="onHeaderButtonClick" />
      <!-- 主体 -->
      <jw-table 
      ref="jwTable" 
      :data="rows" 
      :isSelection=true 
      :isRowCheckBox=true 
      :isIndex=true 
      :pageSize="pageSize" 
      :showPagination="true"
      :totalCount="totalCount" 
      :header="getTableHeader()" 
      :currentPage="currentPage" 
      @onEite="onEite" 
      @onDelete='onDelete'
      @on-page-change="onPageChange"
      @on-row-click='onRowClick' 
      >
      </jw-table>
    </div>
    <jw-dialog ref="dialog" />

  </div>
</template>

<script>
  import JwTable from 'jw_components/table/table'
  import JwTableHeaderControl from 'jw_components/table/control-header'
  import JwDialog from "jw_components/dialog";

  import util from 'jw_common/util'
  import staticData from 'jw_common/data'
  import i18nService from 'jw_services/i18n/index'
  import appStore from 'jw_stores/common'
  import getAppConfig from './app-config.js'

  import getSearch from 'myfetch/processParameters/index.js'
  import getAdd from "myfetch/processParameters/add.js"
  import saveOrgModel from "myfetch/processParameters/save-org.js"
  import tableRowDeleteModel from 'myfetch/processParameters/row-delete'

  let defaultPageIndex = 1
  let loadingTimerId = 0

  const DEFAULT_ROW = {
    name: '--',
    showName: '--',
    department: '--',
    createBy: '--',
    createTime: '--'
  }

  export default {
    data() {
      return {
        department:'',
        status:'',
        timeBucket:'',//时间段
        bigClass:'',
        createBy:'',
        keyword:'',
        totalCount: 0,
        loading: true,
        rows: [DEFAULT_ROW],
        currentPage: defaultPageIndex,
        pageSize: staticData.tablePageSize,
       
        options: [{
          value: '黄金糕',
          label: '黄金糕'
        }, {
          value: '双皮奶',
          label: '双皮奶'
        }],
        statusPptions:[
          {value:'草稿'},
          {value:'使用中'},
          {value:'废弃'}
        ]
      }
    },

    created() {

      this.fetch()
    },

    components: {
      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl,
      "jw-dialog": JwDialog
    },

    methods: {
       //选择科室
      changeDepartment(){
            getSearch.execute({department:this.department}).then(data=>{
              console.log(data)
            this.rows=data
          
          }).catch(()=>{
            let lang = i18nService.getOtherLanguageMap()
            this.loading = false

            if(!noCatch) {
              this.$alert(lang['loadingFailAgain'], 'Error').then(()=>{
                this.fetch(this.pageIndex)
              })
            }
          })
      },
      //选择状态
      changeStatus(){
          this.fetch({status:this.status})
      },
      //时间段选择
      changeTime(){
       
            getSearch.execute({timeBucket:this.timeBucket}).then(data=>{
            this.rows=data
          
          }).catch(err=>{
           
            console.log(err)
          })
      },
      //选择类型
      changeCcategory(){

      },
      //创建者
      inputCreator(){
           getSearch.execute({createBy:this.createBy}).then(data=>{
            this.rows=data
          
          }).catch(err=>{
           
           
          })
      },
      //关键字
      inputGxName(){
          this.fetch({key:this.keyword})
      },
      //编辑页面
      onEite(row) {
        let name=[]
        this.rows.map(item=>{
          name.push({name:item.name})
        })
        appStore.set('parameter-name',name)
        appStore.set('row-data',row)
       
        this.$router.push({
          path: `/bresources/parameters/edit/${row.id}`
        })

      },
      //删除
       onDelete(row) {
        
        let lang = i18nService.getOtherLanguageMap()
        let deleteRecodFromServer = (row)=>{
          //设置post请求参数
          tableRowDeleteModel.setQuery({masterId:row.id})

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
      //显示模态框
      showDialogForEdit(entity) {
        let dialog = this.$refs.dialog;
        let rowEntity = _.clone(entity);
        let {
          formItemList,
          formData,
          rules
        } = this.getTableAdditionEditConfig(rowEntity);

        delete rowEntity.createDate;
        delete rowEntity.updateDate;
        _.each(rowEntity.languages, x => {
          x.createDate && delete x.createDate;
          x.updateDate && delete x.updateDate;
        });

        dialog
          .show({
            title: "Language Key Editing",
            list: formItemList,
            form: formData,
            rules
          })
          .then(data => {
            rowEntity.resourceKey = data.resourceKey;
            _.each(rowEntity.languages, (language, index) => {
              language.resourceValue = data[`resourceValue_${index}`];
              delete rowEntity[`resourceValue_${index}`];
            });

            this.save(rowEntity, "updateI18nResourceSet");
          })
      },
    
   

      getTableHeader() {

        return getAppConfig().tableHeader
      },

      getHeaderControl() {

        return getAppConfig().tableHeaderControl
      },
      getTableState() {
        return getAppConfig().tableState
      },

      showLoading() {

        clearTimeout(loadingTimerId)
        this.loading = true
      },

      hideLoading(is) {
        if (is) {
          this.loading = false
        } else {
          loadingTimerId = setTimeout(() => {
            this.loading = false
          }, 500)
        }
      },

      getTitle() {

        return i18nService.getI18nTitle().title || '你好'
      },

      onPageChange(pageCount) {

        this.showLoading()
        tableModel.setPageIndex(pageCount)
        this.currentPage = pageCount
        tableModel
          .execute()
          .then((data) => {
            this.rows = data.rows
            this.hideLoading()
          })
          .catch(() => {
            let lang = i18nService.getOtherLanguageMap()
            this.hideLoading(true)
            this.$warning(lang['loadingFail'])
          })
      },

      onHeaderButtonClick(buttonClicked) {

        if (buttonClicked.type === 'add') {
          this.add()
        } else if (buttonClicked.type === 'export') {
          this.export()
        }
      },
    

      fetch(obj={}) {
        //开启loading
        this.showLoading()
        //传入初始页码
        // tableModel.setPageIndex(defaultPageIndex)
        //发送请求

        getSearch.execute(obj).then((data) => {
         
          // this.totalCount = data.count
          this.rows = data
          this.hideLoading()
        }).catch((err) => {

          let lang = i18nService.getOtherLanguageMap()

          this.totalCount = 0
          this.rows = []
          this.hideLoading(true)

          this.$alert(lang['loadingFailAgain'], 'Error').then(() => {

            // this.fetch()
          }).catch(err => {

          })
        })
      },
      //新增
      add() {
        this.$router.push({path: '/bresources/parameters/add/0'})
        // let lang = i18nService.getOtherLanguageMap();

     

        // this.dictDefOperate(null)
        //   .then(result => {
        //     this.dictionaryDefPageIndex = 1;
        //     this.hideLoading(true);
        //     this.fetchDictionaryDefinition();
        //   })
        //   .catch(error => {
        //     this.hideLoading(true);
        //     error !== "cancel" && this.$error(error.message || lang["operateError"]);
        //   });
       
      },
       //显示模态框
    dictDefOperate(data) {
      let otherLang = i18nService.getOtherLanguageMap();
      let form = { dictCode: "", dictName: "" };
      let dialog = this.$refs.dialog;
      let operate = "create";

      if (!_.isEmpty(data)) {
        (operate = "update"),
          (form = {
            id: data.id,
            dictCode: data.dictCode,
            dictName: data.dictName
          });
      }

      return dialog
        .show({
          form,
          rules: {
            dictName: { required: true, message: otherLang.notEmpty },
            dictCode: { required: true, message: otherLang.notEmpty }
          },
          title: _.isEmpty(data) ? "Add DictDefinition" : "Edit DictDefinition",
          list: [
            { name: "Name", prop: "dictName" },
            { name: "Code", prop: "dictCode" }
          ]
        })
        .then(result => {
          this.showLoading();
          result.dictGroupCode = this.currentTreeNode;
          return dictionartDefSave.execute(operate, result);
        });
    },
       showDialog(form) {
        
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()
      let dialog = this.$refs.dialog
 
      return dialog.show({
        title:'标准工序编辑'|| lang["platform.app_org.editOrg"],
        list: [
          {
            name: '工序名称'||lang["platform.app_user.name"],
            prop: "name"
          },{
            name:'工序编号'|| lang["platform.common.code"],
            prop: "code"
          },{
            name:'科室'|| lang["platform.app_org.abbreviation"],
            prop: "department"
          },{
            name:'创建者'|| lang["platform.common.desc"],
            prop: "createBy"
          },{
            name:'创建时间'|| lang["platform.common.desc"],
            prop: "createTime"
          }
     
        ],
        rules: {
          name: { required: true, message: otherLang.notEmpty },
          code: { required: true, message: otherLang.notEmpty },
          department: { required: true, message: otherLang.notEmpty },
          createBy: { required: true, message: otherLang.notEmpty },
          createTime: { required: true, message: otherLang.notEmpty }
          
        },
        form:Object.assign({}, form)
      });
    },
    //点击行事件
      onRowClick(row){
        
      },
      edit(row) {

        appStore.set('row-data', row)
        this.$router.push({
          path: `/app/app/edit/${row.id}`
        })
      },

      goServiceAuthorize(row) {

        appStore.set('row-data', row)
        this.$router.push({
          path: `/app/app/service/${row.id}`
        })
      },

      goOperateConf(row) {
        appStore.set('row-data', row)
        this.$router.push({
          path: `/app/app/permission/edit/${row.id}`
        })
      },

      goRole(row) {
        appStore.set('row-data', row)
        this.$router.push({
          path: `/app/app/role/index`
        })
      },
      //删除数据  
      delete(row) {
        let lang = i18nService.getOtherLanguageMap()
        let deleteRecodFromServer = (row) => {
          //给实例对象添加方法
          tableRowDeleteModel.setParam(row)
          tableRowDeleteModel
            .execute()
            .then(() => {
              let index = _.findIndex(this.rows, (current) => {
                return current === row
              })

              this.rows.splice(index, 1)
              this.$success(lang['deleteRecodSuccess'])
            })
            .catch(() => {
              this.$error(lang['deleteRecodFail'])
            })
        }

        this.$alert(lang['deleteWarning'], 'Warning').then(() => {

            deleteRecodFromServer(row)
          })
          .catch((err) => {

          })
      },

      getSelectionIds() {
        let jwTable = this.$refs.jwTable
        let selections = jwTable.getSelection()

        return _.map(selections, (select) => {
          return select.id
        })
      },

      getAllIds() {

        return _.map(this.rows, (row) => {
          return row.id
        })
      },

      export () {
        let selections = this.getSelectionIds()
        let lang = i18nService.getOtherLanguageMap()

        if (selections.length === 0) {
          return this.$error(lang['recordSelected'])
        }

        util.download(`${Jw.gateway}/platform/app/app/export`, {
          appIds: selections.join(',')
        })
      }
    }
  }
</script>

<style lang="less">
  //   @import "../../../assets/css/variable.less";
  .resource {
     .main {
      background-color: #fff;
      height: calc(~'100% - 200px');
    }
    .toright{
      text-align: right;
      .el-date-picker{
       
      }
      .input{
       
      }
    }
    span.name {
      width: 80px;
      display: inline-block;
      text-align: left;
    }

    .app-icon-wrapper {
      //width: 80px;
      height: 80px;
      overflow: hidden;

  
    }
  }
</style>