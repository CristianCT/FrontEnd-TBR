<template>
    <tr style="border-bottom: 5px">
        
        <td width="50%">
            <div class="display-flex align-center">
                <div class="img-product">
                    <a :href="'../preview/'+ favoritoArticulo.codigo_articulo"><img :src="require('../assets/' + favoritoArticulo.referencia + '.jpeg')" alt="" class="mCS_img_loaded"></a>
                </div>
                <div class="name-product" style="width: 68%">
                    <a :href="'../preview/'+ favoritoArticulo.codigo_articulo" style="color: grey;"><h6 style="font-size: 20px; color:  #ef5777">{{ favoritoArticulo.nombre_articulo }}</h6></a>
                    <p style="font-size: 12px; line-height: 100%">{{ favoritoArticulo.descripcion }}</p>
                </div>
            </div>
        </td>
        <td width="15%" class="price">${{ favoritoArticulo.valor_final }}</td>
        <td width="10%"><span>{{ favoritoArticulo.nombre_estados }}</span></td>
        <td width="15%">
            <button v-on:click="comprar" class="round-black-btn btn-block btn-comprar-articulo-favorito">Comprar</button>
            <button v-on:click="addCar" class="round-black-btn btn-block">Añadir al carrito</button>
        </td>
        <td width="10%" class="text-center"><a v-on:click="deleteFavorito" class="trash-icon" style="color: grey; font-size: 25px"><i class="fas fa-trash-alt"></i></a></td>
    </tr>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "FavoritoArticulo",
        props: ['favoritoArticulo', 'posicion'],
        data () {
            return {
            cantidad: 1
            }
        },
        methods: {
            comprar(){
                this.$router.push('/facturacion/' + this.favoritoArticulo.codigo_articulo);
            },
            addCar(){
                axios.post('/shoppingcart/add', {codigo_articulo: this.favoritoArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
                
                    //Manejo de mensajes y errores
                    console.log(res.data.message);
                      
                }).catch((error) => {
                    //Manejo de errores
                });
            },
            deleteFavorito(){
                axios.post('/favorites/delete', {codigo_articulo: this.favoritoArticulo.codigo_articulo, id_cliente: this.$store.state.usuario.id }).then(res => {
                
                    //Manejo de mensajes y errores
                    console.log(res.data.message);
                    this.$store.state.favoritos.splice(this.posicion, 1);
                        
                }).catch((error) => {
                    //Manejo de errores
                    console.log(error);
                });
            }
        }
    }
</script>