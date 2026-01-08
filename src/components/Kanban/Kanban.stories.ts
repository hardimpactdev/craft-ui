import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { within, userEvent, expect, fn } from 'storybook/test';
import Kanban from './Kanban.vue';
import KanbanColumn from './KanbanColumn.vue';
import KanbanColumnHeader from './KanbanColumnHeader.vue';
import KanbanColumnCards from './KanbanColumnCards.vue';
import KanbanColumnFooter from './KanbanColumnFooter.vue';
import KanbanCard from './KanbanCard.vue';

const meta: Meta<typeof Kanban> = {
  title: 'Components/Data/Kanban',
  component: Kanban,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A drag-and-drop Kanban board for organizing tasks into columns. Supports card reordering within columns and moving cards between columns.',
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['gap-2', 'gap-4', 'gap-6', 'gap-8'],
      description: 'Gap between columns (Tailwind spacing)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data with more items for thorough drag-drop testing
const createSampleData = () => ({
  todo: [
    { id: 1, title: 'Research competitors', labels: ['Research'], priority: 'medium' },
    { id: 2, title: 'Create wireframes', labels: ['Design'], priority: 'high' },
    { id: 3, title: 'Write user stories', labels: ['Planning'], priority: 'low' },
    { id: 4, title: 'Define API endpoints', labels: ['Backend'], priority: 'high' },
    { id: 5, title: 'Set up CI/CD pipeline', labels: ['DevOps'], priority: 'medium' },
  ],
  inProgress: [
    { id: 6, title: 'Implement authentication', labels: ['Backend'], priority: 'high' },
    { id: 7, title: 'Design dashboard UI', labels: ['Design', 'UI'], priority: 'medium' },
    { id: 8, title: 'Build user profile page', labels: ['Frontend'], priority: 'medium' },
  ],
  review: [
    { id: 9, title: 'Code review: Auth module', labels: ['Review'], priority: 'high' },
    { id: 10, title: 'Test payment integration', labels: ['QA'], priority: 'high' },
  ],
  done: [
    { id: 11, title: 'Set up project', labels: ['DevOps'], priority: 'low' },
    { id: 12, title: 'Define requirements', labels: ['Planning'], priority: 'medium' },
    { id: 13, title: 'Create database schema', labels: ['Backend'], priority: 'high' },
    { id: 14, title: 'Design system setup', labels: ['Design'], priority: 'medium' },
  ],
});

export const Default: Story = {
  render: (args) => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanColumnFooter,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      return { args, data };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[600px]">
        <Kanban v-bind="args">
          <KanbanColumn id="todo">
            <KanbanColumnHeader
              heading="To Do"
              :count="data.todo.length"
            />
            <KanbanColumnCards
              v-model="data.todo"
              group="kanban"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="in-progress">
            <KanbanColumnHeader
              heading="In Progress"
              :count="data.inProgress.length"
            />
            <KanbanColumnCards
              v-model="data.inProgress"
              group="kanban"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="review">
            <KanbanColumnHeader
              heading="Review"
              :count="data.review.length"
            />
            <KanbanColumnCards
              v-model="data.review"
              group="kanban"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="done">
            <KanbanColumnHeader
              heading="Done"
              :count="data.done.length"
            />
            <KanbanColumnCards
              v-model="data.done"
              group="kanban"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
  args: {
    gap: 'gap-4',
  },
};

export const DragDropTest: Story = {
  render: () => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      const eventLog = ref<string[]>([]);

      const logEvent = (type: string, detail: string) => {
        const timestamp = new Date().toLocaleTimeString();
        eventLog.value.unshift(`[${timestamp}] ${type}: ${detail}`);
        if (eventLog.value.length > 10) {
          eventLog.value.pop();
        }
      };

      const handleCardAdd = (columnId: string, event: any) => {
        logEvent('card-add', `Card "${event.item.title}" added to ${columnId} at index ${event.newIndex}`);
      };

      const handleCardRemove = (columnId: string, event: any) => {
        logEvent('card-remove', `Card removed from ${columnId} at index ${event.oldIndex}`);
      };

      const handleCardMove = (columnId: string, event: any) => {
        logEvent('card-move', `Card "${event.item.title}" moved in ${columnId} from ${event.oldIndex} to ${event.newIndex}`);
      };

      return { data, eventLog, handleCardAdd, handleCardRemove, handleCardMove };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[700px]">
        <div class="mb-4 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <h3 class="font-medium text-zinc-900 dark:text-white mb-2">Event Log</h3>
          <div class="text-xs font-mono space-y-1 max-h-32 overflow-y-auto">
            <p v-if="!eventLog.length" class="text-zinc-400 italic">Drag cards between columns to see events...</p>
            <p v-for="(log, i) in eventLog" :key="i" class="text-zinc-600 dark:text-zinc-300">{{ log }}</p>
          </div>
        </div>

        <Kanban gap="gap-4">
          <KanbanColumn id="backlog">
            <KanbanColumnHeader heading="Backlog" :count="data.todo.length" />
            <KanbanColumnCards
              v-model="data.todo"
              group="kanban"
              @card-add="(e) => handleCardAdd('Backlog', e)"
              @card-remove="(e) => handleCardRemove('Backlog', e)"
              @card-move="(e) => handleCardMove('Backlog', e)"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="in-progress">
            <KanbanColumnHeader heading="In Progress" :count="data.inProgress.length" />
            <KanbanColumnCards
              v-model="data.inProgress"
              group="kanban"
              @card-add="(e) => handleCardAdd('In Progress', e)"
              @card-remove="(e) => handleCardRemove('In Progress', e)"
              @card-move="(e) => handleCardMove('In Progress', e)"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="review">
            <KanbanColumnHeader heading="Review" :count="data.review.length" />
            <KanbanColumnCards
              v-model="data.review"
              group="kanban"
              @card-add="(e) => handleCardAdd('Review', e)"
              @card-remove="(e) => handleCardRemove('Review', e)"
              @card-move="(e) => handleCardMove('Review', e)"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="done">
            <KanbanColumnHeader heading="Done" :count="data.done.length" />
            <KanbanColumnCards
              v-model="data.done"
              group="kanban"
              @card-add="(e) => handleCardAdd('Done', e)"
              @card-remove="(e) => handleCardRemove('Done', e)"
              @card-move="(e) => handleCardMove('Done', e)"
            >
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: (args) => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanColumnFooter,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      const addCard = (column: string) => {
        const newId = Date.now();
        if (column === 'todo') {
          data.value.todo.push({ id: newId, title: 'New task', labels: [] });
        }
      };
      return { args, data, addCard };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[500px]">
        <Kanban v-bind="args">
          <KanbanColumn id="todo">
            <KanbanColumnHeader heading="To Do" :count="data.todo.length">
              <template #actions>
                <Button size="xs" variant="ghost" icon="i-lucide-plus" aria-label="Add card" @click="addCard('todo')" />
                <Button size="xs" variant="ghost" icon="i-lucide-more-horizontal" aria-label="More options" />
              </template>
            </KanbanColumnHeader>
            <KanbanColumnCards v-model="data.todo" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
            <KanbanColumnFooter>
              <Button size="sm" variant="ghost" class="w-full justify-start" @click="addCard('todo')">
                <Icon name="i-lucide-plus" class="h-4 w-4 mr-2" />
                Add card
              </Button>
            </KanbanColumnFooter>
          </KanbanColumn>

          <KanbanColumn id="in-progress">
            <KanbanColumnHeader heading="In Progress" :count="data.inProgress.length" />
            <KanbanColumnCards v-model="data.inProgress" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="done">
            <KanbanColumnHeader heading="Done" :count="data.done.length" />
            <KanbanColumnCards v-model="data.done" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
};

export const ClickableCards: Story = {
  render: (args) => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      const selectedCard = ref<number | null>(null);
      const handleCardClick = (card: any) => {
        selectedCard.value = card.id;
      };
      return { args, data, selectedCard, handleCardClick };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[500px]">
        <p class="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Selected card ID: {{ selectedCard ?? 'None' }}
        </p>
        <Kanban v-bind="args">
          <KanbanColumn id="todo">
            <KanbanColumnHeader heading="To Do" :count="data.todo.length" />
            <KanbanColumnCards v-model="data.todo" group="kanban">
              <template #card="{ card }">
                <KanbanCard
                  :id="card.id"
                  :heading="card.title"
                  as="button"
                  @click="handleCardClick(card)"
                  :class="selectedCard === card.id ? 'ring-2 ring-blue-500' : ''"
                />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="in-progress">
            <KanbanColumnHeader heading="In Progress" :count="data.inProgress.length" />
            <KanbanColumnCards v-model="data.inProgress" group="kanban">
              <template #card="{ card }">
                <KanbanCard
                  :id="card.id"
                  :heading="card.title"
                  as="button"
                  @click="handleCardClick(card)"
                  :class="selectedCard === card.id ? 'ring-2 ring-blue-500' : ''"
                />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="done">
            <KanbanColumnHeader heading="Done" :count="data.done.length" />
            <KanbanColumnCards v-model="data.done" group="kanban">
              <template #card="{ card }">
                <KanbanCard
                  :id="card.id"
                  :heading="card.title"
                  as="button"
                  @click="handleCardClick(card)"
                  :class="selectedCard === card.id ? 'ring-2 ring-blue-500' : ''"
                />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
};

export const RichCards: Story = {
  render: () => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanCard,
    },
    setup() {
      const tasks = ref([
        {
          id: 1,
          title: 'Redesign landing page',
          description: 'Update the hero section and improve conversion rate',
          priority: 'high',
          assignee: 'Alice',
          dueDate: '2024-01-15',
        },
        {
          id: 2,
          title: 'Fix mobile navigation',
          description: 'The hamburger menu is not closing properly on iOS',
          priority: 'medium',
          assignee: 'Bob',
          dueDate: '2024-01-12',
        },
      ]);
      return { tasks };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[500px]">
        <Kanban>
          <KanbanColumn id="tasks">
            <KanbanColumnHeader heading="Tasks" :count="tasks.length" />
            <KanbanColumnCards v-model="tasks" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id">
                  <template #header>
                    <Badge
                      :label="card.priority"
                      :color="card.priority === 'high' ? 'primary' : 'secondary'"
                      size="sm"
                    />
                  </template>
                  <template #heading>{{ card.title }}</template>
                  <p class="text-zinc-500 dark:text-zinc-400">{{ card.description }}</p>
                  <template #footer>
                    <Avatar :alt="card.assignee" size="xs" />
                    <span class="text-xs text-zinc-500">{{ card.dueDate }}</span>
                  </template>
                </KanbanCard>
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
};

export const CardClickInteraction: Story = {
  render: () => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      const selectedCard = ref<number | null>(null);
      const clickCount = ref(0);
      const handleCardClick = (card: any) => {
        selectedCard.value = card.id;
        clickCount.value++;
      };
      return { data, selectedCard, clickCount, handleCardClick };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[500px]">
        <div class="mb-4 flex gap-4">
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Selected card ID: <span data-testid="selected-card">{{ selectedCard ?? 'None' }}</span>
          </p>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            Click count: <span data-testid="click-count">{{ clickCount }}</span>
          </p>
        </div>
        <Kanban>
          <KanbanColumn id="todo">
            <KanbanColumnHeader heading="To Do" :count="data.todo.length" />
            <KanbanColumnCards v-model="data.todo" group="kanban">
              <template #card="{ card }">
                <KanbanCard
                  :id="card.id"
                  :heading="card.title"
                  as="button"
                  :data-testid="'card-' + card.id"
                  @click="handleCardClick(card)"
                  :class="selectedCard === card.id ? 'ring-2 ring-blue-500' : ''"
                />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial state
    await expect(canvas.getByTestId('selected-card')).toHaveTextContent('None');
    await expect(canvas.getByTestId('click-count')).toHaveTextContent('0');

    // Find and click the first card
    const firstCard = canvas.getByTestId('card-1');
    await userEvent.click(firstCard);

    // Verify the card was selected
    await expect(canvas.getByTestId('selected-card')).toHaveTextContent('1');
    await expect(canvas.getByTestId('click-count')).toHaveTextContent('1');

    // Click another card
    const secondCard = canvas.getByTestId('card-2');
    await userEvent.click(secondCard);

    // Verify the second card is now selected
    await expect(canvas.getByTestId('selected-card')).toHaveTextContent('2');
    await expect(canvas.getByTestId('click-count')).toHaveTextContent('2');
  },
};

