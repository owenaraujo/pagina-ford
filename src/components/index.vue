<template>
    

    <div class="scrollbar-light-blue" style="overflow-y:auto; overflow-x: ; height: 100vh;">

<!-- ======= Hero Section ======= -->
<section id="hero" class="hero">
  <div class="container text-center">
    <div class="">
      <div class=" mt-5">
        <a class="" title="Home"><img alt="Bell Logo" src="/img/logo.ico"></a>
      </div>
    </div>

    <div class="col-md-12">
      <h1>
        Calidad de Repuestos
      </h1>

      <p class="tagline d-none">
        This is a powerful theme with some great features that you can use in your future projects.
      </p>
    </div>
  </div>

</section><!-- End Hero -->

<!-- ======= Header ======= -->

  

    

    <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-primary d-flex align-items-center fixed-top">
      <a class="navbar-brand" href="/">
        <img src="/img/logo2.jpg" style="height: 60px" class=" "> 
    
      </a>
     
    <div class="collapse navbar-collapse text-white" id="navbarNav">

      <ul>
        <li class="nav-item"><a href="#hero">Inicio</a></li>
        <li class="nav-item d-none"><a  href="#features">Features</a></li>
        <li class="nav-item"><a href="#portfolio">Catálogo</a></li>
        
    
        <li><a class="nav-item" href="#contact">Contacto
        </a></li>
      </ul>
    </div>
      <i class="bi bi-list mobile-nav-toggle"></i>
    </nav><!-- .navbar -->

    

<main id="main">

  <!-- ======= About Section ======= -->
  <section class="about" id="about">

    <div class="container text-center">
      <h2>
       Contamos con la mayor cantidad de respuestos para distintas marcas de vehiculos automotor

      </h2>

      <p>
         Encuentas con nosotros :

      </p>

      <div class="row stats-row justify-content-center">
        <div  v-for="item in categorias" :key="item._id" class="stats-col text-center col-md-3 col-sm-6">
          <div  class="circle">
            <span data-purecounter-start="0"  data-purecounter-end="232" data-purecounter-duration="1" class="purecounter stats-no">+{{item.cantidad}}</span>
             {{item.nombre}}
          </div>
        </div>

      </div>
    </div>

  </section><!-- End About Section -->

  <!-- ======= Welcome Section ======= -->
  <section class="welcome text-center ">
    <h2></h2>
    <p>
     
    </p>
    <img alt="Bell - A perfect theme" class="d-none" src="https://st2.depositphotos.com/1001335/10309/i/600/depositphotos_103091044-stock-photo-border-of-auto-parts-on.jpg">
  </section><!-- End Welcome Section -->

  <!-- ======= Features Section ======= -->
  <section class="features d-none" id="features">

    <div class="container">
      <h2 class="text-center">
        Features
      </h2>

      <div class="row">
        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-briefcase"></i>
              </div>
            </div>

            <div>
              <h3>
                Custom Design
              </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-card-checklist"></i>
              </div>
            </div>

            <div>
              <h3>
                Responsive Layout
              </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-bar-chart"></i>
              </div>
            </div>

            <div>
              <h3>
                Innovative Ideas
              </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-binoculars"></i>
              </div>
            </div>

            <div>
              <h3>
                Good Documentation
              </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-brightness-high"></i>
              </div>
            </div>

            <div>
              <h3>
                Excellent Features
              </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <i class="bi bi-calendar4-week"></i>
              </div>
            </div>

            <div>
              <h3>
                Retina Ready
              </h3>
              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section><!-- End Features Section -->

  <!-- ======= Call to Action Section ======= -->
  <section class="cta d-none">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-sm-12 text-lg-start text-center text-dark">
          <h2>
            Call to Action Section
          </h2>

          <p>
            Lorem ipsum dolor sit amet, nec ad nisl mandamus imperdiet, ut corpora cotidieque cum. Et brute iracundia his, est eu idque dictas gubergren
          </p>
        </div>

        <div class="col-lg-3 col-sm-12 text-lg-right text-center">
          <a class="btn btn-ghost" href="#">Buy This Template</a>
        </div>
      </div>
    </div>
  </section><!-- End Call to Action Section -->

  <!-- ======= Portfolio Secton ======= -->
  <section class="portfolio" id="portfolio">

    <div class="container-fluid text-center">
      <h2>
        catalogo
      </h2>

