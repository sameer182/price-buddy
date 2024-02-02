<template>
  <!-- Fontawesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/all.min.css">
  <!-- Main Content -->
  <div>
    <section class="banner">
      <h1>Find the best deal</h1>
      <div class="search-bar">
        <input type="search" placeholder="Search for products..." v-model="searchProduct" />&nbsp;<i
          class="fa-solid fa-circle-arrow-right fa-2xl"></i>
      </div>
    </section>
    <!-- Main Section -->
    <div class="main">
      <h1>Explore popular Guitars model</h1>
    </div>
    <!-- Display Products Section -->
    <div v-if="paginatedProducts.length > 0">
      <section class="products">
        <div v-for="product in paginatedProducts" :key="product.name" class="product">
          <img :src="product.pic" alt="Product Image" style="width: 200px; height: 200px; object-fit: contain;">
          <h4>{{ product.name }}</h4>
          <p><strong>{{ product.brands }}</strong></p>
          <router-link :to="{ name: 'compare', params: { productId: product.id } }"
            class="btn btn-primary">View</router-link>
        </div>
      </section>
    </div>

    <div v-else>
      <br>
      <h4><i><strong>Sorry, No products found.</strong></i></h4>
    </div>

     <!-- Pagination Controls -->
     <br>
    <div class="pagination">
      <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
    </div>
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
      itemsPerPage: 12,
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
     // search function
    searchGuitar: function () {
      const searchProductLower = this.searchProduct.toLowerCase();
      return this.products.filter(product => {
        const name = product.name.toLowerCase();
        const brand = product.brands.toLowerCase();
        return name.includes(searchProductLower) || brand.includes(searchProductLower);
      });
    }
  },
  methods: {
    // Fetch data from the server
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/data/guitar');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },


    async show(product) {
      // Navigate to the ComparePage and pass the product id
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
      this.currentPage = 1;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
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

.footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
}
</style>