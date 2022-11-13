<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">
    <!-- aqui va el modal de info -->
    <ModalInfoFactura :facturaTotal="total-totalAbonos"></ModalInfoFactura>
    <!-- Page Heading -->
    <input class="d-none" type="datetime-local" name="" id="">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800 text-center">Panel de Administración</h1>
    </div>
   <div class="d-flex mb-2">
    <select class="form-control mr-3" name="" v-model="pago" id=""  style="max-width: 120px ;">
    <option :value="false">por pagar</option>
    <option :value="true">pagos</option>
    
    </select>
<div class="mr-2"> 
  <Datepicker class="form-control" type="" v-model="fechaInicio"  />

</div>
<div class="mr-2">
  <Datepicker class="form-control" type="" v-model="fechaFinal"  />

</div>


    <button class="btn btn-success" @click="get">buscar</button> 
    <input type="number" class="form-control ml-auto"  placeholder="ingrese # factura" v-model="Numerofactura" style="max-width:200px ;">
   </div>
    <div class="text-right mb-2">
      mostrar
      <div class="btn-group ml-2">
        <button
          class="btn btn-secondary btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ limit }}
        </button>
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
            :class="{ active: limit == 5 }"
            @click="limitar(5)"
            >5</a
          >
          <a
            class="dropdown-item"
            :class="{ active: limit == 10 }"
            @click="limitar(10)"
            >10</a
          >
          <a
            class="dropdown-item"
            :class="{ active: limit == 20 }"
            @click="limitar(20)"
            >20</a
          >

          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            @click="limitar(undefined)"
            :class="{ active: limit == undefined }"
            >todos</a
          >
        </div>
      </div>
    </div>
    <div class="row" >
      <div class=" col col-lg-6">
        <div class="table-responsive" style="min-height:70vh">
          <table class="table  table-bordered" id="table" >
            <thead class="thead-dark">
              <tr>
                <th># factura</th>
                <th>Fecha</th>
                <th>cantidad de articulos</th>
               
                <th>Acciones</th>
              </tr>
            </thead>
           
            <tbody>
              <List
                v-show="venta.factura.toString().indexOf(Numerofactura) != -1"
                :venta="venta"
                v-for="(venta, index) of ventas"
                :key="index"
              ></List>
            </tbody>
          </table>
          <nav aria-label="..." class="text-center">
            <ul class="pagination justify-content-center">
              <div
                class="page-item"
                :class="{ disabled: page == 1 }"
                @click="previous"
              >
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
                  >Previous</a
                >
              </div>
              <div class="pagination scroll scrollbar-light-blue">
                <div
                  v-for="(item, index) in lista"
                  :key="index"
                  class="page-item"
                  :class="{ active: page == item }"
                  @click="getPage(item)"
                >
                  <a class="page-link">{{ item }}</a>
                </div>
              </div>

              <li
                class="page-item"
                @click="next"
                :class="{
                  disabled: lista.length === page || limit === undefined,
                }"
              >
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="col col-lg-6">
        <div class="card " style="min-height:70vh">
          
          <div class="card-body" v-if="factura._id">






            <h5 v-if="factura.user_id">Creada por : {{ factura.user_id.username ||0}}</h5>
            <h5 v-if="factura.cliente">Cliente : {{ factura.cliente ||0}}</h5>
            <h5 v-if="factura.pago">Tipo de pago : {{ factura.pago ||0}}</h5>
            <h5 v-if="factura.nota">Nota : {{ factura.nota ||0}}</h5>
            <span>
              fecha: <strong>{{ formatTime(factura.createdAt)||0 }}</strong>
            </span>
			

   

<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">producto</th>
      <th scope="col">cantidad</th>
      <th scope="col">precio</th>
      <th scope="col">acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in factura.productos" :key="index">
      <th scope="row">{{index +1}}</th>
      <td style="max-width:20px">{{item.producto_id.descripcion}}</td>
      <td>{{item.cantidad}}</td>
      <td>{{item.precio}}</td>
      <td>

        <button  class="btn btn-primary" @click="eliminarStock(item.producto_id, item.ubicacion_id,item.precio)">devolver articulo </button>
      </td>
    </tr>
    
  </tbody>
</table>

    
			<!-- total : {{numeralFormat(total * venta.dolar)}} ({{total}}$) -->
          </div>
         <div class="card-footer">
          <div class="d-flex justify-content-around">
        <h4>total  = {{total}} </h4>
        <h4>credito restante  = {{total-totalAbonos}} </h4>
        <button class="btn btn-danger ml-5" @click="abrirModal"> abonos</button>

          </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  <NoAccess v-else/>
