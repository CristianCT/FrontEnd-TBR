<template>
<div >
    <br>
<h6 style="margin-left: 10px">ID del Pedido: {{ this.pedidoArticulo.codigo_pedido }}</h6>
    <article class="card">
        <div class="card-body row">
            <div class="col"> <strong>Estado del pedido:</strong> <br>{{ this.pedidoArticulo.nombre_estado }}</div>                    
            <div class="col"> <strong>Fecha estimada de entrega:</strong> <br>{{ this.pedidoArticulo.fecha_entrega }}</div>
            <div class="col"> <strong>Fecha de Facturación:</strong> <br>{{ this.pedidoArticulo.fecha_facturacion }}</div>
            <div class="col"> <strong>Valor total:</strong> <br>${{ this.pedidoArticulo.total }}</div>
        </div>
    </article>
</div>
</template>

<script>
    export default {
        name: "PedidoArticulo",
        props: ['pedidoArticulo']
    }
</script>

<style scoped>

.card {
     position: relative;
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-orient: vertical;
     -webkit-box-direction: normal;
     -ms-flex-direction: column;
     flex-direction: column;
     min-width: 0;
     word-wrap: break-word;
     background-color: #fff;
     background-clip: border-box;
     border: 1px solid rgba(0, 0, 0, 0.1);
     border-radius: 0.10rem
 }

 .card-header:first-child {
     border-radius: calc(0.37rem - 1px) calc(0.37rem - 1px) 0 0
 }

 .card-header {
     padding: 0.75rem 1.25rem;
     margin-bottom: 0;
     background-color: #fff;
     border-bottom: 1px solid rgba(0, 0, 0, 0.1)
 }

</style>