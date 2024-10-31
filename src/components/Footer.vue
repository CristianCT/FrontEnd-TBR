<template>
  <div>
    <!-- Footer -->
    <footer class="bg-light text-center text-lg-start">
    <!-- Grid container -->
    <div class="container footer-global col-lg-12">
        <!--Grid row-->
        <div class="row">
        <!--Grid column-->
        <div class="col-lg-3 col-md-12 mb-4 mb-md-0">
            <h5 class="text-uppercase"><center>Acerca de Green Galaxy Cosmetics</center></h5>

            <p class="text-justify" style="font-size: 15px;">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
            voluptatem veniam, est atque cumque eum delectus sint!
            </p>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-1 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Enlaces</h5>

            <div class="list-group">
                <!-- <ul class="fa-ul">
                    <li><a class="info-contacto" href="https://www.facebook.com"><img class="iconos-enlaces" src="../assets/fb.png" alt=""></a></li>
                    <li><a class="info-contacto" href="https://www.instagram.com"><img class="iconos-enlaces" src="../assets/ig.png" alt=""></a></li>
                    <li><a class="info-contacto" href="https://web.whatsapp.com"><img class="iconos-enlaces" src="../assets/wsp.png" alt=""></a></li>
                    <li><a class="info-contacto" href="https://www.youtube.com"><img class="iconos-enlaces" src="../assets/gm.png" alt=""></a></li>
                </ul> -->
                <ul class="fa-ul">
                    <li><a class="info-contacto" href="https://www.facebook.com"><i class="fa-li fa fa-facebook-official"></i></a></li>
                    <li><a class="info-contacto" href="https://www.instagram.com"><i class="fa-li fa fa-instagram"></i></a></li>
                    <li><a class="info-contacto" href="https://web.whatsapp.com"><i class="fa-li fa fa-whatsapp"></i></a></li>
                    <li><a class="info-contacto" href="https://www.youtube.com"><i class="fa-li fa fa-google-plus"></i></a></li>
                </ul>
            </div>
        </div>
        
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0" id="contactenos" >
            <h5 class="text-uppercase">Contáctenos</h5>
            <form action="">
                <div class="form-group">
                    <label for="exampleFormControlInput1">Nombre</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlInput1">E-mail</label>
                    <input type="email" class="form-control" placeholder="name@example.com">
                </div>
                
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Comentario</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-secondary btn-block">Enviar</button>
            </form>
            
        </div>
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase mb-0">Encuéntrenos</h5>

            <!--Google map-->
            <div id="map-container-google-1" class="z-depth-1-half map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d490.5116726756841!2d-75.45859058510587!3d10.414157902569933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1610051635364!5m2!1ses!2sco" frameborder="0" style="border: 1px;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>

            <!--Google Maps-->
        </div>
        <!--Grid column-->
        </div>
        <!--Grid row-->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center text-light p-3" style="background-color: black">
        © 2021 Copyright:
        <a class="text-light" href="/">LaudithShop</a>
    </div>
    <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }    
</script>

<style scoped>

    .fa-ul{

        margin-left: 60px;
    }
    li{
      position: relative;
      font-size: 15px;
      margin-bottom: 25px;
    }
    
    .map-container{
        overflow:hidden;
        padding-bottom:56.25%;
        position:relative;
        height:100%;
        width: 400px;
        height:0;
    }
    .map-container iframe{
        left:0;
        top:0;
        height:100%;
        width:100%;
        position:absolute;
    }
    .footer-global{
        /* background-color: white; */
        margin-left: 0px;
        margin-right: 0px;
    }

    label{

        margin-bottom: 0px;
    }
    .fa-li{
      position: relative;
      margin-left: 5px;
      font-size: 3em;
      color: rgb(59, 59, 59);
    }
    .iconos-enlaces{

        height: 40px;
        width: 40px;
        opacity: 40%;
    }
</style>