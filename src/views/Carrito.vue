<template>
  <div class="carrito">
    <Header/>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="require('../assets/banner1.jpg')" style="width: 100%">
          <div class="carousel-caption d-none d-md-block">
            <h2>ANDRES DAVID HURTADO LUNA</h2>
            <p>Yo soy andres David hurtado luna el antipatico</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('../assets/banner2.jpg')" style="width: 100%">
          <div class="carousel-caption d-none d-md-block">
            <h2>ANDRES DAVID HURTADO LUNA</h2>
            <p>Yo soy andres David hurtado luna el antipatico</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('../assets/banner3.jpg')" style="width: 100%">
          <div class="carousel-caption d-none d-md-block">
            <h2>ANDRES DAVID HURTADO LUNA</h2>
            <p>Yo soy andres David hurtado luna el antipatico</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    
    <div class="container card" style="margin-bottom: 20px; padding-top: 20px; padding-bottom: 40px; margin-top: 50px">
      <div class="container">
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-9">
                    <div class="ibox sombra-contenedor">
                        <div style="display: flex; flex-direction: row-reverse; justify-content: space-between; margin: 10px 20px 3px 20px">
                            <span class="pull-right">(<strong>{{ this.articulos.length }}</strong>) articulos</span>
                            <h5>Articulos seleccionados</h5>
                        </div>
                        <div class="ibox-content" v-for="(item , index) of this.$store.state.carrito" :key = "index" style="padding-bottom: 0px">
                          <CarritoArticulo v-bind:carritoArticulo ='item' v-bind:posicion="index"/>
                        </div>
                        <div class="ibox-content">
                            <a href="/home" class="btn btn-white" style="background-color:  #ef5777; border-color: #ef5777; color: white; margin: 5px"><i class="fa fa fa-shopping-cart" style="margin-right: 10px"></i>Continuar comprando</a>
                        </div>
                    </div>

                </div>
                <div class="col-md-3">
                    <div class="ibox sombra-contenedor">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Resumen de compra</h5>
                        </div>
                        <div class="ibox-content">
                            <span>Total</span>
                            <h2 class="font-bold">${{ total_carrito() }}</h2>
                            <hr>
                            <span class="text-muted small">
                                *El tiempo de llegada de los pedidos, podría variar dependiendo de su ubicaión actual
                            </span>
                            <div class="m-t-sm">
                              <div>
                                  <button v-on:click="facturarCarrito" class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777; margin: 5px"><i class="fa fa-credit-card" style="margin-right: 10px"></i>Ir a pagar</button>
                                  <button v-on:click="deleteAll" class="btn btn-white btn-block" style="background-color: grey; border-color: grey; color: white; margin: 5px"><i class="fa fa-trash" style="margin-right: 10px"></i>Vaciar carrito</button>
                              </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="ibox sombra-contenedor">
                        <hr style="margin: 0 0 8px 0">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Canjear cupones</h5>
                        </div>
                        <div class="ibox-content text-justify">
                          <form class="form-group" action="">
                            <input type="text" class="form-control" id="codigo_cupon" aria-describedby="emailHelp" placeholder="Código de cupón">
                            <span class="text-muted small">
                                *Los cupones solo se pueden redimir una sola vez por usuario.
                            </span>
                            <button class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777;"><i class="fa fa-gift" style="margin-right: 10px"></i>Canjear</button>
                          </form>
                        </div>
                        <hr style="margin: 0px">
                    </div> -->
                    <div class="ibox sombra-contenedor">
                        <hr style="margin: 0 0 8px 0">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Soporte</h5>
                        </div>
                        <div class="ibox-content text-center">
                            <h3><i class="fa fa-phone" style="margin-right: 10px"></i>+57 321 9876543</h3>
                            <span class="small">
                              Por favor contacte con nosotros en caso de tener inconvenientes. Estamos disponibles las 24 horas.
                            </span>
                        </div>
                        <hr style="margin: 0px">
                    </div>
                </div>
            </div>
        </div>
        </div>

        <v-sheet class="mx-auto" elevation="8" width="98%" height="500">
          <div style="margin: 10px 20px 3px 20px;">
            <h2 style="text-align: center">Productos Relacionados</h2>
          </div>
          <v-slide-group class="pa-4" active-class="success" show-arrows>
            <v-slide-item v-for="n in 5" :key="n" v-slot="{ active, toggle }">
              <v-card :color="active ? undefined : 'white lighten-1'" class="ma-4" height="350" width="200" @click="toggle">
                <Articulo v-bind:articulo="item"/>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
    </div>
    <Footer/>    
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import CarritoArticulo from '@/components/CarritoArticulo.vue';
  import Footer from '@/components/Footer.vue';
  import Articulo from '@/components/Articulo.vue';
  import axios from 'axios';

  export default {
    name: 'Carrito',
    components: {
      Header,
      CarritoArticulo,
      Footer,
      Articulo,
    },
    data () {
      return {
        item: {
          nombre_articulo: 'Lapiz labial1',
          precio_venta: 20000,
          valor_final: 18000,
          descuento: 10,
          nombre_estado: 'Disponible',
          referencia: 'GG14',
          calificacion: 3
        },
        articulos: [],
      }
    },
    mounted() {
      axios.post('/shoppingcart/select', {id_cliente: this.$store.state.usuario.id}).then(res => {
        this.articulos = res.data;
        this.$store.dispatch("guardarCarrito", this.articulos);
      });
    },
    methods: {

      total_carrito(){
        let total = 0;
        for(let x = 0 ; x < this.articulos.length ; x++){
          total = total + (this.articulos[x].valor_final*this.articulos[x].cantidad)
        }
        return total.toFixed(2);
      },
      facturarCarrito(){

        localStorage.setItem('articulosFacturacion', JSON.stringify(this.articulos));
        this.$router.push('/facturacion/'+ localStorage.getItem('UserClientToken'));
      },
      deleteAll (){
        axios.post('/shoppingcart/empty', {id_cliente: this.$store.state.usuario.id}).then(res => {
        this.articulos = [];
        this.$store.dispatch("guardarCarrito", this.articulos);
      }).catch(error => {

        console.log(error);
      });
      }
    }
  }
