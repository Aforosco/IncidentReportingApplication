<template>
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-2xl font-bold mb-4">{{ incident ? 'Edit Incident' : 'Create Incident' }}</h2>
      <form @submit.prevent="saveIncident" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" class="w-full border px-3 py-2 rounded" required></textarea>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 font-medium">Severity</label>
            <select v-model="form.severity" class="w-full border px-3 py-2 rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Status</label>
            <select v-model="form.status" class="w-full border px-3 py-2 rounded">
              <option>New</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block mb-1 font-medium">Assigned To</label>
          <input v-model="form.assignedTo" class="w-full border px-3 py-2 rounded" />
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { createIncident, updateIncident } from '../services/incidentService';
import type { Incident, Severity, Status } from '../types/incident';

interface FormState {
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assignedTo?: string;
}

const props = defineProps<{ incident?: Incident }>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const form = ref<FormState>({
  title: '',
  description: '',
  severity: 'Low',
  status: 'New',
  assignedTo: '',
});

watch(
  () => props.incident,
  (incident) => {
    if (incident) {
      form.value = {
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status,
        assignedTo: incident.assignedTo || '',
      };
    }
  },
  { immediate: true }
);

const saveIncident = async () => {
  if (props.incident) {
    await updateIncident(props.incident.id, form.value);
  } else {
    await createIncident(form.value);
  }
  emit('saved');
  emit('close');
};
</script>
<template>
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-2xl font-bold mb-4">{{ incident ? 'Edit Incident' : 'Create Incident' }}</h2>
      <form @submit.prevent="saveIncident" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" class="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" class="w-full border px-3 py-2 rounded" required></textarea>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 font-medium">Severity</label>
            <select v-model="form.severity" class="w-full border px-3 py-2 rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Status</label>
            <select v-model="form.status" class="w-full border px-3 py-2 rounded">
              <option>New</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block mb-1 font-medium">Assigned To</label>
          <input v-model="form.assignedTo" class="w-full border px-3 py-2 rounded" />
        </div>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
import { createIncident, updateIncident } from '../services/incidentService';
import type { Incident, Severity, Status } from '../types/incident';

interface FormState {
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assignedTo?: string;
}

const props = defineProps<{ incident?: Incident }>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const form = ref<FormState>({
  title: '',
  description: '',
  severity: 'Low',
  status: 'New',
  assignedTo: '',
});

watch(
  () => props.incident,
  (incident) => {
    if (incident) {
      form.value = {
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status,
        assignedTo: incident.assignedTo || '',
      };
    }
  },
  { immediate: true }
);

const saveIncident = async () => {
  if (props.incident) {
    await updateIncident(props.incident.id, form.value);
  } else {
    await createIncident(form.value);
  }
  emit('saved');
  emit('close');
};
</script>
