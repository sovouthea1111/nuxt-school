<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <GroupHeader
        title="Stock Inventory"
        description="Monitor equipment and supply levels across branches."
        @new-class="openCreate"
      />

      <DataTable :data="stocks" :columns="stockColumns">
         <template #actions="{ row }">
          <div class="flex items-center justify-end gap-1">
            <button
              class="p-1.5 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded transition-colors"
              title="Edit"
              @click.stop="openEdit(row)"
            >
              <Pencil class="w-4 h-4" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
              title="Delete"
              @click.stop="openDelete(row)"
            >
              <Trash2 class="w-4 h-4" :stroke-width="1.5" />
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <StockFormModal
      v-model="showForm"
      :stock="activeItem"
      @submit="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import StockFormModal from "~/pages/stock-control/StockFormModal.vue";
import GroupHeader from "~/components/GroupHeader.vue";
import DataTable from "~/components/DataTable.vue";

const stockColumns = [
  { key: "name", label: "Item Name", bold: true },
  { key: "currentQty", label: "Stock Level", type: "badge" },
  { key: "oldQty", label: "Previous" },
  { key: "price", label: "Unit Price ($)" },
  { key: "updatedAt", label: "Last Updated" },
];

const stocks = ref([
  {
    id: 1,
    name: "Whiteboard Markers",
    currentQty: 120,
    oldQty: 50,
    price: 0.8,
    updatedAt: "2026-04-15",
  },
]);

const showForm = ref(false);
const activeItem = ref(null);

const openCreate = () => {
  activeItem.value = null;
  showForm.value = true;
};
const openEdit = (row) => {
  activeItem.value = { ...row };
  showForm.value = true;
};

const handleSave = (data) => {
  const now = new Date().toISOString().split("T")[0];
  if (data.id) {
    const idx = stocks.value.findIndex((s) => s.id === data.id);
    stocks.value[idx] = { ...data, updatedAt: now };
  } else {
    stocks.value.unshift({ id: Date.now(), ...data, updatedAt: now });
  }
};
</script>
