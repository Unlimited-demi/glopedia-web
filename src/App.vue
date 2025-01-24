<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="bg-blue-900 text-white shadow-lg">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">GLOPEBA</router-link>
        <div class="space-x-4">
          <router-link to="/" class="hover:text-blue-300">Home</router-link>
          
          <router-link to="/" class="hover:text-blue-300">Abouts</router-link>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <div class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </div>

    <!-- Footer -->
    <footer class="bg-blue-900 text-white mt-12 py-6">
      <div class="container mx-auto px-4 text-center">
        <p class="mb-2">Contact us on WhatsApp: 08030974864</p>
        <p class="mb-2">Visit: www.glopeba.com.ng</p>
        <p>© {{ new Date().getFullYear() }} GLOPEBA - Global Professional With Global Solutions</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Global Styles */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navigation Bar Styles */
nav {
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav a {
  text-decoration: none;
  transition: color 0.3s ease;
}

/* Container Padding */
.container {
  max-width: 1200px;
}

/* Footer Styles */
footer {
  margin-top: auto;
}
</style>