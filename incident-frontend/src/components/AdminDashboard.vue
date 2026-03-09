<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div class="flex space-x-3">
         <button 
            @click="downloadExcel" 
            :disabled="isDownloading"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            <svg v-if="!isDownloading" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span v-if="isDownloading">Downloading...</span>
            <span v-else>Download Excel</span>
          </button>
        <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
        </div>
      </div>
    </header>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Total Incidents</h3>
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

      <!-- Incidents Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b">
          <h2 class="text-xl font-semibold">All Incidents</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="incident in incidents" :key="incident.id">
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.title }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ incident.description }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(incident.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ incident.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ incident.createdBy }}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                  <button
                    @click="openEditModal(incident)"
                    class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
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
          <h3 class="text-lg font-semibold mb-4">Edit Incident (Admin)</h3>

          <form @submit.prevent="saveIncident">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="selectedIncident.title"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                disabled
              />
              <p class="text-xs text-gray-500 mt-1">Title cannot be modified</p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="selectedIncident.description"
                rows="3"
                class="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                disabled
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">Description cannot be modified</p>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="selectedIncident.status"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              >
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select
                v-model="selectedIncident.severity"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                disabled
              >
                <option value="">Not Set</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
                
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <input
                v-model="selectedIncident.assignedTo"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter email address"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Resolution Notes</label>
              <textarea
                v-model="selectedIncident.resolutionNotes"
                rows="3"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Add resolution notes..."
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                v-model="selectedIncident.dueDate"
                type="date"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
              />
            </div>

            <div class="mb-4">
              <label class="flex items-center">
                <input
                  v-model="selectedIncident.isEscalated"
                  type="checkbox"
                  class="mr-2"
                />
                <span class="text-sm font-medium text-gray-700">Escalate Incident</span>
              </label>
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
import Pagination from "../components/Pagination.vue";
import { getAllIncidents, updateIncident } from "../services/incidentService";
import type { Incident, PaginatedIncidents } from "../types/incident";
import * as XLSX from "xlsx";

const router = useRouter();
const incidents = ref<Incident[]>([]);
const showEditModal = ref(false);
const isDownloading = ref(false);
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
const currentPage = ref<number>(1);
const totalCount = ref<number>(0);
const pageSize = ref<number>(10);

const stats = computed(() => ({
  total: incidents.value.length,
  pending: incidents.value.filter(i => i.status ===  "Investigating").length,
  completed: incidents.value.filter(i => i.status === "Resolved").length,
}));

const loadIncidents = async () => {
  try {
    const response = await getAllIncidents(currentPage.value); 
    incidents.value = response?.incidents || []; // Add fallback
    totalCount.value = response?.totalCount || 0; 
    pageSize.value = response?.pageSize || 10;
  } catch (error) {
    console.error("Failed to load incidents:", error);
    incidents.value = []; // Ensure it's always an array even on error
    totalCount.value = 0;
  }
};

const downloadExcel = async () => {
  isDownloading.value = true;
  try {
    // Fetch all incidents (not just current page)
    const allIncidentsData: Incident[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await getAllIncidents(page);
      allIncidentsData.push(...response.incidents);
      
      // Check if there are more pages
      if (allIncidentsData.length >= response.totalCount) {
        hasMore = false;
      } else {
        page++;
      }
    }

    // Prepare data for Excel
    const excelData = allIncidentsData.map(incident => ({
      "ID": incident.id,
      "Incident Number": incident.incidentNumber || "N/A",
      "Title": incident.title,
      "Description": incident.description,
      "Status": incident.status,
      "Severity": incident.severity || "N/A",
      "Assigned To": incident.assignedTo || "Unassigned",
      "Created By": incident.createdBy,
      "Created At": new Date(incident.createdAt).toLocaleString(),
      "Due Date": incident.dueDate ? new Date(incident.dueDate).toLocaleDateString() : "N/A",
      "Resolution Notes": incident.resolutionNotes || "N/A",
      "Is Escalated": incident.isEscalated ? "Yes" : "No"
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths for better readability
    ws['!cols'] = [
      { wch: 8 },  // ID
      { wch: 15 }, // Incident Number
      { wch: 30 }, // Title
      { wch: 40 }, // Description
      { wch: 15 }, // Status
      { wch: 12 }, // Severity
      { wch: 12 }, // Priority
      { wch: 25 }, // Assigned To
      { wch: 25 }, // Created By
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
      { wch: 15 }, // Due Date
      { wch: 30 }, // Resolution Notes
      { wch: 12 }  // Is Escalated
    ];

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Incidents");

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Incidents_Report_${date}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);

    alert(`Successfully downloaded ${allIncidentsData.length} incidents`);
  } catch (error) {
    console.error("Failed to download Excel:", error);
    alert("Failed to download Excel file. Please try again.");
  } finally {
    isDownloading.value = false;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

watch(currentPage, loadIncidents);

const openEditModal = (incident: Incident) => {
  selectedIncident.value = { ...incident };
  showEditModal.value = true;
};

const saveIncident = async () => {
  if (!selectedIncident.value) return;
  try {
    // Admin can update all fields - MUST include id property for backend validation
    const updatePayload = {
      id: selectedIncident.value.id,  // CRITICAL: Backend checks if id matches
      title: selectedIncident.value.title,
      description: selectedIncident.value.description,
      status: selectedIncident.value.status,
      severity: selectedIncident.value.severity,
      assignedTo: selectedIncident.value.assignedTo,
      resolutionNotes: selectedIncident.value.resolutionNotes,
      isEscalated: selectedIncident.value.isEscalated,
      dueDate: selectedIncident.value.dueDate
    };
    
    await updateIncident(selectedIncident.value.id, updatePayload);
    
    // Update local list
    const index = incidents.value.findIndex(i => i.id === selectedIncident.value.id);
    if (index !== -1) {
      incidents.value[index] = { ...incidents.value[index], ...selectedIncident.value };
    }
    
    showEditModal.value = false;
  } catch (error) {
    console.error("Failed to update incident:", error);
    alert("Failed to update incident. Please try again.");
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

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  loadIncidents();
});
</script>