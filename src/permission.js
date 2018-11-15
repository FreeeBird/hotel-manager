// import router from './router'
// import store from './store'
//
// const whiteList = ['/login'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   next()
//   // if (store.getters.token) {
//   //   if (to.path === '/login') {
//   //     next({ path: '/' })
//   //   } else {
//   //     if (store.getters.role == null | store.getters.role === '') {
//   //       store.dispatch('GetInfo', store.getters.username).then(res => {
//   //         store.uesr.role = res.role
//   //         next()
//   //       })
//   //     }
//   //   }
//   // } else {
//   //   if (whiteList.indexOf(to.path) !== -1) {
//   //     next()
//   //   } else {
//   //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//   //   }
//   // }
// })
//
// router.afterEach(() => {
// })
