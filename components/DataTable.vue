<template>
  <div
    class="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-left text-base text-slate-900 border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th v-if="selectable" class="w-12 px-6 py-4">
              <div
                class="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded cursor-pointer bg-white hover:border-gray-400 transition-colors"
              >
                <input
                  type="checkbox"
                  class="peer absolute opacity-0 w-full h-full cursor-pointer"
                  :checked="allSelected"
                  @change="$emit('toggle-all')"
                />
                <svg
                  class="hidden peer-checked:block w-3.5 h-3.5 text-slate-900 pointer-events-none"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7L6 10L11 3"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </th>

            <th
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 font-medium text-gray-600 whitespace-nowrap"
              :class="col.thClass"
            >
              {{ col.label }}
            </th>

            <th v-if="showActions" class="px-6 py-4 font-medium text-gray-600 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <TableRow
            v-for="row in data"
            :key="row[rowKey]"
            :row="row"
            :columns="columns"
            :row-key="rowKey"
            :selectable="selectable"
            :selected="selectedIds.includes(row[rowKey])"
            :show-actions="showActions"
            @toggle-select="$emit('toggle-select', $event)"
            @action="$emit('action', $event)"
          >
            <template v-for="col in columns" #[`cell-${col.key}`]="slotProps">
              <slot :name="`cell-${col.key}`" v-bind="slotProps" />
            </template>

            <template #actions="slotProps">
              <slot name="actions" v-bind="slotProps" />
            </template>
          </TableRow>

          <tr v-if="data.length === 0">
            <td
              :colspan="totalCols"
              class="px-6 py-16 text-center text-gray-400 text-base"
            >
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TableRow from "./TableRow.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
  },

  rowKey: {
    type: String,
    default: "id",
  },

  selectable: {
    type: Boolean,
    default: true,
  },

  selectedIds: {
    type: Array,
    default: () => [],
  },

  allSelected: {
    type: Boolean,
    default: false,
  },

  showActions: {
    type: Boolean,
    default: true,
  },

  emptyText: {
    type: String,
    default: "No records found.",
  },
});

defineEmits(["toggle-all", "toggle-select", "action"]);

const totalCols = computed(() => {
  let count = props.columns.length;
  if (props.selectable) count += 1;
  if (props.showActions) count += 1;
  return count;
});
</script>
