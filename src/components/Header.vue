<template>
  <div>
        <nav class="navbar navbar-light">
            <a class="navbar-brand" style="font-size: 25px;" href="/home"><img :src="require('../assets/logo.svg')" width="30" height="30" class="d-inline-block align-top" alt="">Green Galaxy Cosmetics</a>
            
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

  export default {
    name: 'Header',
    props: ['articulos'],
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

