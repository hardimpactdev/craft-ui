<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineOptions({
    inheritAttrs: false,
});

defineProps<{
    collapsed?: boolean;
}>();
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <AppLogoIcon class="size-5 fill-current text-white dark:text-black" />
        </div>
        <span v-if="!collapsed" class="truncate text-sm font-semibold">Laravel Starter Kit</span>
    </div>
</template>
