<script setup lang="ts">
import { ref } from 'vue'
import { setsService } from '@/services'
import type { BigSetResponse, CreateBigSetRequest, SetResponse } from '@/types'

const bigSet = ref<BigSetResponse | null>(null);
const sets = ref<SetResponse[]>([]);

const handleAddClick = () => {
  const bigSetRequest: CreateBigSetRequest = {
    description: 'temp description',
    created: new Date(),
    numberOfSets: 2
  };
  setsService.createBigSet(bigSetRequest).then((bigSetResponse) => {
    console.log('AAAAAAAAAAAAA', bigSetResponse);

    bigSet.value = bigSetResponse.bigSet;
    sets.value = bigSetResponse.sets;
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
      <input type="number" class="form-control " id="number-of-sets" v-model="setsNumber" aria-describedby="numberOfSetsHelp">
    </div>
  </div>

  <button type="button" class="btn btn-primary mt-2" @click="handleAddClick">
    <i class="bi bi-plus-lg"></i> Add
  </button>


  <div v-if="bigSet" class="mt-3">
    <div v-for="set in sets" :key="set.id">
      {{ set.id }}
    </div>
  </div>
  <div v-else>Nothing is displayed here</div>

</template>

<style scoped></style>
