
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }
    ]
  }, {
    path: '/cart',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Cart.vue')
    }]
  }, {
    path: '/product/:slug',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Product.vue'),
      name: 'Product',
      props: true
    }]
  }, {
    path: '/bundle/:slug',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Bundle.vue'),
      name: 'Bundle',
      props: true
    }]
  }, {
    path: '/downloads/:transaction_number',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Downloads.vue'),
      props: true
    }]
  }, {
    path: '/profile',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Profile.vue'),
      props: true
    }]
  }, {
    path: '/wallet',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Wallet.vue'),
      props: true
    }]
  }, {
    path: '/wallet/fund',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/FundWallet.vue'),
      props: true
    }]
  }, {
    path: '/signup',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Signup.vue'),
      props: true
    }]
  }, {
    path: '/login',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Login.vue'),
      props: true
    }]
  }, {
    path: '/orders',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Orders.vue'),
      props: true
    }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
