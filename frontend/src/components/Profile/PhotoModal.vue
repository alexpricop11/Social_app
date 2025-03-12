<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div class="relative max-w-full max-h-full bg-white rounded-lg p-4" @click.stop>
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        &times;
      </button>
      <img :src="getImageUrl(photo.image)" alt="Photo" class="w-full h-auto object-contain rounded-lg mb-4"/>
      <div class="text-center">
        <h2 class="text-2xl font-bold">{{ photo.author_id }}</h2>
        <p>{{ photo.content }}</p>
        <div class="mt-4">
          <span>{{ photo.likes }} Likes</span>
          <span>{{ photo.comments }} Comments</span>
        </div>
        <div class="mt-4">
          <h3 class="text-xl font-semibold">Comments</h3>
          <ul>
            <li v-for="comment in photo.comments" :key="comment.id" class="text-left">
              <strong>{{ comment.author }}:</strong> {{ comment.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    photo: Object,
    getImageUrl: Function
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>