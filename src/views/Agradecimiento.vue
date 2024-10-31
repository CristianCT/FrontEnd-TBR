<template>
  <div class="agradecimiento contenedor-ventana">
    <div class="contenedor-interno-compra">
      <div style="display: flex; justify-content: center; flex-direction: column; align-items: center">
        <h1 style="text-align: center; color: #ef5777; font-size: 72px">𝓣𝓗𝓔 𝓑𝓔𝓐𝓤𝓣𝓨 𝓡𝓞𝓞𝓜</h1>
        <h2 style="font: oblique bold 30px cursive; color: grey">¡GRACIAS POR TU COMPRA!</h2>
      </div>
      <div>
          <button class="btn btn-primary" style="background-color: #ef5777; border-color: #ef5777; margin: 5px 5px 40px 5px"><i class="fa fa fa-long-arrow-left" style="margin-right: 10px"></i>Regresar al inicio</button>
      </div>

      <div>
        <ul class="fa-ul">
            <li><a class="info-contacto" href="https://www.facebook.com"><img class="iconos-enlaces" src="../assets/fb.png" alt=""><span>Enlace-Facebook</span></a></li>
            <li><a class="info-contacto" href="https://www.instagram.com"><img class="iconos-enlaces" src="../assets/ig.png" alt=""><span>Enlace-Instagram</span></a></li>
            <li><a class="info-contacto" href="https://web.whatsapp.com"><img class="iconos-enlaces" src="../assets/wsp.png" alt=""><span>Enlace-Wasa</span></a></li>
            <li><a class="info-contacto" href="https://www.youtube.com"><img class="iconos-enlaces" src="../assets/gm.png" alt=""><span>Enlace-You</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .contenedor-ventana{

      background-image: url('https://previews.123rf.com/images/radionphoto/radionphoto1702/radionphoto170200730/72328493-conjunto-de-cepillos-cosm%C3%A9ticos-profesionales-y-marco-de-la-promoci%C3%B3n-de-la-belleza-en-el-fondo-blanco.jpg');
      background-size: cover;
      margin-left: 0px;
      margin-right: 0px;
      padding: 0px;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

  .contenedor-interno-compra{

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 100px;
  }

  .fa-ul{

    display: flex;
    flex-direction: row;
    margin: 0px;
    padding: 0px;
  }
  li{
    position: relative;
    font-size: 15px;
    margin: 10px;
  }

  .info-contacto{
    display: flex;
    flex-direction: column;  
    align-items: center;
    justify-content: center;  
    color: grey;
  }

  .fa-li{
    margin-left: 5px;
    font-size: 3em;
    color: grey;
  }
  .iconos-enlaces{

    height: 40px;
    width: 40px;
    opacity: 40%;
  }
</style>