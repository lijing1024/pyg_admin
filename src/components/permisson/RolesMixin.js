export default {
  name: 'Roles',
  data () {
    return {
      rolesList: []
    }
  },
  methods: {
    // 获取列表数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色列表数据失败')
      this.$message.success('获取角色数据成功')
      // data数据中有children字段,表格会默认渲染为树状结构(需指定唯一标识row-key)
      // 要渲染的数据只是第一层,故需要将children字段修改为其他名字
      // console.log(data)
      // data.forEach(item => {
      //   item.child = item.children
      //   delete item.children
      //   item.child.forEach(item => {
      //     item.child = item.children
      //     delete item.children
      //     item.child.forEach(item => {
      //       item.child = item.children
      //       delete item.children
      //     })
      //   })
      // })
      // 使用正则修改children字段为child
      const resData = JSON.parse(JSON.stringify(data).replace(/children/g, 'child'))
      this.rolesList = resData
      console.log(resData)
    }
  },
  mounted () {
    this.loadData()
  }
}
