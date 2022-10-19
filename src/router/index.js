import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
      path: "/",
      name: "page",
      meta: { title: 'el mago de la ford' },

      component: () => import("../components/index.vue"),
    },
  {
      path: "/manager/inventario",
      name: "inventario",
      meta: { title: 'inventario' },

      component: () => import("../components/inventario/Inventario.vue"),
    },{
      path: "/prueba",
      name: "prueba",
      meta: { title: 'el mago de la ford' },

      component: () => import("../components/Prueba.vue"),
    },
  {
      path: "/manager",
      name: "index",
      meta: { title: 'el mago de la ford' },

      component: () => import("../components/products/List.vue"),
    },
  {
      path: "/manager/categorias",
      name: "categorias",
      meta: { title: 'administracion de categorias' },

      component: () => import("../components/config/Categorias.vue"),
    },
  {
      path: "/manager/403",
      name: "403",
      meta: { title: '403' },

      component: () => import("../components/403.vue"),
    },
    
    {
      path: "/manager/productos",
      name: "productos",
      meta: { title: 'productos' },

      component: () => import("../components/products/List.vue"),
    },
    {
      path: "/manager/productos/add",
      name: "addProductos",
      meta: { title: 'formulario de productos' },

      component: () => import("../components/products/Add.vue"),
    },{
      path: "/manager/productos/add/cantidad",
      name: "addProductosCantidad",
      meta: { title: 'edicion de stock' },

      component: () => import("../components/products/addCantidad.vue"),
    },
    {
      path: "/manager/productos/img",
      name: "productoImg",
      meta: { title: 'vista de imagen' },

      component: () => import("../components/products/img.vue"),
    },
    
    {
      path: "/manager/ventas",
      name: "ventas",
      meta: { title: 'ventas' },

      component: () => import("../components/ventas/List.vue"),
    },
   
    {
      path: "/manager/ventas/reportes",
      name: "reportes",
      meta: { title: 'reportes' },

      component: () => import("../components/ventas/Reportes.vue"),
    },
   
    {
      path: "/manager/ventas/add",
      name: "addVentas",
      meta: { title: 'registro de ventas' },

      component: () => import("../components/ventas/Add.vue"),
    }, 
    {
      path: "/manager/usuarios",
      name: "usuarios",
      meta: { title: 'usuarios' },

      component: () => import("../components/users/List.vue"),
    }, 
    {
      path: "/manager/usuarios/add",
      name: "usuarioAdd",
      meta: { title: 'formulario de usuarios' },

      component: () => import("../components/users/Add.vue"),
    }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: 'history',
  linkActiveClass: 'active'
})
router.beforeEach((to, from, next) => {
  if (!to.matched.length) router.push('/')
  next()
})
const DEFAULT_TITLE = 'el mago de la ford';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router
