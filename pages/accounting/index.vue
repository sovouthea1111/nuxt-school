<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
          Accounting Journal
        </h1>
        <button
          @click="onExport"
          class="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
        >
          <i data-lucide="download" class="w-4 h-4 text-slate-600"></i>
        </button>
      </div>

      <div
        class="bg-slate-900 rounded-2xl p-6 text-white flex justify-between items-center shadow-xl"
      >
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Net Balance
          </p>
          <p class="text-4xl font-bold">${{ currentBalance.toFixed(2) }}</p>
        </div>
      </div>

      <DataTable
        :data="transactions"
        :columns="accountingColumns"
        row-key="id"
        :selectable="true"
        :show-actions="true"
      >
        <template #cell-id="{ row }">
          <span class="font-mono text-xs text-slate-400"
            >#{{ row.id.toString().padStart(5, "0") }}</span
          >
        </template>

        <template #cell-title="{ row }">
          <div class="flex flex-col">
            <span class="font-semibold text-slate-800">{{ row.title }}</span>
            <span class="text-[11px] text-slate-400 uppercase font-medium">{{
              row.category
            }}</span>
          </div>
        </template>

        <template #cell-inflow="{ row }">
          <span v-if="row.type === 'in'" class="font-bold text-emerald-600">
            +${{ row.amount.toFixed(2) }}
          </span>
          <span v-else class="text-slate-300">-</span>
        </template>

        <template #cell-outflow="{ row }">
          <span v-if="row.type === 'out'" class="font-bold text-rose-600">
            -${{ row.amount.toFixed(2) }}
          </span>
          <span v-else class="text-slate-300">-</span>
        </template>

        <template #actions="{ row }">
          <button
            class="p-1 text-slate-400 hover:text-slate-900"
            @click="viewDetails(row)"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTable from "~/components/DataTable.vue";

const accountingColumns = [
  { key: "id", label: "Ref #" },
  { key: "title", label: "Transaction Details" },
  { key: "branch", label: "Branch" },
  { key: "date", label: "Date" },
  {
    key: "inflow",
    label: "Inflow ($)",
    thClass: "text-right",
    tdClass: "text-right",
  },
  {
    key: "outflow",
    label: "Outflow ($)",
    thClass: "text-right",
    tdClass: "text-right",
  },
];

const transactions = ref([
  {
    id: 1045,
    title: "Tuition Fee - Sovannaroth",
    category: "Revenue",
    branch: "Main",
    date: "2026-04-22",
    amount: 30.0,
    type: "in",
  },
  {
    id: 1044,
    title: "Staff Salary - March",
    category: "Payroll",
    branch: "North",
    date: "2026-04-21",
    amount: 450.0,
    type: "out",
  },
  {
    id: 1043,
    title: "New Uniform Purchase",
    category: "Expense",
    branch: "Main",
    date: "2026-04-20",
    amount: 120.0,
    type: "out",
  },
]);

const currentBalance = computed(() => {
  return transactions.value.reduce(
    (acc, t) => (t.type === "in" ? acc + t.amount : acc - t.amount),
    0,
  );
});

const viewDetails = (row) => console.log("Viewing ref:", row.id);
const onExport = () => alert("Exporting...");
</script>
