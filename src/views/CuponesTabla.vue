<template>
  <div class="leftmenu articulos-administrador">
    <Nav/>
    <div class="card-table">
      <v-data-table :headers="headers" :items="cupones" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat >
            <v-toolbar-title>Cupones</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#ef5777" dark class="mb-1" v-bind="attrs" v-on="on">Nuevo cupon</v-btn>
              <v-text-field class="barra-busqueda" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            </template>
            <v-card>
              <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.codigo_cupon" label="Codigo cupón"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.descuento" label="Descuento" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.descripcion" label="Descripcion" ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select v-model="editedItem.nombre_estado" :items="estados" label="Estado" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.cantidad" label="Cantidad" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" >
                      <v-text-field v-model="editedItem.fecha_limite" label="Fecha limite" ></v-text-field>
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
                <v-card-title class="headline">¿Confirma que desea eliminar el cupon?</v-card-title>
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
        name: 'CuponTabla',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      estados: [],
      headers: [
        {
          text: 'Codigo del cupon',
          align: 'start',
          sortable: false,
          value: 'codigo_cupon',
        },
        { text: 'Descuento(%)', value: 'descuento' },
        { text: 'Estado', value: 'nombre_estado' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Fecha limite', value: 'fecha_limite' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      cupones: [],
      editedIndex: -1,
      passwordActions: '',
      editedItem: {
        id_cupon: null,
        codigo_cupon: '',
        descuento: null,
        nombre_estado: '',
        descripcion: '',
        cantidad: null,
        fecha_limite: null,
      },
      defaultItem: {
        id_cupon: null,
        codigo_cupon: '',
        descuento: null,
        nombre_estado: '',
        descripcion: '',
        cantidad: null,
        fecha_limite: null,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo cupón' : 'Editar cupón'
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
      axios.get('/states/coupons').then(res => {
        for (let i = 0; i < res.data.length; i ++) {
        
          this.estados.push(res.data[i].nombre_estado);        
        }
      });
    },

    methods: {
      initialize () {
        axios.get('/coupons/list').then(res => (this.cupones = res.data));
      },

      editItem (item) {
        this.editedIndex = this.cupones.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.cupones.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      deleteItemConfirm () {
        axios.post('/coupons/delete', {
          id_cupon: this.editedItem.id_cupon,
          verifyPassword: this.passwordActions, 
          tabla: 'CUPONES', 
          action: 'DELETE'
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
        axios.post('/coupons/update', {
          id_cupon: this.editedItem.id_cupon,
          codigo_cupon: this.editedItem.codigo_cupon,
          descuento: this.editedItem.descuento,
          fecha_limite: this.editedItem.fecha_limite,
          nombre_estado: this.editedItem.nombre_estado,
          cantidad: this.editedItem.cantidad,
          descripcion: this.editedItem.descripcion,
          verifyPassword: this.passwordActions, 
          tabla: 'CUPONES', 
          action: 'UPDATE'
        }).then(res => {
          this.initialize();
          console.log(res.data.message);
        });
      },
      agregar() {
        axios.post('/coupons/add', {
          codigo_cupon: this.editedItem.codigo_cupon,
          descuento: this.editedItem.descuento,
          fecha_limite: this.editedItem.fecha_limite,
          nombre_estado: this.editedItem.nombre_estado,
          cantidad: this.editedItem.cantidad,
          descripcion: this.editedItem.descripcion,
          verifyPassword: this.passwordActions, 
          tabla: 'CUPONES', 
          action: 'INSERT'
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