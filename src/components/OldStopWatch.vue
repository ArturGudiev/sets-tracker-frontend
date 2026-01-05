<script setup lang="ts">
import { useStopwatch } from 'vue-timer-hook'
import { computed, onMounted } from 'vue'

const stopwatch = useStopwatch(0);
onMounted(() => {
  stopwatch.reset();
  stopwatch.pause();
})

const stopwatchRunning = computed(() => stopwatch.isRunning);

const stopWatchTimeString = computed(() => {
  return `${String(stopwatch.hours.value).padStart(2, '0')}:${String(stopwatch.minutes.value).padStart(2, '0')}:${String(stopwatch.seconds.value).padStart(2, '0')}`;
})

const totalSeconds = computed(() => {
  return stopwatch.hours.value * 3600 + stopwatch.minutes.value * 60 + stopwatch.seconds.value;
})

const clear = () => {
  stopwatch.reset();
  stopwatch.pause();
};


defineExpose({ totalSeconds, clear })

</script>

<template>
  <div>
    <span id="stopwatch-time">{{ stopWatchTimeString }}</span>
  </div>

  <!-- START -->
  <button type="button" class="btn btn-success me-2" @click.prevent="stopwatch.start()" title="Start">
    <i class="bi bi-play-fill"></i>
  </button>

  <!-- PAUSE -->
  <button type="button" class="btn btn-warning me-2" @click.prevent="stopwatch.pause()" title="Pause"
    v-if="stopwatchRunning">
    <i class="bi bi-pause-fill"></i>
  </button>


  <button type="button" class="btn btn-danger me-2" @click.prevent="stopwatch.reset()" title="Reset">
    <i class="bi bi-arrow-counterclockwise"></i>
  </button>
</template>

<style scoped>
#stopwatch-time {
  font-size: 24px;
  margin-left: 1.5rem;
  margin-bottom: .5rem;
  display: inline-block;
}
</style>
