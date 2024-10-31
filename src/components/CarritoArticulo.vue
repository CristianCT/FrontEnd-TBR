<template>
    
  <div class="table-responsive">
      <table class="table shoping-cart-table">
          <tbody>
          <tr>
              <td width="90">
                  <a :href="'../preview/'+ carritoArticulo.codigo_articulo"><img :src="require('../assets/' + carritoArticulo.referencia + '.jpeg')" alt="" style="max-width: 90px; max-height: 200px"></a>
              </td>
              <td class="desc">
                  <h3><a :href="'../preview/'+ carritoArticulo.codigo_articulo" class="text-navy" style="font-size: 20px">{{ carritoArticulo.nombre_articulo }}</a></h3>
                  <p class="small" style="line-height: 80%;">Codigo: {{ carritoArticulo.referencia }}</p>
                  <p class="small" style="line-height: 20%; font-size: 18px;">Precio unitario: ${{ carritoArticulo.valor_final }}  <s style="font-size: 15px">${{ carritoArticulo.precio_venta }}</s></p>
                  
                  <dl class="small m-b-none">
                      <dt>Descripción</dt>
                      <dd>{{ carritoArticulo.descripcion }}</dd>
                  </dl>
                  <div class="m-t-sm" v-if="carritoArticulo.isFavorite > 0">
                      <a v-on:click="addFavorites" class="text-muted" style="margin-right: 20px; color: #ef5777 !important;"><!-- pointer-events: none; -->
                        <i class="fa fa-heart" style="margin-right: 5px; color: #ef5777"></i>Añadir a favoritos
                      </a>
                      <a v-on:click="deleteCarrito" href="#" class="text-muted" style="margin-lefts: 20px"><i class="fa fa-trash" style="margin-right: 5px"></i>Eliminar del carrito</a>
                  </div>
                  <div class="m-t-sm" v-else>
                      <a v-on:click="addFavorites" class="text-muted" style="margin-right: 20px;">
                        <i class="fa fa-heart" style="margin-right: 5px"></i>Añadir a favoritos
                      </a>
                      <a v-on:click="deleteCarrito" href="#" class="text-muted" style="margin-lefts: 20px"><i class="fa fa-trash" style="margin-right: 5px"></i>Eliminar del carrito</a>
                  </div>
              </td>
              
              <td width="65px">
                <div style="display: flex; flex-direction: column; align-items: center">
                  <label style="font-size: 20px">Cantidad</label>
                  <input type="number" v-model="carritoArticulo.cantidad" class="form-control" placeholder="1" min="0" max="99" style="width: 65px">
                </div>
                <h4 style="color: #ef5777; margin-top: 42%; margin-bottom: 0px">${{ (carritoArticulo.valor_final*carritoArticulo.cantidad).toFixed(2) }}</h4>
              </td>
          </tr>
          </tbody>
      </table>
  </div>
</template>

<script>

  import axios from 'axios';

    export default {
      name: "CarritoArticulo",
      props: ['carritoArticulo', 'posicion'],
      methods: {

        addFavorites(){

          axios.post('/favorites/add', {codigo_articulo: this.carritoArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
          
              //Manejo de mensajes y errores
              console.log(res.data.message);
              this.carritoArticulo.isFavorite = 1;
                
          }).catch((error) => {
              //Manejo de errores
              console.log(error);
          });
        },
        deleteCarrito(){

          axios.post('/shoppingcart/delete', {codigo_articulo: this.carritoArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
          
              //Manejo de mensajes y errores
              console.log(res.data.message);
              this.$store.state.carrito.splice(this.posicion, 1);
                
          }).catch((error) => {
              //Manejo de errores
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
.text-navy {
    color: #ef5777;
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
</style>