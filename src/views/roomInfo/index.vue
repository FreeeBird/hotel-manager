<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>房间信息管理</span>
      <el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"/>
      <el-table-column
        prop="roomId"
        label="编号"
        width="50"/>
      <el-table-column
        label="房间号码">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>详细描述: </p>
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomNumber }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="房间类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <!--<p>详细描述: </p>-->
            <!--<p>{{ scope.row.remark }}</p>-->
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomType }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="roomPrice"
        label="价格"/>
      <el-table-column
        label="折扣">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.roomDiscount + '%' }}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="desc"-->
      <!--label="详细描述"/>-->
      <el-table-column
        prop="roomStatus"
        label="状态">
        <template slot-scope="scope">
          <!--<el-tag :type="showStatus(scope.row.roomStatus)">{{ scope.row.roomStatus }}</el-tag>-->
          <el-button :type="showStatus(scope.row.roomStatus)" size="mini">{{ scope.row.roomStatus | formatStatus }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="修改时间|创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>
          <br>
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger" @click="scope.row.visible2 = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 14px;">
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加房间信息</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

import { getAllRoom, delRoom} from "../../api/roomInfo";

export default {
  filters: {
    formatStatus: function(value) {
      switch (value) {
        case 0: return '不可用'
        case 1: return '空闲'
        case 2: return '已预订'
        case 3: return '已入住'
      }
    }
  },
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      list: null,
      listLoading: true
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAllRoom().then(response => {
        this.list = response.data;
        this.listLoading = false;
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomInfo/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/roomInfo',
        name: 'EditRoom',
        params: {
          id: row.roomId
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      delRoom(row.roomId).then(response => {
          const res = response;
        if (res.code === 1000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.list.push();
          row.loading = false
          this.fetchData()
        } else {
          this.$message({
            message: '删除失败！',
            type: 'error'
          })
        }
      }).catch(error => {
        row.loading = false
        console.log(error)
      })
      row.loading = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    showStatus(val) {
      switch (val) {
        case 0: return 'info'
        case 1: return 'success'
        case 2: return 'warning'
        case 3: return 'danger'
      }
    }
  }
}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
