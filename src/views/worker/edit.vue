<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>编辑操作员</span>
    </div>
    <el-form ref="form1" :model="form1" :rules="rules2" label-width="120px">
      <el-form-item
        prop="username"
        label="用户名">
        <el-tag>{{ form1.username }}</el-tag>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model.number="form1.name" placeholder="请输入真实姓名"/>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
      >
        <el-input v-model.number="form1.phone" type="number" placeholder="请输入手机号码" style="width: 50%"/>
        <el-button type="primary" disabled="">发送验证码</el-button>
      </el-form-item>
      <el-form-item
        prop="gender"
        label="性别">
        <el-radio v-model="form1.gender" label="男">男</el-radio>
        <el-radio v-model="form1.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item
        label="邮箱地址"
        prop="email"
      >
        <el-input v-model="form1.email" />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="address"
      >
        <el-input v-model="form1.address" placeholder="请输入地址"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { update, getById } from '@/api/worker'
import ElCard from "element-ui/packages/card/src/main";
export default {
  components: {ElCard},
  data() {
    return {
      form1: {
        workerId: null,
        username: null,
        password: null,
        pass: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        gender: null
      },
      loading: false,
      rules2: {
        name: [
          { required: true, message: '不能为空' }
        ],
        phone: [
          { required: true, message: '不能为空' }
        ],
        gender: [
          { required: true, message: '不能为空' }
        ]
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.form1.workerId = this.$route.params.id
      if (this.form1.workerId == null) {
        this.onCancel()
        return
      }
      getById(this.form1.workerId).then(res => {
        this.form1 = res.data;
      })
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form1).then(response => {
              const res = response;
            if (res.code===1000) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
            } else {
              this.showError(res.message)
              this.loading = false
            }
          }).catch(error => {
            this.loading = false
            this.showError(error)
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    showError(msg) {
      this.$message({
        message: msg,
        type: 'error'
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
