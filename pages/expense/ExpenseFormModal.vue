<template>
  <BaseModal
    :model-value="modelValue"
    :title="expense ? 'Edit Expense' : 'New Expense Entry'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
      <form id="expense-form" class="space-y-6 py-2 pr-2" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-slate-700">Expense Name *</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white" 
            placeholder="e.g. Electricity Bill" 
            required 
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700">Price ($) *</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              step="0.01" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white" 
              placeholder="0.00" 
              required 
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700">Branch</label>
            <select 
              v-model="form.branchId" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
            >
              <option value="">Select Branch</option>
              <option v-for="b in branches" :key="b.id" :value="b.id">{{ b.name }}</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-1.5 pb-4">
          <label class="text-xs font-medium text-slate-700">Remark</label>
          <textarea 
            v-model="form.remark" 
            rows="3" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white" 
            placeholder="Notes..."
          ></textarea>
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
        form="expense-form" 
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        {{ expense ? "Update Expense" : "Save Expense" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({ modelValue: Boolean, expense: Object, branches: Array });
const emit = defineEmits(["update:modelValue", "submit"]);

const defaultForm = { name: "", price: 0, branchId: "", remark: "" };
const form = ref({ ...defaultForm });

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) form.value = props.expense ? { ...props.expense } : { ...defaultForm };
});

const onSubmit = () => { 
  emit("submit", { ...form.value }); 
  emit("update:modelValue", false); 
};
</script>