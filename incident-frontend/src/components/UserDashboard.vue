<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">My Incidents</h1>
        <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">My Total Incidents</h3>
          <p class="text-3xl font-bold text-gray-900">{{ stats.total }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Pending</h3>
          <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Completed</h3>
          <p class="text-3xl font-bold text-green-600">{{ stats.completed }}</p>
        </div>
      </div>

      <!-- Create New Incident Button -->
      <div class="mb-6">
        <button @click="showCreateForm = !showCreateForm" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {{ showCreateForm ? 'Cancel' : '+ Create New Incident' }}
        </button>
      </div>

      <!-- Create Incident Form -->
      <div v-if="showCreateForm" class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Create New Incident</h2>
        <form @submit.prevent="createNewIncident" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input v-model="newIncident.title" type="text" required class="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="newIncident.description" required class="w-full border rounded px-3 py-2 h-24"></textarea>
          </div>
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Submit Incident
          </button>
        </form>
      </div>

      <!-- Incidents Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b">
          <h2 class="text-xl font-semibold">My Incidents</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="incident in myIncidents" :key="incident.id">
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.title }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ incident.description }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(incident.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ incident.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(incident.createdAt) }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button
                    @click="openEditModal(incident)"
                    class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(incident.id)"
                    class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-6">
        <Pagination
          :current-page="currentPage"
          :total-items="totalCount"
          :items-per-page="pageSize"
          @update:currentPage="handlePageChange"
        />
      </div>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 class="text-lg font-semibold mb-4">Edit Incident</h3>
          <form @submit.prevent="saveIncident">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="selectedIncident.title"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="selectedIncident.description"
                rows="4"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                required
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                v-model="selectedIncident.severity"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              >
                <option value="">Not Set</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

              <!-- Read-only fields for regular users -->
              <div class="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
              <p class="text-xs text-gray-600 mb-2">
                <strong>Note:</strong> Status and Assigned To can only be changed by administrators
              </p>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
              <textarea
                v-model="selectedIncident.resolutionNotes"
                rows="3"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Add resolution notes..."
                disabled
                >
            </textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                v-model="selectedIncident.dueDate"
                type="date"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                disabled
              />
            </div>

            <div class="mb-4">
              <label class="flex items-center">
                <input
                  v-model="selectedIncident.isEscalated"
                  type="checkbox"
                  class="mr-2"
                  disabled
                />
                <span class="text-sm font-medium text-gray-700">Escalate Incident</span>
              </label>
            </div>

          
              <div class="mb-2">
                <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <input
                  :value="selectedIncident.status"
                  type="text"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-600 text-sm"
                  disabled
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Assigned To</label>
                <input
                  :value="selectedIncident.assignedTo || 'Not assigned'"
                  type="text"
                  class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 text-gray-600 text-sm"
                  disabled
                />
              </div>
            </div>

            <div class="flex justify-end space-x-2">
              <button
                type="button"
                @click="showEditModal = false"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { logout } from "../services/login";
import { getAllIncidents, createIncident, updateIncident, deleteIncident } from "../services/incidentService";
import Pagination from "../components/Pagination.vue";
import type { Incident, PaginatedIncidents } from "../types/incident";

const router = useRouter();

const myIncidents = ref<any[]>([]);
const showCreateForm = ref(false);
const showEditModal = ref(false);
const newIncident = ref({ title: "", description: "" });
const selectedIncident = ref<any>({
  id: 0,
  title: "",
  description: "",
  status: "",
  severity: "",
  assignedTo: "",
  resolutionNotes: "",
  isEscalated: false,
  dueDate: null
});
const currentUserEmail = localStorage.getItem("email") || "";

// Pagination state
const currentPage = ref(1);
const totalCount = ref(0);
const pageSize = ref(10);

const stats = computed(() => ({
  total: myIncidents.value.length,
  pending: myIncidents.value.filter(i => i.status === "Pending").length,
  completed: myIncidents.value.filter(i => i.status === "Completed").length,
}));

const loadMyIncidents = async () => {
  try {
    const response = await getAllIncidents(currentPage.value);
    // Backend returns all incidents, so filter to current user
    const all = response.incidents.filter((i: any) => i.createdBy === currentUserEmail);
    myIncidents.value = all;
    totalCount.value = response.totalCount;
  } catch (error) {
    console.error("Failed to load incidents:", error);
  }
};

const openEditModal = (incident: Incident) => {
  selectedIncident.value = { ...incident };
  showEditModal.value = true;
};

const saveIncident = async () => {
  if (!selectedIncident.value) return;
  try {
    // Regular users can update: title, description, severity, resolutionNotes, isEscalated, dueDate
    // But NOT status or assignedTo (those are admin-only)
    const updatePayload = {
      id: selectedIncident.value.id,
      title: selectedIncident.value.title,
      description: selectedIncident.value.description,
      severity: selectedIncident.value.severity,
      resolutionNotes: selectedIncident.value.resolutionNotes,
      isEscalated: selectedIncident.value.isEscalated,
      dueDate: selectedIncident.value.dueDate,
      // Include current values for status and assignedTo (backend will ignore changes from non-admins)
      status: selectedIncident.value.status,
      assignedTo: selectedIncident.value.assignedTo
    };
    
    // Backend returns 204 No Content, so no need to parse response
    await updateIncident(selectedIncident.value.id, updatePayload);
    
    // Update the local incident with the changes
    const index = myIncidents.value.findIndex(i => i.id === selectedIncident.value.id);
    if (index !== -1) {
      myIncidents.value[index] = { ...myIncidents.value[index], ...selectedIncident.value };
    }
    
    showEditModal.value = false;
    alert('Incident updated successfully!');
  } catch (error: any) {
    console.error('Error updating incident:', error);
    if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      alert('You do not have permission to update incidents. Only administrators can update incidents.');
    } else if (error.message?.includes('401')) {
      alert('Session expired. Please login again.');
      handleLogout();
    } else {
      alert('Failed to update incident. Please try again.');
    }
  }
};

const confirmDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this incident?')) {
    try {
      await deleteIncident(id);
      // remove from local list after delete
      myIncidents.value = myIncidents.value.filter(i => i.id !== id);
    } catch (error) {
      console.error('Failed to delete incident:', error);
      alert('Failed to delete incident. Please try again.');
    }
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

watch(currentPage, loadMyIncidents);

const createNewIncident = async () => {
  try {
    await createIncident({
      title: newIncident.value.title,
      description: newIncident.value.description,
      status: "New",
    });
    newIncident.value = { title: "", description: "" };
    showCreateForm.value = false;
    await loadMyIncidents();
  } catch (error) {
    console.error("Failed to create incident:", error);
    alert('Failed to create incident. Please try again.');
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  loadMyIncidents();
});
</script>