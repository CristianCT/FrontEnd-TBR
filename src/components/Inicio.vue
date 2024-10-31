<template>
  <div class="contenedor-inicio">
    <div class="opciones-ingreso"> 
      <div class="list-group">
        <ul class="fa-ul">
          <li class="item-redes"><a href="https://www.facebook.com/The-Beauty-Room-101197188487060?_rdc=1&_rdr" target="_blank"><i class="fa-li fa fa-facebook-official"></i></a></li>
          <li class="item-redes"><a href="https://www.instagram.com/greengalaxy.col/" target="_blank"><i class="fa-li fa fa-instagram"></i></a></li>
          <li class="item-redes"><a href="https://wa.me/message/RQUDFVPCX2ILJ1" target="_blank"><i class="fa-li fa fa-whatsapp"></i></a></li>
          <li class="item-redes"><a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=andresd61996@gmail.com" target="_blank"><i class="fa-li fa fa-google-plus"></i></a></li>
        </ul>
      </div>
      <div class="btns-principales">
        <a href="#contactenos" class="boton-contacto btn btn-secundary" style="background-color: #79D96A;">Contacto</a>
        <a href="/home" class="boton-comprar btn btn-primary" style="background-color: #ef5777; border">Comprar</a>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'Inicio',
  }
</script>

<style scoped>
  .contenedor-inicio{

      background-image: url('../assets/portada.png');
      background-size: 120% 100%;
      margin-left: 0px;
      margin-right: 0px;
      padding: 0px;
      height: 100%;
      width: 100%;
      max-width: 1400px;
      max-height: 750px;
      display: flex;
      align-items: center;
    }
    .boton-contacto , .boton-comprar{

      margin-left: 5px;
      margin-right: 5px;
      width: 250px;
      height: 45px;
      padding-top: 6px;
      color: white;
      border: none;
      font-size: 23px;
      font-family:'Times New Roman', Times, serif ;
    }

    .opciones-ingreso{
      display: flex;
      position: relative;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      left: 10%;
    }
    
    .fa-li{
      position: relative;
      font-size: 3em;
      color: #ef5777
    }

    .fa-ul{

      display: flex;
      flex-direction: row;
      padding-left: 100px;
    }
    .opciones-ingreso{

      margin-top: 160px;
    }
    .item-redes{

      margin-right: 20px;
      margin-left: 20px
    }
    .btns-principales{

      padding-left: 58px;
    }
    
</style>
