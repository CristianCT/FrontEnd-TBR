<template>
  <div class="registro">

    <Header/>
	<div class="container card sombra-contenedor" style="margin-bottom: 20px; padding-top: 20px; padding-bottom: 40px; ">
	<div class="container">

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="perfil-tab" data-toggle="tab" href="#perfil" role="tab" aria-controls="perfil" aria-selected="true">Perfil</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="pedidos-tab" data-toggle="tab" href="#pedidos" role="tab" aria-controls="pedidos" aria-selected="false">Pedidos</a>
  </li>
</ul>
<div class="tab-content sombra-contenedor" id="myTabContent">
  <div class="tab-pane fade show active" id="perfil" role="tabpanel" aria-labelledby="perfil-tab">

<div class="container">
<div class="row gutters">
	<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
		<div class="card h-100 sombra-contenedor">
			<div class="card-body">
				<div class="account-settings">
					<div class="user-profile">
						<div class="user-avatar">
							<center><h1 style="font-size: 90px; background-color: grey; width: 100px; height: 100px; border-radius: 100px">{{ nombre.substr(0 , 1).toUpperCase() }}</h1></center>
						</div>
						<h5 class="user-name">{{ nombre }}</h5>
						<h6 class="user-email">{{ email }}</h6>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
		<div class="card h-100 sombra-contenedor">
			<div class="card-body">
				<div class="row gutters">
					<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<h6>DATOS PERSONALES</h6>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div class="form-group">
							<label for="fullName">Nombe Completo</label>
							<input type="text" class="form-control" id="fullName" placeholder="Ingrese nombres" v-model="newName" disabled>
						</div>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div class="form-group">
							<label for="eMail">Email</label>
							<input type="email" class="form-control" id="eMail" placeholder="Ingrese Email" v-model="newEmail" disabled>
						</div>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div class="form-group">
							<label for="phone">Teléfono</label>
							<input type="text" class="form-control" id="phone" placeholder="Ingrese número de teléfono" v-model="phone">
						</div>
					</div>
				</div>
				<div class="row gutters">
					<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<h6 >DIRECCIÓN</h6>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div class="form-group">
							<label for="Street">Dirección</label>
							<input type="name" class="form-control" id="Street" placeholder="Ingrese dirección" v-model="address">
						</div>
					</div>
					<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
						<div class="form-group">
							<label for="ciTy">Ciudad</label>
							<input type="name" class="form-control" id="ciTy" placeholder="Ingrese ciudad" v-model="city">
						</div>
					</div>
				</div>
				<div class="row gutters">
					<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div class="text-right">
                            <button v-on:click="guardarCambios" class="btn btn-white" style="background-color: grey; border-color: grey; color: white; margin: 5px"><i class="fa fa-save" style="margin-right: 10px"></i>Guardar Cambios</button>						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
<hr>

  </div>
  <div class="tab-pane fade" id="pedidos" role="tabpanel" aria-labelledby="pedidos-tab">
	  <Pedidos v-bind:pedidoArticulo="item" v-for="(item , index) of articulos" :key ="index" />
  </div>
</div>

</div>
</div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import FavoritoArticulo from '@/components/FavoritoArticulo.vue';
import Pedidos from '@/components/Pedidos.vue';
import axios from 'axios';

export default {
	name: 'usuario',
	components: {
		Footer,
		Header,
		FavoritoArticulo,
		Pedidos
	},
	data () {
        return {
			articulos: [],
			nombre: '',
			email: '',
			newName: '',
			newEmail: '',
			phone: '',
			address: '',
			city: '',
        }
      },
	mounted(){
		axios.post('/orders/select', {id_cliente: this.$store.state.usuario.id}).then(res => {
          	this.articulos = res.data;
        });
		axios.post('/clients/select', {id_cliente: this.$store.state.usuario.id}).then(res => {
			this.phone = res.data[0].telefono_cliente;
			this.address = res.data[0].direccion;
			this.city = res.data[0].ciudad;
        });
		this.nombre = this.$store.state.usuario.name;
		this. email = this.$store.state.usuario.email;
		this.newName = this.nombre;
		this.newEmail = this.email;
	},
	methods: {
		guardarCambios(){
			axios.post('/clients/update', {
				id_cliente: this.$store.state.usuario.id,
				nombre_cliente: this.nombre,
				telefono_cliente: this.phone,
				email_cliente: this.email,
				direccion: this.address,
				ciudad: this.city
				
			}).then(res => {
          		console.log(res.data);
        	});

		}
	}
}
</script>

<style scoped>

  .navegacion{

    height: 100%;
  }
  .opciones-registro{

    margin-left: 5px;
    margin-right: 5px;
  }

  .barra-navegacion{

    background-color:rgb(49, 102, 143);
  }


.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
}
.account-settings .about {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
    text-align: center;
}


.form-control {
    border: 1px solid #596280;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;   
    color: black;
}

nav .navbar-nav li a{
  color: white !important;
  }

.sombra-contenedor {
  
  margin: 10px auto;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 5px grey; 
}

</style>