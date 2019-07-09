import city from './city.js'
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
      total: 0,
      // 编辑订单相关
      editFormVisible: false,
      cityList: city,
      cityValues: [],
      // 查询物流相关
      wlFormVisible: false,
      wlList: [
        {
          'time': '2018-05-10 09:39:00',
          'ftime': '2018-05-10 09:39:00',
          'context': '已签收,感谢使用顺丰,期待再次为您服务',
          'location': ''
        },
        {
          'time': '2018-05-10 08:23:00',
          'ftime': '2018-05-10 08:23:00',
          'context': '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
          'location': ''
        },
        {
          'time': '2018-05-10 07:32:00',
          'ftime': '2018-05-10 07:32:00',
          'context': '快件到达 [北京海淀育新小区营业点]',
          'location': ''
        },
        {
          'time': '2018-05-10 02:03:00',
          'ftime': '2018-05-10 02:03:00',
          'context': '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
          'location': ''
        },
        {
          'time': '2018-05-09 23:05:00',
          'ftime': '2018-05-09 23:05:00',
          'context': '快件到达 [北京顺义集散中心]',
          'location': ''
        },
        {
          'time': '2018-05-09 21:21:00',
          'ftime': '2018-05-09 21:21:00',
          'context': '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
          'location': ''
        },
        {
          'time': '2018-05-09 13:07:00',
          'ftime': '2018-05-09 13:07:00',
          'context': '顺丰速运 已收取快件',
          'location': ''
        },
        {
          'time': '2018-05-09 12:25:03',
          'ftime': '2018-05-09 12:25:03',
          'context': '卖家发货',
          'location': ''
        },
        {
          'time': '2018-05-09 12:22:24',
          'ftime': '2018-05-09 12:22:24',
          'context': '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
          'location': ''
        },
        {
          'time': '2018-05-08 21:36:04',
          'ftime': '2018-05-08 21:36:04',
          'context': '商品已经下单',
          'location': ''
        }
      ]
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
