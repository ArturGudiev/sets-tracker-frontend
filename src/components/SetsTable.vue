<script setup lang="ts">
import { formatDuration, getLocalDate } from '@/utils/common.ts'
import { onMounted, ref } from 'vue'
import type { GroupedSet, SingleSet } from '@/types/single-set.interface.ts'
import { setsService } from '@/services'

const todaySets = ref<SingleSet[]>([])
const todayGroupedSets = ref<GroupedSet[]>([])
const groupedSets = ref<boolean>(false)

onMounted(() => {
  fetchData()
})

const fetchData = () => {
  setsService.getTodaySets().then(sets => todaySets.value = sets);
  setsService.getTodayGroupedSets().then(setsGrouped => todayGroupedSets.value = setsGrouped);
}

</script>

<template>
  <div style="display: flex; align-items: center;">
    <router-link to="/sets/add" class="ms-3 btn btn-primary me-3">
      Add a new set
    </router-link>

    <router-link to="/big-sets/add" class="ms-3 btn btn-primary me-3">
      Add a big set
    </router-link>

    <button type="button" class="btn btn-outline-primary me-3" @click="fetchData">
      Refresh
    </button>

    <div class="form-check form-switch d-inline-block me-2">
      <input v-model="groupedSets" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
      <label class="form-check-label" for="flexSwitchCheckChecked">Grouped</label>
    </div>

  </div>

  <div class="ms-3 mt-4" v-if="!groupedSets">
    <h3 class="mb-3">Today's Sets</h3>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">Comment</th>
          <th scope="col">Distractions</th>
          <th scope="col">Duration</th>
          <th scope="col">Date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(set, index) in todaySets" :key="set.id" :class="{ 'golden-row': set.distractions === 0 }"
          :style="set.distractions === 0 ? { backgroundColor: 'gold', border: '1px solid gold' } : {}">
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ index + 1 }}</td>
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ set.description }}</td>
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ set.comments }}</td>
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ set.distractions }}</td>
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ formatDuration(set.duration) }}</td>
          <td :class="{ 'golden-cell': set.distractions === 0 }">{{ getLocalDate(set.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="ms-3 mt-4" v-else>
    <h3 class="mb-3">Today's Grouped Sets</h3>
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="set in todayGroupedSets" :key="set.description">
          <td>{{ set.description }}</td>
          <td>{{ set.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>


<style scoped>
.golden-row {
  border: 1px solid gold;
  background-color: gold !important;
  /* background: rgba(255, 215, 0, .5) */
}

tr.golden-row {
  border: 1px solid gold;
  background-color: gold !important;
}

/* Also override hover state */
tr.golden-row:hover {
  background-color: gold !important;
}

.golden-cell {
  /* background: gold; */
  background: rgba(255, 215, 0, .5)
}
</style>
