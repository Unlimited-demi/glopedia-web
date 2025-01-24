// // src/main.js
// import { createApp } from 'vue';
// import { createPinia } from 'pinia';
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// import App from './App.vue';
// import router from './router';
// import '@/assets/tailwind.css'; // Import Tailwind CSS

// const pinia = createPinia();
// pinia.use(piniaPluginPersistedstate);

// const app = createApp(App);

// app.use(pinia);
// app.use(router);

// app.mount('#app');



// main.js (or main.ts)
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import your router configuration
import '@/assets/tailwind.css'; // Import Tailwind CSS // Or your CSS file

const app = createApp(App)

app.use(router) // **Important: Install vue-router as a plugin**

app.mount('#app')