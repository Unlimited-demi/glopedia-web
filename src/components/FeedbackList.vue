
<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border">Rating</th>
          <th class="px-4 py-2 border">Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in feedbacks" :key="index">
          <td class="px-4 py-2 border">{{ item.rating }}</td>
          <td class="px-4 py-2 border">{{ item.comments }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const feedbacks = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('/api/feedback');
    feedbacks.value = res.data.feedbacks || [];
  } catch (err) {
    console.error('Failed to fetch feedback list:', err);
  }
});
</script>