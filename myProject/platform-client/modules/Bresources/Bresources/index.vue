<template>
    <div class="bresources panel">
        <!-- 头部面包屑 -->
        <jw-table-control
        :title="getTitle()"
        />
        <!-- 相关信息 -->
        <div class="info">
            <div class="draft" >
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title icon-aa-shoes">{{aa().a}}</p>
                    <span class="num icon-aa-yingyongzhongxin"> 20</span>
                </div>
            </div>
            <div class="draft" >
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">{{aa().b}}</p>
                    <span class="num"> 20</span>
                </div>
            </div>
            <div class="draft" >
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
            <div class="draft" >
                <div class="pic">
                    <i class="el-icon-date"></i>
                </div>
                <div class="details">
                    <p class="title">草稿中的</p>
                    <span class="num"> 20</span>
                </div>
            </div>
        </div>
        <!-- 搜索区 -->
        <el-row  class="search mgb">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="name">类别</span>
                    <el-select v-model="value" placeholder="选择类别">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
           <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="name">科室</span>
                    <el-select v-model="value" placeholder="选择科室">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
           </el-col>
           <el-col :span="8"  style="text-align: right">
                <div class="grid-content bg-purple">
                    <span class="name">创建时间</span>
                       <el-date-picker
                       style="margin-left:20px;width: calc(100% - 110px);"
                        v-model="value6"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                       </el-date-picker>
                </div>
           </el-col>
        </el-row>
        <!-- <handle :list='getHandle()' @onChange="onChange"> -->
       <!-- </handle> -->
        <el-row  class="search mgb">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <span class="name">状态</span>
                    <el-select v-model="value" placeholder="选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
           <el-col :span="8" >
                <div class="grid-content bg-purple">
                    <span class="name">创建者</span>
                      <el-input
                        style="width:auto;margin-right:56px"  
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="input">
                    </el-input>
                </div>
           </el-col>
           <el-col :span="8" style="text-align: right">
                <div class="grid-content bg-purple">
                    <span class="name">关键字</span>
                    <div class="quren" style="width: calc(100% - 110px);display:inline-block">
                        <el-input
                                style="width: calc(100% - 110px);;float:left"  
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                v-model="input">
                            </el-input>
                            <el-button>确认</el-button>
                    </div>
                </div>
           </el-col>
        </el-row>
        <!-- 工艺资源 -->
        <div class="resource">
            <div class="title">
                <h3>工艺资源</h3>
            </div>
                <jw-table
                style="padding: 10px 20px 0;"
                ref="jwTable"
                :data="rows"
                :isSelection=true
                :isRowCheckBox=true
                :isIndex=true
                :pageSize="pageSize"
                :opsList="getTableOperateList()"
                :showPagination="false"
                :totalCount="totalCount"
                :header="getTableHeader()"
                :currentPage="currentPage"
                @onEite='onEite'
                @onDelete='onDelete'
                @on-page-change="onPageChange"
                @on-operate-click="onOperateClick">
                </jw-table>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>    
        </div>
         <!-- 工艺参数 -->
        <div class="resource">
            <div class="title">
                <h3>工艺参数</h3>
            </div>
                <jw-table
                style="padding: 10px 20px 0;"
                ref="jwTable"
                :data="rows"
                :isSelection=true
                :isRowCheckBox=true
                :isIndex=true
                :pageSize="pageSize"
                :opsList="getTableOperateList()"
                :showPagination="false"
                :totalCount="totalCount"
                :header="getTableHeaderB()"
                :currentPage="currentPage"
                @onEite='onEite'
                @onDelete='onDelete'
                @on-page-change="onPageChange"
                @on-operate-click="onOperateClick">
                </jw-table>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>    
        </div>
          <!-- 物料工艺信息 -->
        <div class="resource">
            <div class="title">
                <h3>物料工艺信息</h3>
            </div>
                <jw-table
                style="padding: 10px 20px 0;"
                ref="jwTable"
                :data="rows"
                :isSelection=true
                :isRowCheckBox=true
                :isIndex=true
                :pageSize="pageSize"
                :opsList="getTableOperateList()"
                :showPagination="false"
                :totalCount="totalCount"
                :header="getTableHeaderC()"
                :currentPage="currentPage"
                @onEite='onEite'
                @onDelete='onDelete'
                @on-page-change="onPageChange"
                @on-operate-click="onOperateClick">
                </jw-table>
                <div class="more">
                    <i class="el-icon-plus"></i>
                    <span>加载更多</span>
                </div>    
        </div>
    </div>
