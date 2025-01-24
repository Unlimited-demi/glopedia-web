<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header Banner -->
      <header class="w-full">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-23%20at%2011.05.47_3b81868a.jpg-k66gs7ua2sA43zvM8P3ZkKyWCWnslG.jpeg"
          alt="GLOPEBA Banner" 
          class="w-full object-cover"
        />
      </header>
  
      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8 max-w-4xl">
        <!-- Registrations List -->
        <section class="my-8">
          <h2 class="text-xl font-bold mb-4">Registrations List</h2>
          <table class="min-w-full">
            <thead>
              <tr>
                <th>#No</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(reg, index) in registrations"
                :key="reg._id"
                @click="openModal(reg)"
                class="cursor-pointer hover:bg-gray-100"
              >
                <td>{{ index + 1 }}</td> <!-- Automatically assign numbers -->
                <td>{{ reg.fullName }}</td>
                <td>{{ reg.phoneNumber }}</td>
                <td>{{ reg.approved ? 'Yes' : 'No' }}</td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <!-- Modal for User Details -->
        <div
          v-if="showModal"
          class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div class="bg-white p-6 rounded-lg w-full max-w-md" >
            
            <h3 class="text-lg font-bold mb-4 ">User Details</h3>
            <p class="m-2"><strong>Full Name:</strong> {{ selectedUser.fullName }}</p>
            <p class="m-2"><strong>Phone:</strong> {{ selectedUser.phoneNumber }}</p>
            <p class="m-2"><strong>State:</strong> {{ selectedUser.state }}</p>
            <p class="m-2"><strong>LGA:</strong> {{ selectedUser.lga }}</p>
            <p class="m-2"><strong>Program:</strong> {{ selectedUser.program }}</p>
            <p class="m-2"><strong>Experience:</strong> {{ selectedUser.experience }}</p>
            <p class="m-2"><strong>Approved:</strong> {{ selectedUser.approved ? 'Yes' : 'No' }}</p>
            <p class="m-2"><strong>Sponser's Name:</strong> {{ selectedUser.sponsorName }}</p>
            <p class="m-2"><strong>Sponser's Phone:</strong> {{ selectedUser.sponsorPhone }}</p>
            
  
            <!-- Confirm Payment Button -->
            <button
              @click="approvePayment(selectedUser._id)"
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm Payment
            </button>
  
            <!-- Close Modal Button -->
            <button
              @click="showModal = false"
              class="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 ml-2"
            >
              Close
            </button>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="bg-blue-900 text-white mt-12 py-6">
        <div class="container mx-auto px-4 text-center">
          <p class="mb-2">Contact us on WhatsApp: 08030974864</p>
          <p class="mb-2">Visit: www.glopeba.com.ng</p>
          <p>© {{ new Date().getFullYear() }} GLOPEBA - Global Professional With Global Solutions</p>
        </div>
      </footer>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const BASE_URL = import.meta.env.VITE_BASE_URL
  
  // Data
  const registrations = ref([])
  const selectedUser = ref(null)
  const showModal = ref(false)
  
  // Fetch registrations on mount
  onMounted(async () => {
    const { data } = await axios.get(`${BASE_URL}/user/list`)
    registrations.value = data
  })
  
  // Open modal with user details
  const openModal = (user) => {
    selectedUser.value = user
    showModal.value = true
  }
  
  // Approve payment
  const approvePayment = async (id) => {
    try {
      // Send a PATCH request to update the approved field
      await axios.patch(`${BASE_URL}/user/approve/${id}`)
  
      // Update the local state
      const updatedRegistrations = registrations.value.map(reg => {
        if (reg._id === id) {
          return { ...reg, approved: true }
        }
        return reg
      })
      registrations.value = updatedRegistrations
  
      // Close the modal
      showModal.value = false
    } catch (error) {
      console.error('Failed to approve payment:', error)
    }
  }
  </script>
  <style>
  /* Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }
  </style>