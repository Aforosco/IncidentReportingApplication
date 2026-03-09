<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
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
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
          <p class="mt-4 text-center text-sm text-gray-600">
        create an account?
        <router-link to="/register" class="text-blue-600 hover:underline">Sign-Up</router-link>
      </p>
        <p v-if="error" class="text-red-600 text-center mt-2">{{ error }}</p>
      </form>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../services/login";
import { useRouter } from "vue-router";

const form = ref({ email: "", password: "" });
const error = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    error.value = "";
    const response = await login(form.value.email, form.value.password);
    
    if (response.role === "Admin") {
      router.push("/admin-dashboard");
    } else {
      router.push("/user-dashboard");
    }
  } catch (err) {
    error.value = "Invalid credentials";
  }
};
</script>
