<template>
  <div class="bg-white shadow-lg rounded-lg p-6 my-4">
    <h2 class="text-2xl font-bold mb-4">Skills Assessment</h2>
    <template v-if="loading">
      <div>Loading...</div>
    </template>
    <template v-else-if="error">
      <div class="text-red-500">Error: {{ error }}</div>
    </template>
    <template v-else>
      <div v-if="skills.length > 0" class="py-3">
        <p class="mb-2">Based on your resume:</p>
        <ul class="list-disc list-inside">
          <li v-for="(skill, index) in skills" :key="index" v-html="(skill)"></li>
        </ul>
        <template v-if="skillGaps.length > 0" class="py-3">
          <p class="mt-2">
            <span class="font-bold">Potential skill gaps in Respect to your goal:</span>
          </p>
          <ul class="list-disc list-inside">
            <li v-for="(gap, index) in skillGaps" :key="index" v-html="(gap)"></li>
          </ul>
        </template>
        <template v-else>
          <p class="mt-2">No skill gaps found.</p>
        </template>

        <div v-if="strengths.length > 0" class="mt-4 py-3">
          <h3 class="font-bold">Your Strengths:</h3>
          <ul class="list-disc list-inside">
            <li v-for="(str, index) in strengths" :key="index" v-html="(str)"></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold">Your Weaknesses:</h3>
          <ul class="list-disc list-inside">
            <li v-for="weak in weaknesses" :key="weak" v-html="(weak)"></li>
          </ul>
        </div>

        <div v-if="developmentAreas.length > 0" class="mt-4 py-3">
          <h3 class="font-bold">Areas for Development:</h3>
          <ul class="list-disc list-inside">
            <li v-for="(dev, index) in developmentAreas" :key="index" v-html="(dev)"></li>
          </ul>
        </div>

        <div v-if="potentialPaths.length > 0" class="mt-4 py-3">
          <h3 class="font-bold">Potential Career Paths to Consider:</h3>
          <ul class="list-disc list-inside">
            <li v-for="(path, index) in potentialPaths" :key="index" v-html="(path)"></li>
          </ul>
        </div>

       
      </div>
      <div v-else class="text-gray-700">No skills found yet</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { storeToRefs } from 'pinia';

const assessmentStore = useAssessmentStore();
const { skills, skillGaps, strengths, developmentAreas, potentialPaths, weaknesses, loading, error } = storeToRefs(assessmentStore);

onMounted(async () => {
  await assessmentStore.fetchSkillsAssessment();
});
</script>