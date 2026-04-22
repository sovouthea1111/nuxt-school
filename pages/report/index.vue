<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">
            Financial Report
          </h1>
          <p class="text-sm text-slate-500">
            Overview of income, expenses, and net profit by branch.
          </p>
        </div>

        <div
          class="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm"
        >
          <label class="text-xs font-bold text-slate-400 uppercase pl-2"
            >Branch:</label
          >
          <select
            v-model="selectedBranchId"
            class="text-sm font-medium bg-transparent outline-none border-none focus:ring-0 pr-8 cursor-pointer"
          >
            <option :value="null">All Branches</option>
            <option v-for="b in branches" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <i data-lucide="trending-up" class="w-5 h-5"></i>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-wider"
              >Total Income</span
            >
          </div>
          <p class="text-3xl font-bold text-slate-900">
            ${{ totals.income.toFixed(2) }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-rose-50 rounded-lg text-rose-600">
              <i data-lucide="shopping-cart" class="w-5 h-5"></i>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-wider"
              >Expenses</span
            >
          </div>
          <p class="text-3xl font-bold text-slate-900">
            ${{ totals.expense.toFixed(2) }}
          </p>
        </div>

        <div class="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
              <i data-lucide="users" class="w-5 h-5"></i>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-wider"
              >Payroll</span
            >
          </div>
          <p class="text-3xl font-bold text-slate-900">
            ${{ totals.payroll.toFixed(2) }}
          </p>
        </div>

        <div
          class="bg-slate-900 p-6 rounded-xl shadow-lg ring-1 ring-slate-800"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="p-2 bg-slate-800 rounded-lg text-emerald-400">
              <i data-lucide="dollar-sign" class="w-5 h-5"></i>
            </div>
            <span
              class="text-xs font-bold text-slate-400 uppercase tracking-wider"
              >Net Profit</span
            >
          </div>
          <p class="text-3xl font-bold text-white">
            ${{ totals.profit.toFixed(2) }}
          </p>
        </div>
      </div>

      <div
        class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
      >
        <div
          class="px-6 py-4 border-b border-slate-100 flex justify-between items-center"
        >
          <h3 class="font-bold text-slate-900">Transaction History</h3>
          <button
            @click="exportReport"
            class="text-xs font-bold text-blue-600 hover:underline"
          >
            Export CSV
          </button>
        </div>

        <DataTable 
    :data="filteredTransactions" 
    :columns="reportColumns"
    :selectable="false"
  >
    <template #cell-category="{ row }">
      <span 
        class="px-2 py-0.5 rounded text-[10px] font-bold uppercase"
        :class="{
          'bg-emerald-50 text-emerald-600': row.category === 'Income',
          'bg-rose-50 text-rose-600': row.category === 'Expense',
          'bg-blue-50 text-blue-600': row.category === 'Payroll'
        }"
      >
        {{ row.category }}
      </span>
    </template>

    <template #cell-amount="{ row }">
      <div class="text-right font-bold" :class="row.category === 'Income' ? 'text-emerald-600' : 'text-slate-900'">
        {{ row.category === 'Income' ? '+' : '-' }} ${{ row.amount.toFixed(2) }}
      </div>
    </template>
  </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTable from '~/components/DataTable.vue'

const selectedBranchId = ref(null);

const reportColumns = [
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Description' },
  { key: 'branchName', label: 'Branch' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount', thClass: 'text-right' }
]
const branches = [
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Branch" },
];

const transactions = ref([
  {
    id: 1,
    category: "Income",
    description: "Tuition Fee - Sok Mesa",
    branchId: 1,
    date: "2026-04-20",
    amount: 45.0,
  },
  {
    id: 2,
    category: "Expense",
    description: "Electricity Bill",
    branchId: 1,
    date: "2026-04-15",
    amount: 120.0,
  },
  {
    id: 3,
    category: "Payroll",
    description: "Salary - Chann Thy",
    branchId: 2,
    date: "2026-04-01",
    amount: 550.0,
  },
  {
    id: 4,
    category: "Income",
    description: "Tuition Fee - Keo Rotha",
    branchId: 2,
    date: "2026-04-21",
    amount: 120.0,
  },
  {
    id: 5,
    category: "Expense",
    description: "Internet Fiber",
    branchId: 2,
    date: "2026-04-05",
    amount: 80.0,
  },
  {
    id: 6,
    category: "Income",
    description: "Uniform Sale",
    branchId: 1,
    date: "2026-04-22",
    amount: 25.0,
  },
]);

const filteredTransactions = computed(() => {
  if (!selectedBranchId.value) return transactions.value;
  return transactions.value.filter(
    (t) => t.branchId === selectedBranchId.value,
  );
});

// Main Logic: Calculating Profit
const totals = computed(() => {
  const income = filteredTransactions.value
    .filter((t) => t.category === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filteredTransactions.value
    .filter((t) => t.category === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const payroll = filteredTransactions.value
    .filter((t) => t.category === "Payroll")
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    income,
    expense,
    payroll,
    profit: income - expense - payroll,
  };
});

const getBranchName = (id) =>
  branches.find((b) => b.id === id)?.name || "Unknown";

const categoryStyle = (cat) => {
  if (cat === "Income") return "bg-emerald-50 text-emerald-600";
  if (cat === "Expense") return "bg-rose-50 text-rose-600";
  return "bg-blue-50 text-blue-600";
};

const exportReport = () =>
  alert(
    "Downloading report for " +
      (selectedBranchId.value
        ? getBranchName(selectedBranchId.value)
        : "All Branches"),
  );
</script>
