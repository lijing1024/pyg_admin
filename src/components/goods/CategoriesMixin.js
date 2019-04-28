export default {
  name: 'Categories',
  data () {
    return {
      // 获取分类列表相关
      categoriesList: [],
      reqParam: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 添加分类相关
      addDialogVisible: false,
      addForm: {
        cat_name: ''
      },
      // 级联选择器相关数据
      // 下拉所有项数据
      parentCate: [],
      // 选中的分类
      selectedVal: [],
      addRules: {
        cat_name: [
          {required: true, message: '分类名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取所有分类数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('categories', {params: this.reqParam})
      if (meta.status !== 200) return this.$message.error('获取分类列表数据失败')
      this.categoriesList = data.result
      this.total = data.total
    },
    // 分页功能实现
    changePager (newPage) {
      this.reqParam.pagenum = newPage
      this.loadData()
    },
    // 添加分类
    // 1.显示添加对话框,渲染级联分类数据
    async showAddDialog () {
      // 要获取父级分类(一级分类和二级分类),传入type=2即可(两层数据)
      const {data: {data, meta}} = await this.$axios.get('categories', {
        params: {type: 2}
      })
      if (meta.status !== 200) return this.$message.error('获取父级分类失败')
      this.parentCate = data
      // 重置级联数据
      this.selectedVal = []
      this.addDialogVisible = true
      // 重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 2.提交添加的分类数据
    async addCate () {
      // 表单验证
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const len = this.selectedVal.length
          // 先判断选中的是几级分类
          if (len) {
            // 如果len有长度,其父级分类应该是selectedVal数组的最后一项
            this.addForm.cat_pid = this.selectedVal[len - 1]
          } else {
            // 如果len为0,即添加的是一级分类,接口文档要求cat_pid应设置为0
            this.addForm.cat_pid = 0
          }
          this.addForm.cat_level = len
          const {data: {meta}} = await this.$axios.post('categories', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加分类失败')
          this.$message.success('添加分类成功')
          this.addDialogVisible = false
          this.loadData()
        }
      })
    },
    // 级联绑定的数据变化时触发
    handleChange () {
    }
  },
  mounted () {
    this.loadData()
  }
}
