import echarts from 'echarts'
export default {
  name: 'Reports',
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('reports/type/1')
      if (meta.status !== 200) return this.$message.error('获取图表数据失败')
      // 合并获取到的数据和后台提供的配置项
      const lineChart = echarts.init(this.$refs.box)
      const options = {...this.options, ...data}
      lineChart.setOption(options)
    }
  },
  mounted () {
    this.loadData()
  }
}
