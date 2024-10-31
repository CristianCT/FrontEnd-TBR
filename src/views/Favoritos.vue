<template>
  <div class="Favoritos">
    <Header/>    
    <div class="container">
      <div class="card" style="margin-bottom: 20px; padding-top: 20px; padding-bottom: 0px">
        <hr>
          <div style="display: flex; flex: row; justify-content: center; align-items: center">
            <v-icon style="font-size: 80px; color: #ef5777" aria-hidden="false">mdi-heart</v-icon>
            <h2 style="color: grey; font-size: 72px">𝓜𝓲𝓼 𝓕𝓪𝓿𝓸𝓻𝓲𝓽𝓸𝓼</h2>
          </div>
        <hr>
        <div>
          <div class="cart-wrap" style="padding-top: 5px">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="table-wishlist">
                    <hr style="margin: 0">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <thead>
                        <tr>
                          <th width="50%" style="text-align: left; padding-left: 110px">Nombre del producto</th>
                          <th width="15%">Precio</th>
                          <th width="10%">Estado</th>
                          <th width="15%"></th>
                          <th width="10%"></th>
                        </tr>
                        </thead>
                        <tbody>
                          <FavoritoArticulo v-bind:favoritoArticulo="item" v-bind:posicion="index" v-for="(item , index) of this.$store.state.favoritos" :key ="index" />                        
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>    
  </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import FavoritoArticulo from '@/components/FavoritoArticulo.vue';
    import Footer from '@/components/Footer.vue';
    import axios from 'axios';

    export default {
      name: 'Favoritos',
      components: {
          Header,
          FavoritoArticulo,
          Footer
      },
      data () {
        return {
          articulos: [],
        }
      },
      mounted() {
        this.$store.dispatch("generarState");
        axios.post('/favorites/select', {id_cliente: this.$store.state.usuario.id}).then(res => {
          this.articulos = res.data;
          this.$store.dispatch("guardarFavoritos", this.articulos);
        });
      }
    }
</script>

<style>

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