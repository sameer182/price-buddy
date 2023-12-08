<template>
  <div id="app">
    
   <nav>
      <div id="logo">
        <strong>Price Buddy</strong>
      </div>
      <div class="nav">
        <strong>
        <router-link to="/">Home</router-link>
        <router-link to="/product">Product</router-link>
        <router-link to="/about">About</router-link>
        </strong>
      </div>
     
    </nav>
    
    <router-view></router-view>

    <footer>
      <p>&copy; 2023 Price Comparison Website</p>
    </footer>
  </div>
</template>

<script>
import '../src/assets/css/home.css'; // Importing CSS file

export default {
  name: 'App',
 
};
</script>

<style>

</style>