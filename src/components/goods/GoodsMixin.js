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
      this.$message.success('获取商品列表成功')
      this.goodsList = data.goods
      this.total = data.total
    }
  },
  mounted () {
    this.loadData()
  }
}
