<template>
    <el-container id="container">
      <el-header >
        <span style="float: left">酒店管理系统</span>

        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left">入住登记</el-button>
          <el-button type="primary">退房登记<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>

        <el-dropdown>
          <el-button  type="primary"><el-badge is-dot class="item">username</el-badge></el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="isCollapse = true">查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item><el-button  @click="isCollapse=!isCollapse">s</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <!-- -->
      <el-container>
        <!-- 侧边栏-->
        <el-aside >
          <el-menu
            background-color="#324157"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">
            <el-menu-item index="0" @click="handleNav">
              <i class="el-icon-menu"></i>
              <span slot="title">展开/关闭侧边栏</span>
            </el-menu-item>
            <el-menu-item index="1" @click="navigateTo('/')">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="navigateTo('/roomType')">
              <i class="el-icon-document"></i>
              <span slot="title">房间类型管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigateTo('/roomInfo')">
              <i class="el-icon-setting"></i>
              <span slot="title">房间信息管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigateTo('/bookingType')">
              <i class="el-icon-setting"></i>
              <span slot="title">预订方式管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="navigateTo('/worker')">
              <i class="el-icon-setting"></i>
              <span slot="title">操作员管理</span>
            </el-menu-item>
            <el-menu-item index="6" @click="navigateTo('/order')">
              <i class="el-icon-setting"></i>
              <span slot="title">订单信息管理</span>
            </el-menu-item>
            <el-menu-item index="7" @click="navigateTo('/user')">
              <i class="el-icon-setting"></i>
              <span slot="title">客户信息管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
      <el-main>
        <router-view />
      </el-main>
      </el-container>
    </el-container>
</template>

<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import ElHeader from "element-ui/packages/header/src/main";
    import ElAside from "element-ui/packages/aside/src/main";
    import ElMain from "element-ui/packages/main/src/main";

    export default {
        name: "Container",
      components: { ElMain, ElAside, ElHeader, ElContainer},
      data() {
        return {
          isCollapse: false
        };
      },
      methods: {
        navigateTo(val){
          this.$router.push(val)
        },
        handleNav(){
          this.isCollapse = this.isCollapse == false ? true:false;
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
  #container{
    height: inherit;
  }

  .el-header {
    background-color: #409EFF;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 60px;
  }
  .el-header .el-dropdown{
    float: right;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  el-menu-vertical-demo{
    border-right: none;
  }
  .el-aside {
    color: #fff;
    width: inherit!important;
    /*height: 100%;*/
    background-color: #324157;
  }
</style>
