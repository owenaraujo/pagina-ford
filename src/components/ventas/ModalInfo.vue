<template>
<div>
    <div v-if="modalInfo">
    <div
      class="modal fade show "
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-center modal-sm">
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
            <div v-if="abonos.length <= 0">
            <h4 class="text-center"> no hay abonos</h4>
            </div>
<ul>
  <li v-for="(item, index) in abonos" :key="index">
  ${{item.cantidad}}- {{formatTime(item.createdAt)}}</li>
</ul>





         
			

   

		
			
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
            const abonos = computed(()=>store.state.abonos)
            return{modalInfo,abonos, formatTime,cerrarFactura}
        }
    }
</script>