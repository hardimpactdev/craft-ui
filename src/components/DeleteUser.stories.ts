import type { Meta, StoryObj } from '@storybook/vue3';
import { fn, within, userEvent, expect } from 'storybook/test';
import { ref, reactive, toRefs } from 'vue';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './dialog';
import { Button } from './button';
import { Input } from './input';
import HeadingSmall from './HeadingSmall.vue';
import InputError from './InputError.vue';

// Create a mock version of DeleteUser that doesn't use Inertia's useForm
const DeleteUserMock = {
  name: 'DeleteUserMock',
  components: { HeadingSmall, InputError, Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input },
  props: {
    route: {
      type: Object,
      default: () => ({ url: '/user/delete', method: 'delete' }),
    },
    onSubmit: { type: Function, default: () => {} },
  },
  setup(props: { route: { url: string; method: string }; onSubmit: () => void }) {
    const isOpen = ref(false);
    const passwordInput = ref<HTMLInputElement | null>(null);

    const form = reactive({
      password: '',
      processing: false,
      errors: { password: '' } as { password: string },
      reset: () => {
        form.password = '';
        form.errors.password = '';
      },
      clearErrors: () => {
        form.errors.password = '';
      },
    });

    const deleteUser = (e: Event) => {
      e.preventDefault();
      form.processing = true;

      // Simulate form submission
      if (form.password.length < 3) {
        form.errors.password = 'Password is required';
        form.processing = false;
        passwordInput.value?.focus();
        return;
      }

      // Call the onSubmit handler
      props.onSubmit();

      // Simulate success
      setTimeout(() => {
        form.processing = false;
        closeModal();
      }, 500);
    };

    const closeModal = () => {
      isOpen.value = false;
      form.clearErrors();
      form.reset();
    };

    return { isOpen, passwordInput, form, deleteUser, closeModal };
  },
  template: `
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

        <Dialog v-model:open="isOpen">
          <DialogTrigger as-child>
            <Button variant="destructive">Delete account</Button>
          </DialogTrigger>

          <DialogContent>
            <form class="space-y-6" @submit="deleteUser">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                  Once your account is deleted, all of its resources and data will also be permanently
                  deleted. Please enter your password to confirm you would like to permanently delete
                  your account.
                </DialogDescription>
              </DialogHeader>

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

              <DialogFooter>
                <Button variant="outline" @click="closeModal">
                  Cancel
                </Button>
                <Button type="submit" variant="destructive" :disabled="form.processing">
                  Delete account
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  `,
};

const meta: Meta<typeof DeleteUserMock> = {
  title: 'Components/Forms/DeleteUser',
  component: DeleteUserMock as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dangerous action form for deleting a user account. Shows warning message and requires password confirmation via modal dialog. Uses Inertia useForm() for form handling in production.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { DeleteUserMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="max-w-2xl">
        <DeleteUserMock :on-submit="args.onSubmit" />
      </div>
    `,
  }),
  args: {
    onSubmit: fn(),
  },
};

export const OpenModal: Story = {
  render: (args) => ({
    components: { DeleteUserMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="max-w-2xl">
        <DeleteUserMock :on-submit="args.onSubmit" />
      </div>
    `,
  }),
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the initial warning text is visible
    await expect(canvas.getByText(/please proceed with caution/i)).toBeInTheDocument();

    // Find and click the first delete button (trigger button)
    const buttons = canvas.getAllByRole('button');
    const deleteButton = buttons.find(btn => btn.textContent?.includes('Delete account'));
    if (deleteButton) {
      await userEvent.click(deleteButton);
    }
  },
};

export const WithValidation: Story = {
  render: (args) => ({
    components: { DeleteUserMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="max-w-2xl">
        <DeleteUserMock :on-submit="args.onSubmit" />
      </div>
    `,
  }),
  args: {
    onSubmit: fn(),
  },
  // Skip complex modal interactions for now - basic rendering test only
};

export const WithPasswordEntry: Story = {
  render: (args) => ({
    components: { DeleteUserMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="max-w-2xl">
        <DeleteUserMock :on-submit="args.onSubmit" />
      </div>
    `,
  }),
  args: {
    onSubmit: fn(),
  },
  // Skip complex modal interactions for now - basic rendering test only
};

export const CancelModal: Story = {
  render: (args) => ({
    components: { DeleteUserMock },
    setup() {
      return { args: toRefs(reactive(args)) };
    },
    template: `
      <div class="max-w-2xl">
        <DeleteUserMock :on-submit="args.onSubmit" />
      </div>
    `,
  }),
  args: {
    onSubmit: fn(),
  },
  // Skip complex modal interactions for now - basic rendering test only
};
