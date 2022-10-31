<template>

  <div class="container-fluid mt-2 mb-2">

    <!-- Content Row -->
    <div class="row">
      <!-- <button  @click="pdf">click aqui</button> -->
      <div class="col-lg-6 m-auto">
        <div class="card-header text-center bg-primary text-white">
          administracion de categorias
        </div>
        <div class="card">
          <form class="card-body p-2" autocomplete="off">
            <div class="form-group">
              <label for="categoria"> categoria </label>
              <input
              
                v-model="info.nombre"
                class="form-control"
                id="categoria"
              />
            </div>
            <button v-show="info._id" class="btn btn-primary" @click.prevent="save(info)">editar</button>
            <button v-show="!info._id" class="btn btn-primary" @click.prevent="save(false)">guardar</button>
          </form>
        </div>
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
                  <th>nombre</th>
                  <th>productos en categoria</th>
                  <th>acciones</th>
                  
                </tr>
              </thead>
              <tbody>
               <tr v-for="item in categorias" :key="item._id">
                <th>{{item.nombre}}</th>
                <th>{{item.cantidad}}</th>
                <th>
                  <button
          v-show="item.status"
          @click="save({_id:item._id, status: false})"
          class="btn btn-danger ml-2"
        >
          <i class="fa fa-eye-slash"></i>
        </button>

        <button
          v-show="!item.status"
          @click="save({_id:item._id, status: true})"
          class="btn btn-success ml-2"
        >
          <i class=" fa fa-eye"></i>
        </button>
        <button
          
          @click="edit(item)"
          class="btn btn-warning ml-2"
        >
          <i class=" fa fa-pencil"></i>
        </button>
                </th>
               </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
     
  </div>

</template>
<script>
import { ref } from "@vue/reactivity";
import axios from 'axios';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import { createToast } from 'mosha-vue-toastify';
export default {
  setup() {
    let store = useStore()
 store.dispatch('buscar')
   function edit(datos) {
    info.value = datos
   }
 let categorias = ref()
  let info = ref({nombre: null});
    let api = computed(()=> store.state.api)
  let toast = computed(()=> store.state.toask)
   async function save(datos) {
     let data = {}
   if (datos) {
    const result = await axios.post(`${api.value}/categorias/${datos._id}`, datos)
    data = result.data

   }
   else{
    if (!info.value) return
     const result2 = await axios.post(`${api.value}/categorias`, info.value)
     data = result2.data
    }
    info.value = ""
    getCategorias()
    createToast(data.value, toast.value.success)
   
  }
  async function getCategorias() {
      const {data} = await axios.get(`${api.value}/categorias`)
     
      categorias.value= data
    }
    getCategorias()
    function pdf() {
      store.dispatch("generarPdf")
    }
  
    return { pdf, info, save, categorias, edit };
  },
};
</script>