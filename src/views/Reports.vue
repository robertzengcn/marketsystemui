<template>
  <div class="reports-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="filter-card">
          <el-form :inline="true" :model="filterForm" class="filter-form">
            <el-form-item label="Date Range">
              <el-date-picker
                v-model="filterForm.dateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="dateShortcuts"
              />
            </el-form-item>
            <el-form-item label="Report Type">
              <el-select v-model="filterForm.reportType" placeholder="Select report type">
                <el-option label="Sales Report" value="sales" />
                <el-option label="Product Report" value="products" />
                <el-option label="Customer Report" value="customers" />
                <el-option label="Order Report" value="orders" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="generateReport">Generate Report</el-button>
              <el-button @click="exportReport">Export</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="report-content">
      <el-col :span="24">
        <el-card v-if="currentReport === 'sales'">
          <template #header>
            <div class="card-header">
              <span>Sales Report</span>
              <el-radio-group v-model="salesChartType" size="small">
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
          <el-table :data="salesData" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="date" label="Date" />
            <el-table-column prop="orders" label="Orders" />
            <el-table-column prop="revenue" label="Revenue">
              <template #default="{ row }">
                ${{ row.revenue.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="customers" label="Customers" />
            <el-table-column prop="averageOrderValue" label="Avg. Order Value">
              <template #default="{ row }">
                ${{ row.averageOrderValue.toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card v-else-if="currentReport === 'products'">
          <template #header>
            <div class="card-header">
              <span>Product Performance Report</span>
            </div>
          </template>
          <el-table :data="productData" style="width: 100%">
            <el-table-column prop="name" label="Product Name" />
            <el-table-column prop="category" label="Category" />
            <el-table-column prop="unitsSold" label="Units Sold" />
            <el-table-column prop="revenue" label="Revenue">
              <template #default="{ row }">
                ${{ row.revenue.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="Current Stock" />
          </el-table>
        </el-card>

        <el-card v-else-if="currentReport === 'customers'">
          <template #header>
            <div class="card-header">
              <span>Customer Report</span>
            </div>
          </template>
          <el-table :data="customerData" style="width: 100%">
            <el-table-column prop="name" label="Customer Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="totalOrders" label="Total Orders" />
            <el-table-column prop="totalSpent" label="Total Spent">
              <template #default="{ row }">
                ${{ row.totalSpent.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="lastOrder" label="Last Order" />
          </el-table>
        </el-card>

        <el-card v-else-if="currentReport === 'orders'">
          <template #header>
            <div class="card-header">
              <span>Order Report</span>
            </div>
          </template>
          <el-table :data="orderData" style="width: 100%">
            <el-table-column prop="id" label="Order ID" width="100" />
            <el-table-column prop="customer" label="Customer" />
            <el-table-column prop="date" label="Date" />
            <el-table-column prop="status" label="Status">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="Total">
              <template #default="{ row }">
                ${{ row.total.toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-empty v-else description="Select a report type to generate" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Reports',
  setup() {
    const filterForm = ref({
      dateRange: [],
      reportType: 'sales'
    })

    const salesChartType = ref<'daily' | 'weekly' | 'monthly'>('daily')

    const dateShortcuts = [
      {
        text: 'Last week',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: 'Last month',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: 'Last 3 months',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]

    const currentReport = computed(() => filterForm.value.reportType)

    // Mock data for reports
    const salesData = ref([
      { date: '2023-01-01', orders: 25, revenue: 1250.50, customers: 20, averageOrderValue: 50.02 },
      { date: '2023-01-02', orders: 30, revenue: 1500.75, customers: 25, averageOrderValue: 50.03 },
      { date: '2023-01-03', orders: 22, revenue: 1100.25, customers: 18, averageOrderValue: 50.01 },
      { date: '2023-01-04', orders: 35, revenue: 1750.00, customers: 30, averageOrderValue: 50.00 },
      { date: '2023-01-05', orders: 28, revenue: 1400.50, customers: 24, averageOrderValue: 50.02 }
    ])

    const productData = ref([
      { name: 'Product A', category: 'Electronics', unitsSold: 120, revenue: 6000.00, stock: 45 },
      { name: 'Product B', category: 'Clothing', unitsSold: 85, revenue: 4250.00, stock: 30 },
      { name: 'Product C', category: 'Home', unitsSold: 65, revenue: 3250.00, stock: 20 },
      { name: 'Product D', category: 'Electronics', unitsSold: 95, revenue: 4750.00, stock: 15 },
      { name: 'Product E', category: 'Clothing', unitsSold: 110, revenue: 5500.00, stock: 25 }
    ])

    const customerData = ref([
      { name: 'John Doe', email: 'john@example.com', totalOrders: 5, totalSpent: 1250.50, lastOrder: '2023-01-05' },
      { name: 'Jane Smith', email: 'jane@example.com', totalOrders: 3, totalSpent: 750.25, lastOrder: '2023-01-03' },
      { name: 'Bob Johnson', email: 'bob@example.com', totalOrders: 7, totalSpent: 1750.75, lastOrder: '2023-01-04' },
      { name: 'Alice Brown', email: 'alice@example.com', totalOrders: 2, totalSpent: 500.00, lastOrder: '2023-01-02' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', totalOrders: 4, totalSpent: 1000.50, lastOrder: '2023-01-01' }
    ])

    const orderData = ref([
      { id: 'ORD-001', customer: 'John Doe', date: '2023-01-05', status: 'Completed', total: 250.50 },
      { id: 'ORD-002', customer: 'Jane Smith', date: '2023-01-04', status: 'Processing', total: 175.25 },
      { id: 'ORD-003', customer: 'Bob Johnson', date: '2023-01-03', status: 'Completed', total: 300.75 },
      { id: 'ORD-004', customer: 'Alice Brown', date: '2023-01-02', status: 'Pending', total: 125.00 },
      { id: 'ORD-005', customer: 'Charlie Wilson', date: '2023-01-01', status: 'Completed', total: 200.50 }
    ])

    const getStatusType = (status: string): string => {
      const types: Record<string, string> = {
        'Completed': 'success',
        'Processing': 'warning',
        'Pending': 'info',
        'Cancelled': 'danger'
      }
      return types[status] || 'info'
    }

    const generateReport = () => {
      // TODO: Implement API call to generate report
      ElMessage.success('Report generated successfully')
    }

    const exportReport = () => {
      // TODO: Implement export functionality
      ElMessage.success('Report exported successfully')
    }

    return {
      filterForm,
      dateShortcuts,
      currentReport,
      salesChartType,
      salesData,
      productData,
      customerData,
      orderData,
      getStatusType,
      generateReport,
      exportReport
    }
  }
})
</script>

<style scoped>
.reports-container {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.report-content {
  margin-top: 20px;
}
</style> 