<template>
  <div class="contenedor-Login" >
    
<!-- Button trigger modal
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>  -->

<!-- Modal -->
    <div class="modal fade" id="VentanaLogin" tabindex="-1" role="dialog" aria-labelledby="VentanaLogin" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
    
            <div class="card bg-light" style="margin: 20px 0 20px 0;">
            <article class="card-body mx-auto" style="max-width: 600px; width: 400px; padding-bottom: 0px">
            <h4 class="card-title mt-3 text-center">Iniciar Sesión</h4>
            <p class="text-center">Ingrese sus datos de acceso</p>
            
              <form>    
            <div class="form-group input-group">
          <div class="input-group-prepend">
        <span class="input-group-text" style="background-color: #ef5777; color: white"> <i class="fa fa-envelope"></i> </span>
        </div>        
            <input v-model="email" name="" class="form-control" placeholder="Correo Electrónico" type="email">
            </div> <!-- form-group// -->

            
        
            <div class="form-group input-group">
          <div class="input-group-prepend">
        <span class="input-group-text" style="background-color: #ef5777; color: white"> <i class="fa fa-lock" ></i> </span>
        </div>
            <input v-model="password" class="form-control" placeholder="Contraseña" type="password">
            </div> <!-- form-group// -->

              

            <div class="form-group">
            <button type="button" class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777; color: white" v-on:click="login"> Iniciar Sesión  </button>
            </div> <!-- form-group// -->      
            <p class="text-center">¿No tienes una cuenta? <a v-on:click="ocultarVentana" data-toggle="modal" data-target="#VentanaRegistro" style="color: #ef5777">Regístrate</a> </p>  
            <p><center><a v-on:click="ocultarVentana" data-target="#VentanaRec" data-toggle="modal" style="color: #ef5777">¿Olvidaste tu contraseña?</a></center></p>      
                                                                    
    </form>
    </article>
    <p class="divider-text" style="margin-top: 0px;">
        <span class="bg-light">O</span>
        </p>
        <p style="color: white">
          <a v-on:click="loginGoogle" class="btn btn-block btn-facebook" style="background-color: #DD4B39"> <i class="fab fa-google"></i>   Iniciar sesión vía Google</a>
          <a v-on:click="loginFacebook" class="btn btn-block btn-facebook"> <i class="fab fa-facebook-f"></i>   Iniciar sesión vía facebook</a>
        </p>
    </div> <!-- card.// -->

    </div>
    </div> <!-- card.// -->

    </div> 
    <!--container end. akí//-->
            
    </div>
    <Recuperar/>
  </div>
</template>

<script>
//Firebase
import Firebase from 'firebase';
import config from '../config';
Firebase.initializeApp(config);


