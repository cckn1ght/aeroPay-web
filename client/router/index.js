import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
// import UserRoles from 'utils/UserRoles'
Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Analytics',
      path: '/labs/analytics',
      meta: {auth: true},
      component: require('../views/analytics')
    },
    {
      name: 'Login',
      path: '/login',
      meta: {auth: false},
      component: require('../views/auth/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: {auth: false},
      component: require('../views/auth/Register')
    },
    {
      name: 'ForgotPassword',
      path: '/forgotpassword',
      meta: {auth: false},
      component: require('../views/auth/ForgotPassword')
    },
    {
      name: 'Iav',
      path: '/iav',
      meta: {auth: true},
      component: require('../views/iav/index.vue')
    },
    {
      path: '/account',
      redirect: '/account/info'
    },
    {
      path: '/transactions',
      redirect: '/transactions/1'
    },
    {
      path: '/customers',
      redirect: '/customers/1'
    },
    {
      path: '/',
      redirect: '/transactions/1'
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/transactions/1'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
