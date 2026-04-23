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
          class="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          @click="onExport"
        >
          <Download class="w-4 h-4 text-slate-600" :stroke-width="1.5" />
        </button>
      </div>

      <div class="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">
          Net Balance
        </p>
        <p
          class="text-4xl font-bold mt-1"
          :class="currentBalance >= 0 ? 'text-white' : 'text-rose-400'"
        >
          ${{ currentBalance.toFixed(2) }}
        </p>
      </div>

      <DataTable
        :data="transactions"
        :columns="columns"
        row-key="id"
        :selectable="true"
      >
        <template #cell-id="{ row }">
          <span class="font-mono text-xs text-slate-400">
            #{{ row.id.toString().padStart(5, "0") }}
          </span>
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
          <div class="flex items-center justify-end gap-1">
            <button
              class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="View"
              @click.stop="openView(row)"
            >
              <Eye class="w-4 h-4" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded transition-colors"
              title="Export"
              @click.stop="exportEntry(row)"
            >
              <Download class="w-4 h-4" :stroke-width="1.5" />
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <AccountingViewModal
      v-model="showView"
      :transaction="activeTransaction"
      @export="exportEntry"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Eye, Download } from "lucide-vue-next";
import DataTable from "~/components/DataTable.vue";
import AccountingViewModal from "~/pages/accounting/AccountingViewModal.vue";

const columns = [
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

const showView = ref(false);
const activeTransaction = ref(null);

const currentBalance = computed(() =>
  transactions.value.reduce(
    (acc, t) => (t.type === "in" ? acc + t.amount : acc - t.amount),
    0,
  ),
);

const openView = (row) => {
  activeTransaction.value = { ...row };
  showView.value = true;
};

const printWindow = (title, bodyHtml) => {
  const win = window.open("", "_blank");
  win.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #1e293b; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          p { color: #64748b; font-size: 14px; margin: 0 0 24px; }
          table { width: 100%; border-collapse: collapse; }
          th { padding: 10px 16px; background: #f8fafc; font-size: 13px; border: 1px solid #e2e8f0; text-align: left; }
          td { padding: 10px 16px; border: 1px solid #e2e8f0; font-size: 13px; }
          td:first-child { font-weight: 600; background: #f8fafc; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
        ${bodyHtml}
      </body>
    </html>
  `);
  win.document.close();
  win.print();
};

const exportEntry = (row) => {
  printWindow(
    `Transaction #${row.id.toString().padStart(5, "0")}`,
    `
    <table>
      <tr><td>Ref #</td><td>#${row.id.toString().padStart(5, "0")}</td></tr>
      <tr><td>Title</td><td>${row.title}</td></tr>
      <tr><td>Category</td><td>${row.category}</td></tr>
      <tr><td>Branch</td><td>${row.branch}</td></tr>
      <tr><td>Date</td><td>${row.date}</td></tr>
      <tr><td>Amount</td><td>${row.type === "in" ? "+" : "-"}$${row.amount.toFixed(2)}</td></tr>
    </table>
  `,
  );
};

const onExport = () => {
  printWindow(
    "Accounting Journal",
    `
    <table>
      <thead>
        <tr><th>Ref #</th><th>Title</th><th>Category</th><th>Branch</th><th>Date</th><th>Amount</th></tr>
      </thead>
      <tbody>
        ${transactions.value
          .map(
            (t) => `
          <tr>
            <td>#${t.id.toString().padStart(5, "0")}</td>
            <td>${t.title}</td>
            <td>${t.category}</td>
            <td>${t.branch}</td>
            <td>${t.date}</td>
            <td>${t.type === "in" ? "+" : "-"}$${t.amount.toFixed(2)}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `,
  );
};
</script>
