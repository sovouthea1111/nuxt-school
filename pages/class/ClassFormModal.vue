<template>
  <BaseModal
    :model-value="modelValue"
    :title="isEditing ? 'Edit Class' : 'New Class'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <form id="class-form" class="space-y-4" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700"
          >Class Name <span class="text-rose-500">*</span></label
        >
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g. Advanced Physics"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
          :class="{ 'border-rose-300': errors.name }"
        />
        <span v-if="errors.name" class="text-[11px] text-rose-500">{{
          errors.name
        }}</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-slate-700"
          >Instructor <span class="text-rose-500">*</span></label
        >
        <input
          v-model="form.instructor"
          type="text"
          placeholder="e.g. Dr. Smith"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
          :class="{ 'border-rose-300': errors.instructor }"
        />
        <span v-if="errors.instructor" class="text-[11px] text-rose-500">{{
          errors.instructor
        }}</span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-slate-700">Subject</label>
          <input
            v-model="form.subject"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-slate-700">Capacity</label>
          <input
            v-model.number="form.capacity"
            type="number"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="class-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 shadow-sm"
      >
        {{ isEditing ? "Save Changes" : "Create Class" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: Boolean,
  editingClass: Object,
});

const emit = defineEmits(["update:modelValue", "submit"]);

const isEditing = computed(() => !!props.editingClass?.id);
const form = ref({ name: "", instructor: "", subject: "", capacity: 30 });
const errors = ref({});

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      if (props.editingClass) {
        form.value = { ...props.editingClass };
      } else {
        form.value = { name: "", instructor: "", subject: "", capacity: 30 };
      }
      errors.value = {};
    }
  },
);

function validate() {
  errors.value = {};
  if (!form.value.name) errors.value.name = "Required";
  if (!form.value.instructor) errors.value.instructor = "Required";
  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (!validate()) return;
  emit("submit", { ...form.value });
  emit("update:modelValue", false);
}
</script>
