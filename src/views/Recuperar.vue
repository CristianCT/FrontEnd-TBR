<template>
  <div class="preview">

  <div>
        <nav class="navbar navbar-light">
            <a class="navbar-brand" style="font-size: 25px;" href="/home"><img :src="require('../assets/logo.svg')" width="30" height="30" class="d-inline-block align-top" alt="">LaudithShop</a>

        </nav>
    </div>

    
    <div class="container card sombra-contenedor" style="margin-bottom: 20px; padding-top: 20px; padding-bottom: 40px; width: 500px; heigh: 500px">
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		<span class="input-group-text" style="background-color: #ef5777; color: white"> <i class="fa fa-lock"></i> </span>
  	</div>        
        <input name="" class="form-control" placeholder="Nueva Contraseña" type="email">
        </div> <!-- form-group//   $('#VentanaLogin').modal('hide'); -->

<div class="form-group input-group">
    	<div class="input-group-prepend">
		<span class="input-group-text" style="background-color: #ef5777; color: white"> <i class="fa fa-lock"></i> </span>
  	</div>        
        <input name="" class="form-control" placeholder="Repetir contraseña" type="email">
        </div>
    

        <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777; color: white"> Cambiar Contraseña  </button>
        </div> <!-- form-group// -->   
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PreviewArticulo from '@/components/PreviewArticulo.vue';
import axios from 'axios';

export default {
  name: 'preview',
  components: {
    Header,
    Footer,
    PreviewArticulo
  },
  data () {
    return {
      idArticulo: this.$route.params.codigo_articulo,
      articulo: null
    }
  },
  mounted (){

    axios.post('/articles/article', {codigo_articulo: this.idArticulo}).then(res => {
      this.articulo = res.data;
    })
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

</style>