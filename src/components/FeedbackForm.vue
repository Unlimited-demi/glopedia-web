<template>
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">User Feedback</h2>
      <p class="text-gray-600 mb-4">
        We value your input and suggestions to improve our service.
      </p>
      <form @submit.prevent="submitFeedback">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
            Rating (1-5):
          </label>
          <select v-model="feedback.rating" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="comments">
            Comments:
          </label>
          <textarea v-model="feedback.comments" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
          <div v-if="submitStatus" class="mt-2 text-gray-700">{{ submitStatus }}</div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" :disabled="!feedback.rating">Submit Feedback</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { reactive, ref } from 'vue';
  
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const feedback = reactive({
    rating: '',
    comments: ''
  });
  const submitStatus = ref(null);
  
  const submitFeedback = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback/submit`, feedback);
      submitStatus.value = response.data.message;
      feedback.rating = '';
      feedback.comments = '';
      console.log(response.data.message);
    } catch (error) {
      submitStatus.value = error.response?.data?.message || 'Feedback submission failed';
      console.error('Error submitting feedback:', error);
    }
  };
  </script>
