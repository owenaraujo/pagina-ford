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
            <button class="btn btn-primary" @click.prevent="save">guardar</button>
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
                <th></th>
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
   
 let categorias = ref()
  let info = ref({nombre: null});
    let api = computed(()=> store.state.api)
  let toast = computed(()=> store.state.toask)
   async function save() {
   
    const {data} = await axios.post(`${api.value}/categorias`, info.value)
    createToast(data.value, toast.value.success)
    getCategorias()
  }
  async function getCategorias() {
      const {data} = await axios.get(`${api.value}/categorias`)
     
      categorias.value= data
    }
    getCategorias()
    function pdf() {
      store.dispatch("generarPdf")
    }
  
    return { pdf, info, save, categorias };
  },
};
</script>