<template>
  <BaseModal
    :model-value="modelValue"
    :title="subject ? 'Edit Subject' : 'New Subject'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form id="subject-form" class="space-y-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700">
          Subject Name <span class="text-rose-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Science"
          class="input-field"
          required
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700">
          Branch <span class="text-rose-500">*</span>
        </label>
        <select v-model="form.branchId" class="input-field" required>
          <option value="" disabled>Select a branch...</option>
          <option v-for="b in branches" :key="b.id" :value="b.id">
            {{ b.name }}
          </option>
        </select>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="subject-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        {{ subject ? "Save Changes" : "Create Subject" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: Boolean,
  subject: Object,
  branches: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const form = ref({ name: "", branchId: "" });

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      form.value = props.subject
        ? { name: props.subject.name, branchId: props.subject.branchId }
        : { name: "", branchId: "" };
    }
  },
);

function onSubmit() {
  emit("submit", {
    ...form.value,
    branchId: Number(form.value.branchId),
    ...(props.subject?.id ? { id: props.subject.id } : {}),
  });
  emit("update:modelValue", false);
}
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all;
}
</style>
