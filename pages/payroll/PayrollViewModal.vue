<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
      >
        <div class="bg-slate-900 px-6 py-5 flex items-center justify-between">
          <div>
            <p
              class="text-xs text-slate-400 uppercase tracking-widest font-medium"
            >
              Payslip
            </p>
            <h2 class="text-white font-bold text-lg leading-tight mt-0.5">
              {{ payroll?.staffName }}
            </h2>
          </div>
          <button
            class="text-slate-400 hover:text-white transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-slate-50 rounded-xl p-4">
              <p
                class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1"
              >
                Salary Paid
              </p>
              <p class="text-xl font-bold text-slate-900">
                ${{ payroll?.salary?.toFixed(2) }}
              </p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p
                class="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1"
              >
                Payment Date
              </p>
              <p class="text-base font-semibold text-slate-900">
                {{ payroll?.date }}
              </p>
            </div>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
            <div class="p-2 bg-white rounded-lg border border-slate-200">
              <Building2 class="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p
                class="text-[10px] text-slate-400 uppercase tracking-wider font-bold"
              >
                Branch
              </p>
              <p class="text-sm font-semibold text-slate-900">
                {{ payroll?.branchName }}
              </p>
            </div>
          </div>
        </div>

        <div class="px-6 pb-5 flex justify-end gap-2">
          <button
            class="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            Close
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
            @click="$emit('print', payroll)"
          >
            <Printer class="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X, Printer, Building2 } from "lucide-vue-next";

defineProps({
  modelValue: { type: Boolean, default: false },
  payroll: { type: Object, default: null },
});

defineEmits(["update:modelValue", "print"]);
</script>
