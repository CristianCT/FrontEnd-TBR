<template>
    <div class="table-responsive">
        <table class="table shoping-cart-table">
            <tbody>
            <tr>
                <td class="desc">
                    <h3><a href="#" class="text-navy" style="font-size: 20px">{{ articulo.nombre_articulo }}</a></h3>
                    <p class="small" style="line-height: 80%;">Codigo: {{ articulo.codigo_articulo }}</p>
                    <p class="small" style="line-height: 20%; font-size: 18px">Precio unitario: ${{ articulo.valor_final }}  <s style="font-size: 15px">${{ articulo.precio_venta }}</s></p>
                    
                    <dl class="small m-b-none">
                        <dt>Descripción</dt>
                        <dd>{{ articulo.descripcion }}</dd>
                    </dl>
                </td>
                
                <td width="65px">
                    <div style="display: flex; flex-direction: column; align-items: center">
                    <label style="font-size: 20px">Cantidad</label>
                    <input type="number" class="form-control" v-model="articulo.cantidad" placeholder="1" min="0" max="99" style="width: 60px" disabled>
                    </div>
                    <h4 style="color: #ef5777; margin-top: 12%; margin-bottom: 0px">${{ articulo.valor_final*articulo.cantidad }}</h4>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "FacturacionArticulo",
        props: ['articulo'],
        data () {
        return {
          cantidad: 1
        }
      },
    }
</script>

<style scoped>

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