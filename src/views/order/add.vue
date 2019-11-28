<template>
  <el-card class="app-container"  shadow="always">
    <div slot="header">
      <span>添加预订</span>
    </div>
    <el-form ref="form1" :model="form1" >
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住人"
        prop="name"
      >
        <el-input v-model="form1.name" placeholder="请输入入住人姓名"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form1.phone" placeholder="请输入预留手机号"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间类型">
        <el-select v-model="form1.roomTypeId" :change="idToType(form1.roomTypeId,null)" placeholder="请选择房间类型">
          <el-option v-for="rt in roomTypeList" v-show="rt.rest>0" :label="rt.roomType" :value="rt.typeId" :key="rt.typeId">
            {{ rt.typeId + ' ' + rt.roomType + '(' + rt.price + '元)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住日期"
      >
        <el-date-picker
          v-model="orderDateRange"
          type="daterange"
          @change="calcDays"
          range-separator=" 至 "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="expireTimeOption">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住天数"
        prop="orderDays"
      >
        <!--<el-input-number v-model="form1.orderDays" @change="idToType(form1.roomTypeId)" :min="1" label="预订天数"></el-input-number>-->
        {{ form1.orderDays + ' 晚' }}
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预订方式">
        <el-select v-model="form1.orderTypeId" :change="idToType(null,form1.orderTypeId)" placeholder="请选择预订方式">
          <el-option v-for="t in orderTypeList" :label="t.type" :value="t.typeId" :key="t.typeId">
            {{ t.typeId + ' ' + t.type }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="订单费用"
        prop="orderCost"
      >
       {{ '￥' + form1.orderCost.toFixed(2) }}
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { addOrder } from "../../api/order";
  import {getAllOrderType } from "../../api/orderType";
  import { getAllRoomType } from "../../api/roomType";

  export default {
        name: "add",
      data() {
        return {
          form1: {
            orderTypeId:null,
            orderType: null,
            roomTypeId: null,
            userId:0,
            name: '',
            phone:'',
            orderDate: null,
            orderDays: 1,
            orderCost: 0
          },
          orderDateRange:null,
          loading: false,
          roomTypeList: [],
          orderTypeList: [],
            expireTimeOption:{
              disabledDate: time =>{
                  return time.getTime() < Date.now()-24*60*60*1000;
              },
            },
        }
      },
      created: function() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          getAllOrderType().then(res => {
            this.orderTypeList = res.data;
          })
          getAllRoomType().then(res => {
            this.roomTypeList = res.data;
          })
        },
        idToType(rtId,otId) {
          if (rtId == null){
            this.orderTypeList.forEach(t => {
              if (otId === t.typeId) {
                this.form1.orderType = t.type
              }
            })
          } else {
            this.roomTypeList.forEach(type => {
              if (rtId === type.typeId) {
                this.form1.roomType = type.roomType
                this.form1.orderCost = type.price*this.form1.orderDays
              }
            })
          }

        },
        calcDays(){
          this.form1.orderDate = this.orderDateRange[0]
            var days = this.orderDateRange[1].getTime() - this.orderDateRange[0].getTime();
          this.form1.orderDays = days / (24*60*60*1000);
        },
        onSubmit() {
          this.$refs.form1.validate((valid) => {
            if (valid) {
              this.loading = true
              addOrder(this.form1).then(response => {
                  const res = response;
                if(res.code === 1000){
                  this.$message({
                    message: '提交成功！',
                    type: 'success'
                  })
                  this.loading = false
                  setTimeout(this.onCancel(), 20000)
                }else {
                  this.showError()
                  this.loading = false
                }
              })
            } else {
              this.loading = false
              return false
            }
          })
        },
        showError() {
          this.$message({
            message: '提交失败！',
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

</style>
