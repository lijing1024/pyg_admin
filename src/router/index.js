// import Vue from 'vue'
// import Router from 'vue-router'
const Login = () => import('@/components/Login')
const Home = () => import('@/components/home/Home')
const Welcome = () => import('@/components/home/Welcome')
const Users = () => import('@/components/users/Users')
const Rights = () => import('@/components/permisson/Rights')
const Roles = () => import('@/components/permisson/Roles')
const Categories = () => import('@/components/goods/Categories')
const Params = () => import('@/components/goods/Params')
const Goods = () => import('@/components/goods/Goods')
const GoodsAdd = () => import('@/components/goods/GoodsAdd')
const Orders = () => import('@/components/orders/Orders')
const Reports = () => import('@/components/reports/Reports')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      // home组件即对应index界面,故跟路径需重定向至/home
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', name: 'welcome', component: Welcome},
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/categories', name: 'categories', component: Categories},
        {path: '/params', name: 'params', component: Params},
        {path: '/goods', name: 'goods', component: Goods},
        {path: '/goods/add', name: 'goodsadd', component: GoodsAdd},
        {path: '/orders', name: 'orders', component: Orders},
        {path: '/reports', name: 'reports', component: Reports}
      ]
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!sessionStorage.getItem('token')) return next('/login')
  // 一定得调用next()方法,否则不会向下进行
  next()
})

export default router
