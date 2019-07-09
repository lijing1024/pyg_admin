export default {
  name: 'GoodsAdd',
  data () {
    return {
      // 当前步骤条的索引
      active: 0,
      // 添加商品form数据
      form: {
        goods_name: '',
        goods_cate: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: ''
      },
      // form校验规则
      rules: {
        goods_name: [
          {required: true, message: '商品名称不能为空', trigger: 'blur'}
        ],
        goods_cate: [
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
      selectedValues: []
    }
  },
  // 使用侦听器校验级联选中的是否为三级分类
  watch: {
    selectedValues (now, oldActiveName) {
      if (now.length === 3) {
        this.form.goods_cate = now.join(',')
      } else {
        this.form.goods_cate = ''
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
    }
    // changeTab (tab) {
    //   this.active = +tab.index
    // }
  },
  mounted () {
    this.getCates()
  }
}
