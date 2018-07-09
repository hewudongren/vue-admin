<template>
  <div class="panel resource">
    <!-- 表头 -->
    <jw-table-control class="mgb" :title="getTitle()" :buttons="getHeaderControl()" @on-header-button="onHeaderButtonClick" />
    <!-- 筛选条件 -->
    <div class="main">
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
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <div class="clearfix">
            <span class="name" style="text-align:left">创建时间</span>
            <el-date-picker v-model="timeBucket" value-format="timestamp" @change="changeTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="mgb">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">类型</span>
            <el-select @change="changeCcategory" v-model="category" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="name">创建者</span>
            <el-input style="width:217px" @input="inputCreator" v-model="creator" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="8" style="text-align:right">
          <div class="grid-content bg-purple">
            <span class="name" style="text-align:left">关键字 </span>
            <el-input style="width:350px" @input="inputGxName" v-model="gxName" prefix-icon="el-icon-search" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <jw-table-control class="mgb" float="left" :buttons="getTableState()" @on-header-button="onHeaderButtonClick" />
      <!-- 主体 -->
      <jw-table ref="jwTable" 
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
        @on-page-change="onPageChange" @on-operate-click="onOperateClick">
      </jw-table>
    </div>
  </div>
</template>

<script>
  import util from "jw_common/util";
  import staticData from "jw_common/data";
  import i18nService from "jw_services/i18n/index";
  import JwTable from "jw_components/table/table";
  import JwTableHeaderControl from "jw_components/table/control-header";

  import appStore from "jw_stores/common";
  import getAppConfig from "./app-config.js";
  import tableModel from "../../../myfetch/standardProcedure/index.js";
  import tableRowDeleteModel from "jw_models/app/recod-delete";
  import myfetch from '../../../axios/myfetch.js'

  let defaultPageIndex = 1;
  let loadingTimerId = 0;
  //初始化表格数据属性，避免数据属性混乱
  const ROW = {
    resourcename: "--",
    showname: "--",
    department: "--",
    createTime: "--",
    createBy: "--"
  };

  export default {
    data() {
      return {
        department:'', //科室
        status:'',     //状态
        timeBucket:'',//时间段
        startTime:'',  //开始时间
        endTime:'',    //结束时间
        category:'',   //类型
        creator:'',    //创建者
        gxName:'',     //关键字


        totalCount: 0,
        loading: true,
        rows: [ROW],
        currentPage: defaultPageIndex,
        pageSize: staticData.tablePageSize,
        input: "",
        value: "",
        value6: "",
        options: [{
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ]
      };
    },

    created() {
        this.fetch()
       
    },

    components: {
      "jw-table": JwTable,
      "jw-table-control": JwTableHeaderControl
    },

    methods: {
      //选择科室
      changeDepartment(){
          
      },
      //选择状态
      changeStatus(){

      },
      //时间段选择
      changeTime(){
        console.log(this.timeBucket)
      },
      //选择类型
      changeCcategory(){

      },
      //创建者
      inputCreator(){
        
      },
      //关键字
      inputGxName(){

      },

      onEite(item) {
        this.showDialogForEdit(item);
      },
      //显示模态框
      showDialogForEdit(entity) {
        let dialog = this.$refs.dialog;
        let rowEntity = _.clone(entity);
        let {
          formItemList,
          formData,
          rules
        } = this.getTableAdditionEditConfig(
          rowEntity
        );

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
          });
      },
     
    
      
      //页码切换处理
      onPageChange(pageCount) {
        this.showLoading();
        tableModel.setPageIndex(pageCount);
        this.currentPage = pageCount;
        tableModel
          .execute()
          .then(data => {
            this.rows = data.rows;
            this.hideLoading();
          })
          .catch(() => {
            let lang = i18nService.getOtherLanguageMap();
            this.hideLoading(true);
            this.$warning(lang["loadingFail"]);
          });
      },
      //导航栏按钮点击事件
      onHeaderButtonClick(buttonClicked) {
        if (buttonClicked.type === "delete") {
          
          this.deleteMore();
        } else if (buttonClicked.type === "export") {
          this.export();
        }
      },

      //下载
       export () {
        
        let selections = this.getSelectionIds();
        let lang = i18nService.getOtherLanguageMap();

        if (selections.length === 0) {
          return this.$error(lang["recordSelected"]);
        }

        util.download(`${Jw.gateway}/platform/app/app/export`, {
          appIds: selections.join(",")
        });
      },
      //表格数据操作处理函数
      onOperateClick(menuItem, row) {
        if (menuItem.type === "edit") {
          this.edit(row);
        }
        if (menuItem.type === "delete") {
          this.delete(row);
        }

        if (menuItem.type === "microServices") {
          this.goServiceAuthorize(row);
        }

        if (menuItem.type === "operateConf") {
          this.goOperateConf(row);
        }

        if (menuItem.type === "role") {
          this.goRole(row);
        }
      },
      //表格数据单删
       onDelete(row) {
        console.log(row);
      },
      //编辑表格数据
       onEite(item) {
        this.showDialogForEdit(item);
      },

      fetch() {
        //开启loading
        // this.showLoading();
        //传入初始页码
      
         tableModel.execute().then(data=>{
            this.rows=data
          }).catch(err=>{
           
            console.log(err)
          })
       
        //发送请求
          // myfetch('getStandardOperation')
          // .then(data => {
          //  console.log(data)
            
          // })
          // .catch(err => {
            
          //   let lang = i18nService.getOtherLanguageMap();

          //   this.totalCount = 0;
          //   this.rows = [];
          //   this.hideLoading(true);

          //   this.$alert(lang["loadingFailAgain"], "Error").then(() => {
          //     this.fetch();
          //   });
          // });
      },

      add() {
        this.$router.push({
          path: `/bresources/process/edit/0`
        });
      },
      //编辑页面
      edit(row) {
        appStore.set("row-data", row);
        this.$router.push({
          path: `/bresources/process/edit/${row.id}`
        });
      },

      goServiceAuthorize(row) {
        appStore.set("row-data", row);
        this.$router.push({
          path: `/app/app/service/${row.id}`
        });
      },

      goOperateConf(row) {
        appStore.set("row-data", row);
        this.$router.push({
          path: `/app/app/permission/edit/${row.id}`
        });
      },

      goRole(row) {
        appStore.set("row-data", row);
        this.$router.push({
          path: `/app/app/role/index`
        });
      },
      //删除数据
      delete(row) {
        let lang = i18nService.getOtherLanguageMap();
        let deleteRecodFromServer = row => {
          //给实例对象添加方法
          tableRowDeleteModel.setParam(row);
          tableRowDeleteModel
            .execute()
            .then(() => {
              let index = _.findIndex(this.rows, current => {
                return current === row;
              });

              this.rows.splice(index, 1);
              this.$success(lang["deleteRecodSuccess"]);
            })
            .catch(() => {
              this.$error(lang["deleteRecodFail"]);
            });
        };

        this.$alert(lang["deleteWarning"], "Warning")
          .then(() => {
            deleteRecodFromServer(row);
          })
          .catch(err => {});
      },
      //获得选中的id
      getSelectionIds() {
        let jwTable = this.$refs.jwTable;
        let selections = jwTable.getSelection();

        return _.map(selections, select => {
          return select.id;
        });
      },
      //获得所有的id
      getAllIds() {
        return _.map(this.rows, row => {
          return row.id;
        });
      },

      //获得面包屑导航
      getTitle() {
        return i18nService.getI18nTitle().title;
      },
      //导航控件
      getHeaderControl() {
        let button = [{
          icon: "",
          type: "add",
          color: "primary",
          txt: "新增" || lang["platform.common.add"]
        }];
        return button;
      },
      //获得表头数据
      getTableHeader() {
        return getAppConfig().tableHeader;
      },
      //获得表格数据
      getTableState() {
        return getAppConfig().tableState;
      },

      showLoading() {
        clearTimeout(loadingTimerId);
        this.loading = true;
      },

      hideLoading(is) {
        if (is) {
          this.loading = false;
        } else {
          loadingTimerId = setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      },

     
    }
  };
</script>

<style lang="less">
  //   @import "../../../assets/css/variable.less";
  .resource {
    .main {
      background-color: #fff;
      height: calc(~"100% - 100px");
      .jw-table {
        height: calc(~"100% - 200px");
      }
    }
    .name {
      width: 80px;
      display: inline-block;
    }

    .app-icon-wrapper {
      //width: 80px;
      height: 80px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>