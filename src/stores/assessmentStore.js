import { defineStore } from 'pinia';
import axios from 'axios';
import { cleanAsterisks } from '@/utils/cleanData';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAssessmentStore = defineStore('assessment', {
//   persist: {
//     enabled: false,
//     strategies: [
//       {
//         storage: localStorage, 
//         // You can also specify paths if you want partial state persisted
//         // e.g. paths: ['skills', 'recommendations']
//       },
//     ],
//   },
  state: () => ({
    skills: [],
    skillGaps: [],
    strengths: [],
    developmentAreas: [],
    potentialPaths: [],
    weaknesses: [],
    recommendations: [],
    smart_tips: [],
    projects: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSkillsAssessment() {
      if (this.skills.length > 0) return; // Skip if already fetched
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE_URL}/assessment/skills`);
        const gSkills = response.data?.geminiSkills;

        this.skills = gSkills?.skills?.map(cleanAsterisks) || [];
        this.skillGaps = gSkills?.skillGaps?.map(cleanAsterisks) || [];
        this.strengths = gSkills?.strengths?.map(cleanAsterisks) || [];
        this.developmentAreas = gSkills?.development_areas?.map(cleanAsterisks) || [];
        this.potentialPaths = gSkills?.potential_paths?.map(cleanAsterisks) || [];
        this.weaknesses = gSkills?.weaknesses?.map(cleanAsterisks) || [];
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to fetch skills assessment';
      } finally {
        this.loading = false;
      }
    },

    async fetchRecommendations() {
      if (this.recommendations.length > 0 || this.projects.length > 0) return;
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE_URL}/assessment/recommendations`);
        const gemini = response.data?.geminiRecommendations;
        this.recommendations = gemini?.recommendations?.map(r => ({
          title: cleanAsterisks(r.title),
          description: cleanAsterisks(r.description),
          link: r.link,
        })) || [];
        this.smart_tips = gemini?.smart_tips?.map(cleanAsterisks) || [];
        this.projects = gemini?.projects?.map(p => ({
          title: cleanAsterisks(p.title),
          reason: cleanAsterisks(p.reason),
          resource: cleanAsterisks(p.resource),
          description: cleanAsterisks(p.description),
          link: p.link,
        })) || [];
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch learning recommendations';
      } finally {
        this.loading = false;
      }
    },
  },
});