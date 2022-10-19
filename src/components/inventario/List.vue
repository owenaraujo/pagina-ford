<template>
    <tr>
      <td>{{ producto.id_product.codigo || null}}</td>
      <td>{{ producto.id_product.descripcion }}</td>
      <td>{{ producto.cantidad }}</td>
      <td>{{ producto.id_tienda.nombre }}</td>
      <td class="d-none">
       
    
  
      </td>
     
      
  
      <td >
        <div
        target="_blank"
          @click="getImagen(producto.id_product.img)"
          class="btn btn-primary ml-2"
          ><i class="fas fa-eye"></i
        ></div>
        <router-link
        v-if="access <= 2"
          :to="'/manager/productos/add/cantidad?' + producto.id_product._id+`?`+producto.id_tienda._id"
          class="btn btn-primary ml-2"
          ><i class="fas fa-audio-description"></i
        ></router-link>
  
        <router-link
        v-if="access <= 1"
          :to="'/manager/productos/add?' + producto.id_product._id"
          class="btn btn-warning ml-2"
          ><i class="fas fa-edit"></i
        ></router-link>
  
        
      </td>
    </tr>
  </template>
  
  <script>
  import { createToast } from "mosha-vue-toastify";
  import axios from "axios";
  import { useStore } from "vuex";
  import { computed, ref } from "@vue/runtime-core";
  
  export default {
    props: ["producto", 'access'],
  
    setup(props) {
      let producto = ref(props.producto);
      const store = useStore();
      let dolar = computed(()=> store.state.system.info.dolar)
      const toask = computed(() => store.state.toask);
      const token = computed(() => store.state.token);
      const api = computed(() => store.state.api);
     // activarProducto("632ce60178f2f548f8a98135")
      async function activarProducto(idTienda) {
        const { data } = await axios.get(
          `${api.value}/productos/stock/${idTienda}`
        );
        console.log(data);
      }
      function getImagen(e) {
        store.dispatch("verImagen", e)
      }
      async function desactivarProducto(id) {
        const { data } = await axios.delete(`${api.value}/productos/${id}`, {headers:{xtoken:token.value}});
        producto.value.status = false;
        store.dispatch("getProductos")
        createToast(data.value, toask.value.danger);
      }
      return { activarProducto, desactivarProducto , dolar, getImagen};
    },
  };
  </script>
  
  <style></style>
  