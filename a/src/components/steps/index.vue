/**
 *步骤
 *
 *@author gill
 *@date 2018-05-09
 */

<template>
  <el-steps v-if="isSupport" :active="active" finish-status="success" class="jw-steps">
    <el-step v-for="(step,i) in formatSteps" :key="i" :title="step.title" :description="step.desc"></el-step>
    <el-step :title="lastStep.title" :description="lastStep.desc" class="last"></el-step>
    <div class="el-step step-none"></div>
  </el-steps>
</template>

<script>
import util from 'jw_common/util'

export default {
  props: ["steps", "active"],

  data() {

    let formatted =  this.formatStep()

    return formatted
  },

  watch: {

    steps(newSteps) {
      let formatted = this.formatStep(newSteps)

      this.isSupport = formatted.isSupport
      this.formatSteps = formatted.formatSteps
      this.lastStep = formatted.lastStep
    }
  },

  methods: {
    
    formatStep(newSteps) {
      let steps = newSteps || this.steps
      let lastStep = null

      if (steps.length > 1) {
        lastStep = steps.pop()
      }

      return {
        isSupport: !util.isIE9(),
        formatSteps: steps,
        lastStep: lastStep
      }
    }
  }
};
</script>
<style lang="less">
.jw-steps {
  .step-none {
    display: none;
  }

  .el-step__description {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .last {
    text-align: right;

    .el-step__main {
      text-align: right;
    }

    .el-step__description {
      padding-right: 0;
    }
  }
}
</style>
