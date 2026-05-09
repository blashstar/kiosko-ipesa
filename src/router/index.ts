import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const rutas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('../componentes/secciones/Inicio.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../componentes/secciones/Menu.vue'),
  },
  {
    path: '/menu-vistas-360',
    name: 'menu-vistas-360',
    component: () => import('../componentes/secciones/MenuVistas360.vue'),
  },
  {
    path: '/menu-infografias',
    name: 'menu-infografias',
    component: () => import('../componentes/secciones/MenuInfografias.vue'),
  },
  {
    path: '/menu-comparativas',
    name: 'menu-comparativas',
    component: () => import('../componentes/secciones/MenuComparativas.vue'),
  },
  {
    path: '/vista-360',
    name: 'vista-360',
    component: () => import('../componentes/secciones/Vista360.vue'),
  },
  {
    path: '/infografia',
    name: 'infografia',
    component: () => import('../componentes/secciones/Infografia.vue'),
  },
  {
    path: '/comparativa',
    name: 'comparativa',
    component: () => import('../componentes/secciones/Comparativa.vue'),
  },
  {
    path: '/qr',
    name: 'qr',
    component: () => import('../componentes/secciones/inicio.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: rutas,
})

export default router
