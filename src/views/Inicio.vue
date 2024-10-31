<template>
  <div class="inicio">
    <nav class="navbar navbar-light barra-navegacion">
      <a class="navbar-brand" href="/" style="color: white">
        <img :src="require('../assets/logo.svg')" width="30" height="30" class="d-inline-block align-top" alt="">Green Galaxy Cosmetics</a>
        <div>
          <a href="#VentanaRegistro" data-toggle="modal" class="btn-contacto btn btn-secundary" style="background-color: #79D96A;">Registrarse</a>
          <a href="#VentanaLogin" data-toggle="modal" class="btn-comprar btn btn-primary" style="background-color: #ef5777; border">Ingresar</a>
        </div>
      <Register/>
      <Login/>
    </nav>
    <Inicio/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Inicio from '@/components/Inicio.vue';
import Footer from '@/components/Footer.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'inicio',
  components: {
    Inicio,
    Footer,
    Register,
    Login
  }
}
</script>

<style scoped>
  .inicio{
    height: 100%;
    width: 100%;
    position:relative;
  }

  .barra-navegacion{

    background-color: rgba(0, 0, 0, 0.35);
    position: absolute;
    width: 100%;
  }
  .opciones-inicio{

    margin-left: 5px;
    margin-right: 5px;
  }

  .btn-contacto, .btn-comprar{

    margin-left: 5px;
    margin-right: 5px;
    padding-top: 6px;
    color: white;
    border: none;
    font-size: 15px;
    font-family:'Times New Roman', Times, serif ;
    opacity: 60%;
  }

</style>