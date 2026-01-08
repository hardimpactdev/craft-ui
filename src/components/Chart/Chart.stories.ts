import type { Meta, StoryObj } from '@storybook/vue3';
import Chart from './Chart.vue';
import ChartLine from './ChartLine.vue';
import ChartBar from './ChartBar.vue';
import ChartArea from './ChartArea.vue';
import ChartPie from './ChartPie.vue';
import ChartDoughnut from './ChartDoughnut.vue';

const meta: Meta<typeof Chart> = {
  title: 'Components/Data/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Chart components powered by Chart.js. Supports line, bar, area, pie, and doughnut charts with Liftoff-style defaults.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'area', 'pie', 'doughnut'],
      description: 'Chart type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30, 40, 35, 50, 55, 60],
      borderColor: 'rgb(39, 39, 42)', // zinc-800
      backgroundColor: 'rgba(39, 39, 42, 0.1)',
      tension: 0.3,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgb(39, 39, 42)', // zinc-800
      borderRadius: 4,
    },
  ],
};

const areaData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Users',
      data: [1200, 1900, 2300, 2800, 3200, 4100],
      borderColor: 'rgb(34, 197, 94)', // green-500
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

const pieData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [55, 35, 10],
      backgroundColor: [
        'rgb(39, 39, 42)',   // zinc-800
        'rgb(113, 113, 122)', // zinc-500
        'rgb(212, 212, 216)', // zinc-300
      ],
      borderWidth: 0,
    },
  ],
};

const doughnutData = {
  labels: ['Completed', 'In Progress', 'Pending'],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        'rgb(34, 197, 94)',   // green-500
        'rgb(59, 130, 246)',  // blue-500
        'rgb(212, 212, 216)', // zinc-300
      ],
      borderWidth: 0,
      cutout: '70%',
    },
  ],
};

export const Line: Story = {
  render: () => ({
    components: { ChartLine },
    setup() {
      return { data: lineData };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Revenue Over Time</h3>
        <ChartLine :data="data" class="h-64" />
      </div>
    `,
  }),
};

export const Bar: Story = {
  render: () => ({
    components: { ChartBar },
    setup() {
      return { data: barData };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Weekly Sales</h3>
        <ChartBar :data="data" class="h-64" />
      </div>
    `,
  }),
};

export const Area: Story = {
  render: () => ({
    components: { ChartArea },
    setup() {
      return { data: areaData };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">User Growth</h3>
        <ChartArea :data="data" class="h-64" />
      </div>
    `,
  }),
};

export const Pie: Story = {
  render: () => ({
    components: { ChartPie },
    setup() {
      return { data: pieData };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Traffic by Device</h3>
        <div class="flex items-center gap-8">
          <ChartPie :data="data" class="h-48 w-48" />
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-zinc-800"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Desktop (55%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-zinc-500"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Mobile (35%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-zinc-300"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Tablet (10%)</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Doughnut: Story = {
  render: () => ({
    components: { ChartDoughnut },
    setup() {
      return { data: doughnutData };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Task Status</h3>
        <div class="flex items-center gap-8">
          <div class="relative">
            <ChartDoughnut :data="data" class="h-48 w-48" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-zinc-900 dark:text-white">65%</div>
                <div class="text-xs text-zinc-500">Complete</div>
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Completed (65%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">In Progress (25%)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-zinc-300"></div>
              <span class="text-sm text-zinc-600 dark:text-zinc-400">Pending (10%)</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const MultiLine: Story = {
  render: () => ({
    components: { ChartLine },
    setup() {
      const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'This Year',
            data: [30, 40, 35, 50, 55, 60],
            borderColor: 'rgb(39, 39, 42)',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0,
          },
          {
            label: 'Last Year',
            data: [25, 35, 30, 40, 45, 50],
            borderColor: 'rgb(212, 212, 216)',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 0,
            borderDash: [5, 5],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            align: 'end' as const,
            labels: {
              boxWidth: 12,
              boxHeight: 2,
              usePointStyle: false,
              font: { size: 12 },
            },
          },
        },
      };
      return { data, options };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Year over Year Comparison</h3>
        <ChartLine :data="data" :options="options" class="h-64" />
      </div>
    `,
  }),
};

export const StackedBar: Story = {
  render: () => ({
    components: { ChartBar },
    setup() {
      const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Product A',
            data: [40, 50, 35, 45],
            backgroundColor: 'rgb(39, 39, 42)',
            borderRadius: 4,
          },
          {
            label: 'Product B',
            data: [30, 25, 40, 35],
            backgroundColor: 'rgb(113, 113, 122)',
            borderRadius: 4,
          },
          {
            label: 'Product C',
            data: [20, 15, 25, 20],
            backgroundColor: 'rgb(212, 212, 216)',
            borderRadius: 4,
          },
        ],
      };
      const options = {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            align: 'end' as const,
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              usePointStyle: false,
              font: { size: 12 },
            },
          },
        },
      };
      return { data, options };
    },
    template: `
      <div class="p-8 bg-white dark:bg-zinc-900 rounded-lg">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Quarterly Sales by Product</h3>
        <ChartBar :data="data" :options="options" class="h-64" />
      </div>
    `,
  }),
};
