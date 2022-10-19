<template>
  <tr>
    <th>{{ producto.codigo }}</th>
    <th>{{ producto.productName }}</th>
    
    <th>{{ producto.cantidad }}</th>
    
  

    
    <th>
      <button @click="deleteProduct(indice)" class="btn btn-danger">
        <i class="svg-inline--fa fas fa-trash-alt fa-w-14"></i> Eliminar
      </button>
    </th>
  </tr>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";


export default {
  props: ["producto", "indice"],
 
  setup(props) {
    const store = useStore();
    let Producto = ref(props.producto);
    let dolar = computed(() => store.state.system.info.dolar);

    let total = computed(() => {
      let obj = Producto.value;
      let iva = ((obj.precio * obj.iva) / 100) * obj.cantidad;
      let totalSinIva = obj.precio * obj.cantidad;

      if (!totalSinIva) totalSinIva = 0;
      if (!iva) iva = 0;

      return totalSinIva + iva;
    });
    function deleteOneItem(indice) {
      store.dispatch("resProducto", {
        id: Producto.value.producto_id,
        indice: indice,
      });
      Producto.value.imei.splice(indice, 1);
    }
    function deleteProduct(indice) {
      store.dispatch("deleteStore", indice);
    }
    return { total, dolar ,deleteProduct, Producto, deleteOneItem };
  },
};
</script>