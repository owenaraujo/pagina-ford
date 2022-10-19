<template>
    <div>
        
      <!-- modal -->
      <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Inventario</h1>
          <div class="dropdown mt-2">
 <select
              @change="findProductos()"
                id="ubicacion"
                v-model="ubicacion"
                name="ubicacion"
                class="btn btn-secondary  center dropdown-toggle "
              >
              <option :value="false" selected="true">Selecciona una ubicacion</option>
                <option
                class="dropdown-item bg-white" 
                  v-for="ubicacion in ubicaciones"
                  :key="ubicacion"
                  :value="ubicacion._id"
                >
                  {{ ubicacion.nombre }}
                </option>
              </select>
  
</div>
<div>
  <router-link
            v-if="usuario.rol.grado <= 1"
            to="/manager/productos/add"
            class="btn btn-primary mt-2"
            >Nuevo</router-link
          >
</div>
          
          
        </div>
  
        <div class="row">
          <div class="col-lg-12">
            <div class="table-responsive scrollbar-light-blue">
              <table
                class="table table-striped table-bordered text-center"
                id="table"
              >
              
                <thead class="thead-dark">
                  <tr>
                    <th>CODIGO</th>
                    <th>PRODUCTO</th>
                    <th>CANTIDAD</th>
                    <th>UBICACION</th>
                    
                    <th v-if="usuario.rol.grado <= 3">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <Lista
                    :access="usuario.rol.grado"
                    v-show="
                      producto.id_product.codigo
                        .toLowerCase()
                        .indexOf(param.toLowerCase()) != -1 ||
                        producto.id_product.descripcion
                          .toLowerCase()
                          .indexOf(param.toLowerCase()) != -1
                    "
                    v-for="producto in productos"
                    :key="producto"
                    :producto="producto"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "@vue/runtime-core";
  import { useStore } from "vuex";
  import Lista from "./List.vue";
  import axios from "axios"
import { ref } from "@vue/reactivity";

  export default {
    props: ["param"],
    components: { Lista },
    setup() {
      
      let store = useStore();
      const api = computed(()=>store.state.api)
     let productos = ref({})
     let ubicacion = ref(0)
     let ubicaciones = computed(()=>store.state.ubicaciones)
     store.dispatch("getUbicaciones")
      let usuario = computed(() => store.state.usuario);
      const uri = window.location.href.split("?");
    async function create() {
      if(!uri[1]) return ubicacion.value =0
      if (uri.lengt != 1) {
        ubicacion.value = uri[1]
        findProductos()
        
          
       
      }
    }
    create()
      async function findProductos() {
        if(!ubicacion.value) return
        
        const { data } = await axios.get(
          `${api.value}/productos/stock/${ubicacion.value}`
        );
        productos.value=data;
      }
      return { usuario,productos, findProductos, ubicaciones, ubicacion };
    },
  };
  </script>
  
  <style>
  .scrollbar-light-blue::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  
  .scrollbar-light-blue::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  
  .scrollbar-light-blue::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #4e73df;
  }
  </style>
  