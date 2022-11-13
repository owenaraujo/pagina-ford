import { createStore } from "vuex";
import jsPDF from "jspdf";
import axios from "axios";
import moment from "moment";
import numeralFormat from "numeral";
// load a locale
numeralFormat.register("locale", "es", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  ordinal: function (number) {
    return number === 1 ? "er" : "ème";
  },
  currency: {
    symbol: "€",
  },
});

// switch between locales
numeralFormat.locale("es");
import "jspdf-autotable";
import { createToast } from "mosha-vue-toastify";
export default createStore({
  state: {
    modalInfo: false,
    factura: {
      user_id: {
        username: null
      },

      factura: false,
      productos: [
        {
          precio: null,

          cantidad: null,

          producto_id: null,
        },
      ],
      nota: null,

      status: null,
      credito: null,
      createdAt: null
    },

    img: null,
    modalImg: false,
    statusVenta: false,
    search: "hola",
    productosVenta: [],
    toask: {
      danger: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        type: "danger",
        timeout: 3000,
        transition: "bounce",
      },
      warning: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        type: "warning",
        timeout: 3000,

        transition: "bounce",
      },
      success: {
        hideProgressBar: false,
        showIcon: true,
        position: "bottom-left",
        timeout: 3000,
        type: "success",
        transition: "bounce",
      },
    },
    api: "http://93.189.88.179:3000/api",
    api2: "http://localhost:3000/api",
    sidebars: false,
    logged: false,
    token: null,
    dataCliente: false,
    datosCliente: {},
    linkclientes: "/clientes",
    usuarios: [],
    ubicaciones: [],
    usuario: {
      rol: { grado: null }
    },
    abonos : [],
    ventas: [],
    clientesActivos: [],
    productosTrue: [],
    clientes: [],
    productos: [],
    notaVenta: "",
    ventaActual: {},
    deuda: false,
    system: { id: "", info: { dolar: "" } },
  },
  mutations: {
    CerrarModalAbonos(state) {
      state.modalInfo = !state.modalInfo
    },
    async buscarAbonos (state){
      const {data}= await axios.get(`${state.api}/ventas/abonos/${state.factura._id}`)
      state.abonos = data
    },

 async   MostrarFactura(state, payload) {
      state.factura = payload
      console.log(payload._id);
      const {data}= await axios.get(`${state.api}/ventas/abonos/${payload._id}`)
      state.abonos = data
      

      // state.modalInfo = true
    },
    saveCliente(state, payload) {
      state.datosCliente = payload;
      state.dataCliente = true;
    },
    saveProductos(state, payload) {
      state.productos = payload;
      let productos = payload.filter((item) =>
        item.status === true ? item : 0
      );

      state.productosTrue = productos;
    },
    saveUbicaciones(state, payload) {
      state.ubicaciones = [];
      state.ubicaciones = payload;
    },
    async verifyUser(state) {
      try {
        if (localStorage.token && localStorage.id) {
          state.token = localStorage.token;
          const token = await axios.get(`${state.api}/system/VerifyToken`, {
            headers: { xtoken: state.token },
          });
          if (!token.data.status) return createToast(token.data.value);
          const { data } = await axios.get(
            `${state.api}/usuarios/${localStorage.id}`
          );

          if (data.status === null) {
            createToast(data.value);
            localStorage.token = "";
            localStorage.id = "";
            return;
          }
          state.usuario = data;
          state.logged = true;
          createToast(
            `${token.data.value} ${data.username}`,
            state.toask.success
          );
        }
      } catch (error) {
        createToast("no hay acceso al servidor");
      }
    },
    async logear(state, payload) {
      try {
        const { data } = await axios.get(
          `${state.api}/usuarios/${payload.usuario}`
        );
        state.usuario = data;
        state.token = payload.value;
        localStorage.token = payload.value;
        localStorage.id = payload.usuario;
        createToast(`bienvenido ${data.username}`, state.toask.success);
        state.logged = true;
      } catch (error) {
        console.log(error)
      }
    },
    saveClientes(state, payload) {
      state.clientes = payload;
      let clientes = payload.filter((item) =>
        item.status === true ? item : 0
      );
      state.clientesActivos = clientes;
    },
    saveUsuarios(state, payload) {
      state.usuarios = payload;
    },
    cambiarRuta(state, ruta) {
      state.linkclientes = ruta.ruta;
    },
    mostrarImg(state, img) {
      state.modalImg = true

      state.img = img
    },
    agregar(state, payload) {
      state.productos.push(payload);
    },
    updateProveedor(state, payload) {
      state.ubicaciones.map((item) =>
        item._id === payload ? (item.status = !item.status) : 0
      );
    },
    saveToCar(state, payload) {
      
      const val = state.productosVenta.filter((item) => {
        if (item.producto_id === payload.producto_id) {
          item.cantidad = item.cantidad + payload.cantidad;
          

          return item;
        }
      });

      if (val.length == 0) state.productosVenta.push(payload);
    },
    addProductoInicial(state, payload) {
      state.productosTrue.filter((item) =>
        item._id.toString() == payload.id
          ? (item.cantidad = item.cantidad + payload.cantidad)
          : 0
      );
    },
    resTotal(state, payload) {
      state.productosVenta.filter((item) => {
        if (item.producto_id == payload.id) {
          state.productosTrue.filter((item) => {
            if (item._id.toString() == payload.id) item.cantidad++;
          });
          item.cantidad--;
          if (item.cantidad == 0)
            state.productosVenta.splice(payload.indice, 1);
        }
      });
    },
    cerrarModalImage(state) {
      state.img = null
      state.modalImg = false
    }
  },

  actions: {
    findAbonos({commit}){
commit("buscarAbonos")
    },
    cerrarModalImg({ commit }) {
      commit("cerrarModalImage")
    },
    guardarVenta({ state }, productos) {
      state.ventaActual = productos;
    },
    vaciarVenta({ state }) {
      state.productosVenta = [
        
      ];
      state.datosCliente = {};
      state.dataCliente = false;
      state.statusVenta = false;
      state.ventaActual = {};
    },
    generarPdf({ state }) {
      let datos = state.ventaActual;

      let productos = datos.productos;
      // let cliente = datos.cliente_id;
      const timeformat = (value) => {
        moment.locale("es");
        let fecha = `${value}`;
        let final = new Date(fecha);

        final.setMonth(final.getMonth() + 1);

        return {
          inicio: moment(fecha).format("L"),
          final: moment(final).format("L"),
        };
      };
      var doc = new jsPDF({
        format: "letter",
      });

      let total = datos.productos.reduce(
        (sum, i) => sum + ((i.precio * i.iva) / 100 + i.precio) * i.cantidad,
        0
      );

      let iva = datos.productos.reduce(
        (sum, i) => sum + ((i.precio * i.iva) / 100) * i.cantidad,
        0
      );

      var img = new Image();
      img.src = "/img/fondo.jpg";

      //  doc.addImage(img, "jpg", 3.5, 0, 209, 131);
      doc.setFontSize(10);
      //headder factura
      let number = numeralFormat(datos.factura).format("000000");
      // doc.text(`Cliente:    ${cliente.nombre} ${cliente.apellido}`, 15, 36);
      doc.text(`Factura Nro:  ${number} `, 165, 34);
      //doc.text(`Rif:    ${cliente.dni} `, 130, 36);
      // doc.text(`Direccion:    ${cliente.direccion}`, 15, 40);
      doc.text(`fecha:  ${timeformat(datos.createdAt).inicio}`, 165, 40);
      // doc.text(`Telefono:    ${cliente.telefono}`, 15, 44);
      doc.text(`vence:    ${timeformat(datos.createdAt).final}`, 165, 44);
      //doc.text(`Condicion:   contado`, 120, 44);

      //body factura

      let position = 55;
      for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        let newIva = "";
        if (!element.iva) newIva = `(e)`;
        doc.text(`${element.producto_id.codigo}`, 17, position);
        doc.text(
          `${element.producto_id.marca}-${element.producto_id.modelo}`,
          42,
          position
        );
        doc.text(`${element.cantidad}`, 125, position);
        doc.text(
          `${numeralFormat(element.precio * datos.dolar).format("0,0")}`,
          135,
          position
        );
        doc.text(
          `${numeralFormat(
            element.cantidad * element.precio * datos.dolar
          ).format("0,0")}${newIva}`,
          182,
          position
        );
        position = position + 5;
      }
      //footer factura

      doc.text(`Total factura :`, 135, 112);
      doc.text(
        ` ${numeralFormat(total * datos.dolar).format("0,0")}`,
        200,
        112,
        { align: "right" }
      );
      doc.text(`IVA :`, 135, 109);
      doc.text(`${numeralFormat(iva * datos.dolar).format("0,0")}`, 200, 109, {
        align: "right",
      });

      doc.text(`Total Factura($USD) :`, 135, 115);
      doc.text(`${total}$`, 200, 115, { align: "right" });
      doc.text(`Observaciones:`, 10, 109);
      var text = `${datos.nota}`;
      doc.text(text, 35, 109, {
        align: "justify",
        lineHeightFactor: 1,
        maxWidth: 95,
      });
      doc.output("dataurlnewwindow");
    },
    async buscar({ state }) {
      const { data } = await axios.get(`${state.api}/system`);
      if (data) {
        delete data.createdAt;
        delete data.updatedAt;
        state.system.info = data;
        state.system.id = data._id;
      }
    },

    resProducto({ commit }, date) {
      commit("resTotal", date);
    },
    async comprar({ state }, nota) {
      const user = state.usuario._id;
      
      const productos = state.productosVenta;

      

      const newFactura = {
        user_id: user,
      cliente: nota.cliente,
        productos: productos,
        nota: nota.nota,
        TipoPago: nota.pago,
      };

       let { data } = await axios.post(`${state.api}/ventas`, newFactura, {
         headers: { xtoken: state.token },
       });
       createToast(data.value);
       if (data.status === true) {
         state.statusVenta = true;
         state.ventaActual = data.data;
       }
    },
    deleteStore({ state, commit }, indice) {
      const cantidad = state.productosVenta[indice].cantidad;
      const id = state.productosVenta[indice].producto_id;
      commit("addProductoInicial", { cantidad: cantidad, id: id });
      state.productosVenta.splice(indice, 1);
    },
    agregarToCarrito({ commit }, newVenta) {
       commit("saveToCar", newVenta);
    },
    guardarCliente({ commit }, cliente) {
      commit("saveCliente", cliente);
    },
    async getProductos({ commit, state }) {
      const { data } = await axios.get(`${state.api}/productos`);
      commit("saveProductos", data);
    },
    proveedorStatus({ commit }, id) {
      commit("updateProveedor", id);
    },
    activeMenu({ state }) {
      state.sidebars = !state.sidebars;
    },
    sendUrl({ commit }, ruta) {
      commit("cambiarRuta", ruta);
    },
    async getUbicaciones({ state, commit }) {
      const { data } = await axios.get(`${state.api}/ubicaciones`);
      commit("saveUbicaciones", data);
    },
    login({ commit }, data) {
      data.status ? commit("logear", data) : 0;
    },
    async getClientes({ state, commit }) {
      try {
        const { data } = await axios.get(`${state.api}/clientes`);
        commit("saveClientes", data);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    },
    async getUsuarios({ state, commit }) {
      try {
        const { data } = await axios.get(`${state.api}/usuarios`);
        commit("saveUsuarios", data);
      } catch (error) {
        createToast("no hay conexion con el servidor");
      }
    },
    verifyLocalstorage({ commit }) {
      commit("verifyUser");
    },
    logout({ state }) {
      state.logged = false;
      createToast("hasta pronto!!!");
      delete localStorage.token;
      delete localStorage.id;
    },
    saveProduct({ commit, state }, producto) {
      const status = state.productos.filter((item) => {
        return item.modelo === producto.modelo ? item : false;
      });
      status.length < 0 ? 0 : commit("agregar", producto);
    },
    verImagen({ commit }, img) {
      commit("mostrarImg", img)
    },
    deleteProccessVenta({ state }) {
      state.productosVenta = [];
      state.datosCliente = {};
      state.dataCliente = false;
    },
    getInfoVenta({ commit }, e) {
      commit("MostrarFactura", e)
    },
    cerrarModalInfo() {
      this.commit("CerrarModalAbonos")
    }
  },
  modules: {},
});
