<template>
  <div class="Carrito">
    <Header/>
    
    <div class="container card" style="margin-bottom: 20px; padding-top: 20px; padding-bottom: 40px; margin-top: 50px">
      <div class="container">
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-5">
                    <div class="ibox sombra-contenedor">
                        <div style="display: flex; flex-direction: row-reverse; justify-content: space-between; margin: 10px 20px 3px 20px">
                            <span class="pull-right"><img style="width: 100px" :src="require('../assets/group-target.jpg')" alt=""></span>
                            <h5>Configuración de pago con tarjeta</h5>
                        </div>
                        <hr style="margin: 0 0 8px 0">
                        <div style="margin: 0 20px 0 20px">
                            <form action="">
                                <v-text-field label="Nombre del titular" placeholder="Nombre del titular" outlined dense></v-text-field>
                                <v-text-field label="Número de tarjeta" placeholder="Número de tarjeta" outlined dense></v-text-field>
                                <v-text-field label="Fecha de vencimiento (MM/AA)" placeholder="Fecha de vencimiento (MM/AA)" outlined dense></v-text-field>
                                <v-text-field label="Codigo de seguridad (CVV)" placeholder="Codigo de seguridad (CVV)" outlined dense></v-text-field>
                                <div>
                                    <p style="text-align: justify"><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis porro debitis sequi magni impedit eum sed quo assumenda ea tenetur, cupiditate molestias hic cumque quod commodi corporis corrupti unde ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore neque totam doloribus vitae. Quod praesentium beatae dolores nostrum quia, atque impedit voluptatum omnis aperiam pariatur, sapiente veniam, voluptatibus dicta obcaecati.</small></p>
                                </div>
                                
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="terminoscondicionescompra" v-model='terminoscondicionescompra'>
                                    <label class="form-check-label" for="terminoscondicionescompra">Acepto terminos y condiciones</label>
                                </div>
                                <div style="margin: 10px 0 20px 0">
                                    <button :disabled='isDisabled' class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777;"><i class="fa fa fa-credit-card" style="margin-right: 10px"></i>Confirmar compra</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="ibox sombra-contenedor">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Resumen de compra</h5>
                        </div>
                        <div class="ibox-content">
                            <span>Total</span>
                            <h2 class="font-bold">${{ (total_facturacion()*(1-(this.descuento/100))).toFixed(2) }}</h2>
                            <span v-if="descuento > 0" class="text-muted small">Cupon de descuento del {{ descuento }}% Aplicado: <s>${{ total_facturacion().toFixed(2) }}</s></span>
                            <hr>
                            <span class="text-muted small">
                                *El tiempo de llegada de los pedidos, podría variar dependiendo de su ubicaión actual
                            </span>
                        </div>
                    </div>

                    <div v-if="descuento == 0 && this.$store.state.usuario" class="ibox sombra-contenedor">
                        <hr style="margin: 0 0 8px 0">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Canjear cupones</h5>
                        </div>
                        <div class="ibox-content text-justify">
                          <input v-model="codigo_cupon" type="text" class="form-control" id="codigo_cupon" aria-describedby="emailHelp" placeholder="Código de cupón">
                          <span class="text-muted small">
                              *Los cupones solo se pueden redimir una sola vez por usuario.
                          </span>
                          <button v-on:click="canjearCupon" class="btn btn-primary btn-block" style="background-color: #ef5777; border-color: #ef5777;"><i class="fa fa-gift" style="margin-right: 10px"></i>Canjear</button>
                        </div>
                        <hr style="margin: 0px">
                    </div>
                    
                    <div class="ibox sombra-contenedor">
                        <hr style="margin: 0 0 8px 0">
                        <div style="margin: 10px 20px 3px 20px">
                            <h5>Articulos</h5>
                        </div>
                        <div class="ibox-content text-center">

                          <div class="ibox-content" v-for = "(item , index) of articulos" :key = "index" style="padding-bottom: 0px">
                            <FacturacionArticulo v-bind:articulo = "item" />
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
  import Footer from '@/components/Footer.vue';
  import FacturacionArticulo from '@/components/FacturacionArticulo.vue';
  import axios from 'axios';

  export default {
    name: 'Facturacion',
    components: {
      Header,
      Footer,
      FacturacionArticulo,
    },
    data () {
      return {
        codigo_pedido: this.$route.params.codigo_pedido,
        terminoscondicionescompra: false,
        articulos: [],
        descuento: 0,
        codigo_cupon: '',
        message: '',
        valor_anterior: 0
      }
    },
    mounted (){
      
      /* localStorage.removeItem('articulosFacturacion'); */
      if((this.codigo_pedido) == localStorage.getItem('UserClientToken')){
        this.articulos = JSON.parse(localStorage.getItem('articulosFacturacion'));
      }else{
        axios.post('/articles/article', {codigo_articulo: this.codigo_pedido}).then(res => {
          this.articulos = res.data
        }).catch(error => {
          console.log(error)
        });
      }
    }, 
    computed: {
      isDisabled: function(){
        return !this.terminoscondicionescompra;
      }
    },
    methods: {
      total_facturacion(){
        let total = 0;
        for(let x = 0 ; x < this.articulos.length ; x++){
          total = total + (this.articulos[x].valor_final * this.articulos[x].cantidad)
        }
        return total;
      },
      canjearCupon(){
        axios.post('/coupons/select', {
          codigo_cupon: this.codigo_cupon
        }).then(res => {
          if(!res.data.message){
            this.descuento = res.data[0].descuento;
          }else{
            this.message = res.data.message;
            console.log(res.data.message);
          }
        }).catch(error => {
          console.log(error)
        });
        this.codigo_cupon = '';
      }
    }
  }
</script>

<style scoped>


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