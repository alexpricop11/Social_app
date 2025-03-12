<template>
  <div class="text-white flex space-x-4 mt-4">
    <div>
      <span class="block text-lg font-bold text-center">{{ profile ? profile.posts_count : 0 }}</span>
      <span class="text-sm">Postări</span>
    </div>
    <div @click="fetchFollowers" class="cursor-pointer">
      <span class="block text-lg font-bold text-center">{{ profile ? profile.followers_count : 0 }}</span>
      <span class="text-sm">Urmăritori</span>
    </div>
    <div @click="fetchFollowing" class="cursor-pointer">
      <span class="block text-lg font-bold text-center">{{ profile ? profile.following_count : 0 }}</span>
      <span class="text-sm">Urmărești</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  },
  methods: {
    fetchFollowers() {
      this.$emit('fetch-followers');
    },
    fetchFollowing() {
      this.$emit('fetch-following');
    }
  }
};
</script>