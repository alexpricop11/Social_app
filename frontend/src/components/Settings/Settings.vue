<template>
  <div class="flex flex-col items-center min-h-screen bg-black">
    <!-- Top Bar -->
    <div class="flex items-center justify-between w-full bg-gray-800 p-4 text-white fixed top-0 left-0 z-10">
      <button @click="goBack" class="flex items-center text-lg text-white">
        <span class="material-icons mr-2">arrow_back</span> Înapoi
      </button>
      <h1 class="text-xl font-bold text-center flex-1 md:text-center sm:text-left">
        Setări
      </h1>
    </div>
    <div class="flex flex-col items-center justify-center pt-24 w-full">
      <ul class="space-y-4 w-full max-w-md">
        <li @click="handleMenuAction('changePassword')"
            class="flex items-center text-xl text-white cursor-pointer hover:bg-green-500 px-4 py-2 rounded transition duration-300">
          <span class="material-icons mr-2">lock</span> Schimbă Parola
        </li>
        <li @click="handleMenuAction('editProfile')"
            class="flex items-center text-xl text-white cursor-pointer hover:bg-green-500 px-4 py-2 rounded transition duration-300">
          <span class="material-icons mr-2">edit</span> Editează Profilul
        </li>
        <li @click="handleMenuAction('logout')"
            class="flex items-center text-xl text-white cursor-pointer hover:bg-green-500 px-4 py-2 rounded transition duration-300">
          <span class="material-icons mr-2">exit_to_app</span> Iesire
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleMenuAction = (action) => {
      switch (action) {
        case "changePassword":
          router.push("/change-password");
          break;
        case "editProfile":
          router.push('/edit-profile');
          break;
        case "logout":
          router.push("/auth");
          localStorage.removeItem('token');
          break;
        default:
          console.log(`Unknown action: ${action}`);
      }
    };

    const goBack = () => {
      router.back();
    };

    return {
      handleMenuAction,
      goBack,
    };
  },
};
</script>