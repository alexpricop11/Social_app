<script setup>
import {ref} from 'vue';
import apiClient from "@/services/api.js";
import router from "@/router/routing.js";

const email = ref('');
const successMessage = ref('');
const errorMessage = ref('');

const requestResetPassword = async () => {
  try {
    await apiClient.post("/auth/reset-password", {email: email.value});
    successMessage.value = "Un cod a fost trimis pe emailul tău.";
    errorMessage.value = '';
    await router.push('/confirm-reset-password')
  } catch (error) {
    errorMessage.value = "Nu am putut trimite codul de resetare. Te rugăm să încerci din nou.";
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
    <form @submit.prevent="requestResetPassword"
          class="flex flex-col w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-white mb-6 text-center">Resetare Parolă</h1>
      <div class="mb-4">
        <label for="email" class="block text-white mb-2">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Email" required
               class="p-2 w-full border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <button type="submit"
              class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
        Trimite codul de resetare
      </button>
    </form>
    <div v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</div>
    <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
  </div>
</template>