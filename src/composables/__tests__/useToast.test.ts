import { describe, it, expect, beforeEach } from 'vitest';
import { useToast } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    // Reset global state before each test
    window.__CRAFT_TOASTS_DATA__ = [];
    window.__CRAFT_TOAST_ID__ = 0;
  });

  describe('initial state', () => {
    it('starts with empty toasts array', () => {
      const { toasts } = useToast();
      expect(toasts.value).toEqual([]);
    });
  });

  describe('add', () => {
    it('adds a toast with auto-generated id', () => {
      const { add } = useToast();

      const toast = add({ title: 'Test Toast' });

      expect(toast.id).toBe(1);
      expect(toast.title).toBe('Test Toast');
    });

    it('adds a toast with custom id', () => {
      const { add } = useToast();

      const toast = add({ id: 'custom-id', title: 'Custom' });

      expect(toast.id).toBe('custom-id');
    });

    it('defaults close to true', () => {
      const { add } = useToast();

      const toast = add({ title: 'Test' });

      expect(toast.close).toBe(true);
    });

    it('respects explicit close: false', () => {
      const { add } = useToast();

      const toast = add({ title: 'Test', close: false });

      expect(toast.close).toBe(false);
    });

    it('increments id for each new toast', () => {
      const { add } = useToast();

      const toast1 = add({ title: 'First' });
      const toast2 = add({ title: 'Second' });
      const toast3 = add({ title: 'Third' });

      expect(toast1.id).toBe(1);
      expect(toast2.id).toBe(2);
      expect(toast3.id).toBe(3);
    });

    it('stores toast with all properties', () => {
      const { add } = useToast();

      add({
        title: 'Test',
        description: 'A description',
        color: 'success',
        duration: 5000,
      });

      expect(window.__CRAFT_TOASTS_DATA__![0]).toMatchObject({
        title: 'Test',
        description: 'A description',
        color: 'success',
        duration: 5000,
      });
    });
  });

  describe('remove', () => {
    it('removes a toast by id', () => {
      const { add, remove } = useToast();

      add({ id: 'toast-1', title: 'First' });
      add({ id: 'toast-2', title: 'Second' });

      remove('toast-1');

      expect(window.__CRAFT_TOASTS_DATA__).toHaveLength(1);
      expect(window.__CRAFT_TOASTS_DATA__![0]!.id).toBe('toast-2');
    });

    it('does nothing when removing non-existent id', () => {
      const { add, remove } = useToast();

      add({ id: 'toast-1', title: 'First' });

      remove('non-existent');

      expect(window.__CRAFT_TOASTS_DATA__).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('updates an existing toast', () => {
      const { add, update } = useToast();

      add({ id: 'toast-1', title: 'Original', color: 'info' });

      update('toast-1', { title: 'Updated', color: 'success' });

      expect(window.__CRAFT_TOASTS_DATA__![0]).toMatchObject({
        id: 'toast-1',
        title: 'Updated',
        color: 'success',
      });
    });

    it('preserves id when updating', () => {
      const { add, update } = useToast();

      add({ id: 'my-toast', title: 'Original' });

      // Even if someone tries to change id via update, it should be preserved
      update('my-toast', { title: 'Updated' });

      expect(window.__CRAFT_TOASTS_DATA__![0]!.id).toBe('my-toast');
    });

    it('does nothing when updating non-existent toast', () => {
      const { add, update } = useToast();

      add({ id: 'toast-1', title: 'Original' });

      update('non-existent', { title: 'Updated' });

      expect(window.__CRAFT_TOASTS_DATA__![0]!.title).toBe('Original');
    });
  });

  describe('clear', () => {
    it('removes all toasts', () => {
      const { add, clear } = useToast();

      add({ title: 'First' });
      add({ title: 'Second' });
      add({ title: 'Third' });

      expect(window.__CRAFT_TOASTS_DATA__).toHaveLength(3);

      clear();

      expect(window.__CRAFT_TOASTS_DATA__).toHaveLength(0);
    });

    it('works when no toasts exist', () => {
      const { clear } = useToast();

      expect(() => clear()).not.toThrow();
      expect(window.__CRAFT_TOASTS_DATA__).toHaveLength(0);
    });
  });
});
