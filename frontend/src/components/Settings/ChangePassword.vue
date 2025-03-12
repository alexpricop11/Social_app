<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-900">
    <div class="flex items-center justify-between w-full bg-gray-800 p-4 text-white fixed top-0 left-0 z-10">
      <button @click="goBack" class="flex items-center text-lg text-white">
        <span class="material-icons mr-2">arrow_back</span> Înapoi
      </button>
    </div>

    <form @submit.prevent="changePassword" class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mt-24">
      <div class="mb-4">
        <label for="current_password" class="block text-white mb-2">Parola curentă:</label>
        <input
          id="current_password"
          type="password"
          v-model="form.current_password"
          placeholder="Introduceti parola curentă"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <div class="mb-4">
        <label for="new_password" class="block text-white mb-2">Parola nouă:</label>
        <input
          id="new_password"
          type="password"
          v-model="form.new_password"
          placeholder="Introduceti parola nouă"
          class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </div>
      <button type="submit" class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">Schimbă Parola</button>
    </form>

    <div v-if="message" class="mt-4 text-green-500 font-bold">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      current_password: '',
      new_password: ''
    });
    const message = ref('');

    const changePassword = async () => {
      try {
        const response = await apiClient.put("/change-password", form.value);
        if (response.status === 200) {
          message.value = "Parola a fost schimbată cu succes!";
        } else {
          message.value = "A apărut o problemă. Încercați din nou.";
        }
      } catch (error) {
        message.value = "Eroare la schimbarea parolei. Verificați datele introduse.";
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      form,
      message,
      changePassword,
      goBack,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>