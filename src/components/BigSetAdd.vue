<script setup lang="ts">
import { ref } from 'vue'
import { setsService } from '@/services'
import type { CreateBigSetRequest } from '@/types'
import type { BigSetFull } from '@/types/generated'
import BigSetCard from '@/components/BigSetCard.vue'

const bigSet = ref<BigSetFull | null>(null);


const handleAddClick = () => {
  const bigSetRequest: CreateBigSetRequest = {
    description: description.value,
    created: new Date(),
    numberOfSets: setsNumber.value
  };
  setsService.createBigSet(bigSetRequest).then((bigSetResponse) => {
    bigSet.value = bigSetResponse;
  });
};

const description = ref('');
const setsNumber = ref(2);


</script>

<template>
  <h2>Add a new big set (temp item)</h2>

  <div>
    <div style="width: 15rem">
      <label for="description" class="form-label">Description</label>
      <input type="text" class="form-control" id="description" v-model="description" aria-describedby="descriptionHelp">
    </div>

    <div style="width: 15rem">
      <label for="number-of-sets" class="form-label">Number of sets</label>
      <input type="number" class="form-control " id="number-of-sets" v-model="setsNumber"
        aria-describedby="numberOfSetsHelp">
    </div>
  </div>

  <button type="button" class="btn btn-primary mt-2" @click="handleAddClick">
    <i class="bi bi-plus-lg"></i> Create Big Set
  </button>

  <div v-if="bigSet" class="mt-3">
    <BigSetCard
      :id="bigSet.id"
      :big-set-value="bigSet"
      class="mb-3"
    />
  </div>

</template>

<style scoped>

.floating-editor textarea {
  resize: vertical;
}

</style>
