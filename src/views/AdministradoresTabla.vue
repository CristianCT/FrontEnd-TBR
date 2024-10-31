<template>
  <div class="leftmenu articulos-administrador">
    <Nav/>
    <div class="card-table">
      <v-data-table :headers="headers" :items="administradores" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat >
            <v-toolbar-title>Administradores</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#ef5777" dark class="mb-1" v-bind="attrs" v-on="on">Nuevo administrador</v-btn>
              <v-text-field class="barra-busqueda" v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
            </template>
            <v-card>
              <v-card-title><span class="headline">{{ formTitle }}</span></v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id_administrador" label="ID Administrador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre_administrador" label="Nombre administrador" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email_administrador" label="Email administrador" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.telefono_administrador" label="Telefono administrador" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field :disabled="!changePassword" label="Contraseña" type="password" v-model="editedItem.password_administrador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="1">
                      <v-checkbox v-model="changePassword" hide-details></v-checkbox>
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
                <v-card-title class="headline">¿Confirma que desea eliminar el administrador?</v-card-title>
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
        name: 'AdministradoresTabla',
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      administradores: [],
      passwordActions: '',
      headers: [
        {
          text: 'ID Administrador',
          align: 'start',
          sortable: false,
          value: 'id_administrador',
        },
        { text: 'Nombre del administrador', value: 'nombre_administrador' },
        { text: 'Email administrador', value: 'email_administrador' },
        { text: 'Telefono administrador', value: 'telefono_administrador' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id_administrador: null,
        nombre_administrador: '',
        email_administrador: '',
        telefono_administrador: null,
        password_administrador: ''
      },
      defaultItem: {
        id_administrador: null,
        nombre_administrador: '',
        email_administrador: '',
        telefono_administrador: null,
        password_administrador: ''
      },
      changePassword: false,
    }),

    computed: {
      formTitle () {
        if(!this.changePassword){
          this.editedItem.password_administrador = '';
        }else{
          this.editedItem.password_administrador = 'no te interesa';
        }
        return this.editedIndex === -1 ? 'Nuevo administrador' : 'Editar administrador'
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
        axios.get('/admin/list').then(res => {this.administradores = res.data});
        this.passwordActions = '';
      },

      editItem (item) {
        this.editedIndex = this.administradores.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.administradores.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.post('/admin/delete', {
          id_administrador: this.editedItem.id_administrador, 
          verifyPassword: this.passwordActions, 
          tabla: 'ADMINISTRADORES', 
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
        axios.post('/admin/update', {
          id_administrador: this.editedItem.id_administrador, 
          nombre_administrador: this.editedItem.nombre_administrador,
          email_administrador: this.editedItem.email_administrador,
          telefono_administrador: this.editedItem.telefono_administrador,
          password_administrador: this.editedItem.password_administrador,
          verifyPassword: this.passwordActions, 
          tabla: 'ADMINISTRADORES', 
          action: 'UPDATE'
        }).then(res => {
        this.initialize();
        console.log(res.data.message);
      });

      },
      agregar() {
        axios.post('/admin/register', {
          id_administrador: this.editedItem.id_administrador, 
          nombre_administrador: this.editedItem.nombre_administrador,
          email_administrador: this.editedItem.email_administrador,
          telefono_administrador: this.editedItem.telefono_administrador,
          password_administrador: this.editedItem.password_administrador,
          verifyPassword: this.passwordActions, 
          tabla: 'ADMINISTRADORES', 
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