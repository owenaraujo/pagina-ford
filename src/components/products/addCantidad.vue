<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">
    <div class="row">
      <div class="col-lg-6 m-auto">
        <form autocomplete="off">
          <div class="form-group ">
            <div class="form-group form-floating mb-3 ">
              <label>ubicacion</label>
              <select
                @change="buscarStock()"
                id="ubicacion"
                v-model="newDate.id_tienda"
                name="ubicacion"
                class="form-control"
              >
                <option
                  v-for="ubicacion in ubicaciones"
                  :key="ubicacion"
                  :value="ubicacion._id"
                >
                  {{ ubicacion.nombre }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="precio">Cantidad de productos Disponibles</label>
            <input
              type="number"
              class="form-control"
              v-model="info.cantidad"
              disabled
            />
          </div>

          <div class="form-group">
            <label for="cantidad">Agregar Cantidad</label>
            <input
              type="number"
              placeholder="Ingrese cantidad"
              v-model.number="newDate.cantidad"
              class="form-control"
            />
          </div>
          cantidad total ={{ Number(newDate.cantidad + info.cantidad) || 0 }}

          <div class="text-center">
            <button @click.prevent="update()" class="mr-2 btn btn-primary">
              actualizar
            </button>
            <router-link
              v-if="!uri[2]"
              to="/manager/productos"
              class="btn btn-danger"
              >Regresar</router-link
            >
            <router-link
              v-if="uri[2]"
              :to="'/manager/inventario?' + uri[2]"
              class="btn btn-danger"
              >Regresar</router-link
            
            >
          </div>
        </form>
      </div>
    </div>
  </div>
  <NoAccess v-else></NoAccess>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NoAccess from "../403.vue";
import axios from "axios";
import { createToast } from "mosha-vue-toastify";
export default {
  props: ["param"],
  components: { NoAccess },
  setup() {
    let router = useRouter();
    let newDate = ref({ cantidad: 0, id_tienda: 0 });
    const store = useStore();
    store.dispatch("getUbicaciones");
    const ubicaciones = computed(() => store.state.ubicaciones);

    const uri = window.location.href.split("?");
    let info = ref({ cantidad: 0 });
    async function create() {
      if (uri.lengt != 1) {
        let id = uri[1];
        if (uri[2]) {
          newDate.value.id_tienda = uri[2];
        }
        idProducto.value = id;
        buscarStock();
      }
    }
    let idProducto = ref("");
    async function buscarStock() {
      const { data } = await axios.get(
        `${api.value}/productos/${newDate.value.id_tienda}/${idProducto.value}`
      );
      if (data) {
        info.value = data;
      }
      if (!data) {
        info.value = {};
      }
    }
    let api = computed(() => store.state.api);
    let usuario = computed(() => store.state.usuario);
    create();
    let toast = computed(() => store.state.toask);
    async function update() {
      try {
        if (!newDate.value.cantidad) return (newDate.cantidad = "");
        if (!info.value.cantidad) info.value.cantidad = 0;
        const New = {
          cantidad: info.value.cantidad + newDate.value.cantidad,
          id_tienda: newDate.value.id_tienda,
          id_product: idProducto.value,
        };
        const { data } = await axios.put(
          `${api.value}/productos/cantidad/add`,
          New
        );
        if (data.status) {
          createToast(data.value, toast.value.success);
          if (uri[2])
            return router.push(`/manager/inventario?${New.id_tienda}`);
          info.value = {};
          newDate.value = {};

          router.push("/manager/productos");
        } else {
          createToast(data.value, toast.value.warning);
        }
      } catch (error) {
        createToast("no se pudo conectar al servidor");
      }
    }
    return { uri, buscarStock, info, newDate, update, usuario, ubicaciones };
  },
};
</script>
