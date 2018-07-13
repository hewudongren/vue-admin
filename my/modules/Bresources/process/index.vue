<template>
  <div class="panel process-wrapper" v-loading="loading">
    <jw-table-control class="process-title-control" :title="getTitle()" :buttons="getHeaderControl()" @on-header-button="onHeaderButtonClick" />
    <div class="main">
      <el-row class="process-row">
        <el-col :span="8" >
          <span class="name">科室</span>
          <el-select @change="onRefreshTable" v-model="queryCondition.department" placeholder="请选择" clearable>
            <el-option v-for="item in options.departmentList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="name">状态</span>
          <el-select @change="onRefreshTable" v-model="queryCondition.status" placeholder="请选择" clearable>
            <el-option v-for="item in options.statusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="name">创建时间</span>
          <el-date-picker
            clearable
            v-model="timeBucket"
            @change="onRefreshTable" 
            value-format="timestamp"
            type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row class="process-row">
        <el-col :span="8">
          <span class="name">类型</span>
          <el-select @change="onRefreshTable" v-model="queryCondition.category" placeholder="请选择" clearable>
            <el-option v-for="item in options.typeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="name">创建者</span>
          <el-input class="row-col-input" clearable @input="onRefreshTable" v-model="queryCondition.createBy" prefix-icon="el-icon-search" placeholder="请输入内容" />
        </el-col>
        <el-col :span="8">
          <span class="name">关键字 </span>
          <el-input clearable class="row-col-input" @input="onRefreshTable" v-model="queryCondition.gxName" prefix-icon="el-icon-search" placeholder="请输入内容"/>
        </el-col>
      </el-row>
      <jw-table-control class="process-table-control" :buttons="getTableControlBtns()" @on-header-button="onHeaderButtonClick" />
      <jw-table ref="jwTable" 
        :data="rows" 
        :isSelection=true 
        :isRowCheckBox=true 
        :header="getTableHeader()"
        @onEite="onEdit" 
        @on-rank="onRank"
        @onDelete="onDelete"
        v-loading="tableLoading"/>
    </div>
    <jw-dialog ref="dialog" />
  </div>
</template>

<script>
import util from "jw_common/util";
import staticData from "jw_common/data";
import i18nService from "jw_services/i18n/index";
import JwTable from "jw_components/table/table";
import JwTableHeaderControl from "jw_components/table/control-header";
import JwDialog from "jw_components/dialog";

import appStore from "../../../stores/common.js";
import getAppConfig from "./app-config.js";

import tableModel from "../../../models/process/table.js";
import tableRowDelete from "../../../models/process/row-delete.js"
import additionModel from "../../../models/process/addition.js"
import queryListModel from "../../../models/process/query-list.js"

import saveOrgModel from "../../../myfetch/standardProcedure/save-org.js";
import additionOrgModel from "../../../myfetch/standardProcedure/new-org";

let defaultPageIndex = 1;
let loadingTimerId = 0;
//初始化表格数据属性，避免数据属性混乱
const ROW = {
  name: "--",
  code: "--",
  department: "--",
  getWay: "",
  createTime: "--",
  createBy: "--"
};

