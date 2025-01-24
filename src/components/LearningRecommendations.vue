<template>
  <div class="px"></div>
  <div class="bg-white shadow-lg rounded-lg p-6 my-4">
      <h2 class="text-2xl font-bold mb-4">Learning Recommendations</h2>
      <template v-if="loading">
          <div>Loading...</div>
      </template>
      <template v-else-if="error">
          <div class="text-red-500">Error: {{ error }}</div>
      </template>
      <template v-else>
          <!-- Display Recommendations -->
          <div v-if="recommendations.length > 0">
              <ul class="list-disc list-inside">
                  <li v-for="(rec, index) in recommendations" :key="index" class="mb-4">
                      <template v-if="rec.link">
                          <a :href="rec.link" target="_blank" class="font-bold text-blue-500 hover:underline">
                              {{ rec.title }}
                          </a>
                      </template>
                      <template v-else>
                          <span class="font-bold">{{ rec.title }}</span>
                      </template>
                      <p class="text-gray-700">{{ rec.description }}</p>
                  </li>
              </ul>
          </div>

          <!-- Display Smart Tips -->
          <div v-if="smart_tips.length > 0">
              <h3 class="text-xl font-bold mt-6 mb-4">Smart Tips</h3>
              <ul class="list-disc list-inside">
                  <li v-for="(tip, index) in smart_tips" :key="index" class="mb-4">
                      <span class="">{{ tip }}</span>
                  </li>
              </ul>
          </div>
          <div v-if="projects.length > 0" class="mt-4 py-3">
            <h3 class="font-bold text-xl mb-2">Recommended Projects:</h3>
            <ul class="list-disc list-inside">
              <li v-for="(project, index) in projects" :key="index" class="mb-4">
                <a :href="project.link" target="_blank" class="text-indigo-600 hover:underline"><strong class=" text-blue-600">{{ project.title }}</strong></a>
                <p class="text-gray-700"><span class="font-semibold">Reason:</span> {{ project.reason }}</p>
                <p class="text-gray-700"><span class="font-semibold">Resource:</span> {{ project.resource }}</p>
                <p class="text-gray-700">{{ project.description }}</p>
                
              </li>
            </ul>
          </div>

          <!-- Display if no recommendations or tips are available -->
          <div v-if="recommendations.length === 0 && smart_tips.length === 0" class="text-gray-700">
              No learning recommendations or smart tips available yet.
          </div>
      </template>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { cleanAsterisks } from '@/utils/cleanData';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { storeToRefs } from 'pinia';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const assessmentStore = useAssessmentStore();
const { recommendations, loading, error, smart_tips, projects } = storeToRefs(assessmentStore);

onMounted(async () => {
  await assessmentStore.fetchRecommendations();
});
</script>