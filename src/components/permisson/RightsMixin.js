export default {
  name: 'Rights',
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    // 获取权限数据列表
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('rights/list')
      if (meta.status !== 200) return this.$message.error('获取权限列表数据失败')
      this.rightsList = data
    }

  },
  mounted () {
    this.loadData()
  }
}
