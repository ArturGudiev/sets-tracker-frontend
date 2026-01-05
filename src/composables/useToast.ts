// export default function useToast() {}

import { ref, nextTick, type Ref } from 'vue'
import { Toast } from 'bootstrap'

export interface ToastMessageData {
  element?: HTMLDivElement | null;
  id?: string;
  title?: string;
  message?: string;
  description?: string;
  type: 'success' | 'warning' | 'info' | 'error';
  color?: string;
  duration?: number;
  delay?: number;
  instance?: Toast | null;
}

const toasts: Ref<ToastMessageData[]> = ref([])

export default function useToast() {
  const duration = 4000;
  const add = (options: ToastMessageData) => {
    const toastId = options.id || Date.now()
    const toastConfig = {
      id: String(toastId),
      title: options.title || 'Уведомление',
      message: options.message || options.description || '',
      duration: options.duration || options.delay || duration,
      open: true,
      element: null,
      instance: null,
      ...options
    }

    toasts.value.push(toastConfig)

    // Создаем и показываем toast
    nextTick(() => { createAndShowToast(toastConfig) })

    return toastConfig
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const toast = toasts.value[index]
      if (toast?.instance) {
        toast.instance.hide()

        setTimeout(() => {
          toasts.value.splice(index, 1)
        }, 200)
      } else {
        toasts.value.splice(index, 1)
      }
    }
  }

  const clear = () => {
    toasts.value.forEach(toast => {
      if (toast.instance) {
        toast.instance.hide()
      }
    })
    setTimeout(() => {
      toasts.value = []
    }, 200)
  }

  const info = (message: string) => {
    add({
      title: 'Информация',
      message,
      type: 'info',
      duration
    });
  };

  const success = (message: string) => {
    add({
      title: 'Успех',
      message,
      type: 'success',
      duration
    });
  };


  const warning = (message: string) => {
    add({
      title: 'Предупреждение',
      message,
      type: 'warning',
      duration
    });
  };

  const error = (message: string, title?: string) => {
    add({
      title: title ?? 'Ошибка',
      message,
      type: 'error',
      duration
    });
  }

  return {
    info,
    success,
    warning,
    error,
    add,
    remove,
    clear,
    toasts
  }
}

function createAndShowToast(toastConfig: ToastMessageData) {
  // Ищем контейнер toast (должен существовать в MainLayout)
  const container = document.querySelector('.toast-container')
  if (!container) {
    console.warn('Toast container not found. Make sure .toast-container exists in your layout.')
    return;
  }

  // Создаем элемент toast
  const toastElement = document.createElement('div')
  toastElement.className = 'toast'
  toastElement.setAttribute('role', 'alert')
  toastElement.setAttribute('aria-live', 'assertive')
  toastElement.setAttribute('aria-atomic', 'true')
  toastElement.id = `toast-${toastConfig.id}`

  const typeClasses = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'text-white' // Кастомный цвет будет применен через inline стили
  } as const;

  const bgClass = typeClasses[toastConfig.type] || typeClasses.info

  // Кастомный цвет фона для типа info
  const headerStyle = toastConfig.type === 'info'
    ? 'background-color: #009dc8;'
    : '';

  toastElement.innerHTML = `
    <div class="toast-header ${bgClass}" style="${headerStyle}">
      <strong class="me-auto">${toastConfig.title}</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${toastConfig.message}
    </div>
  `

  container.appendChild(toastElement)
  toastConfig.element = toastElement

  // Инициализируем Bootstrap Toast
  const toastInstance = new Toast(toastElement, { autohide: true, delay: toastConfig.duration })
  toastConfig.instance = toastInstance

  // Показываем toast
  toastInstance.show()

  // Удаляем элемент из DOM при скрытии
  toastElement.addEventListener('hidden.bs.toast', () => {
    const index = toasts.value.findIndex(t => t.id === toastConfig.id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement)
    }
  })
}
