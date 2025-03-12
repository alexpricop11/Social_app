<script setup>
import {ref} from 'vue';
import apiClient from "@/services/api.js";
import router from "@/router/routing.js";

const email = ref('');
const resetCode = ref('');
const newPassword = ref('');
const successMessage = ref('');
const errorMessage = ref('');

const confirmResetPassword = async () => {
  try {
    await apiClient.post("/auth/confirm-reset-password", {
      email: email.value,
      reset_code: resetCode.value,
      new_password: newPassword.value,
    });
    successMessage.value = "Parola a fost resetată cu succes!";
    errorMessage.value = '';
    await router.push('/auth')
  } catch (error) {
    errorMessage.value = "Codul este incorect sau a expirat.";
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
    <form @submit.prevent="confirmResetPassword"
          class="flex flex-col w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-white mb-6 text-center">Confirmare Resetare Parolă</h1>
      <div class="mb-4">
        <label for="email" class="block text-white mb-2">Email</label>
        <input type="email" id="email" v-model="email" required
               class="p-2 w-full border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <div class="mb-4">
        <label for="resetCode" class="block text-white mb-2">Cod de resetare</label>
        <input type="text" id="resetCode" v-model="resetCode" required
               class="p-2 w-full border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <div class="mb-4">
        <label for="newPassword" class="block text-white mb-2">Parola nouă</label>
        <input type="password" id="newPassword" v-model="newPassword" required
               class="p-2 w-full border border-gray-300 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>
      </div>
      <button type="submit"
              class="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
        Resetare Parolă
      </button>
    </form>
    <div v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</div>
    <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
  </div>
</template>