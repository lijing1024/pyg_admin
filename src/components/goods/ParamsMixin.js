export default {
  name: 'Params',
  data () {
    return {
      // 级联相关数据
      parentCate: [],
      selectedVal: [],
      // Tab栏相关数据
      activeName: 'many',
      // 控制添加按钮的禁用状态
      disabled: true,
      manyAttrs: [],
      onlyAttrs: [],
      // 添加参数相关数据
      addDialogVisiable: false,
      addForm: {
        attr_name: ''
      },
      addRules: {
        attr_name: [
          {required: true, message: '参数名称不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取级联中的分类数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类数据失败')
      this.parentCate = data
    },
    // 获取参数列表
    async getParams () {
      const len = this.selectedVal.length
      const id = this.selectedVal[len - 1]
      // 如果选的不是三级分类,清空当前选中的分类并将添加按钮设置为禁用状态
      if (len !== 3) {
        this.selectedVal = []
        this.disabled = true
      }
      const {data: {data, meta}} = await this.$axios.get(`categories/${id}/attributes`, {
        params: {sel: this.activeName}
      })
      if (meta.status !== 200) return this.$message.error('获取参数列表失败')
      this[`${this.activeName}Attrs`] = data
      this.disabled = false
    },
    // 选好第三级分类,获取对应的参数列表
    handleChange () {
      this.getParams()
    },
    // 切换tab选项时,重新获取参数列表
    handleClick () {
      this.getParams()
    },
    // 添加参数
    // 1.显示添加对话框
    showAddDialog () {
      this.addDialogVisiable = true
      // 重置表单
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 2.提交添加的数据
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const id = this.selectedVal[2]
          const {data: {meta}} = await this.$axios.post(`categories/${id}/attributes`, {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          })
          if (meta.status !== 201) return this.$message.error('添加参数失败')
          this.$message.success('添加参数成功')
          this.getParams()
          this.addDialogVisiable = false
        }
      })
    },
    // 删除参数
    delParams (attrId) {
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 当前分类的id
        const id = this.selectedVal[2]
        const {data: { meta }} = await this.$axios.delete(`categories/${id}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error('删除参数失败')
        this.$message.success('删除参数成功')
        this.getParams()
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
