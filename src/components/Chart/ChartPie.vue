<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import Chart from './Chart.vue';

interface Props {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
});
</script>

<template>
  <Chart
    type="pie"
    :data="props.data"
    :options="props.options"
    :class="props.class"
  />
</template>
