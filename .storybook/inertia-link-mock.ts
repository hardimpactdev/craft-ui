import { defineComponent, h } from 'vue';

/**
 * Mock Inertia Link component for Storybook
 * 
 * This allows components that use @inertiajs/vue3 Link to render in Storybook
 * without requiring the full Inertia setup.
 */
const InertiaLink = defineComponent({
  name: 'Link',
  props: {
    href: { type: [String, Object], required: true },
    method: { type: String, default: 'get' },
    data: { type: Object, default: () => ({}) },
    replace: { type: Boolean, default: false },
    preserveState: { type: Boolean, default: false },
    preserveScroll: { type: Boolean, default: false },
    only: { type: Array, default: () => [] },
    except: { type: Array, default: () => [] },
    headers: { type: Object, default: () => ({}) },
    queryStringArrayFormat: { type: String, default: 'brackets' },
    as: { type: String, default: 'a' },
    prefetch: { type: [Boolean, String, Array], default: false },
    cacheFor: { type: [Number, String, Array], default: 0 },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const href = typeof props.href === 'string' 
        ? props.href 
        : (props.href as any)?.url || '#';

      const Tag = props.as === 'button' ? 'button' : 'a';

      return h(
        Tag,
        {
          ...(Tag === 'a' ? { href } : {}),
          ...attrs,
          onClick: (e: Event) => {
            e.preventDefault();
            console.log(`[Mock Inertia Link] ${props.method.toUpperCase()} ${href}`);
          },
        },
        slots.default?.()
      );
    };
  },
});

export default InertiaLink;
