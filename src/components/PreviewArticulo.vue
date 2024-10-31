<template>
    <div>
        <div class="container">
            <div class="card" style="margin: 20px 0 20px 0">
                <div class="container-fliud">
                    <div class="wrapper row">
                        <div class="preview col-md-6">
                            
                            <div id="myCarouselPreview" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active"><img class="d-block w-100" :src="require('../assets/' + previewArticulo.referencia + '.jpeg')"></div>
                                    <!-- <div class="carousel-item"><img class="d-block w-100" :src="require('../assets/preview2.jpg')"></div>
                                    <div class="carousel-item"><img class="d-block w-100" :src="require('../assets/preview3.jpg')"></div>
                                    <div class="carousel-item"><img class="d-block w-100" :src="require('../assets/preview4.jpg')"></div>
                                    <div class="carousel-item"><img class="d-block w-100" :src="require('../assets/preview5.jpg')"></div> -->
                                </div>
                                <a class="carousel-control-prev" href="#myCarouselPreview" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#myCarouselPreview" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>

                            <ul class="preview-thumbnail nav nav-tabs" style="cursor: pointer; justify-content: center;">
                                <li data-target="#myCarouselPreview" data-slide-to="0" class="active"><img :src="require('../assets/' + previewArticulo.referencia + '.jpeg')"></li>
                                <!-- <li data-target="#myCarouselPreview" data-slide-to="1"><img :src="require('../assets/preview2.jpg')" /></li>
                                <li data-target="#myCarouselPreview" data-slide-to="2"><img :src="require('../assets/preview3.jpg')" /></li>
                                <li data-target="#myCarouselPreview" data-slide-to="3"><img :src="require('../assets/preview4.jpg')" /></li>
                                <li data-target="#myCarouselPreview" data-slide-to="4"><img :src="require('../assets/preview5.jpg')" /></li> -->
                            </ul>
                            
                            
                        </div>
                        <div class="details col-md-6">
                            <h3 class="product-title">{{ previewArticulo.nombre_articulo }}</h3>
                            <div class="rating">
                                <div class="stars" style="display: flex;">
                                    <div v-for="i in 5" :key="i">
                                        <span class="fa fa-star checked" v-if="i <= previewArticulo.calificacion"></span>
                                        <span class="fa fa-star" v-else></span>
                                    </div>
                                </div>
                                <span class="review-no">41 Vistas</span>
                            </div>
                            <p class="product-description">{{ previewArticulo.descripcion }}</p>
                            <h4 class="price">Precio: <span>${{ previewArticulo.valor_final }}</span></h4>
                            <p><strong>{{ previewArticulo.descuento }}%</strong> de descuento, antes <s>(${{ previewArticulo.precio_venta }})</s></p>
                            
                            <div style="margin: 0 25px 0 25px">
                                <div style="display: flex; justify-content: space-between; margin: 0 0 10px 0">
                                    <button v-on:click="addCar" class="add-to-cart btn btn-default" type="button" style="background-color: #ef5777;"><v-icon style="font-size: 23px; color: white; margin-right: 5px" aria-hidden="false">mdi-cart-variant</v-icon>Añadir al carrito</button>
                                    <button v-on:click="addFavorites" class="like btn btn-default" type="button"><v-icon style="font-size: 23px; color: white; margin-right: 5px" aria-hidden="false">mdi-heart</v-icon>Añadir a favoritos</button>
                                </div>
                                <a :href="'../facturacion/'+ previewArticulo.codigo_articulo" class=" btn btn-secondary btn-lg btn-block" style="color: white"><v-icon style="font-size: 23px; color: white; margin-right: 5px;" aria-hidden="false">mdi-credit-card</v-icon>Comprar</a>
                            </div>
                            <br>
                            <div>
                                <form>
                                    <h4>CALIFICA ESTE PRODUCTO</h4>
                                    <p class="clasificacion">
                                        <input id="radio1" type="radio" name="estrellas">
                                        <label v-on:click="addStart(5)" style="font-size: 40px;" for="radio1"><span class="fa fa-star"></span></label>
                                        <input id="radio2" type="radio" name="estrellas">
                                        <label v-on:click="addStart(4)" style="font-size: 40px;" for="radio2"><span class="fa fa-star"></span></label>
                                        <input id="radio3" type="radio" name="estrellas">
                                        <label v-on:click="addStart(3)" style="font-size: 40px;" for="radio3"><span class="fa fa-star"></span></label>
                                        <input id="radio4" type="radio" name="estrellas">
                                        <label v-on:click="addStart(2)" style="font-size: 40px;" for="radio4"><span class="fa fa-star"></span></label>
                                        <input id="radio5" type="radio" name="estrellas">
                                        <label v-on:click="addStart(1)" style="font-size: 40px;" for="radio5"><span class="fa fa-star"></span></label>
                                    </p>
                                </form>
                                <p class="vote"><strong>91%</strong> de los compradores, prefieren este producto! <strong>(87 votos)</strong></p>
                            </div>
                        </div>
                        <div style="width: 100%">
                            <h4 style="text-align: center">TAMBIEN TE PUEDE INTERESAR</h4>
                            <div style="display: flex; flex-wrap: wrap;">
                                <div class="col-md-3 col-sm-6" v-for ="(item , index) of articulosRelacionados" :key = "index">
                                    <Articulo v-bind:articulo = "item"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Articulo from '@/components/Articulo.vue';