<!-- seccion buscar -->

      <div class="d-flex" style="flex-direction:row-reverse">
  <select v-model="limit" name=""  @change="getProducts" class="form-control mr-3" style="max-width: 100px;">
    <option  :value="5">mostrar</option>
    <option  :value="10">10</option>
    <option  :value="20">20</option>
    <option  :value="30">30</option>
  </select>
  <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group mr-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary" @click="getProducts">
      <i class="fa fa-search"></i>
    </button>
   
  </div>
</div>
  <input v-on:keypress.enter="getProducts" v-model="textSearch" type="text" class="form-control" placeholder="buscar" style="max-width: 150px">
  
</div>
    </div>

    <div class="portfolio-grid container-fluid">
      <div class="row">
               
               
        <div class="card-columns">
          <div  v-for="item in catalogo" :key="item" >
          <div class="">
            <div class="card p-4">
              <div>
                  <h5 class="card-title ">
                    {{item.codigo}}
                  </h5>

                  <h3 class="card-text text-dark">
                    {{item.descripcion}}
                  </h3>
                </div>
            <a  class="portfolio-lightbox" data-gallery="portfolioGallery"><img alt="" :src="item.img">
            
            </a>
            
          </div>
          </div>
          
        </div>
        </div>
        

       

       

        
      </div>

      
    </div>
    <div class="mb-2">
  
  <nav aria-label="..." class="text-center" style=" align-items: center;
  justify-content: center;">
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
                  @click="getProducts(item)"
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
  </section><!-- End Portfolio Section -->

  <!-- ======= Team Section ======= -->
  <section class="team d-none" id="team">
    <div class="container">
      <h2 class="text-center">
        Meet our team
      </h2>

      <div class="row">
        <div class="col-sm-3 col-xs-6">
          <div class="card card-block">
            <a href="#"><img alt="" class="team-img" src="/index/img/team-1.jpg">
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="bi bi-twitter"></i></a> <a href="#"><i class="bi bi-facebook"></i></a> <a href="#"><i class="bi bi-linkedin"></i></a> <a href="#"><i class="bi bi-envelope-fill"></i></a>
                </nav>

                <p>
                  Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div class="col-sm-3 col-xs-6">
          <div class="card card-block">
            <a href="#"><img alt="" class="team-img" src="/index/img/team-2.jpg">
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="bi bi-twitter"></i></a> <a href="#"><i class="bi bi-facebook"></i></a> <a href="#"><i class="bi bi-linkedin"></i></a> <a href="#"><i class="bi bi-envelope-fill"></i></a>
                </nav>

                <p>
                  Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div class="col-sm-3 col-xs-6">
          <div class="card card-block">
            <a href="#"><img alt="" class="team-img" src="/index/img/team-3.jpg">
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="bi bi-twitter"></i></a> <a href="#"><i class="bi bi-facebook"></i></a> <a href="#"><i class="bi bi-linkedin"></i></a> <a href="#"><i class="bi bi-envelope-fill"></i></a>
                </nav>

                <p>
                  Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div class="col-sm-3 col-xs-6">
          <div class="card card-block">
            <a href="#"><img alt="" class="team-img" src="/index/img/team-4.jpg">
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="bi bi-twitter"></i></a> <a href="#"><i class="bi bi-facebook"></i></a> <a href="#"><i class="bi bi-linkedin"></i></a> <a href="#"><i class="bi bi-envelope-fill"></i></a>
                </nav>

                <p>
                  Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section><!-- End Team Section -->

  <!-- ======= Contact Section ======= -->
  <section id="contact">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2 class="section-title">Contacta con nosotros</h2>
        </div>
      </div>

      <div class="d-flex justify-content-center " style="font-size: 50px">
       
        
        <a @click="irUrl(`https://api.whatsapp.com/send/?phone=%2B584126990009&text&type=phone_number&app_absent=0`)" class="ov-btn-slide-close" ><i class="fab fa-whatsapp p-2"></i></a>
        <a @click="irUrl(`https://www.instagram.com/elmagodelaford/`)" class="ov-btn-slide-close"><i class="fab fa-instagram p-2"></i></a>

        

     

      </div>
      <div class="">
        
      </div>
    </div>
  </section><!-- End Contact Section -->
  <div class=" d-flex align-items-center align-content-center">
     
    
    </div>
