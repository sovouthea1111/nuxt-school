<template>
  <BaseModal
    :model-value="modelValue"
    title="Staff Payroll Processing"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
      <form
        id="payroll-form"
        class="space-y-6 py-2 pr-2"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-slate-700"
            >Staff Member *</label
          >
          <select
            v-model="form.staffId"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
            required
          >
            <option value="">Select Employee</option>
            <option v-for="s in staffList" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100"
        >
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Salary Amount ($) *</label
            >
            <input
              v-model.number="form.salary"
              type="number"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white font-semibold text-green-600"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Payment Date *</label
            >
            <input
              v-model="form.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              required
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5 pb-4">
          <label class="text-xs font-medium text-slate-700">Branch</label>
          <select
            v-model="form.branchId"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
          >
            <option v-for="b in branches" :key="b.id" :value="b.id">
              {{ b.name }}
            </option>
          </select>
        </div>
      </form>
    </div>

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
        form="payroll-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        Confirm Payment
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: Boolean,
  payroll: Object,
  staffList: Array,
  branches: Array,
});
const emit = defineEmits(["update:modelValue", "submit"]);

const defaultForm = {
  staffId: "",
  salary: 0,
  date: new Date().toISOString().split("T")[0],
  branchId: "",
};
const form = ref({ ...defaultForm });

watch(
  () => props.modelValue,
  (val) => {
    if (val)
      form.value = props.payroll ? { ...props.payroll } : { ...defaultForm };
  },
);

const onSubmit = () => {
  emit("submit", { ...form.value });
  emit("update:modelValue", false);
};
</script>
