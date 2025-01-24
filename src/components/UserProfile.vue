<template>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
        <template v-if="loading">
            <div>Loading...</div>
        </template>
        <template v-else-if="error">
          <div class="text-red-500">Error: {{ error }}</div>
        </template>
          <template v-else>
              <div v-if="profile">
                 <p class="mb-2">
                   <span class="font-bold">Name:</span> {{ profile.name }}
                   </p>
                <p class="mb-2" v-if="profile.email">
                   <span class="font-bold">Email:</span> {{ profile.email }}
                  </p>
                  <p class="mb-2" v-if="profile.contactNumber">
                   <span class="font-bold">Contact Number:</span> {{ profile.contactNumber }}
                   </p>
              </div>
              <div v-else class="text-gray-700">No profile data found yet. Please upload your resume</div>
         </template>
    </div>
  </template>
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
       const profile = ref(null);
       const loading = ref(false);
       const error = ref(null);
  
       const fetchUserProfile = async () => {
            loading.value = true;
            error.value = null;
          try {
               const response = await axios.get('http://localhost:3000/api/profile');
               profile.value = response.data.profile;
              } catch(error) {
                  error.value = error.response?.data?.message || 'Failed to fetch user profile';
                  console.error('Error fetching user profile:', error);
              } finally {
                 loading.value = false;
             }
         };
        onMounted(() => {
             fetchUserProfile();
         });
  </script>