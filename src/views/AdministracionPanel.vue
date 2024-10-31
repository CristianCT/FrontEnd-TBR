<template>
  <div class="leftmenu articulos-administrador">
    <Nav/>
    <div class="card-table welcomeadmin">
      <img :src="require('../assets/welcomeadmin.png')" alt="" width="100%">
      <h1>PANEL DE ADMINISTRACIÓN</h1>
    </div>
  </div>
</template>
<script>
  import Nav from '@/components/NavigationDrawer.vue';

  export default {
    components: { Nav },
    name: 'AdministracionPanel',
  }
</script>
<style>
  .leftmenu{

    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .barra-busqueda{

    margin: 0 40px 0 0;
  }
  .card-table{

    width: 100%;
    margin: 20px 20px 20px 0px ;
  }
  .welcomeadmin{

    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>