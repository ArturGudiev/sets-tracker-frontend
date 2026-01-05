<script setup lang="ts">
import { ref } from 'vue'

const handleAddClick = () => {
  // TODO: Add implementation
};
const description = ref('');

</script>

<template>
  <h2>Add a new big set</h2>

  <button type="button" class="btn btn-primary" @click="handleAddClick">
    <i class="bi bi-plus-lg"></i> Add
  </button>

  <div class="mb-3" style="width: 30rem">
    <label for="description" class="form-label">Description</label>
    <input type="text" class="form-control" id="description" v-model="description" aria-describedby="descriptionHelp">
  </div>

</template>

<style scoped></style>
