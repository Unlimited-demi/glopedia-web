<template>
  <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mx-auto">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Upload Your Resume</h2>
    
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500"
      @click="$refs.fileInput.click()"
      @dragover.prevent
      @drop.prevent="handleFileDrop"
    >
      <input 
        type="file" 
        ref="fileInput"
        @change="handleFileUpload" 
        accept=".pdf,.doc,.docx"
        class="hidden"
      />
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="text-lg font-semibold text-gray-700 mb-2">Drag and drop your resume here</p>
      <p class="text-sm text-gray-500">or click to select a file (PDF, DOC, DOCX)</p>
    </div>

    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h3 class="text-xl font-semibold mb-2 text-gray-800">How to Use</h3>
      <p class="text-gray-600 mb-2">
        1. Choose a PDF, DOC, or DOCX resume file.
      </p>
      <p class="text-gray-600 mb-2">
        2. Click "Upload Resume" to securely process your file.
      </p>
      <p class="text-gray-600 mb-2">
        3. Set your career goal to personalize your recommendations.
      </p>
      <p class="text-gray-600">
        4. View skill gaps, strengths, and curated learning paths on your Profile page.
      </p>
    </div>

    <div v-if="file" class="mb-6">
      <p class="text-sm text-gray-600">Selected file: {{ file.name }}</p>
      <div class="mt-2 flex items-center">
        <div class="bg-gray-200 rounded-full h-2 flex-grow overflow-hidden">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            :style="{ width: `${uploadProgress}%` }"
          ></div>
        </div>
        <span class="ml-2 text-sm text-gray-600">{{ uploadProgress }}%</span>
      </div>
    </div>

    <button 
      @click="uploadResume" 
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      :disabled="!file || isUploading"
    >
      {{ isUploading ? 'Uploading...' : 'Upload Resume' }}
    </button>

    <div v-if="uploadStatus" :class="`text-sm ${uploadStatus.color} mb-4`">
      {{ uploadStatus.message }}
    </div>

    <div v-if="showGoalForm" class="mt-8">
      <h3 class="text-2xl font-semibold mb-4 text-gray-800">Set Your Career Goal</h3>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="careerGoal">
          Describe your career aspirations:
        </label>
        <textarea 
          v-model="careerGoal" 
          id="careerGoal"
          rows="4"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Become a senior full-stack developer in 3 years"
        ></textarea>
      </div>
      <button 
        @click="submitCareerGoal" 
        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!careerGoal.trim()"
      >
        Submit Career Goal
      </button>
    </div>

    <button 
      v-if="resumeUploaded && goalSubmitted"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
    >
      <router-link to="/profile" class="block w-full text-center">View Your Recommendations</router-link>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const userStore = useUserStore();
const fileInput = ref(null);
const file = ref(null);
const uploadStatus = ref(null);
const careerGoal = ref('');
const showGoalForm = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0);
const resumeUploaded = ref(false);
const goalSubmitted = ref(false);

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) processFile(selectedFile);
};

const handleFileDrop = (event) => {
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) processFile(droppedFile);
};

const processFile = (selectedFile) => {
  if (!allowedTypes.includes(selectedFile.type)) {
    uploadStatus.value = { message: 'Invalid file type. Please upload a PDF, DOC, or DOCX file.', color: 'text-red-600' };
    return;
  }
  file.value = selectedFile;
  uploadStatus.value = null;
  uploadProgress.value = 0;
};

const uploadResume = async () => {
  if (!file.value) return;

  isUploading.value = true;
  uploadStatus.value = null;
  uploadProgress.value = 0;

  const formData = new FormData();
  formData.append('file', file.value);

  try {
    const response = await axios.post(`${API_BASE_URL}/resume/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
    });

    uploadStatus.value = { message: response.data.message, color: 'text-green-600' };
    showGoalForm.value = true;
    resumeUploaded.value = true;
    userStore.setResumeData(response.data.resumeData); // Assuming the API returns parsed resume data
  } catch (error) {
    uploadStatus.value = { 
      message: error.response?.data?.message || 'Upload failed. Please try again.', 
      color: 'text-red-600' 
    };
  } finally {
    isUploading.value = false;
    file.value = null;
  }
};

const submitCareerGoal = async () => {
  if (!careerGoal.value.trim()) return;

  try {
    const response = await axios.post(`${API_BASE_URL}/profile/goal`, 
      { goal: careerGoal.value },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    userStore.setCareerGoal(careerGoal.value);
    uploadStatus.value = { message: 'Career goal submitted successfully!', color: 'text-green-600' };
    showGoalForm.value = false;
    careerGoal.value = '';
    goalSubmitted.value = true;
  } catch (error) {
    uploadStatus.value = { 
      message: 'Failed to submit career goal. Please try again.', 
      color: 'text-red-600' 
    };
  }
};
if (goalSubmitted.value) {
  const goToProfile = () => {
    // Navigate to the user's profile page (e.g., using Vue Router)
    userStore.router.push('/profile');
  };
}

const goToProfile = () => {
  // Navigate to the user's profile page (e.g., using Vue Router)
  userStore.router.push('/profile');
};
</script>
