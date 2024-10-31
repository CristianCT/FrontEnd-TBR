<template>
  <div class="leftmenu articulos-administrador">
    <Nav/>
    <div class="card-table">
      <v-data-table :headers="headers" :items="categorias" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat >
            <v-toolbar-title>Categorias</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#ef5777" dark class="mb-1" v-bind="attrs" v-on="on">Nueva categoria</v-btn>
              <v-text-field class="barra-busqueda" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            </template>
            <v-card>
              <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre_categoria" label="Nombre de la categoria"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select v-model="editedItem.genero" :items="generos" :rules="[v => !!v || 'Item is required']" label="Genero" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.descripcion" label="Descripcion" ></v-text-field>
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
                <v-card-title class="headline">¿Confirma que desea eliminar la categoria?</v-card-title>
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
        name: 'CategoriasTabla',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      categorias: [],
      passwordActions: '',
      generos: ['Masculino', 'Femenino', 'Unisex'],
      headers: [
        {
          text: 'Nombre de la categoria',
          align: 'start',
          sortable: false,
          value: 'nombre_categoria',
        },
        { text: 'Genero', value: 'genero' },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        nombre_categoria: '',
        genero: '',
        descripcion: ''
      },
      defaultItem: {
        nombre_categoria: '',
        genero: '',
        descripcion: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva categoria' : 'Editar categoria'
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
    },

    methods: {
      initialize () {
        axios.get('/category/list').then(res => (this.categorias = res.data));
      },

      editItem (item) {
        this.editedIndex = this.categorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.categorias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.post('/category/delete', {
          codigo_categoria: this.editedItem.codigo_categoria,
          verifyPassword: this.passwordActions, 
          tabla: 'CATEGORIAS', 
          action: 'DELETE'
        }).then(res => {
          this.initialize();
          console.log(res.data.message);
        });
        this.closeDelete()
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
          axios.post('/category/update', {
            codigo_categoria: this.editedItem.codigo_categoria, 
            nombre_categoria: this.editedItem.nombre_categoria,
            genero: this.editedItem.genero,
            descripcion: this.editedItem.descripcion,
            verifyPassword: this.passwordActions, 
            tabla: 'CATEGORIAS', 
            action: 'UPDATE'
          }).then(res => {
            this.initialize();
            console.log(res.data.message);
        });
      },
      agregar() {
          axios.post('/category/add', {
            nombre_categoria: this.editedItem.nombre_categoria,
            genero: this.editedItem.genero,
            descripcion: this.editedItem.descripcion,
            verifyPassword: this.passwordActions, 
            tabla: 'CATEGORIAS', 
            action: 'DELETE'
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