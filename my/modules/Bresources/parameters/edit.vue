<template>
  <div class="panel process-edit">
    <!-- 导航 -->
    <jw-table-control class="mgb" :title="getTitle()" :back="true" @back="exit" :buttons="getHeaderControl()" @on-header-button="onHeaderButtonClick"
    />
    <!-- 左侧 -->
    <div class="edit-main">
      <div class='panel-left'>
        <div class="section mgb">
          <span>科室</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="section mgb">
          <span>类型</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <jw-table-control class="mgb table-control-status"  :buttons="getTableState()" @on-header-button="onHeaderButtonClick" />
      
        
        <jw-table 
        ref="jwTable" 
        :data="parameterName" 
        :isRowCheckBox=true 
        :isIndex="true"
        :isSelection=true
        :showPagination="false" 
        :header="thResource()" 
        :a='i'
        @onEdit='onEdit'
        @onDelete='onDelete' 
        @on-page-change="onPageChange" 
        @on-row-click='onRowClick' >
        </jw-table>
       
      </div>
      <!-- 右侧 -->
      <div class='panel-right'>
        <h4 class="title">{{entity.name}} <span class="right"><i v-if="iconFlag" title="编辑" data-type="edit" class="el-icon-edit" @click="edit($event)"></i><i v-else-if="!iconFlag" title="保存" class="el-icon-star-on" data-type="save" @click="edit($event)"></i><i title="删除" class="el-icon-close mgl"></i> </span></h4>
        <!-- 初始值 -->
        <div class="main edit" v-if="iconFlag">
          <!-- 内容 -->
          <div class="details mgbb">
            <h4 class="mgb blue">
              基本参数
            </h4>
            <!-- 基本参数 -->
            <div class="list">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">参数名称</div>
                    <span>{{entity.name}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">显示名称</div>
                    <span>{{entity.showName}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">大类</div>
                    <span>{{entity.bigClass}}</span>
                  </div>
                </el-col>
              
              </el-row>
              <div style="height:30px"></div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">科室</div>
                    <span>{{entity.department}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">类型</div>
                    <span>{{entity.category}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">版本</div>
                    <span>{{entity.version}}</span>
                  </div>
                </el-col>
              
              </el-row>
              <div style="height:30px"></div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">创建者</div>
                    <span>{{entity.createBy}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">修改者</div>
                    <span>{{entity.updateBy}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">状态</div>
                    <span>{{entity.status}}</span>
                  </div>
                </el-col>
              
              </el-row>
               <div style="height:30px"></div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">备注</div>
                    <span>{{entity.note}}</span>
                  </div>
                </el-col>
               
              
              </el-row>
            </div>
            <!-- 业务参数 -->
            <div class="business">
              <h4 class="blue mgb">业务参数</h4>
              <div class="list">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">取值方式</div>
                      <span>{{entity.getWay}}</span>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">初始值</div>
                      <span>{{entity.initialValue}}</span>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">单位</div>
                      <span>{{entity.unit}}</span>
                    </div>
                  </el-col>
                
                </el-row>
               </div>
            </div>
          
          </div>
         
        
        </div>
        <!-- 内容编辑模块 -->
        <div class="main edit" v-else-if="!iconFlag">
          <!-- 内容 -->
          <div class="details mgbb">
            <h4 class="mgb blue">
              基本参数
            </h4>
            <!-- 基本参数 -->
            <div class="list">
              <el-row>
                <el-col :span="7">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">参数名称</div>
                    
                    <el-input v-model="entity.name" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">显示名称</div>
                     <el-input v-model="entity.showName" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
                   <el-col :span="8" :offset="1">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">大类</div>
                     <el-input v-model="entity.bigClass" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
              
              </el-row>
              <div style="height:30px"></div>
              <el-row>
                <el-col :span="7">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">科室</div>
                     <el-select v-model="entity.department" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                   <el-col :span="7" :offset="1">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">类型</div>
                     <el-select v-model="entity.category" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                   <el-col :span="8" :offset="1">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">版本</div>
                     <el-select v-model="entity.version" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              
              </el-row>
              <div style="height:30px"></div>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">创建者</div>
                    <span>{{entity.createBy}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">修改者</div>
                    <span>{{entity.updateBy}}</span>
                  </div>
                </el-col>
                   <el-col :span="8">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">状态</div>
                     <el-select v-model="entity.status" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              
              </el-row>
               <div style="height:30px"></div>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <div class="name">备注</div>
                    <el-input v-model="entity.note" placeholder="请输入内容"></el-input>
                  </div>
                </el-col>
               
              
              </el-row>
            </div>
            
            <!-- 业务参数 -->
            <div class="business">
              <h4 class="blue mgb">业务参数</h4>
              <div class="list">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">取值方式</div>
                      <el-input v-model="entity.getWay" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                    <el-col :span="7" :offset="1">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">初始值</div>
                      <el-input v-model="entity.initialValue" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                    <el-col :span="7" :offset="1">
                    <div class="grid-content bg-purple-dark">
                      <div class="name">单位</div>
                      <el-input v-model="entity.unit" placeholder="请输入内容"></el-input>
                    </div>
                  </el-col>
                
                </el-row>
              </div>
            </div>
          
          </div>
         
        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import i18nService from "jw_services/i18n/index"
  import getAppConfig from './app-config.js'
  import appStore from "../../../stores/common.js"

  import JwTableHeaderControl from 'jw_components/table/control-header'
  import JwTable from '../../../mycomponent/table/table.vue'

  let loadingTimerId = 0

  const DEFAULT_ROW = [
    {
    name: '工艺',
    showName: '磨床',
    department: '加工科',
    getWay:'手动输入',
    createBy: '张三',
    createTime: '2018.6.15'
  },
   {
    name: '小马',
    showName: '磨床',
    department: '加工科',
    getWay:'手动输入',
    createBy: '张三',
    createTime: '2018.6.15'
  }
 
  ]

  export default {
    data() {
      return {
        iconFlag:true,
        entity:'',    //编辑数据
        parameterName:DEFAULT_ROW ,      //表格数据
        title:"",             //标题
        i:"",                //索引
        rows: [{
            name: '王小虎',
            parametervalue: '上海市普陀区金沙江路 1518 弄',
            unit: '男科',

          },
          {
            name: '王小虎',
            parametervalue: '上海市普陀区金沙江路 1518 弄',
            unit: '男科',

          },
          {
            name: '王小虎',
            parametervalue: '上海市普陀区金沙江路 1518 弄',
            unit: '男科',

          },


        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input: '焊接处数',



      }
    },
    components: {

      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl

    },
    created() {
    
    this.fetch()
    },
    methods: {
      //获得面包数据
      getTitle() {

        let {
          lang
        } = i18nService.getLanguageMap()
        let titles = i18nService.getI18nTitle().title

        if (this.isAddition()) {
          titles.push(lang['platform.common.add'])
        } else {
          if (this.entity) {
            titles.push(lang['platform.common.edit'])
            titles.push(this.entity.name)
          }
        }

        return titles
      },
      isAddition() {
        let additionCode = "0";

        return this.getParamId() === additionCode;
      },
      getParamId() {
        return this.$route.params.id;
      },
      //获得初始数据
      fetch() {
        let id = this.getParamId()

        this.showLoading()
        if (this.isAddition()) {
          appBaseModel.execute().then(result => {
            this.hideLoading()
            this.entity = result
            this.updateCategoryForNoAdminAppBase()
          }).catch(()=>{
            this.hideLoading(true)  
            this.networkFailHandler()
          })
        } else {
          let entity = appStore.get("row-data")
          let parameterName = appStore.get("parameter-name")
          let a={}
         for (const key in entity) {
           if (entity.hasOwnProperty(key)) {
                a[key]= key
            
           }
         }
      
          
          if(_.isEmpty(entity)) {
            return this.exit()
          }
       
          this.entity = entity
         
          // this.parameterName=parameterName
          // this.title=this.parameterName[0].name
        
          //this.updateCategoryForNoAdminAppBase()
       
          // this.parameterName.map(item=>{
          //     if(item.index==this.entity.index){
          //         item.checked=true
          //     }else{
          //       item.checked=false
          //     }
          // })
         this.i=this.entity.index
          this.hideLoading()
        }
      },
      //导航按钮
      getHeaderControl() {

        let {
          lang
        } = i18nService.getLanguageMap()

        let button = [{
          icon: '',
          type: 'save',
          btnType: 'primary',
          txt: "新增" || lang['platform.common.save']
        }]
        return button
      },
      onHeaderButtonClick() {

      },
      //回退
      exit() {

        this.$router.go(-1)
      },
      //点击行事件
      onRowClick(row){
        this.title=row.name
      },

      getTableConfig() {

        let {
          lang
        } = i18nService.getLanguageMap()
        let otherLang = i18nService.getOtherLanguageMap()

        return [{
          type: 'input',
          icon: 'el-icon-search',
          placeholder: otherLang.key
        }]
      },
      getTableState() {

        return getAppConfig().tableState
      },
      onChangeHandler() {

      },
      handleClick() {

      },
      handleNodeClick(data) {
       
      },
      //上传按钮
      uploadDocument() {
        let button = [{
          icon: 'el-icon-upload2',
          type: 'save',
          color: 'primary',
          txt: "上传" || lang['platform.common.save']
        }]
        return button
      },
      onEdit(row) {
        // row.checked=true
      //  console.log(row)
      // this.$refs.jwTable.toggleRowSelection(row,true)
        this.parameterName.map(item=>{
              if(item.index==row.index){
                  item.checked=true
              }else{
                item.checked=false
              }
          })

       this.i=row.index
       this.entity = row
        
      },
      onDelete() {

      },
      onPageChange() {

      },
      onOperateClick() {

      },
      getTableHeader() {

        return getAppConfig().tableParameters
      },
      thResource() {

        return getAppConfig().thResource
      },
      edit(event){
        let type=event.currentTarget.dataset.type
        this.iconFlag=!this.iconFlag
        if(type=='edit'){
         
        }
      },
      showLoading() {

        this.loading = true
      },
      hideLoading(is) {
      clearTimeout(loadingTimerId)
      if(is) {
        this.loading = false
      }else{
        loadingTimerId = setTimeout(()=>{ this.loading = false }, 500)
      }     
    },


    }
  }
</script>
<style lang="less">
  // @import "../../assets/css/base.less";
  .process-edit {
    .jw-table{
      height: calc(~"100% - 200px");
    }
    .edit-main {
      height: calc(~"100% - 50px");
      .panel-left {
        background-color: #fff;
        display: inline-block;
        box-sizing: border-box;
        width: 300px;
        height: 100%;
        vertical-align: top; // padding-right: @jw10px;
        // padding-top: @jw10px;
        margin-right: 10px;
        padding: 10px;
        .section{
          display: flex;
          justify-content: space-between;
          align-items: center;
         input{
           height: 30px;
         }
        }
        .table-control-status{
          .right{
              float: left;
          }
        }
      .el-table__body{
        .bluea{
          
                color: #409EFF;
                display: inline-block;
                border-bottom: 1px solid #409EFF;
                cursor: pointer;
                margin-left: 10px;
                padding-left: 0;
                padding-right: 0;
           
        }
        .reda{
                color: red;
                display: inline-block;
                border-bottom: 1px solid red;
                cursor: pointer;
                margin-left: 10px;
                padding-left: 0;
                padding-right: 0;
        }
    }
      }
      .panel-right {
        background-color: #fff; // vertical-align: top;
        display: inline-block;
        width: calc(~"100% - 315px");
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
        .title {
          height: 40px;
          line-height: 40px;
          padding:0 15px;
          color: #fff;
          background-color: #01012166;
          font-size: 18px;
        }
        .main {
          padding: 20px;
          .details {
            
            .list {
              padding: 0 20px;
              .name{
                font-size: 14px;
                margin-bottom: 5px;
              }
              span{
                font-weight: 700;
                display: inline-block;
                height: 40px;
                line-height: 40px;
              }
              input{
                font-weight: 700;
                font-size: 16px;
              }
            }
            .business{
              margin-top: 20px;
              .list{
                padding: 0px 20px;
                .name{
                  font-size: 14px;
                  margin-bottom: 5px;
                }
                span{
                  font-weight: 700;
                  display: inline-block;
                  height: 40px;
                  line-height: 40px;
                }
              }
            
            }
         
          }
        
        }

      }
    }

  }
</style>