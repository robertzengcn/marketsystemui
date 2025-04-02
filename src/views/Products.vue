<template>
  <div class="products">
    <div class="page-header">
      <h2>Products</h2>
      <el-button type="primary" @click="showAddDialog">Add Product</el-button>
    </div>

    <el-card>
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="Search products..."
          style="width: 200px"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="categoryFilter" placeholder="Category" clearable>
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-table
        v-loading="loading"
        :data="filteredProducts"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="category" label="Category" width="120" />
        <el-table-column prop="price" label="Price" width="120">
          <template #default="scope">
            ${{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="Stock" width="100" />
        <el-table-column label="Status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.stock > 10 ? 'success' : 'danger'">
              {{ scope.row.stock > 10 ? 'In Stock' : 'Low Stock' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              type="primary"
              plain
            >
              Edit
            </el-button>
            <el-button
              size="small"
              @click="handleDelete(scope.row)"
              type="danger"
              plain
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Add/Edit Product Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? 'Add Product' : 'Edit Product'"
      width="500px"
    >
      <el-form
        ref="productForm"
        :model="productForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="productForm.name" />
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="productForm.category" placeholder="Select category">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input-number
            v-model="productForm.price"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="Stock" prop="stock">
          <el-input-number
            v-model="productForm.stock"
            :min="0"
            :precision="0"
          />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            v-model="productForm.description"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ dialogType === 'add' ? 'Add' : 'Save' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'Products',
  components: {
    Search
  },
  setup() {
    const store = useStore()
    const loading = ref(false)
    const submitting = ref(false)
    const dialogVisible = ref(false)
    const dialogType = ref('add')
    const searchQuery = ref('')
    const categoryFilter = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const productFormRef = ref(null)

    const productForm = ref({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: ''
    })

    const categories = [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'food', label: 'Food' },
      { value: 'books', label: 'Books' }
    ]

    const rules = {
      name: [
        { required: true, message: 'Please enter product name', trigger: 'blur' }
      ],
      category: [
        { required: true, message: 'Please select category', trigger: 'change' }
      ],
      price: [
        { required: true, message: 'Please enter price', trigger: 'blur' }
      ],
      stock: [
        { required: true, message: 'Please enter stock', trigger: 'blur' }
      ]
    }

    const filteredProducts = computed(() => {
      // Implement filtering logic here
      return store.state.products
    })

    const showAddDialog = () => {
      dialogType.value = 'add'
      productForm.value = {
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
      }
      dialogVisible.value = true
    }

    const handleEdit = (row) => {
      dialogType.value = 'edit'
      productForm.value = { ...row }
      dialogVisible.value = true
    }

    const handleDelete = () => {
      ElMessageBox.confirm(
        'Are you sure you want to delete this product?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(async () => {
        try {
          // Implement delete logic here
          ElMessage.success('Product deleted successfully')
        } catch (error) {
          ElMessage.error('Failed to delete product')
        }
      })
    }

    const handleSubmit = async () => {
      if (!productFormRef.value) return
      
      try {
        await productFormRef.value.validate()
        submitting.value = true
        
        // Implement submit logic here
        ElMessage.success(
          dialogType.value === 'add'
            ? 'Product added successfully'
            : 'Product updated successfully'
        )
        dialogVisible.value = false
      } catch (error) {
        ElMessage.error('Please check your input')
      } finally {
        submitting.value = false
      }
    }

    const handleSearch = () => {
      currentPage.value = 1
      // Implement search logic here
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      // Implement pagination logic here
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
      // Implement pagination logic here
    }

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('fetchProducts')
      } catch (error) {
        ElMessage.error('Failed to fetch products')
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      submitting,
      dialogVisible,
      dialogType,
      searchQuery,
      categoryFilter,
      currentPage,
      pageSize,
      total,
      productForm,
      productFormRef,
      categories,
      rules,
      filteredProducts,
      showAddDialog,
      handleEdit,
      handleDelete,
      handleSubmit,
      handleSearch,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.products {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 