<template>
  <div>
    <ul
      :class="{ oculto: sidebars }"
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <!-- Sidebar - Brand -->
      <router-link
        style="height: 9vh"
        class="sidebar-brand d-flex align-items-center justify-content-center"
        to="/manager/productos"
      >
        <div class="sidebar-brand-icon rotate-n-15 d-none">
          <svg
            x="0px"
            y="0px"
            width="70px"
            height="60px"
            viewBox="0 0 52 38"
            class="img-thumbnail"
          >
            <path
              id="logo-movistar"
              d=""
              fill="#019DF4"
            ></path>
          </svg>
        </div>
        <div class="sidebar-brand-text mx-3">El mago de la FORD</div>
      </router-link>

      <!-- Divider -->
      <hr class="sidebar-divider my-0" />

      <!-- Divider -->
      <hr class="sidebar-divider" />

      <!-- Heading -->
      <div class="sidebar-heading">Interface</div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li v-if="user.rol.grado <= 2" class="nav-item">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i class="fas fa-fw fa-store mr-3"></i>
          <span>Ventas</span>
        </router-link>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link class="collapse-item" to="/manager/ventas/add"
              >Nueva venta</router-link
            >
            <router-link class="collapse-item" to="/manager/ventas/"
              >Ventas</router-link
            >
          </div>
        </div>
      </li>

      <!-- Nav Item - Productos Collapse Menu -->
      <li class="nav-item">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-fw fa-box mr-3"></i>
          <span>Productos</span>
        </router-link>
        <div
          id="collapseUtilities"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link
              v-if="user.rol.grado <= 1"
              class="collapse-item"
              to="/manager/productos/add"
              >Nuevo Producto</router-link
            >
            <router-link class="collapse-item" to="/manager/productos"
              >Catalogo</router-link
            >
            <router-link class="collapse-item" to="/manager/inventario"
              >Inventario</router-link
            >
          </div>
        </div>
      </li>

      
      <!-- Nav Item - Usuarios Collapse Menu -->
      <li class="nav-item" v-if="user.rol.grado <= 1">
        <router-link
          class="nav-link collapsed"
          to="#"
          data-toggle="collapse"
          data-target="#collapseUsuarios"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <i class="fas fa-user mr-3"></i>
          <span>Usuarios</span>
        </router-link>

        <div
          id="collapseUsuarios"
          class="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div class="bg-white py-2 collapse-inner rounded">
            <router-link class="collapse-item" to="/manager/usuarios/add"
              >Nuevo Usuario</router-link
            >
            <router-link class="collapse-item" to="/manager/usuarios"
              >Usuarios</router-link
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const sidebars = computed(() => store.state.sidebars);
    let user = computed(() => store.state.usuario);
    return { sidebars, user };
  },
};
</script>

<style>
.img-thumbnail {
  width: 90%;
}
.oculto {
  width: 0 !important;
  overflow: hidden;
}
</style>
