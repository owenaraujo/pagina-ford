<template>
  <div v-if="usuario.rol.grado <= 2" class="container-fluid">
    <div class="text-right"></div>
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group form-floating mb-3 ">
              <label>ubicacion</label>
              <select
                @change="findProductos()"
                id="ubicacion"
                v-model="tienda"
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
        <h4 class="text-center">Datos Venta</h4>

        <div class="table-responsive">
          <table ref="table" class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th width="100px">Código</th>
                <th>descripcion</th>
                <th>Stock</th>
                <!-- <th width="100px">IVA</th> -->
                <!-- <th class="textright">Precio</th> -->
                <!-- <th class="textright">Precio Total</th> -->
                <th>Acciones</th>
              </tr>
              <tr>
                <td>
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control form-control-md"
                    name="txt_cod_producto"
                    id="txt_cod_producto"
                    v-model="buscarProducto"
                  />
                  <div class="resultado2" v-if="buscarProducto">
                    <select multiple class="custom-select scrollbar-light-blue">
                      <option
                        v-for="item in productos"
                        @click="selectProducto(item)"
                        :key="item._id"
                        :value="item._id"
                        v-show="
                          item.id_product.codigo
                            .toLowerCase()
                            .indexOf(buscarProducto.toLowerCase()) != -1
                        "
                      >
                        {{ item.id_product.descripcion }}-{{ item.id_product.codigo }}
                      </option>
                    </select>
                  </div>
                </td>
                <td id="txt_descripcion">
                  {{ inputsAgregar.id_product.descripcion }}
                </td>
                <td id="txt_existencia">{{ inputsAgregar.cantidad || 0 }}</td>

                <td>
                  <button
                    @click="agregarCarrito()"
                    id="add_product_venta"
                    class="btn btn-dark"
                    v-show="cantidad > 0"
                    :disabled="inputsAgregar.cantidad === 0"
                    v-if="inputsAgregar.cantidad"
                  >
                    Agregar
                  </button>
                </td>
              </tr>
              <tr>
                <th>Código</th>
                <th>nombre</th>
                <!-- <th>IMEI</th> -->
                <th>cantidad</th>
                <!-- <th class="textright">Precio</th> -->
                <!-- <th class="textright">Precio Total</th> -->
                <th>Acciones</th>
              </tr>
            </thead>
           
            <tbody id="detalle_venta">
              <ListProductos
                v-for="(producto, index) in productosVenta"
                :indice="index"
                :key="index"
                :producto="producto"
              />
            </tbody>
          </table>
        </div>
        <div class="col-lg-12 text-center">
          <label>Acciones</label>
          <div class="form-group">
            <button @click="cancelVenta()" class="btn btn-danger mr-2">
              Anular
            </button>
            <button
              @click="preGuardarCompra()"
              class="btn btn-primary"
              id="btn_facturar_venta"
            >
              <i class="fas fa-save"></i> Generar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <NoAccess v-else />
  <!-- modal -->
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div v-if="modalVenta">
    <div
      class="modal fade show"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      style="display: block"
      aria-modal="true"
    >
      <div class="modal-dialog modal-center">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              @click="newVenta"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="!statusVenta">
              <div class="form-check d-none">
                <input
                  class="form-check-input"
                  v-model="prestamo"
                  type="checkbox"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Reportar venta como prestamo
                </label>
              </div>

              <label for="inputNota"></label>
              <input
                v-model="notaVenta"
                type="text"
                id="inputNota"
                placeholder="agregar una nota"
                class="form-control"
              />
              <input
                v-model="pago"
                type=""
                id=""
                placeholder="tipo de pago "
                class="form-control mt-4"
              />
            </div>
            <div v-if="statusVenta" class="text-center">
              <p>
                <strong class="mt-4">que desea hacer?</strong>
              </p>
              <br />
              <button @click="newVenta" class="btn btn-primary mr-2">
                registrar otra venta
              </button>
              <!-- <button @click="generarPdf" class="btn btn-success">inprimir factura</button> -->
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="newVenta"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button @click="guardarCompra()" class="btn btn-primary">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
  <!-- modal -->
</template>

