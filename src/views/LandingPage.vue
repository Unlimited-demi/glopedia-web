<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Banner -->
    <header class="w-full">
      <img 
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-23%20at%2011.05.47_3b81868a.jpg-k66gs7ua2sA43zvM8P3ZkKyWCWnslG.jpeg"
        alt="GLOPEBA Banner" 
        class="w-full    object-cover "

      />
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 \ w-full">
      <!-- About Section -->
      <section class="mb-12 bg-white rounded-lg shadow-lg p-6 ">
        <h2 class="text-2xl font-bold text-blue-900 mb-4">About GLOPEBA</h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          Global Professionals Education and Business Academy is an international platform initiated and developed to empower, train encourage and recognize practical experience in different areas of specialization.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
          True and real education has evolved beyond the building walls called classroom. Therefore the need to encourage those who have keyed in making sure local and global solutions are developed with real practical experience and evidence should be honoured and recognized.
        </p>
      </section>

      <!-- Registration Form -->
      <section class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-blue-900 mb-6">Registration Form</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                v-model="formData.fullName" 
                type="text" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                v-model="formData.phoneNumber" 
                type="tel" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">State</label>
              <select 
                v-model="formData.state" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                <option v-for="state in nigerianStates" :key="state" :value="state">
                  {{ state }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">LGA</label>
              <input 
                v-model="formData.lga" 
                type="text" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Program Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Program of Interest</label>
            <select 
              v-model="formData.program" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Program</option>
              <option v-for="program in programs" :key="program" :value="program">
                {{ program }}
              </option>
            </select>
          </div>

          <!-- Sponsor Information -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Sponsor's Name</label>
            <input 
              v-model="formData.sponsorName" 
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Sponsor's Phone Number</label>
            <input 
              v-model="formData.sponsorPhone" 
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <!-- Additional Information -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Previous Experience (if any)</label>
            <textarea 
              v-model="formData.experience"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Date and Signature -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <input 
                v-model="formData.date" 
                type="date" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Digital Signature</label>
              <input 
                v-model="formData.signature" 
                type="text" 
                required
                placeholder="Type your full name as signature"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- <div>
            
            <label class="block text-sm font-medium text-gray-700">Payment Approved</label>
            <input
              type="checkbox"
              v-model="formData.approved"
              class="mt-1"
            />
          </div> -->

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button 
              type="submit"
              class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Registration (₦20,000)
            </button>
          </div>
        </form>
      </section>

      <!-- <section class="my-8">
        <h2 class="text-xl font-bold mb-4">Registrations List</h2>
        <table class="min-w-full">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reg in registrations"
              :key="reg._id"
              @click="openModal(reg)"
              class="cursor-pointer hover:bg-gray-100"
            >
              <td>{{ reg.fullName }}</td>
              <td>{{ reg.phoneNumber }}</td>
              <td>{{ reg.approved ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>
      </section> -->

      <!-- Simple Modal -->
      <!-- <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div class="bg-white p-6 rounded">
          <h3 class="text-lg font-bold mb-4">User Details</h3>
          <p>Full Name: {{ selectedUser.fullName }}</p>
          <p>Phone: {{ selectedUser.phoneNumber }}</p>
          <p>Approved: {{ selectedUser.approved }}</p>
          <button
            @click="approvePayment(selectedUser._id)"
            class="mt-4 px-4 py-2 bg-blue-600 text-white"
          >
            Approve Payment
          </button>
        </div>
      </div> -->
      <div v-if="showPaymentModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-md text-center">
          <h2 class="text-xl font-bold mb-4">Payment Details</h2>
          <p class="mb-2">Bank: Moniepoint</p>
          <p class="mb-2">Account Name: GLobal Professionals Education and Business Academy LTD</p>
          <p class="mb-2">Account Number: 6936436644</p>
          <p class="mb-2">Send receipt to 08030974864 (WhatsApp)</p>
          <button
            @click="showPaymentModal = false"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <!-- <footer class="bg-blue-900 text-white mt-12 py-6">
      <div class="container mx-auto px-4 text-center">
        <p class="mb-2">Contact us on WhatsApp: 08030974864</p>
        <p class="mb-2">Visit: www.glopeba.com.ng</p>
        <p>© {{ new Date().getFullYear() }} GLOPEBA - Global Professional With Global Solutions</p>
      </div>
    </footer> -->
  </div>
</template>

<script setup>
import { ref, onMounted  } from 'vue'
import axios from 'axios'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter()

const BASE_URL = import.meta.env.VITE_BASE_URL
console.log("Base URL",BASE_URL)

const formData = ref({
  fullName: '',
  phoneNumber: '',
  state: '',
  lga: '',
  program: '',
  sponsorName: '',
  sponsorPhone: '',
  experience: '',
  date: '',
  signature: '',
  approved: false
})

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
]

const programs = [
  'Professional Diploma Certificate in Practical Automobile Mechanic',
  'Professional Diploma Certificate in Practical Furniture Services',
  'Professional Diploma Certificate in Practical Hair Dressing and Stylist Services',
  'Professional Diploma Certificate in Practical Civil and Building construction services',
  'Professional Diploma Certificate in Practical Business Marketing and management services',
  'Professional Diploma Certificate in Practical Safety and Security Services',
  'Professional Diploma Certificate in Practical Church Ministry and services',
  'Professional Diploma Certificate in Practical Public Health and caregiver',
  'Professional Diploma Certificate in Practical Agric Farming and Services',
  'Professional Diploma Certificate in Practical Computer Services',
  'Professional Diploma Certificate in Practical Driving Services'
]

const registrations = ref([])
const selectedUser = ref(null)
const showModal = ref(false)
const showPaymentModal = ref(false)

// onMounted(async () => {
//   const { data } = await axios.get('/list')
//   registrations.value = data
// })

const handleSubmit = async () => {
  try {
    // Simple validation
    if (!formData.value.fullName || !formData.value.phoneNumber) {
      total.error('Please fill in all required fields.');
      return;
    }
    // Here you would typically send the form data to your backend
    const response = await axios.post(`${BASE_URL}/user/register`, formData.value)
    if (response.status ===200) {
      console.log(response.data)
      
    }
    // On success
    toast.success('Registration submitted successfully!');  
    showPaymentModal.value = true;
  } catch (error) {
    toast.error('Submission failed.');
  }
}
</script>

<style>
/* Add any custom styles here */
input, select, textarea {
  @apply border-gray-300;
}
</style>