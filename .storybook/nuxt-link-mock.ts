import { defineComponent, h } from 'vue';

// Mock NuxtLink component for Storybook (Nuxt UI Link requires this)
const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    to: { type: [String, Object], default: '' },
    href: { type: [String, Object], default: '' },
    external: { type: Boolean, default: false },
    target: { type: String, default: undefined },
    rel: { type: String, default: undefined },
    noRel: { type: Boolean, default: false },
    prefetch: { type: Boolean, default: true },
    noPrefetch: { type: Boolean, default: false },
    activeClass: { type: String, default: 'router-link-active' },
    exactActiveClass: { type: String, default: 'router-link-exact-active' },
    ariaCurrentValue: { type: String, default: 'page' },
    replace: { type: Boolean, default: false },
    custom: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const destination = props.to || props.href || '#';
      const href = typeof destination === 'string' ? destination : (destination as any).path || '#';

      // For custom slot usage (v-slot), provide the expected slot props
      if (props.custom && slots.default) {
        return slots.default({
          href,
          navigate: (e: Event) => {
            e.preventDefault();
            console.log(`[Mock NuxtLink] Navigate to: ${href}`);
          },
          route: { path: href, fullPath: href, href },
          rel: props.rel,
          target: props.target,
          isExternal: props.external || href.startsWith('http'),
          isActive: false,
          isExactActive: false,
        });
      }

      return h(
        'a',
        {
          href,
          target: props.target,
          rel: props.rel,
          ...attrs,
          onClick: (e: Event) => {
            if (!props.external && !href.startsWith('http')) {
              e.preventDefault();
              console.log(`[Mock NuxtLink] Navigate to: ${href}`);
            }
          },
        },
        slots.default?.()
      );
    };
  },
});

export default NuxtLink;
