// src/stores/userStore.js
import { defineStore } from 'pinia'; // Import defineStore from Pinia

export const useUserStore = defineStore('user', {
  state: () => ({
    resumeData: null, // Stores parsed resume data
    careerGoal: '',   // Stores the user's career goal
  }),
  actions: {
    // Set parsed resume data
    setResumeData(data) {
      this.resumeData = data;
    },
    // Set career goal
    setCareerGoal(goal) {
      this.careerGoal = goal;
    },
    // Clear user data (optional)
    clearUserData() {
      this.resumeData = null;
      this.careerGoal = '';
    },
  },
  getters: {
    // Get parsed resume data
    getResumeData: (state) => state.resumeData,
    // Get career goal
    getCareerGoal: (state) => state.careerGoal,
  },
});