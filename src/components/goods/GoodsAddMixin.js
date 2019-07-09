export default {
  name: 'GoodsAdd',
  data () {
    return {
      // 当前步骤条的索引
      active: 0,
      // 添加商品form数据
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: []
      },
      // form校验规则
      rules: {
        goods_name: [
          {required: true, message: '商品名称不能为空', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '商品必须属于三级分类下', trigger: 'change'}
        ],
        goods_price: [
          {required: true, message: '商品价格不能为空', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '商品数量不能为空', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '商品重量不能为空', trigger: 'blur'}
        ]
      },
      // 级联相关数据
      categoryList: [],
      selectedValues: [],
      // 第二、三个选项卡的参数数据
      manyAttrs: [],
      onlyAttrs: [],
      // 上传图片相关数据
      // action上传图片地址的全路径
      action: this.$axios.defaults.baseURL + 'upload',
      // 请求不是通过axios,故需要添加token
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  // 使用侦听器校验级联选中的是否为三级分类
  watch: {
    selectedValues (now, oldActiveName) {
      if (now.length === 3) {
        this.form.goods_cat = now.join(',')
      } else {
        this.form.goods_cat = ''
        // this.selectedValues = ''
      }
    }
  },
  methods: {
    handleChange () {
    },
    // 获取级联分类的数据
    async getCates () {
      const {data: {data, meta}} = await this.$axios.get('categories')
      if (meta.status !== 200) return this.$message.error('获取分类信息失败')
      this.categoryList = data
    },
    // 切换tab之前校验表单
    changeTabBefore (activeName, oldActiveName) {
      // console.log(activeName, oldActiveName)
      if (oldActiveName === '0') {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              // 校验成功，切换至对应的步骤条
              this.active = +activeName
              // 调用获取参数的方法，获得第二、三个选项卡的数据
              this.getParams('many')
              this.getParams('only')
              resolve()
            } else {
              reject(new Error('表单校验失败'))
            }
          })
        })
      } else {
        // 如果不是第一个选项卡，直接切换步骤条即可
        this.active = +activeName
      }
    },
    // changeTab (tab) {
    //   this.active = +tab.index
    // }
    // 获取第二个和第三个选项卡的数据
    async getParams (type) {
      const id = this.selectedValues[2]
      const {data: {data, meta}} = await this.$axios.get(`categories/${id}/attributes`, {
        params: {sel: type}
      })
      if (meta.status !== 200) return this.$message.error('获取参数信息失败')
      this[type + 'Attrs'] = data
    },
    // 上传图片
    handleSuccess (res) {
      // 上传成功，将图片地址追加至data中的form.pics数组中
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('图片上传失败')
      this.form.pics.push({pic: res.data.tmp_path})
    },
    // 预览图片
    handlePictureCardPreview (file) {
      // console.log(file)
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    // 删除图片(移除pics数组中对应的图片)
    handleRemove (file, fileList) {
      // 根据图片URL找到对应的索引，删除数组中该索引对应的值
      const path = file.response.data.tmp_path
      const index = this.form.pics.findIndex(item => {
        return item.pic === path
      })
      this.form.pics.splice(index, 1)
    },
    // 提交保存
    async addSubmit () {
      // 合并动态参数和静态参数
      this.form.attrs = {...this.manyAttrs, ...this.onlyAttrs}
      const {data: {meta}} = await this.$axios.post('goods', this.form)
      if (meta.status !== 201) return this.$message.error('商品录入失败')
      // 录入成功，跳转至列表页
      this.$router.push('/goods')
    }
  },
  mounted () {
    this.getCates()
  }
}
