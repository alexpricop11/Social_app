<template>
  <div class="mb-5 flex flex-col items-center gap-2">
    <input
        type="file"
        @change="handleFileSelect"
        accept="image/*"
        class="hidden"
        ref="fileInput"
        multiple
    />
    <button
        @click="handleUploadButtonClick"
        class="bg-blue-500 text-white px-4 py-2 p-5 rounded-lg hover:bg-blue-600 transition-colors"
    >
      Încarcă imagini în profil
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleFileSelect(event) {
      this.$emit('file-selected', event.target.files);
    },
    handleUploadButtonClick() {
      this.$refs.fileInput.click();
    },
  },
};
</script>