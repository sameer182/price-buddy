import { createApp } from 'vue';
import App from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';


import HomePage from './components/HomePage.vue';
import ProductPage from './components/ProductPage.vue';
import AboutPage from './components/AboutPage.vue';
import ComparePage from './components/ComparePage.vue';

// Define the routes for the application
  const routes = [
    { path: '/', component: HomePage },
    { path: '/product', component: ProductPage },
    { path: '/about', component: AboutPage },
    {
      path: '/compare/:productId',
      name: 'compare',
      component: ComparePage,
      props: true,
    },
  ];

  // Create a router instance with specified routes and history mode
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

//create main vue app
const app = createApp(App); 
  app.use(router);
  app.mount('#app');


