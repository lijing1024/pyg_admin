export default {
  name: 'Goods',
  data () {
    return {
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      goodsList: []
    }
  },
  methods: {
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('goods', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取商品列表失败')
      // this.$message.success('获取商品列表成功')
      this.goodsList = data.goods
      this.total = data.total
    },
    // 分页查询
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.loadData()
    },
    // 搜素查询
    search () {
      this.reqParams.pagenum = 1
      this.loadData()
    },
    // 删除商品
    delGoods (id) {
      this.$confirm('此操作将永久删除该商品,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta}} = await this.$axios.delete(`goods/${id}`)
        if (meta.status !== 200) return this.$message.error('删除商品失败')
        this.$message.success('删除商品成功')
        this.loadData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加商品（编程式导航）
    toAdd () {
      this.$router.push('/goods/add')
    }
  },
  mounted () {
    this.loadData()
  }
}
