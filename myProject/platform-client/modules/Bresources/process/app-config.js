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
      prop: 'resourcename',
      sort:true,
      display:'工序名称'|| lang['platform.app_app.resourcename']
    }, {
      prop: 'showname',
      // width: 100,
      display: '工序编号'||lang['platform.app_app.showname']
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
      prop: 'createBy',
      display: lang['platform.common.creatorName'],
      // width: i18Service.isChinese()? 100 : 130
    }, {
      prop: 'createTime',
      // width: 150,
      sort:true,
      display: lang['platform.common.creatorDate'],
      formatter: function(value) {
        
        //如果没有值，默认当前时间
        return util.dayjs(value.createdDate).format('YYYY-MM-DD HH:mm')
      }
    }, {
      prop: 'icon',
      width: 100,
      display: '操作'||lang['platform.app_app.icon'],
      formatter: function(row,col,value) {
        //创建标签
        let h = this.$createElement

         return <div class=""><i class="el-icon-edit blue mgr font16" onClick={(e)=>{this.$emit('onEite',row),e.stopPropagation()}}></i><i class="el-icon-delete red font16" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}></i></div>
      }
    }
  ],
  //工艺参数数据
  tableParameters: [{
    prop: 'name',
    display:'名称'|| lang['platform.app_app.name']
  }, {
    prop: 'parametervalue',
    display: '参数值'||lang['platform.app_app.showname'],
    
    formatter: function formatter(row, col, value) {
      let h = this.$createElement
     
      return <div class="text-ellipsis"><el-input v-model='value' placeholder="请输入内容"></el-input></div>
    }
  }, {
    prop: 'unit',
    display:'单位'|| lang['platform.app_app.version']
  }, {
    prop: 'icon',
    width: 100,
    display: '操作'||lang['platform.app_app.icon'],
    formatter: function(row,col,value) {
      //创建标签
      let h = this.$createElement
       return <div class=""><i class="el-icon-edit blue mgr" onClick={(e)=>{this.$emit('onEite',row),e.stopPropagation()}}></i><i class="el-icon-delete red" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}></i></div>
    }
  }
],
//工艺资源数据
thResource: [{
  prop: 'name',
  display:'名称'|| lang['platform.app_app.name']
}, {
  prop: 'parametervalue',
  display: '数量'||lang['platform.app_app.showname'],
  
  formatter: function formatter(row, col, value) {
    let h = this.$createElement
   
    return <div class="text-ellipsis"> <el-input-number v-model="value"  label="描述文字"></el-input-number></div>
  }
}, {
  prop: 'unit',
  display:'单位'|| lang['platform.app_app.version']
}, {
  prop: 'icon',
  width: 100,
  display: '操作'||lang['platform.app_app.icon'],
  formatter: function(row,col,value) {
    //创建标签
    let h = this.$createElement
     return <div class=""><i class="el-icon-edit blue mgr" onClick={(e)=>{this.$emit('onEite',row),e.stopPropagation()}}></i><i class="el-icon-delete red" onClick={(e)=>{this.$emit('onDelete',row),e.stopPropagation()}}></i></div>
  }
}
],
    // 头部添加按钮
    tableHeaderControl: [{
      icon: '',
      type: 'save',
      color:'primary',
      txt:"新增"|| lang['platform.common.save']
    }, 
    // {
    //   icon: '',
    //   type: 'cancel',
    //   color:'',
    //   txt: lang['platform.common.cancel']
    // }, 
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
