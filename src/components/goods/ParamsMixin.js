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
      onlyAttrs: []
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
      if (len !== 3) {
        this.selectedVal = []
        this.disabled = false
      }
      const {data: {data, meta}} = await this.$axios.get(`categories/${id}/attributes`, {
        params: {sel: this.activeName}
      })
      if (meta.status !== 200) return this.$message.error('获取参数列表失败')
      this[`${this.activeName}Attrs`] = data
    },
    // 选好第三级分类,获取对应的参数列表
    handleChange () {
      this.getParams()
    },
    // 切换tab选项时,重新获取参数列表
    handleClick () {
      this.getParams()
    }
  },
  mounted () {
    this.loadData()
  }
}