</main><!-- End #main -->

<!-- ======= Footer ======= -->
<footer class="site-footer">
  <div class="bottom">
    <div class="container">
      <div class="row">

        <div class="col-lg-6 col-xs-12 text-lg-start text-center">
          <p class="copyright-text">
             Creado por <strong>Serious Programing</strong>. Derechos reservados
          </p>
          <div class="credits">
           
            Contacto <a href="https://github.com/owenaraujo" target="_blank">GitHub</a>
          </div>
        </div>

        <div class="col-lg-6 col-xs-12 text-lg-right text-center">
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#hero">incio</a>
            </li>

           

            

         

            <li class="list-inline-item">
              <a href="#portfolio">catalogo</a>
            </li>

            <li class="list-inline-item">
              <router-link to="/manager">administración</router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->


<!-- Template Main JS File -->

</div>
</template>
<script>
import axios from "axios"
import { ref } from "vue"
import { useStore } from "vuex"
export default{
  setup(){
    const store = useStore()
    let textSearch = ref("")
    let lista = ref([]);
    
    let limit = ref(5)
    let page = ref(2)
    function irUrl(url) {
      
      window.open(url, '_blank')
    }
    async function getProducts(P) { 

      page.value= P
      const {data} =await axios.get(`${store.state.api}/productos/activos?Name=${textSearch.value}&limit=${limit.value}&page=${page.value}`)
      if (data.length== 0) {
        page.value =1
        getProducts
      }
      
catalogo.value = data.productos
lista.value = [];

for (let index = 0; index < data.count / limit.value; index++) {
        const element = index + 1;
        lista.value.push(element);
      }
    }
    async function getCategorias() {
      const {data} =await axios.get(`${store.state.api}/categorias/limit/4`)
categorias.value = data
    }
    getProducts()
    getCategorias()
    let catalogo = ref()
    let categorias = ref()
    return{categorias, catalogo, irUrl,textSearch,getProducts, limit, lista, page}
  }
}

</script>
<!-- <script src="/index/js/main.js"></script>
<script src="/index/vendor/purecounter/purecounter_vanilla.js"></script>
<script src="/index/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/index/vendor/glightbox/js/glightbox.min.js"></script>
<script src="/index/vendor/php-email-form/validate.js"></script> -->

<style scoped>
/*** ESTILOS BOTÓN SLIDE CLOSE ***/
.ov-btn-slide-close {
  color: #0000007c; /* color de fuente */
  padding: 16px 20px;
  border-radius: 3px; /* redondear bordes */
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: inline-block;
}
.ov-btn-slide-close:before, .ov-btn-slide-close:after {
  content: "";
  z-index: -1;
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  left: -50%;
  
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.ov-btn-slide-close:after {
  left: 100%;
}
.ov-btn-slide-close:hover {
  font-size: 60px;
  padding: 6px 10px;

  color: #199EB8; /* color de fuente hover */
}
.ov-btn-slide-close:hover:before {
  left: 0;
}
.ov-btn-slide-close:hover:after {
  left: 50%;
}
@media (min-width: 800px) {
  .card-columns {
    -moz-column-count: 3;
    column-count: 7;
    -moz-column-gap: 1.25rem;
    column-gap: 1.25rem;
    orphans: 1;
    widows: 1;
  }
}

@media (min-width: 576px) {
  .card-columns {
    -moz-column-count: 3;
    column-count: 7;
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