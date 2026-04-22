<template>
  <BaseModal
    :model-value="modelValue"
    :title="stock ? 'Update Stock Item' : 'New Stock Item'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
      <form
        id="stock-form"
        class="space-y-6 py-2 pr-2"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-slate-700">Item Name *</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
            required
          />
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
        >
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Current Qty</label
            >
            <input
              v-model.number="form.currentQty"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 opacity-70 cursor-not-allowed"
              readonly
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Add New Qty *</label
            >
            <input
              v-model.number="form.newQty"
              type="number"
              class="w-full px-3 py-2 border border-blue-200 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Price per Unit ($)</label
            >
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5 pt-4 border-t border-gray-100">
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

        <div class="flex flex-col gap-1.5 pb-4">
          <label class="text-xs font-medium text-slate-700">Remark</label>
          <textarea
            v-model="form.remark"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
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
        form="stock-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        Update Inventory
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: Boolean,
  stock: Object,
  branches: Array,
});
const emit = defineEmits(["update:modelValue", "submit"]);

const defaultForm = {
  name: "",
  currentQty: 0,
  newQty: 0,
  price: 0,
  branchId: "",
  remark: "",
};
const form = ref({ ...defaultForm });

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen)
      form.value = props.stock
        ? { ...props.stock, newQty: 0 }
        : { ...defaultForm };
  },
);

const onSubmit = () => {
  const finalQty = (form.value.currentQty || 0) + (form.value.newQty || 0);
  emit("submit", {
    ...form.value,
    oldQty: form.value.currentQty,
    currentQty: finalQty,
  });
  emit("update:modelValue", false);
};
</script>
