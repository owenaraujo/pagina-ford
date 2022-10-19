<template>
    <div>
        <div v-if="modalImg" >
      <div
    style="display: block"
     class="modal fade show" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" data-dismiss="modal">
    <div class="modal-content"  >              
      <div class="modal-body altura-img" style="overflow-y:auto;" >
        <button  @click="cerrarModal" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <img :src="image" class="imagepreview" style="width: 100%;" >
      </div> 
      <div class="modal-footer">
         

      </div>


    </div>
  </div>
</div>
    </div>
    </div>
</template>
<script>
    import { computed } from "vue";
import {useStore} from "vuex";
    export default{
        setup () {
let store = useStore()
let modalImg = computed(() => store.state.modalImg);
    let image = computed(() => store.state.img);
    function cerrarModal() {
      store.dispatch("cerrarModalImg");
    }
return{ modalImg, cerrarModal, image}
},

    }
    
</script>
<style scoped>
    @media (max-width: 600px) {
        .altura-img{
            height: 100vw;
        }
    }
    @media (min-width: 980px) {
        .altura-img{
            height: 90vh;
        }
    }
</style>