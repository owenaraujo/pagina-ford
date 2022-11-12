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
                <h4 class="text-center">no hay abonos</h4>
              </div>
              <ul>
                <li v-for="(item, index) in abonos" :key="index">
                  ${{ item.cantidad }}- {{ formatTime(item.createdAt) }}
                </li>
              </ul>

              <div class="d-flex align-content-center justify-content-center" v-if="facturaTotal > 0">
                <input
                  v-model="abono"
                  type="number"
                  class="form-control mr-2"
                />
                <button class="btn btn-warning" @click="agregarAbono">
                  agregar
                </button>
              </div>
              <div class="d-flex align-content-center justify-content-center" v-if="facturaTotal == 0">
                
                <button v-if="!factura.pagado" class="btn btn-success" @click="pagar">
                  pagar
                </button>
              </div>
              <h4 class="text-center" v-if="factura.pagado "> factura pagada</h4>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import formatDate from "moment";
import axios from "axios";

import { createToast } from "mosha-vue-toastify";


export default {
  props:["facturaTotal"],
  setup(props) {
    const toask = computed(() => store.state.toask);
const totalAbono = ref(props.abono)
    async function agregarAbono() {
      if(abono.value ==0)return
      const {data} = await axios.post(
        `${store.state.api}/ventas/abonos/${store.state.factura._id}`,
        { cantidad: abono.value }
      );
      
      if(data.status){createToast(data.value,toask.value.success )
        store.dispatch("findAbonos")
      abono.value = 0}
      if(!data.status)createToast(data.value,toask.value.danger )
    }
    function formatTime(time) {
      return formatDate(time).format("lll");
    }
    function cerrarFactura() {
      store.dispatch("cerrarModalInfo");
    }
    async function pagar() {
      if (!factura.value.status ) {
        return createToast("no se puede pagar factura en cero")
      }
      const {data} = await axios.post(`${store.state.api}/ventas/factura/pagar/${factura.value._id}`)
      if(data.status){
        createToast(data.value, toask.value.success)
        factura.value.pagado = true

      }
    }
    const store = useStore();
    let abono = ref(0);
    const modalInfo = computed(() => store.state.modalInfo);
    const abonos = computed(() => store.state.abonos);
    const factura = computed(() => store.state.factura);
    return {
      totalAbono,
      pagar,
      factura,
      modalInfo,
      abonos,
      formatTime,
      cerrarFactura,
      agregarAbono,
      abono,
    };
  },
};
</script>
