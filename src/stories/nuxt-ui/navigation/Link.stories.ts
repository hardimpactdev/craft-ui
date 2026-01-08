import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Link from '@nuxt/ui/components/Link.vue';

const meta: Meta<typeof Link> = {
  title: 'Nuxt UI/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: 'text',
      description: 'Navigation destination',
    },
    external: {
      control: 'boolean',
      description: 'Force external link behavior',
    },
    active: {
      control: 'boolean',
      description: 'Force active state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Browser context for link',
    },
    activeClass: {
      control: 'text',
      description: 'Class applied when link is active',
    },
    inactiveClass: {
      control: 'text',
      description: 'Class applied when link is inactive',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => ({
    components: { Link },
    render() {
      return h('div', { class: 'p-4 space-y-4' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Basic link'),
          h(Link, {
            to: '#',
          }, () => 'Click me'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Link as button (no to prop)'),
          h(Link, {
            onClick: () => alert('Clicked!'),
          }, () => 'Button link'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Disabled link'),
          h(Link, {
            to: '#',
            disabled: true,
          }, () => 'Disabled'),
        ]),
      ]);
    },
  }),
};

export const External: Story = {
  render: () => ({
    components: { Link },
    render() {
      return h('div', { class: 'p-4 space-y-4' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'External link (opens in new tab)'),
          h(Link, {
            to: 'https://ui.nuxt.com',
            target: '_blank',
            external: true,
          }, () => 'Nuxt UI Documentation'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'External link with rel attribute'),
          h(Link, {
            to: 'https://vuejs.org',
            target: '_blank',
            external: true,
            rel: 'noopener noreferrer',
          }, () => 'Vue.js Website'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Multiple external links'),
          h('div', { class: 'flex gap-4' }, [
            h(Link, {
              to: 'https://github.com',
              target: '_blank',
              external: true,
            }, () => 'GitHub'),
            h(Link, {
              to: 'https://twitter.com',
              target: '_blank',
              external: true,
            }, () => 'Twitter'),
            h(Link, {
              to: 'https://linkedin.com',
              target: '_blank',
              external: true,
            }, () => 'LinkedIn'),
          ]),
        ]),
      ]);
    },
  }),
};

export const WithIcon: Story = {
  render: () => ({
    components: { Link },
    render() {
      return h('div', { class: 'p-4 space-y-4' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Link with leading icon'),
          h(Link, {
            to: '#',
            class: 'inline-flex items-center gap-1',
          }, () => [
            h('span', { class: 'i-lucide-home w-4 h-4' }),
            'Home',
          ]),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Link with trailing icon'),
          h(Link, {
            to: '#',
            class: 'inline-flex items-center gap-1',
          }, () => [
            'Settings',
            h('span', { class: 'i-lucide-settings w-4 h-4' }),
          ]),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'External link with icon'),
          h(Link, {
            to: 'https://github.com',
            target: '_blank',
            external: true,
            class: 'inline-flex items-center gap-1',
          }, () => [
            'View on GitHub',
            h('span', { class: 'i-lucide-external-link w-4 h-4' }),
          ]),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Icon-only link'),
          h('div', { class: 'flex gap-2' }, [
            h(Link, {
              to: '#',
              class: 'p-2 hover:bg-muted rounded',
              'aria-label': 'Home',
            }, () => h('span', { class: 'i-lucide-home w-5 h-5' })),
            h(Link, {
              to: '#',
              class: 'p-2 hover:bg-muted rounded',
              'aria-label': 'Search',
            }, () => h('span', { class: 'i-lucide-search w-5 h-5' })),
            h(Link, {
              to: '#',
              class: 'p-2 hover:bg-muted rounded',
              'aria-label': 'Notifications',
            }, () => h('span', { class: 'i-lucide-bell w-5 h-5' })),
          ]),
        ]),
      ]);
    },
  }),
};

export const Active: Story = {
  render: () => ({
    components: { Link },
    render() {
      return h('div', { class: 'p-4 space-y-4' }, [
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Active state forced on'),
          h(Link, {
            to: '#',
            active: true,
          }, () => 'Active Link'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Inactive link (default)'),
          h(Link, {
            to: '#',
            active: false,
          }, () => 'Inactive Link'),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Custom active/inactive classes'),
          h('div', { class: 'flex gap-4' }, [
            h(Link, {
              to: '#',
              active: true,
              activeClass: 'font-bold text-green-600 underline',
            }, () => 'Custom Active'),
            h(Link, {
              to: '#',
              active: false,
              inactiveClass: 'text-gray-400',
            }, () => 'Custom Inactive'),
          ]),
        ]),
        h('div', [
          h('p', { class: 'text-sm text-muted mb-2' }, 'Navigation menu example'),
          h('nav', { class: 'flex gap-4' }, [
            h(Link, {
              to: '#',
              active: true,
              activeClass: 'font-semibold border-b-2 border-primary pb-1',
              inactiveClass: 'text-muted pb-1',
            }, () => 'Dashboard'),
            h(Link, {
              to: '#',
              active: false,
              activeClass: 'font-semibold border-b-2 border-primary pb-1',
              inactiveClass: 'text-muted pb-1',
            }, () => 'Projects'),
            h(Link, {
              to: '#',
              active: false,
              activeClass: 'font-semibold border-b-2 border-primary pb-1',
              inactiveClass: 'text-muted pb-1',
            }, () => 'Settings'),
          ]),
        ]),
      ]);
    },
  }),
};
