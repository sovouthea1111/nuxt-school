<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <GroupHeader
        title="Branches"
        description="Manage school campus locations and administrative branches."
        @filter="onFilter"
        @new-class="openCreate"
      />

      <DataTable
        :data="branches"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No branches found."
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
              <i data-lucide="pencil" stroke-width="1.5" class="w-4 h-4"></i>
            </button>
            <button
              class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
              title="Delete"
              @click.stop="openDelete(row)"
            >
              <i data-lucide="trash-2" stroke-width="1.5" class="w-4 h-4"></i>
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <BranchFormModal
      v-model="showForm"
      :branch="activeBranch"
      @submit="onFormSubmit"
    />

    <DeleteConfirmModal
      v-model="showDelete"
      title="Delete Branch"
      :description="`Are you sure you want to delete '${activeBranch?.name}'? This cannot be undone.`"
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import GroupHeader from "~/components/GroupHeader.vue";
import BranchFormModal from "~/pages/branch/BranchFormModal.vue";
import DeleteConfirmModal from "~/components/DeleteConfirmModal.vue";
import DataTable from "~/components/DataTable.vue";

const columns = [
  { key: "id", label: "ID", thClass: "w-16" },
  { key: "name", label: "Name", bold: true },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

const branches = ref([
  {
    id: 1,
    name: "Main Campus",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-15",
  },
  {
    id: 2,
    name: "North City Branch",
    createdAt: "2024-02-01",
    updatedAt: "2024-04-02",
  },
  {
    id: 3,
    name: "South Wing",
    createdAt: "2024-03-20",
    updatedAt: "2024-04-10",
  },
]);

const selectedIds = ref([]);
const showForm = ref(false);
const showDelete = ref(false);
const activeBranch = ref(null);
const nextId = ref(branches.value.length + 1);

const allSelected = computed(
  () =>
    branches.value.length > 0 &&
    selectedIds.value.length === branches.value.length,
);

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : branches.value.map((b) => b.id);
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id);
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1);
}

function openCreate() {
  activeBranch.value = null;
  showForm.value = true;
}

function openEdit(row) {
  activeBranch.value = { ...row };
  showForm.value = true;
}

function openDelete(row) {
  activeBranch.value = { ...row };
  showDelete.value = true;
}

function onRowAction(id) {
  const row = branches.value.find((b) => b.id === id);
  if (row) openEdit(row);
}

function onFormSubmit(payload) {
  const now = new Date().toISOString().split("T")[0];

  if (payload.id) {
    const idx = branches.value.findIndex((b) => b.id === payload.id);
    if (idx !== -1) {
      branches.value[idx] = {
        ...branches.value[idx],
        ...payload,
        updatedAt: now,
      };
    }
  } else {
    branches.value.push({
      id: nextId.value++,
      ...payload,
      createdAt: now,
      updatedAt: now,
    });
  }
}

function onDeleteConfirm() {
  if (!activeBranch.value) return;
  branches.value = branches.value.filter((b) => b.id !== activeBranch.value.id);
  selectedIds.value = selectedIds.value.filter(
    (id) => id !== activeBranch.value.id,
  );

  showDelete.value = false;
  activeBranch.value = null;
}

function onFilter() {
  console.log("Filter branches triggered");
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
