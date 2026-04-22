<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEditing ? 'Edit Branch' : 'New Branch'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form id="branch-form" class="space-y-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700">
          Branch Name <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Main Campus"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all placeholder:text-gray-400"
          :class="{
            'border-rose-300 focus:border-rose-500 focus:ring-rose-500':
              errors.name,
          }"
        />
        <span v-if="errors.name" class="text-[11px] text-rose-500">{{
          errors.name
        }}</span>
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
        form="branch-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        {{ isEditing ? "Save Changes" : "Create Branch" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  branch: { type: Object, default: null },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const isEditing = computed(() => !!props.branch?.id);
const form = ref({ name: "" });
const errors = ref({});

watch(
  () => props.branch,
  (val) => {
    form.value = { name: val?.name ?? "" };
    errors.value = {};
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (open) => {
    if (open && !props.branch) {
      form.value = { name: "" };
      errors.value = {};
    }
  },
);

function validate() {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = "Branch name is required.";
  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (!validate()) return;
  emit("submit", {
    ...form.value,
    ...(isEditing.value ? { id: props.branch.id } : {}),
  });
  emit("update:modelValue", false);
}
</script>
