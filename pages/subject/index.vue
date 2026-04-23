<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-5xl mx-auto space-y-8">
      <GroupHeader
        title="Subjects"
        description="Manage academic subjects and curriculum across branches."
        @filter="onFilter"
        @new-class="openCreate"
      />

      <DataTable
        :data="subjects"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No subjects found."
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

    <SubjectFormModal
      v-model="showForm"
      :subject="activeSubject"
      :branches="branches"
      @submit="onFormSubmit"
    />

    <DeleteConfirmModal
      v-model="showDelete"
      title="Delete Subject"
      :description="`Are you sure you want to delete '${activeSubject?.name}'?`"
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import GroupHeader from "~/components/GroupHeader.vue";
import SubjectFormModal from "~/pages/subject/SubjectFormModal.vue";
import DeleteConfirmModal from "~/components/DeleteConfirmModal.vue";
import DataTable from "~/components/DataTable.vue";

const columns = [
  { key: "id", label: "ID", thClass: "w-16" },
  { key: "name", label: "Subject Name", bold: true },
  { key: "branchName", label: "Branch" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

const branches = ref([
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North Branch" },
]);

const subjects = ref([
  {
    id: 1,
    name: "Mathematics",
    branchId: 1,
    branchName: "Main Campus",
    createdAt: "2024-01-10",
    updatedAt: "2024-03-15",
  },
  {
    id: 2,
    name: "English Literature",
    branchId: 2,
    branchName: "North Branch",
    createdAt: "2024-02-01",
    updatedAt: "2024-04-02",
  },
]);

const selectedIds = ref([]);
const showForm = ref(false);
const showDelete = ref(false);
const activeSubject = ref(null);
const nextId = ref(subjects.value.length + 1);

const allSelected = computed(
  () =>
    subjects.value.length > 0 &&
    selectedIds.value.length === subjects.value.length,
);

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : subjects.value.map((s) => s.id);
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id);
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1);
}

function openCreate() {
  activeSubject.value = null;
  showForm.value = true;
}

function openEdit(row) {
  activeSubject.value = { ...row };
  showForm.value = true;
}

function openDelete(row) {
  activeSubject.value = { ...row };
  showDelete.value = true;
}

function onRowAction(id) {
  const row = subjects.value.find((s) => s.id === id);
  if (row) openEdit(row);
}

function onFormSubmit(payload) {
  const now = new Date().toISOString().split("T")[0];
  const branchName =
    branches.value.find((b) => b.id === payload.branchId)?.name ?? "—";

  if (payload.id) {
    const idx = subjects.value.findIndex((s) => s.id === payload.id);
    if (idx !== -1) {
      subjects.value[idx] = {
        ...subjects.value[idx],
        ...payload,
        branchName,
        updatedAt: now,
      };
    }
  } else {
    subjects.value.push({
      id: nextId.value++,
      ...payload,
      branchName,
      createdAt: now,
      updatedAt: now,
    });
  }
}

function onDeleteConfirm() {
  subjects.value = subjects.value.filter(
    (s) => s.id !== activeSubject.value.id,
  );
  showDelete.value = false;
}

function onFilter() {}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
