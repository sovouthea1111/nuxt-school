<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEditing ? 'Edit Room' : 'New Room'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form id="room-form" class="space-y-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700">
          Room Name <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Room 101"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all placeholder:text-gray-400"
          :class="{ 'border-rose-300 focus:border-rose-500 focus:ring-rose-500': errors.name }"
        />
        <span v-if="errors.name" class="text-[11px] text-rose-500">{{ errors.name }}</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700">
          Branch <span class="text-rose-500">*</span>
        </label>
        <div class="relative">
          <select
            v-model="form.branchId"
            class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all appearance-none text-slate-700 cursor-pointer"
            :class="{ 'border-rose-300 focus:border-rose-500 focus:ring-rose-500': errors.branchId }"
          >
            <option value="" disabled>Select a branch...</option>
            <option v-for="b in branches" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>
          <i
            data-lucide="chevron-down"
            stroke-width="1.5"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          ></i>
        </div>
        <span v-if="errors.branchId" class="text-[11px] text-rose-500">{{ errors.branchId }}</span>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-100 rounded-md transition-colors"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="room-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        {{ isEditing ? "Save Changes" : "Create Room" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  room: { type: Object, default: null },
  branches: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const isEditing = computed(() => !!props.room?.id);
const form = ref({ name: "", branchId: "" });
const errors = ref({});

watch(
  () => props.room,
  (val) => {
    form.value = { name: val?.name ?? "", branchId: val?.branchId ?? "" };
    errors.value = {};
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (open) => {
    if (open && !props.room) {
      form.value = { name: "", branchId: "" };
      errors.value = {};
    }
  },
);

function validate() {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = "Room name is required.";
  if (!form.value.branchId) errors.value.branchId = "Please select a branch.";
  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (!validate()) return;
  emit("submit", {
    ...form.value,
    branchId: Number(form.value.branchId),
    ...(isEditing.value ? { id: props.room.id } : {}),
  });
  emit("update:modelValue", false);
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>