<script>
import NoAccess from "../403.vue";
import axios from "axios";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import ListProductos from "./listProductsVenta.vue";
import { createToast } from "mosha-vue-toastify";
export default {
  props: ["param"],
  components: { ListProductos, NoAccess },
  setup() {
    //respuestas automaticas
    let store = useStore();
    //ref
    let infoCliente = false;
    let modalVenta = ref(false);
    let buscarProducto = ref("");
    let inputsAgregar = ref({id_product:{

    }});
    let cantidad = ref(1);
    let buscarClientes = ref("");
    let notaVenta = ref("");
    let pago = ref("");
    let tienda = ref();
    let prestamo = ref(false);
    let productos = ref([]);
    //computed
    const ubicaciones = computed(() => store.state.ubicaciones);
    let toast = computed(() => store.state.toask);
    let usuario = computed(() => store.state.usuario);
    let productosVenta = computed(() => store.state.productosVenta);
    let statusVenta = computed(() => store.state.statusVenta);
    let api = computed(() => store.state.api);
    let clientes = computed(() => store.state.clientesActivos);
    let total = computed(() => {
      let obj = inputsAgregar.value;
      let iva = ((obj.precio * obj.iva) / 100) * cantidad.value;
      let totalSinIva = obj.precio * cantidad.value;
      
      if (!totalSinIva) totalSinIva = 0;
      if (!iva) iva = 0;
      
      return totalSinIva + iva;
    });
    
    
    store.dispatch("getUbicaciones");
    
    //funciones
    async function findProductos() {
      const { data } = await axios.get(
        `${api.value}/productos/stock/${tienda.value}`
        );
        productos.value = data;
      }
      function newVenta() {
      store.dispatch("vaciarVenta");
      notaVenta.value = "";
      prestamo.value = false;
      modalVenta.value = false;
      cancelVenta();
    }
    function selectCliente(cliente) {
      buscarClientes.value = "";

      store.dispatch("guardarCliente", cliente);
    }
    const sendUrl = () => {
      const ruta = { ruta: "/manager/ventas/add" };
      store.dispatch("sendUrl", ruta);
    };
    function preGuardarCompra() {
      //  if(!dataCliente.value) return createToast('especifique un cliente', toast.value.warning)
      if (productosVenta.value.length == 0)
        return createToast(
          "no se puede hacer una venta vacia",
          toast.value.warning
        );
      
      modalVenta.value = true;
    }
    function selectProducto(producto) {
      buscarProducto.value = "";
      inputsAgregar.value = producto;
    }
    function verifyStock() {
      if (cantidad.value > inputsAgregar.value.cantidad)
        cantidad.value = inputsAgregar.value.cantidad;
    }
    function agregarCarrito() {
      
      const data = {
        productName: inputsAgregar.value.id_product.descripcion,
        precio: inputsAgregar.value.id_product.precio,
        codigo: inputsAgregar.value.id_product.codigo,
        cantidad: cantidad.value,
        producto_id: inputsAgregar.value.id_product._id,
        ubicacion_id: tienda.value

      };
      let carrito = productos.value.filter((item) => {
        if (item.id_product._id.toString() == data.producto_id.toString()) {
          
          let total = item.cantidad - data.cantidad;
item.cantidad= total
          if (total >= 0) {
            -item.cantidad 
            return item;}
          else {
            0;
          }
        }
      });
      if (carrito.length > 0)  store.dispatch("agregarToCarrito", data);
    }
    function cancelVenta() {
      store.dispatch("deleteProccessVenta");
      inputsAgregar.value = {id_product:{

}}
      cantidad.value = 1;
    }
    function generarPdf() {
      store.dispatch("generarPdf");
    }
    function guardarCompra() {
      // store.dispatch('generarPdf')
      store.dispatch("comprar", {
        nota: notaVenta.value,
        credito: prestamo.value,
        pago: pago.value,
      });
    }
    //acciones
    
    return {
      tienda,
      findProductos,
      usuario,
      infoCliente,
      newVenta,
      generarPdf,
      statusVenta,
      prestamo,
      modalVenta,
      notaVenta,
      pago,
      ubicaciones,
      preGuardarCompra,
      guardarCompra,

      cancelVenta,
      agregarCarrito,
      productosVenta,
      verifyStock,
      total,
      cantidad,
      inputsAgregar,
      selectProducto,
      buscarProducto,
      sendUrl,
      selectCliente,
      productos,
      buscarClientes,
      clientes,
    };
  },
};
</script>

<style>
.resultado {
  background: #ececec;
  position: absolute;
  z-index: 150;
  border-radius: 0.5rem;
  width: 85%;
  max-height: 30vh;
}

.resultado2 {
  background: #ececec;
  position: absolute;
  z-index: 150;
  border-radius: 0.5rem;
  width: 20%;
  max-height: 30vh;
}
@media screen and (max-width: 500px) {
  .resultado2 {
    background: #ececec;
    position: absolute;
    z-index: 150;
    border-radius: 0.5rem;
    width: 55%;
    max-height: 30vh;
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

.scrollbar-light-blue::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4e73df;
}
</style>
