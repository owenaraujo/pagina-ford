<template>
  <tr>
  
    <td>{{ numeralFormat(venta.factura, "000000") }}</td>
    <td>{{ formatTime(venta.createdAt) }}</td>
    <!-- <td>{{ total }}</td> -->
    <td>
      
      <button
        @click="detalles(venta)"
        type="button"
        class="btn btn-secondary view_factura ml-2"
      >
        detalles
      </button>
    </td>
  </tr>

 
</template>
<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import formatDate from "moment";


export default {
  props: ["venta"],
  setup(props) {
    function formatTime(time) {
      return formatDate(time).format("L");
    }
    let store = useStore();
    let venta = ref(props.venta);
    let productos = venta.value;
    let modalInfo = computed(()=> store.state.modalInfo);
    function pdf() {
      store.dispatch("guardarVenta", venta.value);
      store.dispatch("generarPdf");
    }
    let total = computed(() =>
      productos.productos.reduce(
        (sum, item) =>
          sum + ((item.precio * item.iva) / 100 + item.precio) * item.cantidad,
        0
      )
    );
	let dolar = computed(()=>store.state.system.info.dolar)
    function detalles(e) {
      
      store.dispatch("getInfoVenta", e)
    }

    return { total, pdf, formatTime, modalInfo, detalles, dolar };
  },
};
</script>