import Recuperar from '@/components/Recuperar.vue';
import axios from 'axios';

  export default {
    name: 'Login',
    components: {
      Recuperar
    },
    data () {
        return {
            email: '',
            password: '',
            message: null
        }
    },
    methods:{
      ocultarVentana(){
        $("#VentanaLogin").modal("hide");
      },
      login(){

        axios.post('/clients/login', {email_cliente: this.email, password_cliente: this.password}).then(res => {
                
          if(res.data.message){
            this.message = res.data.message;
            console.log(this.message);
          }else{
            this.$store.dispatch("guardarToken", res.data.tokenReturn);
            console.log(res.data);
            this.ocultarVentana();
            location.href = "/home";
          }
                      
        }).catch((error) => {

          this.$router.push({name: 'Inicio'});
          console.log(error.message);
          this.message = error.message;
        });
      },
      loginGoogle(){
        const provider = new Firebase.auth.GoogleAuthProvider();
        const auth = Firebase.auth();
        auth.signInWithPopup(provider).then(res => {
          if(res.additionalUserInfo.isNewUser){
            axios.post('/clients/registerFirebase', {
              nombre_cliente: res.additionalUserInfo.profile.name,
              email_cliente: res.additionalUserInfo.profile.email,
              telefono_cliente: null,
              password_cliente: res.additionalUserInfo.profile.id
            }).then(res => {
              //Mensaje de registro exitoso
              if(res.data.message){
                this.message = res.data.message;
                console.log(this.message);
              }else{
                this.$store.dispatch("guardarToken", res.data.tokenReturn);
                console.log(res.data);
                this.ocultarVentana();
                location.reload();
              }
            }).catch((error) => {

              console.log(error);
            });
          }else{
            axios.post('/clients/login', {email_cliente: res.additionalUserInfo.profile.email, password_cliente: res.additionalUserInfo.profile.id}).then(res => {
                
              if(res.data.message){
                this.message = res.data.message;
                console.log(this.message);
              }else{
                this.$store.dispatch("guardarToken", res.data.tokenReturn);
                console.log(res.data);
                this.ocultarVentana();
                location.reload();
              }
                          
            }).catch((error) => {

              this.$router.push({name: 'Inicio'});
              console.log(error.message);
              this.message = error.message;
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      loginFacebook(){

        const provider = new Firebase.auth.FacebookAuthProvider();
        const auth = Firebase.auth()
        auth.signInWithPopup(provider).then(res => {
          if(res.additionalUserInfo.isNewUser){
            axios.post('/clients/registerFirebase', {
              nombre_cliente: res.additionalUserInfo.profile.name,
              email_cliente: res.additionalUserInfo.profile.email,
              telefono_cliente: null,
              password_cliente: res.additionalUserInfo.profile.id
            }).then(res => {
              //Mensaje de registro exitoso
              if(res.data.message){
                this.message = res.data.message;
                console.log(this.message);
              }else{
                this.$store.dispatch("guardarToken", res.data.tokenReturn);
                console.log(res.data);
                this.ocultarVentana();
                location.reload();
              }
            }).catch((error) => {

              console.log(error);
            });
          }else{
            axios.post('/clients/login', {email_cliente: res.additionalUserInfo.profile.email, password_cliente: res.additionalUserInfo.profile.id}).then(res => {
                
              if(res.data.message){
                this.message = res.data.message;
                console.log(this.message);
              }else{
                this.$store.dispatch("guardarToken", res.data.tokenReturn);
                console.log(res.data);
                this.ocultarVentana();
                location.reload();
              }
                          
            }).catch((error) => {

              this.$router.push({name: 'Inicio'});
              console.log(error.message);
              this.message = error.message;
            });
          }
        }).catch(err => {
          console.log(err)
        });


      }
    }
  }
</script>

<style scoped>


  .contenedor-Login{
    
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url('../assets/inicio.jpg');
      background-size: cover;
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      padding: 0px;
      height: 100%;
      width: 100%;
     
    }
    
    .divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}

.btn-facebook {
    background-color: #405D9D;
    color: #fff;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}




  #form {
    width: 250px;
    margin: 0 auto;
    height: 50px;
  }

  #form p {
    text-align: center;
  }

  #form label {
    font-size: 20px;
  }

  input[type="radio"] {
    display: none;
  }

  label {
    color: grey;
  }

  .clasificacion {
    direction: rtl;
    unicode-bidi: bidi-override;
  }

  label:hover,
  label:hover ~ label {
    color: #ef5777;
  }

  input[type="radio"]:checked ~ label {
    color: #ef5777;
  }

  /*****************globals*************/
  body {
    font-family: 'open sans';
    overflow-x: hidden; }

  img {
    max-width: 100%; }

  .preview {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column; }
    @media screen and (max-width: 996px) {
      .preview {
        margin-bottom: 20px; } }

  .preview-pic {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1; }

  .preview-thumbnail.nav-tabs {
    border: none;
    margin-top: 15px; }
    .preview-thumbnail.nav-tabs li {
      width: 18%;
      margin-right: 2.5%; }
      .preview-thumbnail.nav-tabs li img {
        max-width: 100%;
        display: block; }
      .preview-thumbnail.nav-tabs li a {
        padding: 0;
        margin: 0; }
      .preview-thumbnail.nav-tabs li:last-of-type {
        margin-right: 0; }

  .tab-content {
    overflow: hidden; }
    .tab-content img {
      width: 100%;
      -webkit-animation-name: opacity;
              animation-name: opacity;
      -webkit-animation-duration: .3s;
              animation-duration: .3s; }

  .card {
    margin-top: 50px;
    background: rgb(255, 255, 255);
    padding: 3em;
    line-height: 1.5em; }

  @media screen and (min-width: 997px) {
    .wrapper {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex; } }

  .details {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column; }

  .colors {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1; }

  .product-title, .price, .sizes, .colors {
    text-transform: UPPERCASE;
    font-weight: bold; }

  .checked, .price span {
    color: #ef5777; }

  .product-title, .rating, .product-description, .price, .vote, .sizes {
    margin-bottom: 15px; }

  .product-title {
    margin-top: 0; }

  .size {
    margin-right: 10px; }
    .size:first-of-type {
      margin-left: 40px; }

  .color {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    height: 2em;
    width: 2em;
    border-radius: 2px; }
    .color:first-of-type {
      margin-left: 20px; }

  .add-to-cart, .like {
    background: #ef5777;
    padding: 1.2em 1.5em;
    border: none;
    text-transform: UPPERCASE;
    font-weight: bold;
    color: #fff;
    -webkit-transition: background .3s ease;
            transition: background .3s ease; }
    .add-to-cart:hover, .like:hover {
      background: #6e2b3a;
      color: #fff; }

  .not-available {
    text-align: center;
    line-height: 2em; }
    .not-available:before {
      font-family: fontawesome;
      content: "\f00d";
      color: #fff; }

  .tooltip-inner {
    padding: 1.3em; }

  @-webkit-keyframes opacity {
    0% {
      opacity: 0;
      -webkit-transform: scale(3);
              transform: scale(3); }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
              transform: scale(1); } }

  @keyframes opacity {
    0% {
      opacity: 0;
      -webkit-transform: scale(3);
              transform: scale(3); }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
              transform: scale(1); } }


  .cart-wrap {
    padding: 40px 0;
    font-family: 'Open Sans', sans-serif;
  }
  .main-heading {
    font-size: 19px;
    margin-bottom: 20px;
  }
  .table-wishlist table {
      width: 100%;
  }
  .table-wishlist thead {
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 5px;
  }
  .table-wishlist thead tr th {  /* Encabezado de la tabla de productos favoritos */
      padding: 8px 0 5px;
      color: black;
      font-size: 20px;
      font-weight: 400;      
  }

  thead{

    background-color:  #c7c7c73a;
  }

  .encabezado-tabla-favoritos{

    border-radius: 100%;
  }

  .table-wishlist tr td {
      padding: 25px 0;
      vertical-align: middle;
  }
  .table-wishlist tr td .img-product {
      width: 72px;
      float: left;
      margin-left: 8px;
      margin-right: 31px;
      line-height: 63px;
  }
  .table-wishlist tr td .img-product img {
    width: 100%;
  }
  .table-wishlist tr td .name-product {
      font-size: 15px;
      color: #484848;
      padding-top: 8px;
      line-height: 24px;
      width: 50%;
  }
  .table-wishlist tr td.price {
      font-weight: 600;
  }
  .table-wishlist tr td .quanlity {
      position: relative;
  }

  .total {
    font-size: 24px;
    font-weight: 600;
    color: #8660e9;
  }
  .display-flex {
    display: flex;
  }
  .align-center {
    align-items: center;
  }
  .round-black-btn {
    border-radius: 25px;
    background: #ef5777;
    color: #fff;
    padding: 5px 20px;
    display: inline-block;
    border: solid 2px #ef5777; 
    transition: all 0.5s ease-in-out 0s;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-comprar-articulo-favorito{

    background: grey;
    border: solid 2px grey; 
  }


  .round-black-btn:hover,
  .round-black-btn:focus {
    background: transparent;
    color: #212529;
    text-decoration: none;
  }
  .mb-10 {
      margin-bottom: 10px !important;
  }
  .mt-30 {
      margin-top: 30px !important;
  }
  .d-block {
      display: block;
  }
  .custom-form label {
      font-size: 14px;
      line-height: 14px;
  }
  .pretty.p-default {
      margin-bottom: 15px;
  }
  .pretty input:checked~.state.p-primary-o label:before, 
  .pretty.p-toggle .state.p-primary-o label:before {
      border-color: #8660e9;
  }
  .pretty.p-default:not(.p-fill) input:checked~.state.p-primary-o label:after {
      background-color: #8660e9 !important;
  }
  .main-heading.border-b {
      border-bottom: solid 1px #ededed;
      padding-bottom: 15px;
      margin-bottom: 20px !important;
  }
  .custom-form .pretty .state label {
      padding-left: 6px;
  }
  .custom-form .pretty .state label:before {
      top: 1px;
  }
  .custom-form .pretty .state label:after {
      top: 1px;
  }
  .custom-form .form-control {
      font-size: 14px;
      height: 38px;
  }
  .custom-form .form-control:focus {
      box-shadow: none;
  }
  .custom-form textarea.form-control {
      height: auto;
  }
  .mt-40 {
      margin-top: 40px !important; 
  }
  .in-stock-box {
    background: grey;
    font-size: 12px;
    text-align: center;
    border-radius: 25px;
    padding: 4px 15px;
    display: inline-block;  
      color: #fff;
  }
  .trash-icon {
      font-size: 20px;
      color: #212529;
  }
</style>