<template>
  <!-- Fontawesome -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/all.min.css">

    <!-- Main Product Page Content -->
  <div>
    <h1> This is all products</h1>
    <div>
      <div class="search-bar1">
        <input type="search" placeholder="Search for products..." v-model="searchProduct" />&nbsp;<i
          class="fa-solid fa-circle-arrow-right fa-2xl"></i>
      </div>
        <!-- Product List -->
      <section class="products">
        <div v-for="product in paginatedProducts" :key="product.name" class="product">
          <img :src="product.pic" alt="Product Image" style="width: 200px; height: 200px; object-fit: contain;">
          <h4>{{ product.name }}</h4>
          <p><strong>{{ product.brands }}</strong></p>
          <button class="btn btn-primary" @click="show(product)">View</button>
        </div>
      </section>
       <!-- Pagination Controls -->
      <div class="pagination">
        <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>
  

<script>
import '../assets/css/home.css';

export default {
  name: 'ProductPage',
  data() {
    return {
      searchProduct: '',
      showProduct: true,
      products: [],
      filteredProducts: [],
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  computed: {

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },

  },
  methods: {

    // Fetch data from the server
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/data/guitar');
        const data = await response.json();
        this.products = data;
        this.updateFilteredProducts(); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    // Navigate to the ComparePage and pass the product id
    show(product) {
      this.$router.push({ name: 'compare', params: { productId: product.id } });
    },

    changePage(offset) {
      this.currentPage += offset;
    },
   // Update filtered products based on search input
    updateFilteredProducts() {
      const searchProductLower = this.searchProduct.toLowerCase();
      this.filteredProducts = this.products.filter(product => {
        const name = product.name.toLowerCase();
        const brand = product.brands.toLowerCase();
        return name.includes(searchProductLower) || brand.includes(searchProductLower);
      });
    },

  },
  watch: {
// Watch for changes in search input and update filtered products
    searchProduct() {
      this.currentPage = 1;
      this.updateFilteredProducts();
    },
    
  },
  mounted() {
    this.fetchData();
  },
};
</script>


<style>
.search-bar1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-color: black;
}

.search-bar1 input {
  padding: 10px;
  font-size: 16px;
  border: 10px;
  border-radius: 5px;
}

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