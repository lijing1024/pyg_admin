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
  // 计算属性--获取三级分类的ID
  computed: {
    thirdCateId: function () {
      if (this.selectedVal.length === 3) {
        return this.selectedVal[2]
      } else {
        return null
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
      // const len = this.selectedVal.length
      // const id = this.selectedVal[len - 1]
      // 如果选的不是三级分类,清空当前选中的分类并将添加按钮设置为禁用状态
      if (!this.thirdCateId) {
        this.selectedVal = []
        this.disabled = true
        return
      }
      const {data: {data, meta}} = await this.$axios.get(`categories/${this.thirdCateId}/attributes`, {
        params: {sel: this.activeName}
      })
      if (meta.status !== 200) return this.$message.error('获取参数列表失败')
      data.forEach(item => {
        // 动态参数属性值的渲染--如果不判断直接使用split，当tag的数量为空时会产生空的标签
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        // 添加字段，以便在添加参数时控制input标签的显示和隐藏
        item.inputShow = false
        item.inputValue = ''
      })
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
          // const id = this.selectedVal[2]
          const {data: {meta}} = await this.$axios.post(`categories/${this.thirdCateId}/attributes`, {
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
        // const id = this.selectedVal[2]
        const {data: { meta }} = await this.$axios.delete(`categories/${this.thirdCateId}/attributes/${attrId}`)
        if (meta.status !== 200) return this.$message.error('删除参数失败')
        this.$message.success('删除参数成功')
        this.getParams()
      }).catch(() => this.$message.info('已取消删除'))
    },
    // 封装公共的更新参数属性函数，以便在添加和删除属性值时调用
    async editAttrVals (row) {
      const {data: {meta}} = await this.$axios.put(
        `categories/${this.thirdCateId}/attributes/${row.attr_id}`, {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(',')
        })
      if (meta.status !== 200) return this.$message.error('更新参数值失败')
      this.$message.success('更新参数值成功')
    },
    // 删除动态参数属性
    delAttrVals (row, i) {
      // 删除标签的效果
      row.attr_vals.splice(i, 1)
      // 发送请求，删除对应的后台数据
      this.editAttrVals(row)
    },
    // // 添加动态参数属性,显示当前的input
    showInput (row) {
      row.inputShow = true
      // console.log(this.$refs.input)
      this.$nextTick(() => {
        this.$refs['input' + row.attr_id].focus()
      })
    },
    // 失去焦点时，隐藏input，显示tag，发送请求
    hideInput (row) {
      row.inputShow = false
      if (row.inputValue) {
        row.attr_vals.push(row.inputValue)
        this.editAttrVals(row)
        row.inputValue = ''
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
