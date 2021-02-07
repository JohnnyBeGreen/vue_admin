import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Auth from '@/layouts/Auth'
import Public from '@/layouts/Public'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/public/Home'),
    meta: {
      layout: Public,
      requiresAuth: false
    }
  },

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/auth/Home'),
    meta: {
      layout: Auth,
      requiresAuth: true
    },
  },
  {
    path: '/admin/modules/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "admin/modules/news" */ '../views/auth/modules/news/News'),
    meta: {
      layout: Auth,
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        name: 'news-list',
        component: () => import(/* webpackChunkName: "admin/modules/news/list" */ '../views/auth/modules/news/List'),
        meta: {
          layout: Auth,
          requiresAuth: true
        }
      },
      {
        path: 'add',
        name: 'news-add',
        component: () => import(/* webpackChunkName: "admin/modules/news/add" */ '../views/auth/modules/news/Add'),
        meta: {
          layout: Auth,
          requiresAuth: true,
          breadcrumbs: () => {
              return [
                  {name: 'список', to: '/admin/modules/news/list'},
                  {name: 'добавление новости'},
              ]
          }
        }
      },
      {
        path: 'edit/:id',
        name: 'news-edit',
        component: () => import(/* webpackChunkName: "admin/modules/news/edit" */ '../views/auth/modules/news/Add'),
        meta: {
          layout: Auth,
          requiresAuth: true,
          breadcrumbs: () => {
              return [
                  {name: 'список', to: '/admin/modules/news/list'},
                  {name: 'редактирование новости'},
              ]
          }
        }
      },
      {
        path: 'settings',
        name: 'news-settings',
        component: () => import(/* webpackChunkName: "admin/modules/news/edit" */ '../views/auth/modules/news/Settings'),
        meta: {
          moduleName: 'news',
          layout: Auth,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/admin/modules/registry',
    name: 'registry',
    component: () => import(/* webpackChunkName: "admin/registry" */ '../views/auth/Registry'),
    meta: {
      layout: Auth,
      requiresAuth: true
    }
  },
  {
    path: '/admin/modules/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "admin/categories" */ '../views/auth/modules/categories/Categories'),
    meta: {
      layout: Auth,
      requiresAuth: true
    }
  },
  {
    path: '/admin/modules/documents',
    name: 'documents',
    component: () => import(/* webpackChunkName: "admin/documents" */ '../views/auth/modules/documents/Documents'),
    meta: {
      layout: Auth,
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        name: 'documents-list',
        component: () => import(/* webpackChunkName: "admin/modules/documents/list" */ '../views/auth/modules/documents/List'),
        meta: {
          moduleName: 'documents',
          layout: Auth,
          requiresAuth: true
        }
      },
      {
        path: 'add',
        name: 'documents-add',
        component: () => import(/* webpackChunkName: "admin/modules/documents/add" */ '../views/auth/modules/documents/Add'),
        meta: {
          moduleName: 'documents',
          layout: Auth,
          requiresAuth: true,
          breadcrumbs: () => {
            return [
                {name: 'список', to: '/admin/modules/documents/list'},
                {name: 'добавление документа'},
            ]
          }
        }
      },
      {
        path: 'edit/:id',
        name: 'documents-edit',
        component: () => import(/* webpackChunkName: "admin/modules/documents/edit" */ '../views/auth/modules/documents/Add'),
        meta: {
          moduleName: 'documents',
          layout: Auth,
          requiresAuth: true,
          breadcrumbs: () => {
            return [
                {name: 'список', to: '/admin/modules/documents/list'},
                {name: 'редактирование документа'},
            ]
          }
        }
      },
      {
        path: 'settings',
        name: 'documents-settings',
        component: () => import(/* webpackChunkName: "admin/modules/documents/settings" */ '../views/auth/modules/documents/Settings'),
        meta: {
          moduleName: 'documents',
          layout: Auth,
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach ((to, from, next) => {
    //Проверка авторизации и роли
    if (to.matched.some(item => item.meta.requiresAuth)) {
      if (!store.getters['auth/TOKEN']) {
        //Не авторизован
          next({
              path: '/',
              params: {nextUrl: to.fullPath}
          })
        } else {
          //Авторизован
          next()
       }
      } else {
        next()
    }   
})

export default router
