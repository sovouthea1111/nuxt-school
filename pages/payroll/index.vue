<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <GroupHeader
        title="Payroll History"
        description="Review staff salary disbursements and payment dates."
        @new-class="openCreate"
      />

      <DataTable :data="payrolls" :columns="payrollColumns">
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
              title="Print"
              @click.stop="printPayslip(row)"
            >
              <Printer class="w-4 h-4" :stroke-width="1.5" />
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <PayrollFormModal
      v-model="showForm"
      :staff-list="staff"
      @submit="handleSave"
    />

    <PayrollViewModal
      v-model="showView"
      :payroll="activePayroll"
      @print="printPayslip"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Eye, Printer } from "lucide-vue-next";
import GroupHeader from "~/components/GroupHeader.vue";
import DataTable from "~/components/DataTable.vue";
import PayrollFormModal from "~/pages/payroll/PayrollFormModal.vue";
import PayrollViewModal from "~/pages/payroll/PayrollViewModal.vue";

const payrollColumns = [
  { key: "staffName", label: "Staff Member", bold: true },
  { key: "salary", label: "Salary Paid" },
  { key: "date", label: "Payment Date" },
  { key: "branchName", label: "Branch" },
];

const staff = ref([
  { id: 101, name: "Chann Thy", position: "English Teacher" },
  { id: 102, name: "Sok Som", position: "IT Support" },
]);

const payrolls = ref([
  {
    id: 1,
    staffName: "Chann Thy",
    salary: 450.0,
    date: "2026-04-01",
    branchName: "Main Campus",
  },
]);

const showForm = ref(false);
const showView = ref(false);
const activePayroll = ref(null);

const openCreate = () => {
  showForm.value = true;
};

const openView = (row) => {
  activePayroll.value = { ...row };
  showView.value = true;
};

const printPayslip = (row) => {
  const win = window.open("", "_blank");
  win.document.write(`
    <html>
      <head>
        <title>Payslip - ${row.staffName}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #1e293b; }
          h1 { font-size: 22px; margin-bottom: 4px; }
          p { color: #64748b; font-size: 14px; margin: 0 0 24px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 12px 16px; border: 1px solid #e2e8f0; font-size: 14px; }
          td:first-child { font-weight: 600; background: #f8fafc; width: 40%; }
        </style>
      </head>
      <body>
        <h1>Payslip</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
        <table>
          <tr><td>Staff Member</td><td>${row.staffName}</td></tr>
          <tr><td>Salary Paid</td><td>$${row.salary?.toFixed(2)}</td></tr>
          <tr><td>Payment Date</td><td>${row.date}</td></tr>
          <tr><td>Branch</td><td>${row.branchName}</td></tr>
        </table>
      </body>
    </html>
  `);
  win.document.close();
  win.print();
};

const handleSave = (data) => {
  const selectedStaff = staff.value.find((s) => s.id === data.staffId);
  payrolls.value.unshift({
    id: Date.now(),
    staffName: selectedStaff?.name || "Unknown",
    ...data,
  });
};
</script>
