<template>
  <div
    style="
  user-select: none;
  "
  >
  <Index v-if="$route.name == 'page'"></Index>
  <div v-if="$route.name != 'page'">
    <Signin v-if="!logged"></Signin>
    <Header  v-if="$route.name != 'page' && logged"></Header>
  </div>
  <ModalImg></ModalImg>
</div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import Signin from "./components/Signin.vue";
import Index from "./components/index.vue";
import Header from "./components/template/Header.vue";
import ModalImg from "./components/products/img.vue"
export default {
  components: { Signin, Header, Index, ModalImg },
  setup() {
    const store = useStore()
    store.dispatch('verifyLocalstorage')
    const logged = computed(() => store.state.logged);
    return { logged };
  },
};
</script>
