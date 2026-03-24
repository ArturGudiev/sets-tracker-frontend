<script setup lang="ts">
import StopWatch from '@/components/StopWatch.vue'
import { type ComponentPublicInstance, computed, nextTick, onMounted, ref, watch } from 'vue'
import type { BigSetFull, SetResponse } from '@/types/generated'
import { useToast } from '@/composables'
import { setsService } from '@/services'
import cloneDeep from 'lodash/cloneDeep'
import moment from 'moment'

const props = defineProps<{
  id: number,
  bigSetValue?: BigSetFull
}>();

const bigSet = ref<BigSetFull | null>(null);
const initialBigSet = ref<BigSetFull | null>(null);
const toast = useToast();

onMounted(() => {
  if (props.bigSetValue) {
    bigSet.value = props.bigSetValue;
    initialBigSet.value = cloneDeep(props.bigSetValue)
    return;
  }
  fetchBigSet();
})

watch(() => props.id, () => {
  fetchBigSet();
})

type StopWatchInstance = InstanceType<typeof StopWatch>
const stopWatchRefs = ref<Record<number, StopWatchInstance>>({})

const registerStopWatch = (
  id: number,
  el: Element | ComponentPublicInstance | StopWatchInstance | null,
) => {
  // Function refs can receive DOM elements too; we only store component instances.
  if (el && typeof el === 'object' && 'pause' in el) {
    stopWatchRefs.value[id] = el as StopWatchInstance
    return
  }
  delete stopWatchRefs.value[id]
}


const fetchBigSet = () => {
  if (!props.id) {
    bigSet.value = null;
    initialBigSet.value = null;
    return;
  }
  setsService.getBigSet(props.id).then(res => {
    bigSet.value = res;
    initialBigSet.value = cloneDeep(res);
  })
}

const toMilliseconds = (duration: string | null | undefined): number => {
  if (!duration) return 0;
  return moment.duration(duration).asMilliseconds();
}

const getCurrentStopWatchDuration = (setId: number): string | null => {
  const stopWatch = stopWatchRefs.value[setId];
  if (!stopWatch) return null;
  const seconds = stopWatch.totalSeconds.value;
  const milliseconds = String(stopWatch.milliseconds.value).padStart(3, '0');
  return `PT${seconds}.${milliseconds}S`;
}

const saveSet = (setId: number) => {
  if (!bigSet.value) return;
  const setObj = bigSet.value.sets.find(el => el.id === setId);
  if (setObj && stopWatchRefs.value[setId]) {
    const stopWatch = stopWatchRefs.value[setId];
    stopWatch.pause();
    const v = stopWatch.totalSeconds.value;
    const ms = String(stopWatch.milliseconds.value).padStart(3, '0');
    setObj.duration = `PT${v}.${ms}S`
    setsService.updateSet(setObj).then(updatedSet => {
      if (!bigSet.value || !initialBigSet.value) {
        return;
      }
      const bigSetIndex = bigSet.value.sets.findIndex(el => el.id === setId);
      if (bigSetIndex !== -1) {
        bigSet.value.sets[bigSetIndex] = updatedSet;
      }
      const initialSetIndex = initialBigSet.value.sets.findIndex(el => el.id === setId);
      if (initialSetIndex !== -1) {
        initialBigSet.value.sets[initialSetIndex] = updatedSet;
      }
      toast.success('Set was updated successfully');
      console.log('set update response', updatedSet);
    })
    return;
  }
};

const deleteSet = (setId: number) => {
  setsService.deleteSet(setId).then(() => {
    toast.success('Set was deleted successfully')
    fetchBigSet();
  })
  return;
};

const addSetToBigSet = () => {
  if (!bigSet.value) { return; }
  setsService.addSetToBigSet(bigSet.value.id, bigSet.value.description).then((bigSetUpdated: BigSetFull) => {
    bigSet.value = bigSetUpdated;
  });
};

type EditableField = 'description' | 'comments'
const editor = ref<{
  setId: number
  field: EditableField
  left: number
  top: number
} | null>(null)
const editorValue = ref('')
const editorTextarea = ref<HTMLTextAreaElement | null>(null)

