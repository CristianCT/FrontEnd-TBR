<template>
  <div>
        <nav class="navbar navbar-light">
            <a class="navbar-brand" style="font-size: 25px;" href="/home"><img :src="require('../assets/logo.svg')" width="30" height="30" class="d-inline-block align-top" alt="">Green Galaxy Cosmetics</a>
            <div>
                <div class="input-group md-form form-sm form-2 pl-0" style="width: 500px;">
                    <input v-model="busqueda" class="form-control my-0 py-1 red-border" type="text" placeholder="¿Que deseas buscar?..." aria-label="Search">
                    <div class="input-group-append">
                        <a v-on:click="buscar" class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search text-white" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="margin: 0 5px 0 5px;" ><a href="/home"><v-icon style="font-size: 35px;" aria-hidden="false">mdi-shopping-outline</v-icon></a></div>
                <div style="margin: 0 5px 0 5px;" ><a href="/favoritos"><v-icon style="font-size: 35px; color: #ef5777" aria-hidden="false">mdi-heart</v-icon></a></div>
                <div style="margin: 0 5px 0 5px;" ><a href="/carrito"><v-icon style="font-size: 35px;" aria-hidden="false">mdi-cart-variant</v-icon></a></div>
                <div class="text-center"  style="margin: 0 5px 0 5px;">
                    <v-menu top :offset-y="offset">
                        <template v-slot:activator="{ on, attrs }">
                            <button v-bind="attrs" v-on="on"><v-icon style="font-size: 35px;" aria-hidden="false">mdi-account-circle</v-icon></button>
                        </template>
                        
                        <v-list v-if="!this.$store.state.usuario">
                            <v-list-item><a data-toggle="modal" data-target="#VentanaLogin">Iniciar sesión</a></v-list-item>
                            <v-list-item><a data-toggle="modal" data-target="#VentanaRegistro">Registrarse</a></v-list-item>
                        </v-list>
                        <v-list v-else>
                            <v-list-item><span>{{ this.$store.state.usuario.name }}</span></v-list-item>
                            <hr style="margin: 0px 0px 0px 0px">
                            <v-list-item><a href="/perfil" style="color: #343a40">Perfil</a></v-list-item>
                            <v-list-item><a v-on:click="salir">Salir</a></v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </nav>
        <Register/>
        <Login/>
    </div>
</template>
<script>
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';

  export default {
    name: 'Header',
    components: {
        Register,
        Login
    },
    data: () => ({
      offset: true,
      busqueda: ''
    }),
    mounted() {
        try {
            this.$store.dispatch("generarState");
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        salir(){
            this.$store.dispatch("salir");
            location.href = "/home";
        },
        buscar(){
            axios.post('/articles/search', {busqueda: this.busqueda}).then(res => {
                this.$store.dispatch("guardarArticulos", res.data);
            }).catch(error => {
                //Manejo de errores
                console.log(error)
            });
        }
    }
}    
</script>

<style scoped>
    .v-application .red.lighten-3 {
        background-color: #ef5777!important;
        border-color: #ef5777!important;
    }
</style>

