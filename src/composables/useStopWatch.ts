import { computed, ref, watch } from 'vue'

export default function useStopWatch(launchStopwatch: boolean = false) {

  const startTime = ref(launchStopwatch ? Date.now() : 0);
  const initialized = ref(launchStopwatch);
  const isRunning = ref(launchStopwatch);

  const timePassed = computed(() => initialized.value ? now.value - startTime.value : 0);
  const milliseconds = computed(() => timePassed.value % 1000);
  const totalSeconds = computed(() => Math.round(timePassed.value / 1000))
  const seconds = computed(() => totalSeconds.value % 60);
  const minutes = computed(() => Math.floor(totalSeconds.value / 60 % 60))
  const hours = computed(() => Math.floor(totalSeconds.value / 3600 % 24))
  const now = ref(Date.now());


  const initialize = () => {
    now.value = Date.now();
    startTime.value = Date.now();
    initialized.value = true;
  };

  const start = () => {
    if (!initialized.value) {
      initialize();
    }
    isRunning.value = true;
  }

  const pause = () => {
    isRunning.value = false;
  }

  const reset = (isRunningValue?: boolean) => {
    const nowTime = Date.now();
    startTime.value = nowTime;
    now.value = nowTime;
    initialized.value = true;
    if (isRunningValue !== undefined) {
      isRunning.value = isRunningValue;
    }
  }

  let interval: null | ReturnType<typeof setInterval> = null;

  watch(isRunning, (isRunningNewValue) => {
    if ( interval ) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      if (isRunningNewValue) {
        setInterval(() => {
          if (isRunning.value) {
            return now.value = Date.now()
          }
        }, 100);
      }
    })
  }, { immediate: true })




  return {
    initialize,
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
    isRunning,
    timePassed
  }
}
