export default {
  name: 'Users',
  data () {
    // 自定义表单校验函数(手机号)
    const checkMobile = (rule, value, callback) => {
      if (!(/^1[345789]\d{9}$/.test(value))) return callback(new Error('手机号格式不正确'))
      callback()
    }
    return {
      // 搜索框动态数据绑定
      userList: [],
      // 获取用户列表时的get请求的传参
      reqParam: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      // 总页数
      total: 0,
      // 添加新用户相关数据
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户相关数据
      editDialogVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色相关数据
      roleDialogVisible: false,
      // 选中的角色
      roleValue: '',
      // 当前用户
      currentUser: '',
      // 当前角色
      currentRole: '',
      // 用户id(分配角色时需传入的参数)
      userId: '',
      // 下拉框所有的角色选项
      options: [],
      // 添加用户表单校验规则
      addRules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度在6-18位之间', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          // 自定义表单校验规则
          {validator: checkMobile, trigger: 'blur'}
        ]
      },
      // 编辑用户表单校校验规则
      editRules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          // 自定义表单校验规则
          {validator: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取用户数据列表
    async loadData () {
      const {data: {data, meta}} = await this.$axios.get('users', {params: this.reqParam})
      if (meta.status !== 200) return this.$message.error('获取用户数据失败')
      this.userList = data.users
      this.total = data.total
    },
    // 分页查询
    changePager (newPage) {
      this.reqParam.pagenum = newPage
      this.loadData()
    },
    // 搜索功能
    search () {
      this.reqParam.pagenum = 1
      this.loadData()
    },
    // 修改用户状态
    // newState 修改后的用户状态
    async updateState (uId, newState) {
      const {data: {meta}} = await this.$axios.put(`users/${uId}/state/${newState}`)
      if (meta.status !== 200) return this.$message.error('修改用户状态失败')
      this.$message.success('修改用户状态成功')
      this.loadData()
    },
    // 添加新用户
    // 1.显示添加对话框
    showAddDialog () {
      this.addDialogVisible = true
      // 重置表单数据
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 2.提交添加数据
    addUser () {
      // 校验表单数据
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 发送请求
          const {data: {meta}} = await this.$axios.post('users', this.addForm)
          if (meta.status !== 201) return this.$message.error('添加用户失败')
          // 添加用户成功
          this.$message.success('添加用户成功')
          this.dialogVisible = false
          this.loadData()
        }
      })
    },
    // 删除用户
    delUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求
        const {data: {meta}} = await this.$axios.delete(`users/${id}`)
        if (meta.status !== 200) return this.$message.error('删除用户失败')
        this.$message.success('删除用户成功')
        this.loadData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑用户
    // 1.显示编辑对话框
    async showEditDialog (id) {
      this.editDialogVisible = true
      // 获取该用户数据并渲染到表单上
      const {data: {data, meta}} = await this.$axios.get(`users/${id}`)
      if (meta.status !== 200) return this.$message.error('获取该用户信息失败')
      this.editForm = data
    },
    // 2.提交编辑数据
    editUser () {
      // 校验表单数据
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const {data: {meta}} = await this.$axios.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          if (meta.status !== 200) return this.$message.error('编辑用户失败')
          this.$message.success('编辑用户成功')
          this.editDialogVisible = false
          this.loadData()
        }
      })
    },
    // 分配角色
    // 1.显示角色分配对话框
    async showRoleDialog (row) {
      this.roleDialogVisible = true
      // a.显示当前用户及角色信息
      this.currentUser = row.username
      this.currentRole = row.role_name
      this.userId = row.id
      // b.渲染下拉框数据
      const {data: {data, meta}} = await this.$axios.get('roles')
      if (meta.status !== 200) return this.$message.error('获取所有角色数据失败')
      this.$message.success('获取所有角色数据成功')
      this.options = data
    },
    // 2.提交修改后的角色数据
    async assignRole () {
      const {data: {meta}} = await this.$axios.put(`users/${this.userId}/role`, {
        rid: this.roleValue
      })
      if (meta.status !== 200) return this.$message.error('修改用户角色失败')
      this.$message.success('修改用户角色成功')
      this.roleDialogVisible = false
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  }
}
