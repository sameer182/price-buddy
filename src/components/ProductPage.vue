<template>
   <!-- Fontawesome -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/all.min.css">
    <div>
      <h1> This is all products</h1>
      <div>
        <div class="search-bar1">
        <input type="search" placeholder="Search for products..." v-model="searchProduct"/>&nbsp;<i class="fa-solid fa-circle-arrow-right fa-2xl"></i>
      </div>
    <section class="products">
      <div v-for="product in products" :key="product.name" class="product">
        <img :src="product.pic" alt="Product Image" style="width: 200px; height: 200px; object-fit: contain;">
        <h4>{{ product.name }}</h4>
        <p><strong>{{ product.brands }}</strong></p>
        <p>{{ product.description }}</p>
        <button class="btn btn-primary" @click="show(product)">View</button>
      </div>
    </section>
  </div>
    </div>
  </template>
  
  <script>
import '../assets/css/home.css';

export default {
  name: 'ProductPage',
  data() {
    return {
      searchQuery: '',
      showProduct: true,
      products: [],
    };
  },
  mounted() {
    this.fetchData();
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
    this.$router.push({ name: 'compare', params: { productId: product.id } });
  },


  },
};
</script>

<style>
.search-bar1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* Adjust the margin-top value as needed for vertical positioning */
  border-color: black;
}

  .search-bar1 input {
    padding: 10px;
    font-size: 16px; /* Adjust font size as needed */
    border: 10px;
    border-radius: 5px;
  }

</style>