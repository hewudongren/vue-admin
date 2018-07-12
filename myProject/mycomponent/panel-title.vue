/*
 * Panel 顶部的title显示板
 *
 *@author gill
 *@date 2018-05-10
 */

<template>
  <div class="panel-title" v-if="title && title.length" :title="back? '点击回退':''" @click="onBack">
    <i v-if="back" class="icon-back"></i>
    <template v-for="(item,i) in titleArr">
      <template v-if="_.isString(item)"><span :key="i" class="nav">{{item}}</span>  </template>
      <template v-else-if="_.isNumber(item)"><i :key="i" class="node-seperate icon-right" /></template>
    </template>
  </div>
</template>

<script>
export default {
  props:[ 'title','back' ],
  computed: {

    titleArr() {
      let titleArr = []
      let titles = this.title
     
      if(_.isArray(titles) && titles.length) {

        if(titles.length>1) {

          _.each(titles,(t)=>{
            titleArr.push(t)
            //添加标示符
            titleArr.push(-1000)
          })
           //删除最后一个 
          titleArr.pop()
          return titleArr
        }

        return titles
      }

      return [ this.title ]
    }
  },

  methods: {
    onBack() {
      // 如果没有传参，可不必提交事件
      this.$router.go(-1)
      // this.$emit('back')
    }
  }
}
</script>

<style lang="less">
@import "../assets/css/variable.less";

.panel-title {
  padding-bottom: @jw10px;
  line-height: 2.071rem;
  border-bottom: 1px solid #c4c6cc;
  font-size: @font-large;
  .nav:last-of-type{
    color: blue;
  }
  .icon-back {
    margin-right: @jw5px;
    font-size: 25px;
    padding: 0 @jw5px;
    vertical-align: middle;
    border-radius: 3px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    color: #fff;
    background-color: #eee;
    border: 1px solid #eee;
  }

  .node-seperate {
    vertical-align: middle;
  }
}
</style>