<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="metric-card">
          <template #header>
            <div class="card-header">
              <span>Total Sales</span>
              <el-tag type="success">+12%</el-tag>
            </div>
          </template>
          <div class="metric-value">$24,500</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <template #header>
            <div class="card-header">
              <span>Orders</span>
              <el-tag type="warning">+5%</el-tag>
            </div>
          </template>
          <div class="metric-value">156</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <template #header>
            <div class="card-header">
              <span>Customers</span>
              <el-tag type="info">+8%</el-tag>
            </div>
          </template>
          <div class="metric-value">89</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <template #header>
            <div class="card-header">
              <span>Products</span>
              <el-tag type="danger">-2%</el-tag>
            </div>
          </template>
          <div class="metric-value">45</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Sales Overview</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button label="daily">Daily</el-radio-button>
                <el-radio-button label="weekly">Weekly</el-radio-button>
                <el-radio-button label="monthly">Monthly</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- Chart placeholder -->
            <div class="chart-placeholder">Sales Chart</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Recent Orders</span>
            </div>
          </template>
          <el-table :data="recentOrders" style="width: 100%">
            <el-table-column prop="id" label="Order ID" width="80" />
            <el-table-column prop="customer" label="Customer" />
            <el-table-column prop="amount" label="Amount" width="100">
              <template #default="{ row }">
                ${{ row.amount }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Order {
  id: number
  customer: string
  amount: number
  status: string
}

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const chartType = ref<'daily' | 'weekly' | 'monthly'>('daily')
    
    const recentOrders = ref<Order[]>([
      { id: 1, customer: 'John Doe', amount: 150, status: 'Completed' },
      { id: 2, customer: 'Jane Smith', amount: 200, status: 'Processing' },
      { id: 3, customer: 'Bob Johnson', amount: 175, status: 'Pending' },
      { id: 4, customer: 'Alice Brown', amount: 300, status: 'Completed' },
      { id: 5, customer: 'Charlie Wilson', amount: 250, status: 'Processing' }
    ])

    const getStatusType = (status: string): string => {
      const types: Record<string, string> = {
        'Completed': 'success',
        'Processing': 'warning',
        'Pending': 'info'
      }
      return types[status] || 'info'
    }

    return {
      chartType,
      recentOrders,
      getStatusType
    }
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.metric-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  text-align: center;
  padding: 10px 0;
}

.chart-row {
  margin-top: 20px;
}

.chart-container {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-placeholder {
  color: #909399;
  font-size: 16px;
}
</style> 