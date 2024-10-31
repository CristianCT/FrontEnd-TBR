<template>
  <div class="leftmenu articulos-administrador">
    <Nav/>
    <div class="card-table">
      <v-data-table :headers="headers" :items="pedidos" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat >
            <v-toolbar-title>Pedidos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#ef5777" dark class="mb-1" v-bind="attrs" v-on="on">Nuevo pedido</v-btn>
              <v-text-field class="barra-busqueda" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            </template>
            <v-card>
              <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre_cliente" label="Nombre del cliente"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fecha_facturacion" label="Fecha de facturacion" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fecha_entrega" label="Fecha de entrega" ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select v-model="editedItem.nombre_estado" :items="estados" label="Estado"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.ciudad" label="Ciudad" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.direccion" label="Direccion" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.valor_domicilio" label="Valor domicilio" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.total" label="Total" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12" >
                      <v-divider></v-divider>
                      <p>Para realizar esta acción, es necesario ingresar la contraseña proporcionada por el administrador del sitio web.</p>
                      <v-text-field type="password" v-model="passwordActions" label="Contraseña de administrador" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ef5777" text @click="close">Cancelar</v-btn>
                <v-btn color="#ef5777" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">¿Confirma que desea eliminar el pedido?</v-card-title>
                <v-divider></v-divider>
                <v-col cols="12" sm="6" md="12" >
                  <p>Para realizar esta acción, es necesario ingresar la contraseña proporcionada por el administrador del sitio web.</p>
                  <v-text-field type="password" v-model="passwordActions" label="Contraseña de administrador" required></v-text-field>
                </v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#ef5777" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="#ef5777" text @click="deleteItemConfirm">Confirmar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/NavigationDrawer.vue';
  import axios from 'axios';

  export default {
    components: { Nav },
    name: 'PedidosTabla',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      estados: [],
      passwordActions: '',
      headers: [
        {
          text: 'Nombre del cliente',
          align: 'start',
          sortable: false,
          value: 'nombre_cliente',
        },
        { text: 'Estado actual', value: 'nombre_estado' },
        { text: 'Fecha de entrega', value: 'fecha_entrega' },
        { text: 'Fecha de facturacion', value: 'fecha_facturacion' },
        { text: 'ciudad', value: 'ciudad' },
        { text: 'Direccion', value: 'direccion' },
        { text: 'Domicilio', value: 'valor_domicilio' },
        { text: 'TOTAL', value: 'total' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      pedidos: [],
      editedIndex: -1,
      editedItem: {
        nombre_cliente: '',
        nombre_estado: '',
        fecha_entrega: '',
        fecha_facturacion: '',
        ciudad: '',
        direccion: '',
        valor_domicilio: null,
        total: null,
      },
      defaultItem: {
        nombre_cliente: '',
        nombre_estado: '',
        fecha_entrega: '',
        fecha_facturacion: '',
        ciudad: '',
        direccion: '',
        valor_domicilio: null,
        total: null,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo pedido' : 'Editar pedido'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
      axios.get('/states/orders').then(res => {
        for (let i = 0; i < res.data.length; i ++) {
        
          this.estados.push(res.data[i].nombre_estado);        
        }
      });
    },

    methods: {
      initialize () {
        axios.get('/orders/list').then(res => (this.pedidos = res.data));
      },

      editItem (item) {
        this.editedIndex = this.pedidos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.pedidos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        axios.post('/orders/delete', {
          /* codigo_articulo: this.editedItem.codigo_articulo,
          verifyPassword: this.passwordActions, 
          tabla: 'PEDIDOS', 
          action: 'DELETE' */
        }).then(res => {
          this.initialize();
          console.log(res.data.message);
          this.closeDelete();
        });
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.editar();
        } else {
          this.agregar();
        }
        this.close()
      },
      editar () {
        axios.post('/orders/update', {
          /* nombre_estado: this.editedItem.nombre_estado,
          referencia: this.editedItem.referencia,
          codigo_articulo: this.editedItem.codigo_articulo,
          nombre_articulo: this.editedItem.nombre_articulo,
          precio_compra: this.editedItem.precio_compra,
          precio_venta: this.editedItem.precio_venta,
          descuento: this.editedItem.descuento,
          descripcion: this.editedItem.descripcion,
          cantidad_disponible: this.editedItem.cantidad_disponible,
          verifyPassword: this.passwordActions, 
          tabla: 'PEDIDOS', 
          action: 'UPDATE' */
        }).then(res => {
          this.initialize();
          console.log(res.data.message);
        });
      },
      agregar() {
        axios.post('/orders/add', {
          /* nombre_estado: this.editedItem.nombre_estado,
          referencia: this.editedItem.referencia,
          nombre_articulo: this.editedItem.nombre_articulo,
          precio_compra: this.editedItem.precio_compra,
          precio_venta: this.editedItem.precio_venta,
          descuento: this.editedItem.descuento,
          descripcion: this.editedItem.descripcion,
          cantidad_disponible: this.editedItem.cantidad_disponible,
          verifyPassword: this.passwordActions, 
          tabla: 'PEDIDOS', 
          action: 'INSERT' */
          
        }).then(res => {
          this.initialize();
          console.log(res.data.message);
        });
      }
    },
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