export default {
  data() {

    return {
      queryCondition: {
        department: "", //科室
        status: "",     //状态
        startTime: "",  //开始时间
        endTime: "",    //结束时间
        category: "",   //类型
        createBy: "",   //创建者
        gxName: "",     //关键字
      },

      timeBucket: '',

      rows: [],
      loading: true,
      tableLoading: false,
      currentPage: defaultPageIndex,
      pageSize: staticData.tablePageSize,

      // input: "",
      // value: "",
      // value6: "",
      options: {}
    };
  },

  created() {

    this.delayTableLoad = _.debounce(this.fetchTableData,500);
    this.fetch();
  },

  components: {
    "jw-table": JwTable,
    "jw-table-control": JwTableHeaderControl,
    "jw-dialog": JwDialog
  },

  methods: {

    fetch() {

      this.showLoading()
      Promise.all([tableModel.execute(),queryListModel.exec()]).then((datas)=>{

        this.rows = datas[0]
        this.options = datas[1]
        this.hideLoading()
      }).catch(()=>{
        let lang = i18nService.getOtherLanguageMap();

        this.hideLoading(true);
        this.rows = [];
        this.$alert(lang["loadingFailAgain"], "Error").then(() => {
          this.fetch();
        });
      })
    },

    onRefreshTable() {

      this.delayTableLoad()
    },

    onEite(item) {
      this.showDialogForEdit(item);
    },

    onHeaderButtonClick(buttonClicked) {

      if (buttonClicked.type === "addition") {
        this.add();
      } else if (buttonClicked.type === "export") {
        this.export();
      }
    },

    export() {
      let selections = this.getSelectionIds();
      let lang = i18nService.getOtherLanguageMap();

      if (selections.length === 0) {
        return this.$error(lang["recordSelected"]);
      }

      util.download(`${Jw.gateway}/platform/app/app/export`, {
        appIds: selections.join(",")
      });
    },
   
    onDelete(row) {

      this.deleteTableRow(row);
    },

    deleteTableRow(row) {
      let lang = i18nService.getOtherLanguageMap()

      this.$alert(lang["deleteWarning"], "Warning")
        .then(() => {
          this.showLoading()
          return tableRowDelete.execute([row.id])
        })
        .then(() => {
          let index = _.findIndex(this.rows, r => {
            return r.id === row.id
          })

          this.rows.splice(index, 1)
          this.hideLoading()
        })
        .catch(error => {
          this.hideLoading(true);
          (error !== "cancel") && this.$error(lang["operateError"])
        })
    },

    onEdit(row) {
      appStore.set("row-data", row);
      this.$router.push({
        path: `/bresources/process/edit/${row.id}`
      });
    },

    showDialogForAddition() {
      let otherLang = i18nService.getOtherLanguageMap()
      let { lang } = i18nService.getLanguageMap()
      let dialog = this.$refs.dialog

      return dialog.show({
        title: lang["bop.process.additon"],
        list: [{
          name: lang["bop.process.department"],
          prop: "department"
        },{
          name: lang["bop.process.name"],
          prop: "name"
        },{
          name: lang["bop.process.cls"],
          prop: "cls"
        }],
        form: {
          department: '',
          name: '',
          cls: ''
        },
        rules: {
          department: { required: true, message: otherLang.notEmpty },
          name: { required: true, message: otherLang.notEmpty },
          cls: { required: true, message: otherLang.notEmpty }
        }
      })
    },

    //表格远程排序
    onRank(a, b) {

    },

    fetchTableData() {
      let delayHideLoading = _.debounce(()=>{
        this.tableLoading = false
      },500)

      this.tableLoading = true
      tableModel
        .execute(this.queryCondition)
        .then(data => {
          this.rows = data
          delayHideLoading()
        })
        .catch(() => {
          let lang = i18nService.getOtherLanguageMap();

          this.rows = [];
          this.tableLoading = false;

          this.$alert(lang["loadingFailAgain"], "Error").then(() => {
            this.fetchTableData();
          });
        });
    },

    add() {
      let lang = i18nService.getOtherLanguageMap()

      this.showDialogForAddition()
        .then(result => {
          this.showLoading()
          return additionModel.execute(result)
        })
        .then(() => {
          return this.fetchTableData()
        })
        .catch(error => {
          this.hideLoading(true);
          (error !== "cancel") && this.$error(lang["operateError"]);
        })
    },

    getSelectionIds() {
      let jwTable = this.$refs.jwTable;
      let selections = jwTable.getSelection();

      return _.map(selections, select => {
        return select.id;
      });
    },

    getTitle() {
      return i18nService.getI18nTitle().title;
    },

    getHeaderControl() {
      
      return [{
        btnType: "primary",
        type: 'addition',
        txt: this.$root.langs["platform.common.add"]
      }]
    },

    getTableHeader() {
      return getAppConfig().tableHeader;
    },

    getTableControlBtns() {
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
        loadingTimerId = setTimeout(() => { this.loading = false }, 500);
      }
    }
  }
};
</script>

<style lang="less">

.process-wrapper {
  background: transparent;
  padding: 5px;

  .process-title-control {
    border-bottom: none;

    .panel-title {
      font-size: 1rem;
    }
  }

  .process-row {
    margin-bottom: 10px;

    .name {
      width: 100px;
      text-align: right;
      padding-right: 10px;
      display: inline-block;
      box-sizing: border-box;
    }

    .el-select {
      width: calc(~'100% - 110px');
      min-width: 180px;
    }

    .row-col-input {
      display: inline-block;
      width: calc(~'100% - 110px');
      min-width: 180px;
    }

    .el-date-editor {
      width: calc(~'100% - 110px');
      min-width: 180px;
    }
  }

  .process-table-control {
    .right {
      float: left;
    }

    margin-top: 20px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-table__header {
    background: #ebeef5;
  }

  .main {
    background-color: #fff;
    padding: 15px;
    height: calc(~"100% - 70px");
    border: 1px solid #f3f9fb;

    .jw-table {
      height: calc(~"100% - 200px");
    }
  }
}
</style>