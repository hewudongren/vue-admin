/**
 * Table 表格header静态数据
 * 
 * @author gill
 * @date 2018-05-07
 */

import i18Service from 'jw_services/i18n/index'
import util from 'jw_common/util'

function imgLoaderFailHandler(event) {
  let target = event.target

  target.style.display = 'none';
}
 


export default function () {
  //获取语言切换方法
  let { lang } = i18Service.getLanguageMap()
  let otherLang = i18Service.getOtherLanguageMap()
 
  return {
    
    tableHeader: [{
      prop: 'name',
      sort:true,
      display:'参数名称'|| lang['platform.app_app.resourcename']
    }, {
      prop: 'showName',
      // width: 100,
      display: '显示名称'||lang['platform.app_app.showname']
      // isCopy: true,
      // formatter: function formatter(row, col, value) {
      //   let h = this.$createElement
      //   console.log(11)
      //   return <div class="text-ellipsis">{value}</div>
      // }
    }, {
      prop: 'department',
      // width: 100,
      sort:true,
      display:'科室'|| lang['platform.app_app.version']
    }, {
      prop: 'getWay',
      // width: 100,
      // sort:true,
      display:'取值方式'|| lang['platform.app_app.version']
    }, {
      prop: 'createBy',
      display: lang['platform.common.creatorName'],
      width: i18Service.isChinese()? 100 : 130
    }, {
      prop: 'createTime',
      width: 150,
      sort:true,
      display: lang['platform.common.creatorDate'],
      formatter: function(value) {
        
        //如果没有值，默认当前时间
        return util.dayjs(value.createTime).format('YYYY-MM-DD HH:mm')
      }
    }, {
      prop: 'icon',
      width: 100,
      display: '操作'||lang['platform.app_app.icon'],
      formatter: function(row,col,value) {
        //创建标签
        let h = this.$createElement

        //给元素绑定事件
        return <div class="font20 po"><i class="el-icon-edit blue mgr" title="编辑" onClick={(e)=>{this.$emit('onEite',row),e.stopPropagation()}}></i><i class="el-icon-delete red" title="删除" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}></i></div>
      }
    }
  ],
  thResource: [{
    prop: 'resourcename',
    sort:true,
    display:'资源名称'|| lang['platform.app_app.resourcename']
  }
],
    // 头部添加按钮
    tableHeaderControl: [{
      icon: 'el-icon-plus',
      type: 'add',
      color:'primary',
      txt: lang['platform.common.add']
    }, 
    // {
    //   type: 'import',
    //   uploadUrl: `${Jw.gateway}/platform/app/app/import`,
    //   isUpload: true,
    //   type: 'upload',
    //   txt: lang['platform.common.import']
    // }, {
    //   type: 'export',
    //   txt: lang['platform.common.export']
    // }
  ],
    //表格控制按钮
    tableState: [{
      icon: 'el-icon-download',
      type: 'export',
      color:'primary',
      txt:'下载'|| lang['platform.common.add']
    }, {
      icon: 'el-icon-upload2',
      type: 'import',
      uploadUrl: `${Jw.gateway}/platform/app/app/import`,
      isUpload: true,
      color:'primary',
      // type: 'upload',
      txt:'上传'|| lang['platform.common.import']
    }, {
      type: 'delete',
      icon: 'el-icon-delete',
      color:'danger',
      txt:'删除'|| lang['platform.common.export']
    }],

  }
}
