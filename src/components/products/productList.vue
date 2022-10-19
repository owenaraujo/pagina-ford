<template>
  <tr>
    <td>{{ producto.codigo }}</td>
    <td>{{ producto.descripcion }}</td>
    <td v-if="access <= 1">{{ producto.precio }}</td>
   
   
    

    <td >
      <div
      target="_blank"
        @click="getImagen(producto.img)"
        class="btn btn-primary ml-2">
        <i class="fa fa-image"></i>
        
      </div>
      <router-link
      v-if="access <= 1"
        :to="'/manager/productos/add/cantidad?' + producto._id"
        class="btn btn-primary ml-2"
        ><i class="fas fa-audio-description"></i
      ></router-link>

      <router-link
      v-if="access <= 1"
        :to="'/manager/productos/add?' + producto._id"
        class="btn btn-warning ml-2"
        ><i class="fas fa-edit"></i
      ></router-link>

      <div class="confirmar d-inline" v-if="access <= 1">
        <button
          v-show="producto.status"
          @click="desactivarProducto(producto._id)"
          class="btn btn-danger ml-2"
        >
          <i class="fa fa-eye-slash"></i>
        </button>

        <button
          v-show="!producto.status"
          @click="activarProducto(producto._id)"
          class="btn btn-success ml-2"
        >
          <i class=" fa fa-eye"></i>
        </button>
      </div>
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
    async function activarProducto(id) {
      const { data } = await axios.delete(
        `${api.value}/productos/activar/${id}`, {headers:{xtoken:token.value}}
      );
      producto.value.status = true;
      createToast(data.value, toask.value.warning);
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
