<template>
    <div id="adminlogin">
        <v-container>
            <v-layout wrap>
                <v-flex class="card-login" sm12 md4 offset-md4>
                    <v-card elevation="10" light tag="section">
                        <center><v-card-title style="padding-bottom: 0px">
                            <v-layout align-center><a href="/home" style="color: black; text-decoration:none;"><h4 class="headline">Green Galaxy Cosmetics</h4></a></v-layout>
                        </v-card-title></center>
                        <v-divider></v-divider>
                        <v-card-text>
                            <p>Ingrese el nombre de usuario y contraseña de administrador:</p>
                            <v-form>
                                <v-text-field outline label="Nombre de usuario o email" type="text" v-model="username"></v-text-field>
                                <v-text-field outline hide-details label="Contraseña" type="password" v-model="password"></v-text-field>
                                <v-divider></v-divider>
                                <v-btn color="#ef5777" block dark v-on:click="login"> Ingresar </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    
                    <v-container v-if="message" class="container-error">
                        <v-card>
                            <v-alert prominent type="error">
                                <v-row align="center">
                                    <v-col class="grow">{{ message }}</v-col>
                                </v-row>
                            </v-alert>
                        </v-card>
                    </v-container>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
    name: 'adminLogin',
    data () {
        return {
            username: '',
            password: '',
            message: null
        }
    },
    methods: {

        login(){
            axios.post('/admin/login', {email_administrador: this.username, password_administrador: this.password}).then(res => {
                
                if(res.data.message){
                    this.message = res.data.message;
                }else{
                    this.$store.dispatch("guardarToken", res.data.tokenReturn);
                    this.$router.push({name: 'Administracion-panel'});
                }
                
            }).catch((error) => {

                this.$router.push('/administracion');
                console.log(error.message);
                this.message = error.message;
            });
        }
    }
}
</script>

<style scoped>
    .headline{

        font-size:54px!important;
        line-height:45px;
    }
    .card-login{

        margin-top: 50px;
    }
    .container-error{
        padding-left: 0;
        padding-right: 0;
    }
</style>