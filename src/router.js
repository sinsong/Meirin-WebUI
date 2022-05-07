import { createRouter, createWebHistory } from "vue-router"

/**
 * 路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/metapolicy',
      component: () => import('@/views/enum/metapolicy.vue')
    },
    {
      path: '/policy',
      component: () => import('@/views/enum/policy.vue')
    },
    {
      path: '/metapolicy/:id',
      name: 'editmetapolicy',
      component: () => import('@/views/editor/metapolicy.vue')
    },
    {
      path: '/policy/:id',
      name: 'editpolicy',
      component: () => import('@/views/editor/policy.vue')
    },
    {
      path: '/dsl',
      component: () => import('@/views/dsl.vue')
    },
    {
      path: '/request',
      component: () => import('@/views/request.vue')
    },
    {
      path: '/setting',
      component: () => import('@/views/setting.vue')
    },
  ]
})

export default router
