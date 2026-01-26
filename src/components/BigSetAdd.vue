<script setup lang="ts">
import { ref } from 'vue'

const handleAddClick = () => {
  // TODO: Add implementation
};
const description = ref('');
const setsNumber = ref(10);

</script>

<template>
  <h2>Add a new big set (temp item)</h2>



<!--  <div style="display: flex; align-items: center;">-->
<!--    <div style="width: 15rem">-->
<!--      <label for="description" class="form-label">Description</label>-->
<!--      <input type="text" class="form-control" id="description" v-model="description" aria-describedby="descriptionHelp">-->
<!--    </div>-->

<!--    <div style="width: 15rem" class="ms-2">-->
<!--      <label for="number-of-sets" class="form-label">Number of sets</label>-->
<!--      <input type="number" class="form-control " id="number-of-sets" v-model="setsNumber" aria-describedby="numberOfSetsHelp">-->
<!--    </div>-->
<!--  </div>-->


  <div>
    <div style="width: 15rem">
      <label for="description" class="form-label">Description</label>
      <input type="text" class="form-control" id="description" v-model="description" aria-describedby="descriptionHelp">
    </div>

    <div style="width: 15rem">
      <label for="number-of-sets" class="form-label">Number of sets</label>
      <input type="number" class="form-control " id="number-of-sets" v-model="setsNumber" aria-describedby="numberOfSetsHelp">
    </div>
  </div>

  <button type="button" class="btn btn-primary" @click="handleAddClick">
    <i class="bi bi-plus-lg"></i> Add
  </button>

</template>

<style scoped></style>
