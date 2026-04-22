<template>
  <tr class="hover:bg-gray-50/50 transition-colors group">
    <td v-if="selectable" class="px-6 py-4">
      <div
        class="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded cursor-pointer bg-white hover:border-gray-400 transition-colors"
      >
        <input
          type="checkbox"
          class="peer absolute opacity-0 w-full h-full cursor-pointer"
          :checked="selected"
          @change="$emit('toggle-select', row[rowKey])"
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
    </td>

    <td
      v-for="col in columns"
      :key="col.key"
      class="px-6 py-4"
      :class="col.tdClass"
    >
      <slot
        :name="`cell-${col.key}`"
        :value="getCellValue(row, col)"
        :row="row"
      >
        <template v-if="col.type === 'badge'">
          <BaseBadge :status="getCellValue(row, col)" />
        </template>

        <template v-else-if="col.type === 'avatar'">
          <div class="flex items-center gap-3">
            <div
              class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0"
            >
              {{ initials(getCellValue(row, col)) }}
            </div>
            <span
              :class="col.bold ? 'font-medium text-slate-900' : 'text-gray-500'"
            >
              {{ getCellValue(row, col) }}
            </span>
          </div>
        </template>

        <template v-else-if="col.type === 'fraction'">
          <span class="text-gray-500">
            {{ row[col.numerator] }} / {{ row[col.denominator] }}
          </span>
        </template>

        <template v-else>
          <span
            :class="col.bold ? 'font-medium text-slate-900' : 'text-gray-500'"
          >
            {{ getCellValue(row, col) }}
          </span>
        </template>
      </slot>
    </td>

    <td v-if="showActions" class="px-6 py-4 text-right">
      <slot name="actions" :row="row">
        <button
          class="text-gray-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all"
          @click="$emit('action', row[rowKey])"
        >
          <i
            data-lucide="more-horizontal"
            stroke-width="1.5"
            class="w-5 h-5"
          ></i>
        </button>
      </slot>
    </td>
  </tr>
</template>

<script setup>
import { onMounted } from "vue";
import BaseBadge from "~/components/Basebadge.vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
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

  selected: {
    type: Boolean,
    default: false,
  },

  showActions: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["toggle-select", "action"]);

function getCellValue(row, col) {
  return col.key.split(".").reduce((obj, k) => obj?.[k], row);
}

function initials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

onMounted(() => {
  if (window.lucide) window.lucide.createIcons();
});
</script>
