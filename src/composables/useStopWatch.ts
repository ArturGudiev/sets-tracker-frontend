import { computed, ref } from 'vue'
import { useNow } from '@vueuse/core'
export default function useStopWatch(initialMilliseconds = 0) {

  const initialized = ref(false);
  const startTime = ref(Date.now());
  const status = ref<'initial' | 'running' | 'pause'>(initialMilliseconds > 0 ? 'pause' : 'initial'); //Replace on status initial, running, pause
  const now = useNow() // Automatically reactive and managed

  const timePassed = computed(() => {
    if (status.value === 'initial') {
      return 0;
    }
    return accumulatedValue.value + (status.value === 'running' ? Number(now.value) - startTime.value : 0);
  });
  const milliseconds = computed(() => timePassed.value % 1000);
  const totalSeconds = computed(() => Math.floor(timePassed.value / 1000))
  const seconds = computed(() => totalSeconds.value % 60);
  const minutes = computed(() => Math.floor(totalSeconds.value / 60 % 60))
  const hours = computed(() => Math.floor(totalSeconds.value / 3600 % 24))

  const accumulatedValue = ref(initialMilliseconds);

  const start = () => {
    if (status.value === 'running') {
      return;
    }
    startTime.value = Date.now();
    status.value = 'running';
  }

  const pause = () => {
    if (status.value === 'running') {
      accumulatedValue.value += (Date.now() - startTime.value);
      status.value = 'pause';
    }
  }

  const reset = () => {
    accumulatedValue.value = 0;
    if (status.value === 'running') {
      startTime.value = Date.now();
    }
  }

  return {
    start,
    pause,
    reset,
    startTime,
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    initialized,
    isRunning: status,
    timePassed
  }
}
