<template>
  <div class="flex flex-col items-center p-4 rounded-lg text-white min-h-screen">
    <ProfileImage
      :profile="profile"
      @open-modal="showModal = true"
    />
    <FollowersFollowing
      :profile="profile"
      @fetch-followers="fetchFollowers"
      @fetch-following="fetchFollowing"
    />

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      @click="showModal = false"
    >
      <div class="relative max-w-full max-h-full bg-white rounded-lg p-4" @click.stop>
        <img
          :src="profile.profile_image"
          alt="Profile Image"
          class="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>

    <FollowersList v-if="showFollowers" :followers="followers" @close="showFollowers = false"/>
    <FollowingList v-if="showFollowing" :following="following" @close="showFollowing = false"/>
    <div class="mt-4 w-full max-w-4xl">
      <Posts :profile="profile"/>
    </div>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";
import Posts from "@/components/Profile/Posts.vue";
import FollowersList from "@/components/Profile/FollowersList.vue";
import FollowingList from "@/components/Profile/FollowingList.vue";
import ProfileImage from "@/components/Profile/ProfileImage.vue";
import FollowersFollowing from "@/components/Profile/FollowersFollowing.vue";

export default {
  data() {
    return {
      profile: null,
      showModal: false,
      showFollowers: false,
      showFollowing: false,
      followers: [],
      following: []
    };
  },
  components: {
    Posts,
    FollowersList,
    FollowingList,
    ProfileImage,
    FollowersFollowing,
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      try {
        const response = await apiClient.get('/profile');
        this.profile = response.data.profile;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchFollowers() {
      try {
        const response = await apiClient.get('/followers');
        this.followers = response.data.followers;
        this.showFollowers = true;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchFollowing() {
      try {
        const response = await apiClient.get('/following');
        this.following = response.data.following;
        this.showFollowing = true;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>