const openEditor = async (
  setId: number,
  field: EditableField,
  value: string,
  event: MouseEvent,
) => {
  editorValue.value = value ?? ''
  editor.value = {
    setId,
    field,
    left: Math.min(event.clientX + 12, window.innerWidth - 380),
    top: Math.min(event.clientY + 12, window.innerHeight - 220),
  }
  await nextTick()
  editorTextarea.value?.focus()
  editorTextarea.value?.select()
}

const closeEditor = () => {
  editor.value = null
}

const saveEditor = async () => {
  if (!bigSet.value || !editor.value) return
  const setObj = bigSet.value.sets.find(s => s.id === editor.value!.setId)
  if (!setObj) return

  const field = editor.value.field
    ; (setObj as any)[field] = editorValue.value

  try {
    await setsService.updateSet(setObj as any)
    toast.success('Set was updated successfully')
    closeEditor()
  } catch {
    toast.error('Failed to update set')
  }
}

const onEditorKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    closeEditor()
    return
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    void saveEditor()
  }
}

const showSaveButton = computed(() => {
  return (setToCheck: SetResponse) => {
    const initialSet: SetResponse | undefined = initialBigSet.value?.sets.find(s => s.id === setToCheck.id);
    if (!initialSet) return false;

    const liveStopWatchDuration = getCurrentStopWatchDuration(setToCheck.id);
    const currentDurationMilliseconds = toMilliseconds(liveStopWatchDuration ?? setToCheck.duration);
    const initialDurationMilliseconds = toMilliseconds(initialSet.duration);

    return initialSet.description !== setToCheck.description ||
      initialSet.comments !== setToCheck.comments ||
      initialDurationMilliseconds !== currentDurationMilliseconds;
  }
});

</script>

<template>
  Big Set ID: {{ props?.id }}

  <div v-if="bigSet" class="mt-3">
    <div class="mb-2">
      <strong>Title Big set:</strong> {{ bigSet.description }}
    </div>

    <div class="table-responsive">
      <table class="table table-sm table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col">Comments</th>
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="set in bigSet.sets" :key="set.id" style="height: 3rem !important;">
            <td class="text-muted">{{ set.id }}</td>
            <td class="editable-cell"
              @click="(e) => openEditor(set.id, 'description', set.description ?? '', e as MouseEvent)">
              {{ set.description }}
            </td>
            <td style="cursor: pointer;"
              @click="(e) => openEditor(set.id, 'comments', set.comments ?? '', e as MouseEvent)">{{ set.comments }}
            </td>
            <td>
              <StopWatch :key="`${set.id}-${set.duration ?? ''}`" :initial-duration="set.duration"
                :ref="(el) => registerStopWatch(set.id, el)" />
            </td>
            <td>{{ set.date }}</td>
            <td>
              <button v-if="showSaveButton(set)" type="button" class="btn btn-primary mt-2" @click="saveSet(set.id)">
                <i class="bi bi-floppy"></i> Save
              </button>

              <button type="button" class="btn btn-outline-danger mt-2 ms-4" @click="deleteSet(set.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>

          <tr v-if="!bigSet.sets?.length">
            <td colspan="5" class="text-center text-muted">No sets in this big set</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>Nothing is displayed here</div>

  <teleport to="body">
    <div v-if="editor" class="floating-editor-backdrop" @mousedown.self="closeEditor">
      <div class="floating-editor" :style="{ left: `${editor.left}px`, top: `${editor.top}px` }" role="dialog"
        aria-label="Edit text">
        <textarea ref="editorTextarea" v-model="editorValue" class="form-control" rows="5" @keydown="onEditorKeydown" />
        <div class="d-flex justify-content-end gap-2 mt-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="closeEditor">Cancel</button>
          <button type="button" class="btn btn-sm btn-primary" @click="saveEditor">Save</button>
        </div>
        <div class="floating-editor-hint text-muted mt-1">
          Ctrl+Enter to save · Esc to cancel
        </div>
      </div>
    </div>
  </teleport>

  <button type="button" class="btn btn-primary mt-2" @click="addSetToBigSet">
    <i class="bi bi-plus-lg"></i> Add set
  </button>




</template>

<style scoped>
.set-row {
  height: 1.5rem;
}

.editable-cell {
  cursor: pointer;
}

.floating-editor-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
}

.floating-editor {
  position: fixed;
  width: 360px;
  background: var(--bs-body-bg, #fff);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.floating-editor textarea {
  resize: vertical;
}

.floating-editor-hint {
  font-size: 12px;
}
</style>
