<template>
    <el-container id="container">
      <el-header >
        <span style="float: left;font-size: 24px">
          <i class="el-icon-location-outline"></i>
          酒店管理系统</span>
        <div class="info">
          <el-button type="primary" round>{{ roles[role] }}</el-button>
        <el-dropdown @command="handleCommand">
          <el-button icon="el-icon-info" type="primary">
            <el-badge is-dot class="item">{{ username }}</el-badge>
          </el-button>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item command="info">查看个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
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
              <i class="el-icon-sort"></i>
              <span slot="title">展开/关闭侧边栏</span>
            </el-menu-item>
            <el-menu-item index="1" @click="navigateTo('/')">
              <i class="el-icon-news"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="navigateTo('/roomType')" v-show="role == 'admin'">
              <i class="el-icon-goods"></i>
              <span slot="title">房间类型管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="navigateTo('/roomInfo')" v-show="role == 'admin'">
              <i class="el-icon-sold-out"></i>
              <span slot="title">房间信息管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="navigateTo('/bookingType')" v-show="role == 'admin'">
              <i class="el-icon-service"></i>
              <span slot="title">预订方式管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="navigateTo('/worker')" v-show="role == 'admin'">
              <i class="el-icon-setting"></i>
              <span slot="title">操作员管理</span>
            </el-menu-item>
            <el-menu-item index="6" @click="navigateTo('/order')" v-show="role != 'admin'">
              <i class="el-icon-mobile-phone"></i>
              <span slot="title">订单信息管理</span>
            </el-menu-item>
            <el-menu-item index="7" @click="navigateTo('/user')"  v-show="role != 'admin'">
              <i class="el-icon-edit-outline"></i>
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
    import Cookies from 'js-cookie'
    import { getByUsername } from "../../api/admin";
    import { getUserById } from "../../api/user";

    export default {
        name: "Container",
      components: { ElMain, ElAside, ElHeader, ElContainer},
      data() {
        return {
          isCollapse: false,
          isAdmin: null,
          username: null,
          userInfo: null,
          role: null,
          roles:{
            'admin': '管理员',
            'operator': '操作员'
          }
        }
      },
      created: function(){
        this.username = Cookies.get("admin_name")
          this.userInfo = null;
          this.role = Cookies.get("role");
      },
      methods: {
        handleCommand(command) {
          switch (command) {
            case 'logout':
              this.logout()
              break;
            default: break;
          }
        },
        navigateTo(val){
          this.$router.push(val)
        },
        handleNav(){
          this.isCollapse = this.isCollapse === false ? true:false;
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          this.$message.success("注销成功")
          Cookies.remove("admin_name")
            Cookies.remove("admin_id")
          Cookies.remove("role")
          this.$router.push('/login')
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
  .el-header .info{
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
