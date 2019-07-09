export default {
  name: 'Orders',
  data () {
    return {
      reqParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      ordersList: [],
      total: 0
    }
  },
  methods: {
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('orders', {params: this.reqParams})
      if (meta.status !== 200) return this.$message.error('获取订单数据失败')
      this.ordersList = data.goods
      this.total = data.total
    },
    search () {
      this.reqParams.pagenum = 1
      this.loadData()
    },
    changePager (newPage) {
      this.reqParams.pagenum = newPage
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
