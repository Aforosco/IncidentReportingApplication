<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">First Name</label>
          <input
            v-model="form.firstName"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Last Name</label>
          <input
            v-model="form.lastName"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full border px-3 py-2 rounded"
            required
            minlength="6"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>

        <p v-if="error" class="text-red-600 text-center mt-2">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center mt-2">{{ success }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../services/register";

const form = ref({ 
  firstName: "",
  lastName: "", 
  email: "", 
  password: "",
  confirmPassword: ""
});
const error = ref("");
const success = ref("");
const router = useRouter();

const handleRegister = async () => {
  try {
    error.value = "";
    success.value = "";

    // Validate passwords match
    if (form.value.password !== form.value.confirmPassword) {
      error.value = "Passwords do not match";
      return;
    }

    // Combine first name and last name into fullname
    const fullname = `${form.value.firstName} ${form.value.lastName}`.trim();

    // Call register service
    await register(form.value.email, form.value.password, fullname);

    success.value = "Registration successful! Redirecting to login...";
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (err) {
    error.value = "Registration failed. Please try again.";
    console.error("Registration error:", err);
  }
};
</script>
