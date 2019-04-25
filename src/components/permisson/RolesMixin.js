export default {
  name: 'Roles',
  data () {
    return {
      rolesList: [],
      // 添加用户相关
      addDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addRules: {
        roleName: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述不能为空', trigger: 'blur'}
        ]
      },
      // 编辑用户相关
      editDialogVisible: false,
      editForm: {},
      editRules: {
        roleName: [
          {required: true, message: '角色名称不能为空', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '角色描述不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取列表数据
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('roles')
      if (meta.status !== 200) return this.$message.error('获取角色列表数据失败')
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
    },
    // 添加角色
    // 1.显示添加对话框
    showAddDialog () {
      this.addDialogVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 2.提交添加信息
    addRole () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$axios.post('roles', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加用户失败')
          this.$message.success('添加用户成功')
          this.addDialogVisible = false
          this.loadData()
        }
      })
    },
    // 编辑角色
    // 1.显示编辑对话框,渲染默认数据
    async showEditDialog (id) {
      // a.显示对话框
      this.editDialogVisible = true
      // b.根据id获取当前角色数据
      const {data: {data, meta}} = await this.$axios.get(`roles/${id}`)
      if (meta.status !== 200) return this.$message.error('获取该角色信息失败')
      this.$message.success('获取该用户信息成功')
      this.editForm = data
      console.log(data)
    },
    // 2.提交编辑数据
    editRole () {
      // a.验证表单
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          // b.验证通过,提交数据
          const {data: {meta}} = await this.$axios.put(`roles/${this.editForm.roleId}`, {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          })
          if (meta.status !== 200) return this.$message.error('编辑用户失败')
          this.$message.success('编辑用户成功')
          this.editDialogVisible = false
          this.loadData()
        }
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
