/**
 * Table 表格header静态数据
 * 
 * @author gill
 * @date 2018-05-07
 */

import i18Service from 'jw_services/i18n/index'
import util from 'jw_common/util'

export default function () {

  let {
    lang
  } = i18Service.getLanguageMap()
  let otherLang = i18Service.getOtherLanguageMap()

  return {

    tableHeader: [{
      width: 50,
      display: lang['bop.process.seq'],
      prop: '__index'
    },{
      prop: 'name',
      display: lang['bop.process.name']
    }, {
      prop: 'code',
      display: lang['bop.process.code']
    }, {
      prop: 'department',
      display: lang['bop.process.department']
    }, {
      prop: 'createBy',
      display: lang['platform.common.creatorName']
    }, {
      prop: 'createTime',
      display: lang['platform.common.creatorDate'],
      formatter: function (value) {

        return util.dayjs(value.createTime).format('YYYY-MM-DD HH:mm')
      }
    }, {
      width: 100,
      display: lang['platform.common.ops'],
      formatter: function (row, col, value) {
        let h = this.$createElement

        return (
          <div>
            <i class="el-icon-edit blue mgr font16" onClick = {(e)=>{this.$emit('onEite', row), e.stopPropagation()}}/>
            <i class="el-icon-delete red font16" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}/>
          </div>
        )
      }
    }],


    //工艺参数数据
    tableParameters: [{
      prop: 'name',
      display: '名称' || lang['platform.app_app.name']
    }, {
      prop: 'parametervalue',
      display: '参数值' || lang['platform.app_app.showname'],
      type: "input"
    }, {
      prop: 'unit',
      display: '单位' || lang['platform.app_app.version']
    }, {
      prop: 'icon',
      width: 100,
      display: lang['platform.app_app.icon'],
      formatter: function (row, col, value) {
        let h = this.$createElement;

        return (
          <div>
            <i class="el-icon-edit blue mgr" onClick = {(e) => {this.$emit('onEite', row), e.stopPropagation()}}/>
            <i class="el-icon-delete red" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}/>
          </div>
        )
      }
    }],
    //工艺资源数据
    thResource: [{
      prop: 'name',
      display: lang['platform.app_app.name']
    }, {
      prop: 'parametervalue',
      display: lang['platform.app_app.showname'],
      formatter: function formatter(row, col, value) {
        let h = this.$createElement;

        return (
          <div class="text-ellipsis">
            <el-input-number v-model="value" label = "描述文字"/>
          </div >
        )
      }
    }, {
      prop: 'unit',
      display: '单位' || lang['platform.app_app.version']
    }, {
      prop: 'icon',
      width: 100,
      display: '操作' || lang['platform.app_app.icon'],
      formatter: function (row, col, value) {
        let h = this.$createElement;

        return (
          <div class="">
            <i class="el-icon-edit blue mgr" onClick={(e) => {this.$emit('onEite', row), e.stopPropagation()}}/>
            <i class="el-icon-delete red" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}/>
          </div>
        )
      }
    }],
    // 头部添加按钮
    tableHeaderControl: [{
        icon: '',
        type: 'save',
        color: 'primary',
        txt: "新增" || lang['platform.common.save']
      }
    ],
    //表格控制按钮
    tableState: [{
      icon: 'el-icon-download',
      type: 'export',
      btnType: 'primary',
      txt: lang['bop.common.download']
    }, {
      icon: 'el-icon-upload2',
      type: 'import',
      uploadUrl: `${Jw.gateway}/platform/app/app/import`,
      isUpload: true,
      btnType: 'primary',
      txt: lang['bop.common.upload']
    }, {
      type: 'delete',
      icon: 'el-icon-delete',
      btnType: 'danger',
      txt: lang['platform.common.destroy']
    }]
  }
}