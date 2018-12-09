<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  data(){
    return{
    item:{
      path: '/user',
        component: Layout,
      meta: { title: '客户管理', icon: 'tree' },
      children: [
        {
          path: '',
          name: 'Guest',
          component: () => import('@/views/guest/index'),
          meta: { title: '客户管理', icon: 'tree' }
        },
        {
          path: 'add',
          name: 'AddGuest',
          hidden: true,
          component: () => import('@/views/guest/add'),
          meta: { title: '添加客户' }
        },
        {
          path: 'edit',
          name: 'EditGuest',
          hidden: true,
          component: () => import('@/views/guest/edit'),
          meta: { title: '编辑客户'}
        }
      ]
    },
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
