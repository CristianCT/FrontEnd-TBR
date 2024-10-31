<template>
  <div class="advertencia-registro-favoritos">
        <div style="display: flex; flex-direction: column; align-items: center">
            <img :src="require('../assets/advertencia-favoritos.png')" alt="">
            <h2 style="text-align: center; color: grey">Lo sentimos, Primero debes estar registrado</h2>
            <div>
                <button class="btn btn-primary" style="background-color: #ef5777; border-color: #ef5777; margin: 5px 5px 40px 5px"><i class="fa fa fa-user" style="margin-right: 10px"></i>Registrarse</button>
                <button class="btn btn-white" style="background-color: grey; border-color: grey; color: white; margin: 5px 5px 40px 5px"><i class="fa fa-arrow-left" style="margin-right: 10px"></i>Continuar comprando</button>
            </div>
        </div>
  </div>
</template>