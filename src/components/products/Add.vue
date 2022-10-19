<template>
  <div v-if="usuario.rol.grado <= 1">
    <div class="container-fluid mt-2">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Panel de Administración</h1>
        <router-link to="/manager/productos" class="btn btn-primary"
          >Regresar</router-link
        >
      </div>

      <!-- Content Row -->
      <div class="row">
        
        <div class="col-lg-6 m-auto">
          <form
            ref="NewForm"
            enctype="multipart/form-data"
            autocomplete="off"
            @submit.prevent="sendProduct()"
          >
            
            
            <div class="form-group form-floating mb-3 ">
              <label>categoria</label>
              <select
                :class="{ 'is-invalid': producto.categoria === '' }"
                id="categoria"
                v-model="producto.categoria"
                name="categoria"
                class="form-control"
              >
               <option v-for="item in categorias" :key="item._id" :value="item._id" >{{item.nombre}}</option>
              </select>
            </div>
            <div class="mb-2" v-for="(item, index) of form" :key="index">
              <label :for="item.valor">{{ item.valor }}</label>
              <input
                :class="{ 'is-invalid': producto[item.valor] === '' }"
                v-if="!item.number"
                v-model="producto[item.valor]"
                type="text"
                :name="item.valor"
                :placeholder="item.valor"
                :id="item.valor"
                class="form-control"
              />
              <input
                v-if="item.number"
                :class="{ 'is-invalid': producto[item.valor] === '' }"
                v-model.number="producto[item.valor]"
                type="Number"
                :name="item.valor"
                :placeholder="item.valor"
                :id="item.valor"
                class="form-control"
              />
            </div>
            
            <div class="form-check mb-4 d-none">
              <input
                class="form-check-input "
                v-model="producto.iva"
                type="checkbox"
                id="iva"
              />
              <label for="iva" class="form-check-label">iva 16%</label>
            </div>
            <div class="text-center">
              <div class=" btn btn-secondary" id="div_file" >
              <p id="texto">añadir imagen</p>
              <input @change="selectIMagen()" class="form-control" type="file" id="img" name="img" accept="image/*" />
            </div>
            <button type="submit" value="" class="btn btn-primary">
              Guardar Producto
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <NoAccess v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { createToast } from "mosha-vue-toastify";
import { useRouter } from "vue-router";
import { computed } from "@vue/runtime-core";
import axios from "axios";
import NoAccess from "../403.vue";
export default {
  components: { NoAccess },
  setup() {
    const router = useRouter();
    const api = computed(() => store.state.api);

    const toask = computed(() => store.state.toask);
    const store = useStore();

    let token = computed(() => store.state.token);
    const NewForm = ref();
    const form = ref([
      { valor: "codigo" },
      { valor: "descripcion" },
      { valor: "precio" ,number: true},
    ]);
    let id = "";
    let producto = ref({
      proveedor_id: null,
      nombre: null,
      img: null,
      img_id: null
    });
    const sendProduct = async function() {
      try {
        const imagen = new FormData(NewForm.value);

        producto.value.imagen = imagen;
        const { data } = await axios.post(
          `${api.value}/productos/${id}`,
          imagen,
          {
            headers: {
              xtoken: token.value,
              "content-type": "multipart/form-data",
            },
          }
        );

        if (data.status === true) {
          // producto.value = { proveedor_id: null };
          router.push("/manager/productos");
          id = "";
          createToast(data.value, toask.value.success);
          return;
        } else {
          createToast(data.value, toask.value.danger);
        }
      } catch (error) {
        createToast("no se pudo conectar al servidor");
      }
    };
    function selectIMagen() {
      createToast("imagen cargada con exito", toask.value.success)
    }
    let categorias= ref()
   async function getCategorias() {
      const {data}= await axios.get(`${api.value}/categorias`)
      categorias.value = data
    }
    getCategorias()
    function buscarProduct() {
      try {
        let uri = window.location.href.split("?");
        if (uri.length === 2) {
          const { value } = computed(() => store.state.productos);

          if (value.length === 0) {
            router.push("/manager/productos/add");
            return;
          }
          id = uri[1];
          const res = value.filter((item) => (item._id === id ? item : false));

          !res
            ? (producto.value = {})
            : ((producto.value = res[0]),
              !res[0].iva ? (res[0].iva = false) : (res[0].iva = true),
              delete form.value.splice(4, 2));
        }
      } catch (error) {
        0;
      }
    }
    buscarProduct();
    let usuario = computed(() => store.state.usuario);
    return {
      producto,
      form,
      sendProduct,
      token,
      usuario,
      categorias,
      NewForm,
      selectIMagen,
    };
  },
};
</script>
 <style>
  p#texto{
	text-align: center;
	color:white;
}
  div#div_file{
	position:relative;
	margin:50px;
	padding:10px;
}

input#img{
	position:absolute;
	top:0px;
	left:0px;
	right:0px;
	bottom:0px;
	width:100%;
	height:100%;
	opacity: 0;
}
 </style>