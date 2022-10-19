<template>
<div>
    <div v-if="modalInfo">
    <div
      class="modal fade show"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-center">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              @click="cerrarFactura"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5 v-if="venta.user_id">Creada por : {{ venta.user_id.username ||0}}</h5>
            <h5 v-if="venta.pago">tipo de pago : {{ venta.pago ||0}}</h5>
            <h5 v-if="venta.nota">nota : {{ venta.nota ||0}}</h5>
            <span>
              fecha: <strong>{{ formatTime(venta.createdAt)||0 }}</strong>
            </span>
			<p>productos:</p>
			<ul>
				<li v-for="(item, index) of venta.productos" :key="index" >
					<p v-if="item.producto_id">{{item.producto_id.descripcion ||null + "-"+item.producto_id.codigo ||0}} </p>
          cantidad: {{item.cantidad ||0}}
					
				</li>
			</ul>
			<!-- total : {{numeralFormat(total * venta.dolar)}} ({{total}}$) -->
          </div>
          <div class="modal-footer">
            <button
              @click="cerrarFactura"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import formatDate from "moment"
    export default{
        setup(){
            function formatTime(time) {
      return formatDate(time).format("lll");
    }
  function  cerrarFactura(){
store.dispatch("cerrarModalInfo")
    }
            const store = useStore()
            const modalInfo = computed(()=>store.state.modalInfo)
            const venta = computed(()=>store.state.factura)
            return{modalInfo,venta, formatTime,cerrarFactura}
        }
    }
</script>