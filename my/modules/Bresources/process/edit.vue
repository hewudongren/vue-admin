<template>
  <div class="panel process-edit">
    <!-- 导航 -->
    <jw-table-control class="mgb" :title="getTitle()" :back="true" @back="exit" :buttons="getHeaderControl()" @on-header-button="onHeaderButtonClick"
    />
    <!-- 左侧 -->
    <div class="edit-wrapper">
      <div class='panel-left'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">
            <span slot="label">
              <i class="el-icon-date"></i>
            </span>
            <h4>标准描述库</h4>
            <jw-table-control float='left' :buttons="getTableConfig()" @on-input-change="onChangeHandler" />

            <el-tree :data="data" ref="tree" draggable accordion highlight-current :props="defaultProps" node-key="id" :default-expanded-keys="getTreeExpandId()"
              @node-click="onTreeClick">
            </el-tree>

          </el-tab-pane>
          <el-tab-pane label="用户管理" name="second">
            <span slot="label">
              <i class="el-icon-date"></i>
            </span> 你好</el-tab-pane>
          <el-tab-pane label="配置管理" name="third">
            <span slot="label">
              <i class="el-icon-date"></i>
            </span>配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="fourth">
            <span slot="label">
              <i class="el-icon-date"></i>
            </span>角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="five">
            <span slot="label">
              <i class="el-icon-date"></i>
            </span>定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
      <!-- 右侧 -->
      <div class='panel-right'>
        <h4 class="title" draggable='true'>上线</h4>
        <div class="main">
          <!-- 属性 -->
          <div class="attribute mgbb">
            <div class="name mgb blue">
              <span class="mgr">
                <i class="el-icon-info "></i>
              </span>
              属性
            </div>
            <!-- 工序详情 -->
            <div class="details">
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple-dark cc">
                    <div class="aa" draggable='true'>工序编号</div>
                    <div class="num">{{entity.code}}</div>
                    <div>创建者</div>
                    <div>
                      <span class="name num">{{entity.createBy}}</span>
                      <span class="time">{{entity.createTime}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content bg-purple-dark">
                    <div>工序名称</div>
                    <el-input style="margin-bottom:20px;" v-model="entity.name" placeholder="请输入内容"></el-input>
                    <div>版本</div>
                    <div>
                      <span class="name num">{{entity.version||1.0}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8" :offset="1">
                  <div class="grid-content bg-purple-dark">
                    <div>关联物料分类</div>
                    <div class="num">123457</div>
                    <div>状态</div>
                    <el-select style="width:100%" v-model="entity.status" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 操作步骤 -->
            <div class="step mgb">
              <div class="name">操作步骤</div>
              <div class="list">
                <ul>
                  <li>
                    <span class="num">1</span>
                    <span>在装配线体上放上工艺板
                      <i class="el-icon-close mgl"></i>
                    </span>
                  </li>
                  <li>
                    <span class="num">1</span>
                    <span></span>
                  </li>
                  <li>
                    <span class="num">1</span>
                    <span></span>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 关联文档 -->
            <div class="document">

              <jw-table-control float='left' :linkBlock=true :buttons="uploadDocument()" @on-header-button="onHeaderButtonClick">
                <span>关联文档</span>
              </jw-table-control>
              <div class="content">
                <ul>
                  <li>
                    <span>上线质量跟踪文档
                      <i class="el-icon-close mgl"></i>
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <!-- 工艺参数 -->
          <div class="parameter mgbb">
            <div>
              <h4 class="name">
                <span>
                  <i class="el-icon-more-outline"></i>
                </span> 工艺参数</h4>
            </div>
            <jw-table ref="jwTable" 
            :data="rows" 
            :isRowCheckBox=true 
            :showPagination="false" 
            :header="getTableHeader()" 
            @onEite='onEite'
            @onDelete='onDelete' @on-page-change="onPageChange" @on-operate-click="onOperateClick">
            </jw-table>
          </div>
          <!-- 工艺资源 -->
          <div class="parameter">
            <div>
              <h4 class="name">
                <span>
                  <i class="el-icon-more-outline"></i>
                </span>工艺资源</h4>
            </div>
            <jw-table ref="jwTable" 
            :data="rows" 
            :isRowCheckBox=true 
            :showPagination="false" 
            :header="thResource()" 
            @onEite='onEite'
            @onDelete='onDelete' @on-page-change="onPageChange" @on-operate-click="onOperateClick">
            </jw-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import i18nService from "jw_services/i18n/index"
  import getAppConfig from './app-config.js'
  import appStore from "../../../stores/common.js";

  import JwTableHeaderControl from 'jw_components/table/control-header'
  import JwTable from 'jw_components/table/table'

  import createUpdateAppModel from "../../../myfetch/standardProcedure/app-create-update.js";
  import getEdit from "../../../myfetch/standardProcedure/get-edit.js";
  import appBaseModel from "../../../myfetch/standardProcedure/app-base";

  let parentId = '0';
  let loadingTimerId = 0
  export default {
    data() {
      return {
        entity: {}, //编辑总数据
        loading: true, //loading
        rows: [{
            name: '力矩',
            parametervalue: [1, 2],
            unit: '牛/米',
          },
          {
            name: '料宽',
            parametervalue: '29',
            unit: '米',
          }
        ],
        options: [{
          value: '已启用',

        }, {
          value: '未启用',

        }],
        value: '',
        input: '',

        activeName: 'first',
        data: [{
          label: '总装',
          id: "0",
          children: [{
              label: '在装配线体上放上工艺板你好好好好阿红阿红阿红啊哈哈付款后付款垃圾客服哈利',
              id: "2"
            },
            {
              label: 'wwwww',
              id: "3"
            }
          ]

        }, {
          label: '钣金',
          id: "2",
          children: [{
              label: '在装配线体上放上工艺板',
              id: "4"
            },
            {
              label: 'wwwww',
              id: "5"
            }
          ]
        }, {
          label: '两器',
          id: "3",
          children: [{
              label: '在装配线体上放上工艺板',
              id: "6"
            },
            {
              label: 'wwwww',
              id: "6"
            }
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    components: {

      'jw-table': JwTable,
      'jw-table-control': JwTableHeaderControl

    },
    created() {
      this.fetch()
    },
    mounted() {

    },
    methods: {
      //默认展开的tree节点
      getTreeExpandId() {
        return [parentId]
      },
      getParamId() {
        return this.$route.params.id;
      },
      isAddition() {
        let additionCode = "0";

        return this.getParamId() === additionCode;
      },

      //获得编辑数据
      fetch() {
        let id = this.getParamId()

        this.showLoading()

        getEdit.execute({
          id: id
        }).then(result => {

          this.hideLoading()
          this.entity = result
          this.updateCategoryForNoAdminAppBase()
        }).catch(() => {
          this.hideLoading(true)
          let lang = i18nService.getOtherLanguageMap();



        })

      },
    
      exit() {

        this.$router.push({
          path: "/app/app/index"
        });
      },
      save() {
        let appBaseEditer = this.$refs.appBase

        appBaseEditer
          .validate()
          .then((data) => {
            let paramData = this.getValue()
            let lang = i18nService.getOtherLanguageMap()

            createUpdateAppModel.setParam(paramData)
            createUpdateAppModel
              .execute(this.isAddition())
              .then(() => {
                this.$success(lang["saveSuccess"])
                this.$router.push({
                  path: "/app/app/index"
                })
              })
              .catch(() => {
                this.$error(lang["saveFail"]);
              })
          }).catch(() => {
            this.scrollTop()
          })
      },
    
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
            // titles.push(this.entity.name)追加
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
      //导航按钮
      getHeaderControl() {

        let {
          lang
        } = i18nService.getLanguageMap()

        let button = [{
            icon: '',
            type: 'save',
            color: 'primary',
            txt: "保存" || lang['platform.common.save']
          },
          {
            icon: '',
            type: 'cancel',
            color: '',
            txt: "取消" || lang['platform.common.save']
          },
        ]
        return button
      },
      onHeaderButtonClick(buttons) {
        if (buttons.type == "save") {
          this.save()
        }
        if (buttons.type == 'cancel') {
          this.$router.go(-1)
        }
      },
      //回退
      exit() {

        this.$router.go(-1)
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
      onChangeHandler() {

      },
      handleClick() {

      },
      onTreeClick(data) {
        console.log(data);
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
      onEite() {

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
      showLoading() {

        this.loading = true
      },

      hideLoading(is) {
        clearTimeout(loadingTimerId)
        if (is) {
          this.loading = false
        } else {
          loadingTimerId = setTimeout(() => {
            this.loading = false
          }, 500)
        }
      },



    }
  }
</script>
<style lang="less">
  // @import "../../assets/css/base.less";
  .process-edit {
    .edit-wrapper {
      height: calc(~"100% - 40px");
      .panel-left {
        background-color: #fff;
        display: inline-block;
        box-sizing: border-box;
        width: 300px;
        height: 100%;
        vertical-align: top; // padding-right: @jw10px;
        // padding-top: @jw10px;
        margin-right: 10px; // border-right: 1px solid @seperate-line;
        .el-tabs__nav-scroll {
          padding-left: 30px;
          background-color: #01012166;
          .el-tabs__header {
            .el-tabs__item {
              // padding:0 20px;
              i {
                padding: 0 5px;
              }
            }
          }
        }
        .el-tabs__content {
          padding: 0 10px;
          .control-header {
            margin-top: 10px;
            .left {
              width: 100%;
            }

          }
          .el-tree-node__children {
            .el-tree-node__label {
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
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
          padding-left: 10px;
          color: #fff;
          background-color: #01012166;
        }
        .main {
          padding: 20px;
          .attribute {
            .name {
              font-weight: 700;
            }
            .details {
              .num {
                height: 40px;
                line-height: 40px;
                margin-bottom: 20px;
              }
            }
            .step {
              margin-top: 20px;
              .name {
                margin-bottom: 10px;
              }
              .list {
                border: 1px solid #409EFF;
                padding: 5px;
                ul {
                  li {
                    margin-bottom: 10px;
                    .num {
                      display: inline-block;
                      width: 20px;
                      height: 20px;
                      text-align: center;
                      line-height: 20px;
                      background-color: gray;
                      border-radius: 3px;
                      margin-right: 10px;

                    }
                  }
                }
              }
            }
            .document {
              .content {
                border: 1px solid gray;
                padding: 5px;
                ul {
                  li {
                    background-color: gray;
                    display: inline-block
                  }
                }
              }
            }
          }
          .parameter {
            .name {
              span {
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                border: 1px solid gray;
              }
            }
          }
        }

      }
    }

  }
</style>