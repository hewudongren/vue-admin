/**
 *表格组件
 *
 *@author gill
 *@date 2018-05-07
 */

<template>
  <div class="jw-table">
    <el-table
      ref="sourceTable"
      :data="data"
      :stripe="stripe"
      :height="getTableHeight()"
      :empty-text="getEmptyMessage()"
      :highlight-current-row="highlightCurrentRow"
      :class="{ 'body-height': isPagination(), 'body-full-height': !isPagination() }"
      @row-click="onRowClick"
      @select="onSelect"
      @select-all="onSelectAll">

      <el-table-column v-if="isSelection" type="selection" width="50"></el-table-column>
      <el-table-column v-if="opsList" width="50" :label="opsList.display">
        <template slot-scope="scope">
          <ColumnPopover :list="opsList.list" :extraData="scope.row" @operate-clicked="onMenuOperateHandler($event,scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item,i) in header"
        :prop="item.prop"
        :label="item.display"
        :class-name="item.class"
        :formatter="formatter(item)"
        :width="item.width || 'auto'"
        :key="i">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      v-if="isPagination()"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="currentPage"
      @current-change="onTablePageChange">
    </el-pagination>
  </div>
</template>

<script>
import util from 'jw_common/util'
import ColumnPopover from './column-popover'
import i18nService from 'jw_services/i18n/index'
     
export default {
  props: [
    'data', 'header','isSelection',
    'showPagination','stripe','highlightCurrentRow',
    'pageSize','totalCount','currentPage','isRowCheckBox','height',
    'opsList'
  ],

  components: {
    ColumnPopover
  },

  updated() {

    this.updateSelection()
  },

  methods: {
 
    getEmptyMessage() {
      let { lang } = i18nService.getLanguageMap()

      return lang['platform.common.noData']
    },

    onMenuOperateHandler(menuItem, row) {

      this.$emit('on-operate-click',menuItem,row)
    },

    getTableHeight() {

      if(_.isUndefined(this.height) || _.isNull(this.height)) {
        return 'null'
      }

      if(this.height === 'auto') {
        return null
      }

      return this.height || 0
    },

    onOpsHoverHandler(row) {

      console.log(row)
    },

    doLayout() {

      this.$refs.sourceTable.doLayout()
    },

    isPagination() {

      return this.showPagination && (this.totalCount>0)
    },

    updateSelection() {
      let sourceTable = this.$refs.sourceTable

      sourceTable.clearSelection()
      if(this.isSelection) {
        _.each(this.data,(row)=>{
          row.checked && sourceTable.toggleRowSelection(row,true)
        })
      }
    },

    toggleRowSelection(row,isChecked) {

      row.checked = isChecked
      this.$refs.sourceTable.toggleRowSelection(row,isChecked)
    },
    //页面切换
    onTablePageChange(pageCount) {

      this.$emit('on-page-change',pageCount)
    },

    selectionChange(row) {

      if(this.isSelection && this.getRowCheckBoxState()) {
        row.checked = !row.checked
        this.toggleRowSelection(row,row.checked)
        this.$emit('on-selection-change',row,this)
      }
    },
    //多选
    onSelectAll(selection) {
     
      _.each(selection,(s)=>{
        s.checked = true
      })
    },
    //单选
    onSelect(selection,row) {
      
       row.checked = !row.checked
      this.$emit('on-selection-change',row,this)
    },

    onRowClick(row,event) {
      let contxt = this.$refs.sourceTable

      this.$emit('on-row-click',row,event,contxt)
      this.selectionChange(row)
    },

    getRowCheckBoxState() {

      if(this.isRowCheckBox===true) {
        return true
      }

      return false
    },

    formatter(item) {
    
      let innerElement = null
      let copyElement = null
      let isCopy = item.isCopy
      let formatterFun = item.formatter
      
      if(_.isFunction(formatterFun) || isCopy) {
       
        return (row,col,value,index)=>{
          
          if(_.isFunction(formatterFun)) {
            innerElement = formatterFun.call(this,row,col,value,index)
          }

          if(isCopy) {
            return (
              <div title="双击复制" onDblclick={()=>{this.onCopy(value)}}>
                {innerElement || value}
              </div>
            )
          }else{
            return innerElement || value
          }
        }
      }

      return null
    },

    onCopy(value) {
      let copyState = util.copy(value)

      if(copyState) {
        this.$success('copy success')
      }else{
        this.$error('copy fail')
      }
    },
    //组件中注册多选方法，
    getSelection() {
      let selections = []

      _.each(this.data,(row)=>{
        if(row.checked) {
          selections.push(_.clone(row))
        }
      })

      return selections
    }
  }
};
</script>

<style lang="less">
  @import "../../assets/css/variable.less";

  
  .jw-table {
    height: -moz-calc(~'100% - 40px'); 
    height: -webkit-calc(~'100% - 40px'); 
    height: calc(~'100% - 40px');

    .body-height {
      height: -moz-calc(~'100% - 39px'); 
      height: -webkit-calc(~'100% - 39px'); 
      height: calc(~'100% - 39px');
    }

    .body-full-height {
      height: 100%;
    }

    .el-table__body-wrapper {
      overflow-x: hidden;
    }

    .el-table {
      th {
        background-color: transparent;
      }

      tr {
        background-color: transparent;
      }
    }

    .el-popover__reference {
      vertical-align: middle;
    }

    .el-table::before {
      height: 0;
    }

    // .el-pager {
    //   list-style-position: inside;
    // }
    
    .el-pagination {
      //width: 100%;
      text-align: right;
      border-top: 1px solid #c4c6cc;
      padding: @jw10px 0 0 0;

      .btn-next {
        margin-right: 0;
      }
    }
  }
</style>