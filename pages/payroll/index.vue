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
          <button
            class="p-1.5 text-gray-400 hover:text-slate-900"
            title="View Receipt"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </template>
      </DataTable>
    </div>

    <PayrollFormModal
      v-model="showForm"
      :staff-list="staff"
      @submit="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PayrollFormModal from "~/pages/payroll/PayrollFormModal.vue";
import GroupHeader from "~/components/GroupHeader.vue";
import DataTable from "~/components/DataTable.vue";

const payrollColumns = [
  { key: "staffName", label: "Staff Member", bold: true },
  { key: "salary", label: "Salary Paid", type: "currency" },
  { key: "date", label: "Payment Date" },
  { key: "branchName", label: "Branch" },
];

const payrolls = ref([
  {
    id: 1,
    staffName: "Chann Thy",
    salary: 450.0,
    date: "2026-04-01",
    branchName: "Main Campus",
  },
]);

const staff = ref([
  { id: 101, name: "Chann Thy", position: "English Teacher" },
  { id: 102, name: "Sok Som", position: "IT Support" },
]);

const showForm = ref(false);

const openCreate = () => {
  showForm.value = true;
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
