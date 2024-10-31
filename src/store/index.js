import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        usuario: null,
        carrito: [],
        favoritos: [],
        articulos: []
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        setCarrito(state, carrito) {
            state.carrito = carrito;
        },
        setFavoritos(state, favoritos) {
            state.favoritos = favoritos;
        },
        setArticulos(state, articulos) {
            state.articulos = articulos;
        }
    },
    actions: {
        guardarToken({ commit }, token) {
            commit("setToken", token)
            commit("setUsuario", decode(token))
            if (decode(token).rol == 'CLIENT') {

                localStorage.setItem("UserClientToken", token)
            } else {

                localStorage.setItem("UserAdminToken", token)
            }
        },
        generarState({ commit }) {
            //Validar Token (Falta)
            let user = localStorage.getItem("UserAdminToken");
            if (!user) {
                user = localStorage.getItem("UserClientToken");
            }
            commit("setToken", user)
            commit("setUsuario", decode(user))
        },
        autoLogin({ commit }) {
            console.log("autologin");
            let token = localStorage.getItem("UserAdminToken");
            if (token) {
                commit("setToken", token);
                commit("setUsuario", decode(token));
            }
            router.push({ name: 'Administracion' }).catch(() => {});

        },
        guardarCarrito({ commit }, carrito) {
            commit("setCarrito", carrito);
        },
        guardarFavoritos({ commit }, favoritos) {
            commit("setFavoritos", favoritos);
        },
        guardarArticulos({ commit }, articulos) {
            commit("setArticulos", articulos);
        },
        salir({ commit }) {
            commit("setToken", null);
            commit("setUsuario", null);
            let user = localStorage.getItem("UserAdminToken");
            if (!user) {
                localStorage.removeItem("UserClientToken");
                router.push({ name: 'Home' });
            } else {
                localStorage.removeItem("UserAdminToken");
                router.push({ name: 'Administracion' });
            }
            localStorage.removeItem("articulosFacturacion");
        }
    },
    modules: {}
});