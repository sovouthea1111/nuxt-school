<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <GroupHeader
        title="Staff Members"
        description="Manage teachers, administrative staff, and support personnel."
        @filter="onFilter"
        @new-class="openCreate"
      />

      <DataTable
        :data="staffList"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No staff found."
        @toggle-all="toggleAll"
        @toggle-select="toggleSelect"
        @action="onRowAction"
      >
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

    <StaffFormModal
      v-model="showForm"
      :staff="activeStaff"
      :branches="branches"
      @submit="onFormSubmit"
    />

    <DeleteConfirmModal
      v-model="showDelete"
      title="Delete Staff"
      :description="`Are you sure you want to delete '${activeStaff?.name}'?`"
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import GroupHeader from "~/components/GroupHeader.vue";
import StaffFormModal from "~/pages/staff/StaffFormModal.vue";
import DeleteConfirmModal from "~/components/DeleteConfirmModal.vue";
import DataTable from "~/components/DataTable.vue";

const columns = [
  { key: "code", label: "Code", thClass: "w-24" },
  { key: "name", label: "Name", bold: true },
  { key: "position", label: "Position", type: "badge" },
  { key: "phone", label: "Phone" },
  { key: "branchName", label: "Branch" },
  { key: "status", label: "Status", type: "badge" },
];

const branches = ref([
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Branch" },
]);

const staffList = ref([
  {
    id: 1,
    code: "ST-001",
    name: "Sovouthea Hoeun",
    position: "Teacher",
    phone: "012 345 678",
    branchId: 1,
    branchName: "Main Campus",
    status: "active",
  },
]);

const selectedIds = ref([]);
const showForm = ref(false);
const showDelete = ref(false);
const activeStaff = ref(null);

const allSelected = computed(
  () =>
    staffList.value.length > 0 &&
    selectedIds.value.length === staffList.value.length,
);

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : staffList.value.map((s) => s.id);
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id);
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1);
}

function openCreate() {
  activeStaff.value = null;
  showForm.value = true;
}

function openEdit(row) {
  activeStaff.value = { ...row };
  showForm.value = true;
}

function openDelete(row) {
  activeStaff.value = { ...row };
  showDelete.value = true;
}

function onRowAction(id) {
  const row = staffList.value.find((s) => s.id === id);
  if (row) openEdit(row);
}

function onFormSubmit(payload) {
  const now = new Date().toISOString().split("T")[0];
  const branchName =
    branches.value.find((b) => b.id === payload.branchId)?.name ?? "—";

  if (payload.id) {
    const idx = staffList.value.findIndex((s) => s.id === payload.id);
    if (idx !== -1)
      staffList.value[idx] = {
        ...staffList.value[idx],
        ...payload,
        branchName,
        updatedAt: now,
      };
  } else {
    staffList.value.push({
      id: Date.now(),
      ...payload,
      branchName,
      createdAt: now,
      updatedAt: now,
    });
  }
}

function onDeleteConfirm() {
  staffList.value = staffList.value.filter(
    (s) => s.id !== activeStaff.value.id,
  );
  showDelete.value = false;
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
