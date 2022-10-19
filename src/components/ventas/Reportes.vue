<template>
  <div>
    <div class="card mt-2 p-2" :class="{ 'dark-complement': dark }">
      <div0 class="row row-cols-2">
        <div class="col">
          <div class="d-flex align-items-center">
            <input
              type="datetime-local"
              style="width: 35% ;height: 40px; font-size: 10px"
              class="mr-2"
              v-model="fechaInicio"
            />
            <input
              v-model="fechaFinal"
              type="datetime"
              style="width: 35%; height: 40px; font-size: 10px"
              class="mr-2"
            />
            <div
              style="width: 15%"
              class="btn material-icons c-hand color-primary text-white"
              @click="getVentas"
            >
              search
            </div>
            <div
              style="width: 15%"
              class="btn material-icons yellow-danger text-white"
              @click="pdfCompleto()"
            >
              download
            </div>
          </div>
        </div>
        <b-col>
          <div class="d-flex align-items-center ">
            <div class="w-50"></div>
            <div class="w-50">
              <p class="text-center"></p>
            </div>
          </div>
        </b-col>
      </div0>
    </div>

    <div></div>

    <Err />
  </div>
</template>

<script>
import numeral from "numeral";
import axios from "axios";

import  { ref } from "vue";
//  import Err from "../components/403.vue";
import moment from "moment";
export default {
  setup() {
    const fieldsInfo = ref([
      { key: "id_producto.nombre", label: "producto" },
      "cantidad",
      { key: "precio", label: "precio" },
      { key: "total", label: "total" },
    ]);

    let reportesFields = ref([
      { key: "numero", label: "#" },
      { key: "nombre", label: "Nombre", sortable: true },
      "cantidad",
      { key: "entrada", label: "entrada", sortable: true },
      "salida",
      "ganancias",
    ]);

    const fechaInicio = ref();
    const fechaFinal = ref();
    const fecha = ref();
    const reporte = ref();
    const infoVenta = ref();
    const reportesField = ref({
      fields: [
        { key: "createdAt", label: "creacion", sortable: true },
        "acciones",
      ],
    });

    function filterFecha() {
      ("formatDate", function(value) {
        if (value) {
          return moment(String(value)).format("DD/MM/YYYY hh:mm a");
        }
      });
    }
    function filterNumber() {
      ("formatNumber", function(value) {
        return numeral(value).format("0,0.00"); // displaying other groupings/separators is possible, look at the docs
      });
    }
    function cantidadReporte() {
      return this.reporte.reduce(
        (sum, item) => sum + parseFloat(item.cantidad),
        0
      );
    }

    function rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    }

    function pdfCompleto() {
      const info = this.$refs.info;
      const lista = this.$refs.reporteCompletoBs;
      const lista2 = this.$refs.reporteCompletoDolar;
      var ventana = window.open("", "PRINT", "height=400,width=600");
      ventana.document.write(
        '<link rel="stylesheet" href="/md/bootstrap.min.css" />'
      );
      ventana.document.write(info.innerHTML);
      ventana.document.write(lista.innerHTML);
      ventana.document.write(lista2.innerHTML);
      ventana.document.close();
      ventana.focus();
      setTimeout(function() {
        ventana.print();
      }, 2000);
    }
    function createPdf() {
      const lista = this.$refs.lista;
      const info = this.$refs.info;

      var ventana = window.open("", "PRINT", "height=400,width=600");

      ventana.document.write(info.innerHTML);
      ventana.document.write(lista.innerHTML);
      ventana.document.write(
        '<link rel="stylesheet" href="../md/bootstrap.min.css" />'
      );
      ventana.document.close();
      ventana.focus();
      setTimeout(function() {
        ventana.print();
      }, 2000);
    }

    async function getVentas() {
      if (this.fechaInicio == null) return;
      if (this.fechaFinal == null) return;
      const { data } = await axios.get(
        `${this.server}/ventas/get/${this.fechaInicio}/${this.fechaFinal}`
      );
      this.ventasBs = [];
      this.ventasDolar = [];
      this.ventas = data;
      data.map((item) => {
        if (item.is_dolar === true) {
          this.ventasDolar.push(item);
        }
        if (item.is_dolar === false) {
          this.ventasBs.push(item);
        }
      });
      this.getTotal();
    }
    return {
      rowClass,
      pdfCompleto,
      createPdf,
      getVentas,
      filterFecha,
      filterNumber,
      cantidadReporte,
      reportesFields,
      reportesField,
      reporte,
      fieldsInfo,
      fechaInicio,
      fechaFinal,
      fecha,
      infoVenta,
    };
  },
};
</script>
<style scoped>
.border-white {
  border: 0.2px solid white;
  padding: 5px;
}
.h-65 {
  max-height: 65vh;
}
.h-80 {
  max-height: 80vh;
}
.iconC {
  top: -5px;
  width: 23px;
  left: 31px;
  height: 23px;
  position: absolute;
  border-radius: 10rem;
  text-align: center;

  align-content: center;
}

.card {
}
.btn {
  border-radius: 10rem;
}
</style>
