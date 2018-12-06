<template>
  <div id="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>快捷操作</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <el-button type="primary">入住登记</el-button>
      <el-button type="primary">退房结账</el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      roomNumber: null,
    }
  },
  created: function () {

  },
  method:{

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