export const ColumnHeaderInteraction: Story = {
  render: () => ({
    components: {
      Kanban,
      KanbanColumn,
      KanbanColumnHeader,
      KanbanColumnCards,
      KanbanCard,
    },
    setup() {
      const data = ref(createSampleData());
      return { data };
    },
    template: `
      <div class="p-4 bg-zinc-50 dark:bg-zinc-900 min-h-[500px]">
        <Kanban>
          <KanbanColumn id="todo">
            <KanbanColumnHeader
              heading="To Do"
              :count="data.todo.length"
              badge="New"
              badge-color="blue"
            />
            <KanbanColumnCards v-model="data.todo" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>

          <KanbanColumn id="in-progress">
            <KanbanColumnHeader
              heading="In Progress"
              :count="data.inProgress.length"
            />
            <KanbanColumnCards v-model="data.inProgress" group="kanban">
              <template #card="{ card }">
                <KanbanCard :id="card.id" :heading="card.title" />
              </template>
            </KanbanColumnCards>
          </KanbanColumn>
        </Kanban>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify column headers are rendered
    await expect(canvas.getByText('To Do')).toBeInTheDocument();
    await expect(canvas.getByText('In Progress')).toBeInTheDocument();

    // Verify card counts are displayed
    await expect(canvas.getByText('5')).toBeInTheDocument(); // todo count
    await expect(canvas.getByText('3')).toBeInTheDocument(); // in progress count

    // Verify badge is displayed
    await expect(canvas.getByText('New')).toBeInTheDocument();

    // Verify cards are rendered
    await expect(canvas.getByText('Research competitors')).toBeInTheDocument();
    await expect(canvas.getByText('Implement authentication')).toBeInTheDocument();
  },
};
