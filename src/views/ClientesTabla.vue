<template>
    <div class="leftmenu clientes-administrador">
        <Nav/>
        <div class="card-table">
            <v-card>
                <v-card-title>Clientes
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="clientes" :search="search"></v-data-table>
            </v-card>
        </div>
    </div>
</template>
<script>
    import Nav from '@/components/NavigationDrawer.vue';
    import axios from 'axios';

    export default {
        components: { Nav },
        name: 'ClientesTabla',
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nombres',
            align: 'start',
            sortable: false,
            value: 'nombre_cliente',
          },
          { text: 'Email', value: 'email_cliente' },
          { text: 'Telefono', value: 'telefono_cliente' },
        ],
        clientes: [],
      }
    },
    created () {
      this.initialize();
    },
    methods: {
      initialize () {
        axios.get('/clients/list').then(res => (this.clientes = res.data));
      },
    }
  }
</script>
<style>
  .leftmenu{

    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .barra-busqueda{

    margin: 0 40px 0 0;
  }
  .card-table{

    width: 100%;
    margin: 20px 20px 20px 0px ;
  }
</style>