</template>

<script>
import Datepicker  from "vue3-datepicker"
import { computed, ref } from "@vue/runtime-core";
import NoAccess from "../403.vue"
import ModalInfoFactura from "./ModalInfo.vue"
import { useStore } from "vuex";
import axios from "axios";
import List from "./ventasList.vue";
import formatDate from "moment"
import { createToast } from "mosha-vue-toastify";

export default {
  props: ["param"],
  components: { List , NoAccess, ModalInfoFactura, Datepicker },
  setup() {
    
    function formatTime(time) {
      return formatDate(time).format("lll");
    }
    let total = computed(()=>{
      let element  = 0
      
        store.state.factura.productos.map((e)=> {
      element += e.cantidad*e.precio
        
      })
      return element
       
    })
    let totalAbonos = computed(()=>{
      let element  = 0
        store.state.abonos.map((e)=> {
      element += e.cantidad
        
      })
      return element
       
    })
    let store = useStore();
    let api = computed(() => store.state.api);
    let usuario = computed(() => store.state.usuario);
    let factura = computed(() => store.state.factura);
    let ventas = ref([]);
    let limit = ref(10);
    let page = ref(1);
    let fechaInicio = ref(new Date());
    let fechaFinal = ref(new Date());
    let lista = ref([]);
    function limitar(num) {
      limit.value = num;
      page.value = 1;

      get();
    }
    function previous() {
      if (page.value === 1) return;
      if (limit.value === undefined) return;
      page.value--;
      get();
    }
    function next() {
      if (page.value === lista.value.length) return;
      if (limit.value === undefined) return;

      page.value++;
      get();
    }
    function getPage(num) {
      page.value = num;

      get();
    }
    function abrirModal() {
      store.dispatch("cerrarModalInfo")
    }
    //funcion no esta en uso
    async function getVentas() {
      
        if (this.fechaInicio == null) return;
        if (this.fechaFinal == null) return;
        const { data } = await axios.get(
          `${this.server}/ventas/get/${this.fechaInicio}/${this.fechaFinal}?pago=true`
        )
        console.log(data)
      }
async function eliminarStock(id, id_tienda, resta) {
  if (resta > (total.value-totalAbonos.value)) {
    return createToast("no se puede eliminar el producto",)
  }
  const datos = {id_venta: factura.value._id, producto_id: id._id, id_tienda}
  const {data} =await axios.post(
    `${api.value}/ventas/edit`
    , datos
    )
    
    if (total.value == 0) {
      
     await axios.post(
    `${api.value}/ventas/cancelar?id=${factura.value._id}`)
    get()
    
    }
    if (data.status) {
    await  store.dispatch("getInfoVenta", data.result)
    console.log(total);
      if (total.value == 0) {
        await axios.post(
    `${api.value}/ventas/cancelar?id=${factura.value._id}`
    
    )
      }
      
      get()

}
}
let Numerofactura = ref("")
let pago = ref(false)
let status = ref(false)
    async function get() {
     let facturaFind  = `&factura=${Numerofactura.value}`
     let statusPago  = `pago=${pago.value}`
     let statusFactura  = `&status=${status.value}`
      if(!Numerofactura.value) facturaFind = ""
      if(!statusFactura.value) statusFactura = ""
    const date= formatDate(fechaInicio.value).format("yyy-MM-DD")
    const date2= formatDate(fechaFinal.value).format("yyy-MM-DD")
  
      ventas.value = []
      const { data } = await axios.get(
        `${api.value}/ventas/${limit.value}/${page.value}/${date}/${date2}?${statusPago}${facturaFind}${statusFactura}`
      );
      ventas.value = data.ventas;
      lista.value = [];
      //data.count = 500;
      for (let index = 0; index < data.count / limit.value; index++) {
        const element = index + 1;
        lista.value.push(element);
      }
    }
    get();
    return {fechaFinal, get,status, pago, Numerofactura,totalAbonos,fechaInicio,eliminarStock,abrirModal,ventas,getVentas, lista, limit, page, getPage, previous, next, limitar, usuario ,factura, formatTime, total};
  },
};
</script>

<style scoped>
.scrollbar-light-blue::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-light-blue::-webkit-scrollbar {
  width: 10px;
  height: 7px;
  background-color: #f5f5f5;
}

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
.scroll {
  max-width: 70vw;

  overflow-y: auto;
}
</style>