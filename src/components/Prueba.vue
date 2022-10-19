<template>
<div>
   
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
        <img src="/img/logo2.jpg" style="height: 60px" class=" "> 
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/manager"><i class="fas fa-user"></i> administrar</router-link>
            </li>
        </ul>
    </div>
</nav>

    <div class="scrollbar-light-blue"  style="overflow-y:auto; height: 90vh;">
        <div class="container-fluid p-4 text-gray" >
        <div class=" row ">
            <div class=" card-columns ">

               

<div v-for=" producto in productos" :key="producto">
  
                <div class="card animated fadeInDown" >
                    <div class="card-body">
                        <p class=" text-secondary">{{producto.codigo}}</p>
                        <h3 class="card-title text-dark ml-2">{{producto.descripcion}}</h3> 
                        <img @click="getImagen(producto.img)" :src="producto.img" class="card-img-top border" alt="">
                       
                        
                    </div>
                </div>
               </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>


<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup(){
        const store = useStore()
const productos = computed(()=> store.state.productos)
store.dispatch("getProductos")
function getImagen(e) {
      store.dispatch("verImagen", e)
    }
return{productos,getImagen}
}}
</script>
<style scoped>
@media (min-width: 576px) {
  .card-columns {
    -moz-column-count: 3;
    column-count: 5;
    -moz-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
  }
}
@media (max-width: 576px) {
  .card-columns {
    -moz-column-count: 2;
    column-count: 2;
    -moz-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
  }
}
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
@media screen and (max-width: 700px) {
  .sm-d-none{
    display: none;
  }
}
.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
</style>