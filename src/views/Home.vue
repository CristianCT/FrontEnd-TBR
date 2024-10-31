<template>
  <div class="home">
    <HeaderSimple/>
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="require('../assets/carrousel1.jpg')" style="width: 100%">
          <div class="carousel-caption d-none d-md-block">
            <h2>ANDRES DAVID HURTADO LUNA</h2>
            <p>Yo soy andres David hurtado luna el antipatico</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('../assets/carrousel2.jpg')" style="width: 100%">
          <div class="carousel-caption d-none d-md-block">
            <h2>ANDRES DAVID HURTADO LUNA</h2>
            <p>Yo soy andres David hurtado luna el antipatico</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="require('../assets/carrousel3.jpg')" style="width: 100%">
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
    <div>
      <hr style="margin-bottom: 5px">
      <div style="display: flex; flex-direction: row; margin: 0 20px 0 20px; justify-content: space-between">
        <h2 style="color: grey">¡¡LaudithShop al alcance de todos!!</h2>
        <div class="text-center" style="display: flex; flex-content: row">
          <div style="display: flex; flex-content: row; height: 35px">
            <v-combobox color="#ef5777" v-model="filterSelect" :items="itemsFiltro" label="Filtros" multiple outlined dense></v-combobox>
            <v-btn v-on:click="filtrar" color="#ef5777" dark  style="margin: 2px 5px 0 5px; padding-left: 30px"><i class="fa-li fa fa-filter"></i>Filtrar</v-btn>
          </div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="Secundary" dark v-bind="attrs" v-on="on" style="margin: 2px 5px 0 5px; padding-left: 30px"><i class="fa-li fa fa-sort-amount-asc"></i>Ordenar por</v-btn>
            </template>
            <v-list>
              <v-list-item> 
                <a v-on:click="ordenarDecr">De mayor a menor precio</a>
              </v-list-item>
              <v-list-item> 
                <a v-on:click="ordenarAsc">De menor a mayor precio</a>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <hr style="margin-top: 5px">
      <div style="margin-left: 20px; display: flex; flex-wrap: wrap;">
        <div class="col-md-3 col-sm-6" v-for="(item , index) in this.$store.state.articulos.slice(porPagina*(page-1) , porPagina*(page-1) + porPagina)" :key ="index">
          <Articulo v-bind:articulo ="item"/>
        </div>
      </div>
      <hr style="margin-bottom: 5px">
        <div class="text-center">
          <v-pagination v-model="page" :length="pages" circle color="#ef5777"></v-pagination>
        </div>
      <hr style="margin-top: 5px">
    </div>
    <Footer/>    
  </div>
</template>

<script>
import HeaderSimple from '@/components/HeaderSimple.vue';
import Articulo from '@/components/Articulo.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HeaderSimple,
    Articulo,
    Footer
  },
  data () {
      return {
        articulos: [],
        page: 1,
        filterSelect: [],
        porPagina: 12,
        pages: 0,
        itemsFiltro: []
      }
    },
    mounted() {
      axios.get('/articles/list').then(res => {(this.$store.dispatch("guardarArticulos", res.data))
      this.pages = Math.ceil((this.$store.state.articulos.length/this.porPagina))})
      
      axios.get('/category/list').then(res => {
        for(let x = 0 ; x < res.data.length ; x++){
          this.itemsFiltro.push(res.data[x].nombre_categoria);
        }
        console.log(res.data['nombre_categoria'])
      })
    },
    methods: {
      ordenarAsc() {
        axios.get('/articles/orderasc').then(res => (this.$store.dispatch("guardarArticulos", res.data)));
      },
      ordenarDecr() {
        axios.get('/articles/orderdecr').then(res => (this.$store.dispatch("guardarArticulos", res.data)));
      },
      filtrar() {
        axios.post('/articles/filter', {
          filtros: this.filterSelect
        }).then(res => {
          this.$store.dispatch("guardarArticulos", res.data)
        }).catch(error => {
            console.log(error);
        });  
      }
    }
}
</script>