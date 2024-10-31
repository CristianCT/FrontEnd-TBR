import Vue from 'vue';
import VueRouter from 'vue-router';
import Inicio from '../views/Inicio.vue';
/* import store from '../store'; */

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Inicio',
        meta: {
            public: true
        },
        component: Inicio
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/preview/:codigo_articulo',
        name: 'Preview',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/Preview.vue')
    },
    {
        path: '/favoritos',
        name: 'Favoritos',
        meta: {
            authClient: true
        },
        component: () =>
            import ('../views/Favoritos.vue')
    },
    {
        path: '/carrito',
        name: 'Carrito',
        meta: {
            authClient: true
        },
        component: () =>
            import ('../views/Carrito.vue')
    },
    {
        path: '/facturacion/:codigo_pedido',
        name: 'Facturacion',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/Facturacion.vue')
    },
    {
        path: '/compra-satisfactoria',
        name: 'Agradecimiento',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/Agradecimiento.vue')
    },
    {
        path: '/perfil',
        name: 'Usuario',
        meta: {
            authClient: true
        },
        component: () =>
            import ('../views/Usuario.vue')
    },
    {
        path: '/solicitud-registro',
        name: 'Solicitud-registro',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/AdvertenciaRegistro.vue')
    },
    {
        path: '/administracion',
        name: 'Administracion',
        meta: {
            public: true
        },
        component: () =>
            import ('../views/AdminLogin.vue')
    },
    {
        path: '/administracion/admins',
        name: 'Administracion-admins',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/AdministradoresTabla.vue'),
    },
    {
        path: '/administracion/clientes',
        name: 'Administracion-clientes',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/ClientesTabla.vue'),
    },
    {
        path: '/administracion/articulos',
        name: 'Administracion-articulos',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/ArticulosTabla.vue'),
    },
    {
        path: '/administracion/categorias',
        name: 'Administracion-categorias',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/CategoriasTabla.vue'),
    },
    {
        path: '/administracion/pedidos',
        name: 'Administracion-pedidos',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/PedidosTabla.vue'),
    },
    {
        path: '/administracion/cupones',
        name: 'Administracion-cupones',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/CuponesTabla.vue'),
    },
    {
        path: '/administracion/panel',
        name: 'Administracion-panel',
        meta: {
            auth: true
        },
        component: () =>
            import ('../views/AdministracionPanel.vue'),
    },
    {
        path: '/recuperar-password',
        name: 'Recuperar-password',
        component: () =>
            import ('../views/Recuperar.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


//Reforzar seguridad en esta parte
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.public)) {
        next();
    } else if (to.matched.some(record => record.meta.auth)) {
        if (localStorage.getItem('UserAdminToken')) {
            next();
        } else {
            next({ name: 'Administracion' });
        }
    } else if (to.matched.some(record => record.meta.authClient)) {
        if (localStorage.getItem('UserClientToken')) {
            next();
        } else {
            next({ name: 'Solicitud-registro' });
        }
    } else {
        next({ name: 'Inicio' });
    }
});

export default router