</template>
<script>
import i18nService from 'jw_services/i18n/index'
import getAppConfig from './app-config.js'
import myfetch from '../../../axios/myfetch.js'

import JwTable from 'jw_components/table/table'
import JwTableHeaderControl from 'jw_components/table/control-header'
import Handle from '../../../mycomponent/handle'
export default {
    data(){
        return {
        // rows:[],   //表格数据
        pageSize:''||10,//页容量
        totalCount:''||27,//总条数
        currentPage:1,//当前页
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
        input: '',
        value6: '',
         rows: [{
          resourcename: '王小虎',
          showname: '上海市普陀区金沙江路 1518 弄',
          version: '男科',
          creatorName: '马玉',
          createdDate: '2016-05-02',
        },
        {
          resourcename: '王小虎',
          showname: '上海市普陀区金沙江路 1518 弄',
          version: '男科',
          creatorName: '马玉',
          createdDate: '2016-05-02',
        }, 
        {
          resourcename: '王小虎',
          showname: '上海市普陀区金沙江路 1518 弄',
          version: '男科',
          creatorName: '马玉',
          createdDate: '2016-05-02',
        }, 
        {
          resourcename: '王小虎',
          showname: '上海市普陀区金沙江路 1518 弄',
          version: '男科',
          creatorName: '马玉',
          createdDate: '2016-05-02',
        },  
        ]
        }
    },
    created(){
       
    },
    components: {
            'jw-table': JwTable,
            'jw-table-control': JwTableHeaderControl,
            'handle':Handle
            },
    methods:{
        onChange(a,b){
           
        },
        getHandle(){
            let otherLang = i18nService.getOtherLanguageMap()
            let { lang } = i18nService.getLanguageMap()
            return  [{
                type: 'select',
                options:[1,2,3],
                ppp:"",
                txt:'类别'|| lang['platform.common.add']
                },
                {
                type: 'select',
                options:[4,5,6],
                ppp:"",
                txt:'科室'|| lang['platform.common.add']
                },
                 {
                options:[1,2,3],
                ppp:"",     
                type: 'select',
                txt:'创建时间'|| lang['platform.common.add']
                }
              
                ]
            },
           aa(){
                let otherLang = i18nService.getOtherLanguageMap()
                let { lang } = i18nService.getLanguageMap()
                return {
                    a:lang['platform.app_app.editApp'],
                    b:lang['platform.app_app.permission']
                }
           },
           //获取面包屑导航 
           getTitle() {
            
                return i18nService.getI18nTitle().title
            },
            //折叠框
            getTableOperateList(){

            },
            //表头内容
            getTableHeader(){

                return getAppConfig().tableHeader
            },
            getTableHeaderB(){

                 return getAppConfig().tableHeaderB
            },
            getTableHeaderC(){

                 return getAppConfig().tableHeaderC
            },
            //页码切换
            onPageChange(){

            },
            //点击行
            onOperateClick(){

            },
            //编辑行
            onEite(row){
             
            },
            //删除行
            onDelete(row){
              
            }
    } ,
           
          
}
</script>   
<style lang="less">
  
    .bresources{
        padding: 20px;
        width: 100%;
        // min-width: 1400px;
        // height: 100%;
        overflow-x: hidden;
       box-sizing: border-box;
        position: absolute;
        .info{
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .draft{
                width: 25%;
                padding: 20px;
                background-color: #fff;
                margin-right: 20px;
                display: flex;
                margin-bottom: 30px;
                box-shadow: -2px 2px 2px #888888;
                &:last-child{
                    margin-right: 0px;
                }
                .pic{
                    width: 50px;
                    height: 50px;
                    background-color: coral;
                    margin-right: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i{
                        text-align: center;
                    }
                }
                .details{
                    
                    p{
                        margin-bottom: 10px;
                    }
                    .num{
                       
                        font-size: 20px;
                        font-weight: 700;
                    }
                }
            }

        }
        .search{
           .grid-content{
               .name{
                   width:80px;
                   display: inline-block;
                   text-align: left;
               }
           }
          
            } 
    
        .resource{
            background-color: #fff;
            padding-top: 10px;
            margin-bottom: 10px;
            h3{
                
            }
            .data{
                padding: 0px 10px 10px 10px;
                .has-gutter{
                    background-color: gray;
                    color: black
                }
            }
            .more{
                line-height: 26px;
                text-align: center;
            }
        }
    }
</style>