</script>

<style scoped>

body{margin-top:20px;
    background:#eee;
}
h3 {
    font-size: 16px;
}
.canjear-cupon{

  margin-bottom: 0px !important;
}
.text-navy {
    color: #1ab394;
}
.cart-product-imitation {
  text-align: center;
  padding-top: 30px;
  height: 80px;
  width: 80px;
  background-color: #f8f8f9;
}
.product-imitation.xl {
  padding: 120px 0;
}
.product-desc {
  padding: 20px;
  position: relative;
}
.ecommerce .tag-list {
  padding: 0;
}
.ecommerce .fa-star {
  color: #d1dade;
}
.ecommerce .fa-star.active {
  color: #f8ac59;
}
.ecommerce .note-editor {
  border: 1px solid #e7eaec;
}
table.shoping-cart-table {
  margin-bottom: 0;
}
table.shoping-cart-table tr td {
  border: none;
  text-align: right;
}
table.shoping-cart-table tr td.desc,
table.shoping-cart-table tr td:first-child {
  text-align: left;
}
table.shoping-cart-table tr td:last-child {
  width: 80px;
}
.ibox {
  clear: both;
  margin-bottom: 25px;
  margin-top: 0;
  padding: 0;
}
.ibox.collapsed .ibox-content {
  display: none;
}
.ibox:after,
.ibox:before {
  display: table;
}
.ibox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 3px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 14px 15px 7px;
  min-height: 48px;
}
.ibox-content {
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}
.ibox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}

.sombra-contenedor {
  
  margin: 10px auto;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 5px grey; 
}
</style>