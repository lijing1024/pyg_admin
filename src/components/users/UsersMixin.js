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
      serchVal: '',
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
      dialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
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
      }
    }
  },
  methods: {
    // 请求数据
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
    // 添加新用户
    // 1.显示添加对话框
    showAddDialog () {
      this.dialogVisible = true
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
    }
  },
  mounted () {
    this.loadData()
  }
}
