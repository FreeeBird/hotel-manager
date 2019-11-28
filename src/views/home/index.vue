<template>
  <div id="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>快捷操作</span>
          </div>
          <el-button type="primary"  @click="dialogFormVisible = true">入住登记</el-button>
          <el-button type="primary">退房结账</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>当前日期</span>
          </div>
          <p>{{ new Date() | formatDay }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>数据展示</span>
          </div>
          <div>系统已注册用户人数： <el-tag>{{userCount}}</el-tag></div>
          <div>系统已接受订单数量： <el-tag>{{orderCount}}</el-tag></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>客房住宿率</span>
          </div>
          <div id="liveRate" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>房型比例</span>
          </div>
          <div id="roomType" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>订单量</span>
          </div>
          <div id="order" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>各类型客房订单比例</span>
          </div>
          <div id="orderType" style="left:0;width: 100%;height: 250px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="入住登记" :visible.sync="dialogFormVisible">
      <el-form inline :model="form">
        <el-form-item label="预订人姓名" >
          <el-input v-model="form.name" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item label="预留手机号" >
          <el-input v-model="form.phone" autoComplete="on"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findOrder()">查询</el-button>
        </el-form-item>
      </el-form>
      <div v-if="isOrderShown && order!=null">
        订单号：{{ order.orderId }}<br>
        预订方式： {{ order.orderType }}<br>
        预订房型： {{ order.roomType }}<br>
        预订日期： {{ order.orderDate | formatDay }}<br>
        预订天数： {{ order.orderDays }}天<br>
        预订费用： {{ order.orderCost }}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelIn()">取 消</el-button>
        <el-button type="primary" @click="checkIn()">确定入住</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {getOrderByNameAndPhone, getOrderCount} from "../../api/order";
  import {getAllUser ,getUserCount} from "../../api/user"
  import {checkIn} from "../../api/checkIn"
  export default {
  name: 'Home',
  data(){
    return{
      roomNumber: null,
      dialogFormVisible: false,
        userCount: 1203,
        orderCount: 12032,
      form: {
        name: '',
        phone: ''
      },
      isOrderShown: false,
      order: null,
    }
  },
  created: function () {
      this.getCount();
  },
  mounted() {
    this.rtChart()
    this.lrChart()
    this.orderChart()
    this.ortChart()
  },
  methods:{
      getCount(){
          getUserCount().then(response => {
              this.userCount = response.data;
          });
          getOrderCount().then(res => {
              this.orderCount = res.data;
          });
      },
    rtChart(){
      var rtChart =  this.$echarts.init(document.getElementById('roomType'),'light')
      rtChart.setOption({
        tooltip: {},
        series: [{
          name: '比例',
          type: 'pie',
          radius: '55%',
          data: [
            {value: 35, name: '单人房'},
            {value: 55, name: '大床房'},
            {value: 45, name: '双床房'},
            {value: 55, name: '商务大床房'},
            {value: 45, name: '商务双床房'},
            {value: 35, name: '豪华大床房'},
          ]
        }]
      });
    },
    lrChart(){
      var myChart =  this.$echarts.init(document.getElementById('liveRate'),'light')
      myChart.setOption({

        xAxis: {
          type: 'category',
          data: [1,2,3,4,5,6,7,8,9,10,11,12],
          axisLabel: {
            formatter: '{value} 月'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        },
        series: [{
          data: [50, 68, 55.4, 53.2, 76.6, 80.6, 47.6,45.7,67.2,58.3,78.4,94.2],
          type: 'line'
        }]
      });
    },
    orderChart(){
      var myChart =  this.$echarts.init(document.getElementById('order'),'light')
      myChart.setOption({
        itemStyle:{
          color: '#409EFF',
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: 'category',
          data: [1,2,3,4,5,6,7,8,9,10,11,12],
          axisLabel: {
            formatter: '{value} 月'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 单'
          }
        },
        series: [{
          name: '订单量',
          data: [432, 568, 469, 532, 766, 806, 476,457,672,583,784,942],
          type: 'bar'
        }]
      });
    },
    ortChart(){
      var rtChart =  this.$echarts.init(document.getElementById('orderType'),'light')
      rtChart.setOption({
        tooltip: {},
        series: [{
          name: '比例',
          type: 'pie',
          radius: '55%',
          data: [
            {value: 35, name: '单人房'},
            {value: 15, name: '大床房'},
            {value: 10, name: '双床房'},
            {value: 15, name: '商务大床房'},
            {value: 5, name: '商务双床房'},
            {value: 20, name: '豪华大床房'},
          ]
        }]
      });
    },
    findOrder(){
      getOrderByNameAndPhone(this.form).then(res => {
        this.order = res.data;
      })
      if (this.order == null) {
        this.$message.warning("找不到相关预订信息！请检查")
        return
      }else {
        this.isOrderShown = true;
      }
    },
    cancelIn(){
      this.dialogFormVisible = false
      this.order = null
      this.isOrderShown = false
    },
    checkIn(){
      this.dialogFormVisible = false
        checkIn
      this.order = null
      this.isOrderShown = false
    }
  },
}
</script>

<style scoped>

  .el-row {
    margin: 10px 5px;
  }
  .el-card{
    text-align: center;
  }
</style>
