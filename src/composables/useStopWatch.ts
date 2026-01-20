import { computed, ref, watch } from 'vue'

export default function useStopWatch() {

  const startTime = ref(0);
  const initialized = ref(false);
  const isRunning = ref(false);

  const timePassed = computed(() => initialized.value ? now.value - startTime.value + accumulatedValue.value : 0);
  const milliseconds = computed(() => timePassed.value % 1000);
  const totalSeconds = computed(() => Math.round(timePassed.value / 1000))
  const seconds = computed(() => totalSeconds.value % 60);
  const minutes = computed(() => Math.floor(totalSeconds.value / 60 % 60))
  const hours = computed(() => Math.floor(totalSeconds.value / 3600 % 24))
  const now = ref(Date.now());
  const accumulatedValue = ref(0);


  const initialize = () => {
    now.value = Date.now();
    initialized.value = true;
    accumulatedValue.value = 0;
  };

  const start = () => {
    if (!initialized.value) {
      initialize();
    }
    isRunning.value = true;
    startTime.value = Date.now();
    const currentTime = Date.now();
    startTime.value = currentTime;
    now.value = currentTime;
  }

  // const pause = () => {
  //   isRunning.value = false;
  //   accumulatedValue.value = accumulatedValue.value + (now.value - startTime.value);
  // }
  const pause = () => {
    isRunning.value = false;
    // Capture current time directly
    const currentTime = Date.now();
    // Add the elapsed time from this session to accumulated value
    accumulatedValue.value = accumulatedValue.value + (currentTime - startTime.value);
    // Reset startTime to current time so next start begins correctly
    startTime.value = currentTime;
    // Update now.value to current time so display is correct
    now.value = currentTime;
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
      if (isRunning.value) {
        now.value = Date.now();
      } else {  
         if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    }, )
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
