<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">
      <GroupHeader
        title="Rooms"
        description="Manage school facility rooms and locations."
        @filter="onFilter"
        @new-class="openCreate"
      />

      <DataTable
        :data="rooms"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No rooms found."
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

    <RoomFormModal
      v-model="showForm"
      :room="activeRoom"
      :branches="branches"
      @submit="onFormSubmit"
    />

    <DeleteConfirmModal
      v-model="showDelete"
      title="Delete Room"
      :description="`Are you sure you want to delete '${activeRoom?.name}'? This cannot be undone.`"
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import GroupHeader from "~/components/GroupHeader.vue";
import RoomFormModal from "~/pages/room/RoomFormModal.vue";
import DeleteConfirmModal from "~/components/DeleteConfirmModal.vue";
import DataTable from "~/components/DataTable.vue";

const columns = [
  { key: "id", label: "ID", thClass: "w-16" },
  { key: "name", label: "Name", bold: true },
  { key: "branchName", label: "Branch" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

const branches = ref([
  { id: 1, name: "Main Campus" },
  { id: 2, name: "North City Branch" },
  { id: 3, name: "South Wing" },
]);

const rooms = ref([
  {
    id: 1,
    name: "Room 101",
    branchId: 1,
    branchName: "Main Campus",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-20",
  },
  {
    id: 2,
    name: "Room 202",
    branchId: 1,
    branchName: "Main Campus",
    createdAt: "2024-02-10",
    updatedAt: "2024-04-01",
  },
  {
    id: 3,
    name: "Room A1",
    branchId: 2,
    branchName: "North City Branch",
    createdAt: "2024-03-05",
    updatedAt: "2024-04-05",
  },
]);

const selectedIds = ref([]);
const showForm = ref(false);
const showDelete = ref(false);
const activeRoom = ref(null);
const nextId = ref(rooms.value.length + 1);

const allSelected = computed(
  () =>
    rooms.value.length > 0 && selectedIds.value.length === rooms.value.length,
);

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : rooms.value.map((r) => r.id);
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id);
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1);
}

function openCreate() {
  activeRoom.value = null;
  showForm.value = true;
}

function openEdit(row) {
  activeRoom.value = { ...row };
  showForm.value = true;
}

function openDelete(row) {
  activeRoom.value = { ...row };
  showDelete.value = true;
}

function onRowAction(id) {
  const row = rooms.value.find((r) => r.id === id);
  if (row) openEdit(row);
}

function onFormSubmit(payload) {
  const now = new Date().toISOString().split("T")[0];
  const branchName =
    branches.value.find((b) => b.id === payload.branchId)?.name ?? "—";

  if (payload.id) {
    const idx = rooms.value.findIndex((r) => r.id === payload.id);
    if (idx !== -1) {
      rooms.value[idx] = {
        ...rooms.value[idx],
        ...payload,
        branchName,
        updatedAt: now,
      };
    }
  } else {
    rooms.value.push({
      id: nextId.value++,
      ...payload,
      branchName,
      createdAt: now,
      updatedAt: now,
    });
  }
}

function onDeleteConfirm() {
  rooms.value = rooms.value.filter((r) => r.id !== activeRoom.value.id);
  selectedIds.value = selectedIds.value.filter(
    (id) => id !== activeRoom.value.id,
  );
  showDelete.value = false;
}

function onFilter() {
  console.log("Filter triggered");
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