import axios from 'axios';
export default {
    name: "PreviewArticulo",
    props: ['previewArticulo'],
    components: {
        Articulo
    },
    data () {
      return {
        articulosRelacionados: [
            {
            codigo_articulo: 9,
            nombre_articulo: 'Lapiz labial1',
            precio_articulo: 20000,
            valor_final: 18000,
            descuento: 10,
            nombre_estado: 'Disponible',
            precio_venta: 10000,
            calificacion: 5,
            referencia: 'GG24'
            },
            {
            codigo_articulo: 11,
            nombre_articulo: 'Polvo facial2',
            precio_articulo: 50000,
            valor_final: 25000,
            descuento: 50,
            nombre_estado: 'Disponible',
            precio_venta: 10000,
            calificacion: 5,
            referencia: 'GG24'
            },
            {
            codigo_articulo: 16,
            nombre_articulo: 'Lapiz labial3',
            precio_articulo: 20000,
            valor_final: 18000,
            descuento: 10,
            nombre_estado: 'Disponible',
            precio_venta: 80000,
            calificacion: 5,
            referencia: 'GG24'
            },
            {
            codigo_articulo: 17, 
            nombre_articulo: 'Lapiz labial4',
            precio_articulo: 20000,
            valor_final: 18000,
            descuento: 10,
            nombre_estado: 'Disponible',
            precio_venta: 80000,
            calificacion: 5,
            referencia: 'GG24'
            }]
        }
    },
    mounted(){
        this.previewArticulo = {
            codigo_articulo: 17, 
            nombre_articulo: 'Lapiz labial4',
            precio_articulo: 20000,
            valor_final: 18000,
            descuento: 10,
            nombre_estado: 'Disponible',
            precio_venta: 80000,
            calificacion: 5,
            referencia: 'GG24'
        }
        console.log(this.previewArticulo.referencia)
    },
    methods: {

        addCar(){

            this.$store.dispatch("generarState");
            axios.post('/shoppingcart/add', {codigo_articulo: this.previewArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
            
                //Manejo de mensajes y errores
                console.log(res.data.message);
                    
            }).catch((error) => {
                //Manejo de errores
            });
        },
        addFavorites(){

            this.$store.dispatch("generarState");
            axios.post('/favorites/add', {codigo_articulo: this.previewArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
            
                //Manejo de mensajes y errores
                console.log(res.data.message);
                    
            }).catch((error) => {
                //Manejo de errores
            });
        },
        addStart(calificacion){
            axios.post('/articles/qualify', {codigo_articulo: this.previewArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id, calificacion: calificacion }).then(res => {
            
                //Manejo de mensajes y errores
                console.log(res.data.message);
                    
            }).catch((error) => {
                //Manejo de errores
                console.log(error);
            });
        }
    }
}
</script>