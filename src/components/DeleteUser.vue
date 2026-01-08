<script setup lang="ts">
import Modal from '@nuxt/ui/components/Modal.vue';
import Button from '@nuxt/ui/components/Button.vue';
import Input from '@nuxt/ui/components/Input.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

// Components
import HeadingSmall from '@/components/HeadingSmall.vue';
import InputError from '@/components/InputError.vue';
import type { Method } from '@inertiajs/core';

interface Props {
  route: { url: string; method: Method };
}

const props = defineProps<Props>();

const isOpen = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
  password: '',
});

const deleteUser = (e: Event) => {
  e.preventDefault();

  form.submit(props.route, {
    preserveScroll: true,
    onSuccess: () => closeModal(),
    onError: () => passwordInput.value?.focus(),
    onFinish: () => form.reset(),
  });
};

const closeModal = () => {
  isOpen.value = false;
  form.clearErrors();
  form.reset();
};
</script>

<template>
  <div class="space-y-6">
    <HeadingSmall
      title="Delete account"
      description="Delete your account and all of its resources"
    />
    <div
      class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
    >
      <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
        <p class="font-medium">Warning</p>
        <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
      </div>

      <Modal v-model:open="isOpen">
        <Button color="error" @click="isOpen = true">Delete account</Button>

        <template #content>
          <form class="space-y-6" @submit="deleteUser">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold">Are you sure you want to delete your account?</h3>
              <p class="text-sm text-muted">
                Once your account is deleted, all of its resources and data will also be permanently
                deleted. Please enter your password to confirm you would like to permanently delete
                your account.
              </p>
            </div>

            <div class="grid gap-2">
              <label for="password" class="sr-only">Password</label>
              <Input
                id="password"
                type="password"
                name="password"
                ref="passwordInput"
                v-model="form.password"
                placeholder="Password"
              />
              <InputError :message="form.errors.password" />
            </div>

            <div class="flex justify-end gap-2">
              <Button color="neutral" variant="outline" @click="closeModal">
                Cancel
              </Button>
              <Button type="submit" color="error" :loading="form.processing">
                Delete account
              </Button>
            </div>
          </form>
        </template>
      </Modal>
    </div>
  </div>
</template>
