import { ref, type Ref, type InjectionKey } from 'vue';

export const toastMaxInjectionKey: InjectionKey<Ref<number | undefined>> = Symbol('toastMax');

export interface Toast {
  id: string | number;
  title?: string;
  description?: string;
  icon?: string;
  avatar?: object;
  color?: 'primary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  close?: boolean;
  duration?: number;
  actions?: Array<{ label: string; click?: () => void; [key: string]: unknown }>;
  onClick?: (toast: Toast) => void;
}

// Global state - singleton pattern for Vue without Nuxt's useState
const toasts = ref<Toast[]>([]);

let toastId = 0;

function generateId(): number {
  return ++toastId;
}

export function useToast() {
  function add(toast: Partial<Toast>): Toast {
    const id = toast.id ?? generateId();
    const newToast: Toast = {
      ...toast,
      id,
      close: toast.close ?? true,
    };
    toasts.value.push(newToast);
    return newToast;
  }

  function update(id: string | number, toast: Omit<Partial<Toast>, 'id'>): void {
    const index = toasts.value.findIndex((t) => t.id === id);
    const existing = toasts.value[index];
    if (index !== -1 && existing) {
      toasts.value[index] = { ...existing, ...toast, id: existing.id };
    }
  }

  function remove(id: string | number): void {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }

  function clear(): void {
    toasts.value = [];
  }

  return {
    toasts,
    add,
    update,
    remove,
    clear,
  };
}
