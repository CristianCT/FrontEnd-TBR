<template>
    <v-navigation-drawer permanent expand-on-hover>
    <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
              <v-img :src="require('../assets/logo.png')"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link class="enlace-navigation" href="/administracion/panel">
          <v-list-item-content>
              <v-list-item-title class="title">{{ nombreAdministrador }}</v-list-item-title>
              <v-list-item-subtitle>{{ emailAdministrador }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense >
        <v-list-item link class="enlace-navigation" href="/administracion/admins">
            <v-list-item-icon><v-icon>mdi-account-edit</v-icon></v-list-item-icon>
            <v-list-item-title>Administradores</v-list-item-title>
        </v-list-item>
        <v-list-item link class="enlace-navigation" href="/administracion/clientes">
            <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
            <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link class="enlace-navigation" href="/administracion/articulos">
            <v-list-item-icon><v-icon>mdi-clipboard-text-multiple</v-icon></v-list-item-icon>
            <v-list-item-title>Articulos</v-list-item-title>
        </v-list-item>
        <v-list-item link class="enlace-navigation" href="/administracion/categorias">
            <v-list-item-icon><v-icon>mdi-clipboard-file</v-icon></v-list-item-icon>
            <v-list-item-title>Categorias</v-list-item-title>
        </v-list-item>
        <v-list-item link class="enlace-navigation" href="/administracion/pedidos">
            <v-list-item-icon><v-icon>mdi-dolly</v-icon></v-list-item-icon>
            <v-list-item-title>Pedidos</v-list-item-title>
        </v-list-item>
        <v-list-item link class="enlace-navigation" href="/administracion/cupones">
            <v-list-item-icon><v-icon>mdi-gift</v-icon></v-list-item-icon>
            <v-list-item-title>Cupones</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link class="enlace-navigation" v-on:click="salir">
            <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
</template> 
<script>
    import Home from '@/components/AdvertenciaRegistroFavoritos.vue'

    export default {
        components: { Home },
        name: 'ArticulosPanel',
        data () {
            return {
                nombreAdministrador: '',
                emailAdministrador: ''
            }
        },
        mounted(){
            this.$store.dispatch("generarState");
            this.nombreAdministrador = this.$store.state.usuario.name;
            this.emailAdministrador = this.$store.state.usuario.email;
        },
        methods: {

            salir(){
                this.$store.dispatch("salir");
            }
        }
    }
</script>
<style>
  .enlace-navigation{
    text-decoration: none !important;
  }
</style>