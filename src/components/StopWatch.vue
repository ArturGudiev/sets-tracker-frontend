<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import useStopWatch from '@/composables/useStopWatch.ts'

const props = defineProps<{
  initialDuration?: string | null // TODO check to get rid of null in type annotation
}>()

const initialMilliseconds = props.initialDuration ? moment.duration(props.initialDuration).asMilliseconds() : 0

const stopwatch = useStopWatch(initialMilliseconds);

const stopwatchRunning = computed(() => stopwatch.isRunning);

const stopWatchTimeString = computed(() => {
  const hours = stopwatch.hours.value;
  const minutes = stopwatch.minutes.value;
  const seconds = stopwatch.seconds.value;
  const milliseconds = stopwatch.milliseconds.value;
  const hoursPart = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
  const minutesPart = String(minutes).padStart(2, '0') + ':';
  const secondsPart = String(seconds).padStart(2, '0') + ':';
  const millisecondsPart = String(milliseconds).padStart(3, '0');

  return `${hoursPart}${minutesPart}${secondsPart}${millisecondsPart}`;
})

const stopWatchTimeStringUnits = computed(() => {
  const hours = stopwatch.hours.value;
  const minutes = stopwatch.minutes.value;
  const seconds = stopwatch.seconds.value;
  const hoursPart = hours > 0 ? `${hours}h ` : '';
  const minutesPart = minutes > 0 ? `${minutes}m ` : '';
  const secondsPart = seconds > 0 ? `${seconds}s` : '';

  return `${hoursPart}${minutesPart}${secondsPart}`;
})

const totalSeconds = computed(() => stopwatch.totalSeconds);
const milliseconds = computed(() => stopwatch.milliseconds);
const timePassed = computed(() => stopwatch.timePassed);

const pause = () => stopwatch.pause();

defineExpose({ totalSeconds, milliseconds, timePassed, pause, stopWatchTimeStringUnits })

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
