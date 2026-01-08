<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface RouteDefinition {
  url: string;
  method: string;
}

interface BreadcrumbItem {
  title: string;
  href?: string | RouteDefinition;
}

const props = defineProps<{
  breadcrumbs: BreadcrumbItem[];
}>();

const resolveHref = (href: string | RouteDefinition | undefined): string | undefined => {
  if (!href) return undefined;
  if (typeof href === 'string') return href;
  return href.url;
};

const isLast = (index: number): boolean => {
  return index === props.breadcrumbs.length - 1;
};
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5 text-sm">
      <template v-for="(item, index) in breadcrumbs" :key="item.title">
        <li class="flex items-center gap-1.5">
          <Link
            v-if="!isLast(index) && resolveHref(item.href)"
            :href="resolveHref(item.href)!"
            class="text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ item.title }}
          </Link>
          <span
            v-else
            class="text-foreground font-medium"
            :aria-current="isLast(index) ? 'page' : undefined"
          >
            {{ item.title }}
          </span>
        </li>
        <li v-if="!isLast(index)" aria-hidden="true" class="text-muted-foreground/50">
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </li>
      </template>
    </ol>
  </nav>
</template>
