<template>
  <div class="flex items-center w-full justify-center">
    <div
      class="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center cursor-pointer"
      @click="$emit('open-modal')"
    >
      <img
        v-if="profile && profile.profile_image"
        :src="profile.profile_image"
        alt="Profile Image"
        class="w-full h-full object-cover rounded-full"
      />
      <span v-else class="material-icons text-6xl text-white">person</span>
    </div>

    <div class="text-center ml-4">
      <div class="text-5xl font-bold">{{ profile ? profile.username : '' }}</div>
    </div>

    <div class="flex cursor-pointer ml-4">
      <router-link to="/settings">
        <span class="material-icons text-3xl text-white">settings</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
    showModal: Boolean
  }
};
</script>