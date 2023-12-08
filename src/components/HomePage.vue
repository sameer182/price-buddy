<template>
  <!-- Fontawesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/all.min.css">
  <div>
    <section class="banner">
      <h1>Find the best deal</h1>
      <div class="search-bar">
        <input type="search" placeholder="Search for products..." v-model="searchProduct"/>&nbsp;<i class="fa-solid fa-circle-arrow-right fa-2xl"></i>
      </div>
    </section>
    <div class="main">
      <h1>Explore popular Guitars model</h1>
    </div>
    <section class="products">
      <div v-for="product in paginatedProducts" :key="product.name" class="product">
        <img :src="product.pic" alt="Product Image" style="width: 200px; height: 200px; object-fit: contain;">
        <h4>{{ product.name }}</h4>
        <p><strong>{{ product.brands }}</strong></p>
        <p>{{ product.description }}</p>
        <button class="btn btn-primary" @click="show(product)">View</button>
      </div>
    </section>
    <div class="pagination">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
    </div>
    <!-- <div class="pagination">
    <button @click="changePage(-1)" :disabled="currentPage === 1">Prev</button>
    <span v-for="page in totalPages" :key="page">
      <button @click="goToPage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
    </span>
    <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
  </div> -->
  </div>
</template>

<script>
import '../assets/css/home.css';

export default {
  name: 'HomePage',
  data() {
    return {
      searchProduct: '',
      showProduct: true,
      products: [],
      product: null,
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.searchGuitar.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchGuitar.slice(startIndex, endIndex);
    },
    searchGuitar: function () {
      const searchProductLower = this.searchProduct.toLowerCase();
      return this.products.filter(product => {
        const name = product.name.toLowerCase();
        const brand = product.brands.toLowerCase();
        const description = product.description.toLowerCase();
        return name.includes(searchProductLower) || brand.includes(searchProductLower) || description.includes(searchProductLower);
      });
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/data/guitar');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },


    show(product) {
      // Implement the logic for handling the "View" button click if needed
      console.log(product);

      this.$router.push({ name: 'compare', params: { productId: product.id } });
    },
    changePage(offset) {
      this.currentPage += offset;
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  watch: {
    searchProduct() {
      this.currentPage = 1; // Reset current page when search changes`
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
/* Add the following styles to your existing CSS or create a new CSS file */

.pagination {
  margin-bottom: 25px;
  margin-left: 600px;
  text-align: center;
}
  
.pagination button {
  background-color: #55575b;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}


</style>