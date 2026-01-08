<script setup lang="ts">
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'vue-chartjs';
import { cn } from '@/lib/utils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area';

interface Props {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
});

// Liftoff style defaults
const liftoffDefaults: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgb(39, 39, 42)', // zinc-800
      titleFont: {
        weight: '500',
        size: 13,
      },
      bodyFont: {
        size: 13,
      },
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 4,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgb(113, 113, 122)', // zinc-500
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      border: {
        display: false,
      },
      ticks: {
        color: 'rgb(113, 113, 122)', // zinc-500
        font: {
          size: 12,
        },
      },
    },
  },
};

// Defaults for pie/doughnut (no axes)
const pieDefaults: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgb(39, 39, 42)',
      titleFont: {
        weight: '500',
        size: 13,
      },
      bodyFont: {
        size: 13,
      },
      padding: 12,
      cornerRadius: 8,
    },
  },
};

const mergedOptions = computed(() => {
  const isPieType = props.type === 'pie' || props.type === 'doughnut';
  const defaults = isPieType ? pieDefaults : liftoffDefaults;
  return deepMerge(defaults, props.options);
});

// For area chart, we need to add fill to the dataset
const chartData = computed(() => {
  if (props.type === 'area') {
    return {
      ...props.data,
      datasets: props.data.datasets.map((dataset) => ({
        ...dataset,
        fill: true,
      })),
    };
  }
  return props.data;
});

// Deep merge helper
function deepMerge(target: any, source: any): any {
  const output = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

// Map chart type to component
const chartComponent = computed(() => {
  switch (props.type) {
    case 'line':
    case 'area':
      return Line;
    case 'bar':
      return Bar;
    case 'pie':
      return Pie;
    case 'doughnut':
      return Doughnut;
    default:
      return Line;
  }
});
</script>

<template>
  <div data-liftoff-chart :class="cn('relative', props.class)">
    <component
      :is="chartComponent"
      :data="chartData"
      :options="mergedOptions"
    />
  </div>
</template>
