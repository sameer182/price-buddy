<template>
    <!-- Main App Container -->
  <div id="app">

        <!-- Container for Product Comparison -->
    <div class="compare-container">
      <div v-if="product" class="product-details">
        <!-- Display individual product details -->
        <div class="product-section">
          <div class="product-image">
            <img :src="product.pic" alt="Product Image" style="width: 300px; height: 300px; object-fit: contain;">
          </div>

          <div class="product-text-box">
            <div class="product-text">
              <h4>{{ product.name }}</h4>
              <p>Brand : <strong>{{ product.brands }}</strong></p>
              <p>Model : <strong>{{ product.model }}</strong></p>
              <p style="color: rgb(200, 49, 81);"><i>{{ product.description }}</i></p>
            </div>
          </div>
        </div>

        <h4 style="color: rebeccapurple;">Compare the products below</h4>

          <!-- Display Price with Index -->
        <hr class="separator-line">
        <div v-for="(entry, index) in product.pricesAndUrls" :key="index" class="additional-info">
          <p><b>Price {{ index + 1 }}:</b> <span style="font-size: 20px; font-weight: bold; color: red;">£ {{ entry.price
          }}</span></p>
          <p><b>URL {{ index + 1 }}:</b> <a :href="entry.url" target="_blank">{{ entry.url }}</a></p>
        </div>

        <hr class="separator-line">
      </div>
      <div v-else>
        <p>No product selected for comparison</p>
      </div>
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
    // Fetch product data based on productId
    async fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/data/products/${this.productId}`);
        const data = await response.json();

        if (data.length > 0) {
          // Store all results in an array
          this.product = {
            name: data[0].name,
            brands: data[0].brands,
            model: data[0].model,
            description: data[0].description,
            pic: data[0].pic,
            price: data[0].price,
            url: data[0].url,
            pricesAndUrls: data.map(entry => ({
              price: entry.price,
              url: entry.url,
            })),
          };
        } else {
          this.product = null;
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.compare-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.product-details {
  width: 100%;
  max-width: fit-content;
}

.product-section {
  display: flex;
  align-items: center;
}

.product-image {
  margin-right: 20px;
}

.product-text-box {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
}

.product-text {
  text-align: center;
}

.separator-line {
  width: 100%;
  margin: 20px 0;
  border: 1px solid black;
}

.additional-info {
  text-align: center;
}

.price-url-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.url-info {
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0 5px;
}

.price-info {
  background-color: #8BC34A;
  color: #fff;
}

.url-info {
  background-color: #2196F3;
  color: #fff;
}

.footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
}
</style>