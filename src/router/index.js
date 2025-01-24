import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/views/LandingPage.vue'
import RegistrationsList from '@/views/RegistrationsList.vue'


const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    
    {
      path: "",
      name: "/LandingPage",
      component : LandingPage
    },
    
    {
      path : "/admin/registrations",
      name : "registrations",
      component : RegistrationsList
     }

  ]
})

export default router