<script setup lang="ts">
import { computed, ref } from 'vue'
import StopWatch from '@/components/StopWatch.vue'
import { useToast } from '@/composables'
import { setsService } from '@/services'
import type { WithoutId, SingleSet } from '@/types'


const toast = useToast();
const description = ref<string>('');
const distractions = ref<number>(0);
const comments = ref<string>('');
const duration = ref<string>('');
const manualDurationInput = ref<boolean>(false);
  const stopWatchRef = ref<InstanceType<typeof StopWatch> | null>(null);

const durationToSubmit = computed(() => {
  if (!manualDurationInput.value) {
    return `PT${stopWatchRef.value?.totalSeconds}S`;
  }
  return duration.value ? 'PT' + duration.value.toUpperCase() : 'PT0S';
})

const submitForm = () => {
  const newSet: WithoutId<SingleSet> = {
    description: description.value.trim(),
    comments: comments.value.trim(),
    distractions: distractions.value,
    duration: durationToSubmit.value,
    date: new Date()
  };

  setsService.createSet(newSet).then((newSet) => {
    toast.success(`Новый Set "${newSet.description}" добавлен!`);
    comments.value = '';
    distractions.value = 0;
    stopWatchRef.value?.clear();
  });
}

</script>

<template>

  <form @submit="submitForm()" id="set-form">
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <input type="text" class="form-control" id="description" v-model="description" aria-describedby="descriptionHelp">
    </div>

    <div class="mb-3">
      <label for="comments" class="form-label">Comments</label>
      <textarea class="form-control" id="comments" v-model="comments" rows="3"
        aria-describedby="commentsHelp"></textarea>
    </div>

    <div class="form-check form-switch d-inline-block me-2 mb-3 switch-part">
      <input
        v-model="manualDurationInput"
        class="form-check-input switch-part"
        type="checkbox"
        id="manualDurationCheck"
        checked
      >
      <label class="form-check-label switch-part" for="manualDurationCheck">Enter duration manually</label>
    </div>

    <!-- Радио кнопка: "Ручной ввод времени" либо "Секундомер" -->
    <div id="duration-container">
      <transition name="fade-slide" mode="out-in">
        <div class="mb-3" v-if="manualDurationInput" key="manual-input">
          <label for="duration" class="form-label">Duration</label>
          <input type="text" class="form-control" id="duration" v-model="duration" aria-describedby="descriptionHelp">
        </div>
        <div class="mb-3" v-else key="stopwatch">
          <StopWatch ref="stopWatchRef" />
        </div>

      </transition>
    </div>

    <div class="mb-3">
      <label for="distractions" class="form-label">Distractions</label>
      <input type="number" class="form-control" id="distractions" v-model="distractions"
        aria-describedby="distractionsHelp">
    </div>

    <button type="submit" class="btn btn-primary" @click.prevent="submitForm">Submit</button>
  </form>


</template>

<style scoped>

.switch-part {
  cursor: pointer;
}

#set-form {
  max-width: 30rem;
}

#duration-container {
  height: 6rem;
}

/* Transition styles for manual duration input toggle START */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Transition styles for manual duration input toggle END */
</style>
