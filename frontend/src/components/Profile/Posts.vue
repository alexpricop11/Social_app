<template>
  <div>
    <div class="flex flex-wrap gap-4 pb-20 justify-start items-center">
      <div v-for="post in posts" :key="post.id"
           class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 overflow-hidden rounded-lg border border-gray-300"
           @click="openModal(post)"
      >
        <img
            :src="getImageUrl(post.image)"
            alt="Gallery Image"
            class="w-full h-full object-cover"
        />
      </div>
    </div>
    <PhotoModal v-if="selectedPost" :show="showModal" :photo="selectedPost" :getImageUrl="getImageUrl" @close="closeModal"/>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";
import PhotoModal from "@/components/Profile/PhotoModal.vue";

export default {
  components: {
    PhotoModal,
  },
  props: {
    profile: Object,
  },
  data() {
    return {
      selectedFiles: [],
      posts: [],
      showModal: false,
      selectedPost: null,
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        const response = await apiClient.get('/get-posts');
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    openModal(post) {
      this.selectedPost = post;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedPost = null;
    },
    getImageUrl(imagePath) {
      const baseUrl = "http://127.0.0.1:8000/static/";
      return `${baseUrl}${imagePath.split('/')[1]}`;
    },
  },
};
</script>