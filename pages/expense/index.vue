<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <GroupHeader
        title="Expenses"
        description="Track all school expenditures and operational costs."
        @new-class="openCreate"
      />

      <DataTable :data="expenses" :columns="columns">
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

    <ExpenseFormModal
      v-model="showForm"
      :expense="activeItem"
      :branches="branches"
      @submit="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import ExpenseFormModal from "~/pages/expense/ExpenseFormModal.vue";
import GroupHeader from "~/components/GroupHeader.vue";
import DataTable from "~/components/DataTable.vue";

const columns = [
  { key: "name", label: "Description", bold: true },
  { key: "price", label: "Amount ($)" },
  { key: "branchName", label: "Branch" },
  { key: "createdAt", label: "Date" },
];

const branches = [
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Branch" },
];
const expenses = ref([
  {
    id: 1,
    name: "Electricity Bill",
    price: 150.75,
    branchId: 1,
    branchName: "Main Campus",
    createdAt: "2026-03-31",
  },
  {
    id: 2,
    name: "Internet Subscription",
    price: 80.0,
    branchId: 2,
    branchName: "North Branch",
    createdAt: "2026-04-05",
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
  const branchName = branches.find((b) => b.id === data.branchId)?.name || "";
  if (data.id) {
    const idx = expenses.value.findIndex((e) => e.id === data.id);
    expenses.value[idx] = { ...data, branchName };
  } else {
    expenses.value.unshift({
      id: Date.now(),
      ...data,
      branchName,
      createdAt: new Date().toISOString().split("T")[0],
    });
  }
};
</script>
