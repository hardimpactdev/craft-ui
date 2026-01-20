import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateTheme } from '../useAppearance';

describe('updateTheme', () => {
  beforeEach(() => {
    // Reset document state
    document.documentElement.classList.remove('dark');

    // Mock matchMedia
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);
  });

  describe('dark theme', () => {
    it('adds dark class to documentElement', () => {
      updateTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('light theme', () => {
    it('removes dark class from documentElement', () => {
      document.documentElement.classList.add('dark');

      updateTheme('light');

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('does nothing if dark class not present', () => {
      updateTheme('light');

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('system theme', () => {
    it('uses light when system prefers light', () => {
      vi.spyOn(window, 'matchMedia').mockReturnValue({
        matches: false, // prefers-color-scheme: light
        media: '',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as MediaQueryList);

      updateTheme('system');

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('uses dark when system prefers dark', () => {
      vi.spyOn(window, 'matchMedia').mockReturnValue({
        matches: true, // prefers-color-scheme: dark
        media: '',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as MediaQueryList);

      updateTheme('system');

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});
