<template>
  <div>
    <h1>Compare Page</h1>
    <div v-if="product">
      <!-- Display individual product details -->
      <img :src="product.pic" alt="Product Image" style="width: 200px; height: 200px; object-fit: contain;">
      <h4>{{ product.name }}</h4>
      <p><strong>{{ product.brands }}</strong></p>
      <p>{{ product.description }}</p>
      <p><b>Price: </b>£{{ product.price }}</p>
        <p><b>URL:</b> <a :href="product.url" target="_blank">{{ product.url }}</a></p>
      <!-- Add other details as needed -->
    </div>
    <div v-else>
      <p>No product selected for comparison</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: null,
    };
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  async mounted() {
    await this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/data/products/${this.productId}`);
        const data = await response.json();
        this.product = data[0]; // Assuming the API returns an array with one product
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    },
  },
};
</script>
