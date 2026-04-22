<template>
  <BaseModal
    :model-value="modelValue"
    :title="payment ? 'Edit Payment' : 'New Student Payment'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
      <form
        id="payment-form"
        class="space-y-6 py-2 pr-2"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700">Student *</label>
            <select
              v-model="form.studentId"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              required
              @change="fetchStudentDebt"
            >
              <option value="">Select Student</option>
              <option v-for="s in students" :key="s.id" :value="s.id">
                {{ s.name }} ({{ s.code }})
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Payment Date *</label
            >
            <input
              v-model="form.paymentDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label
              class="text-xs font-medium text-slate-700 text-blue-600 font-bold"
              >Next Payment *</label
            >
            <input
              v-model="form.nextPaymentDate"
              type="date"
              class="w-full px-3 py-2 border border-blue-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-white"
              required
            />
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Books & Admin Fees
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Card Student ($)</label
              >
              <input
                v-model.number="form.cardStudent"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Recording Book ($)</label
              >
              <input
                v-model.number="form.recordingBook"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Full Time Book ($)</label
              >
              <input
                v-model.number="form.fullTimeBook"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Part Time Book ($)</label
              >
              <input
                v-model.number="form.partTimeBook"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Tuition Calculation
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Price/Month ($)</label
              >
              <input
                v-model.number="form.paymentPerMonth"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Number of Months</label
              >
              <input
                v-model.number="form.numberMonth"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Discount (%)</label
              >
              <input
                v-model.number="form.discountPercent"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white text-rose-500"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Exchange Rate (៛)</label
              >
              <input
                v-model.number="form.exchangeRate"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-slate-50"
                readonly
              />
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Inventory & Services
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Uniform Item</label
              >
              <select
                v-model="form.stockControlId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              >
                <option value="">None</option>
                <option
                  v-for="item in stockItems"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }} ({{ item.currentQty }} available)
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Uniform Qty</label
              >
              <input
                v-model.number="form.uniformQty"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Uniform Price ($)</label
              >
              <input
                v-model.number="form.priceUniform"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Taxi Price ($)</label
              >
              <input
                v-model.number="form.priceTaxi"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              />
            </div>
          </div>
        </div>

        <div
          class="pt-6 border-t-2 border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-6 pb-6"
        >
          <div class="p-4 bg-slate-50 rounded-lg space-y-3">
            <div class="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span class="font-bold">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm text-rose-600">
              <span>Discount:</span>
              <span>-${{ totalDiscountValue.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm text-amber-600">
              <span>Penalty:</span>
              <span>+${{ (form.penaltyAmount || 0).toFixed(2) }}</span>
            </div>
            <hr class="border-slate-200" />
            <div
              class="flex justify-between text-base font-bold text-slate-900"
            >
              <span>Total:</span>
              <span>${{ totalWithDiscount.toFixed(2) }}</span>
            </div>
          </div>

          <div class="p-4 bg-blue-50 rounded-lg space-y-3">
            <div class="flex justify-between text-sm">
              <span>Old Debt:</span>
              <span class="font-bold text-rose-500"
                >${{ (form.oldDebtAmount || 0).toFixed(2) }}</span
              >
            </div>
            <div
              class="flex justify-between text-lg font-bold text-blue-700 pt-4"
            >
              <span>Grand Total:</span>
              <span>${{ grandTotal.toFixed(2) }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-700 uppercase"
                >Received ($) *</label
              >
              <input
                v-model.number="form.getPayment"
                type="number"
                step="0.01"
                class="w-full px-4 py-3 border-2 border-slate-900 rounded-lg text-lg font-bold outline-none focus:ring-2 focus:ring-slate-500 transition-all bg-white"
                required
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Remaining Debt ($)</label
              >
              <input
                :value="debtAmount.toFixed(2)"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-rose-50 text-rose-600 font-bold"
                readonly
              />
            </div>
          </div>
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
        form="payment-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        Process Receipt
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  payment: Object,
  students: Array,
  stockItems: Array,
});

const emit = defineEmits(["update:modelValue", "submit"]);

const defaultForm = {
  studentId: "",
  branchId: 1,
  cardStudent: 0,
  recordingBook: 0,
  fullTimeBook: 0,
  partTimeBook: 0,
  paymentDate: new Date().toISOString().split("T")[0],
  nextPaymentDate: "",
  paymentPerMonth: 0,
  exchangeRate: 4100,
  numberMonth: 1,
  discountPercent: 0,
  priceTaxi: 0,
  stockControlId: "",
  priceUniform: 0,
  uniformQty: 0,
  penaltyAmount: 0,
  oldDebtAmount: 0,
  getPayment: 0,
  status: "completed",
};

const form = ref({ ...defaultForm });

const subtotal = computed(() => {
  return (
    form.value.paymentPerMonth * form.value.numberMonth +
    (form.value.cardStudent || 0) +
    (form.value.recordingBook || 0) +
    (form.value.fullTimeBook || 0) +
    (form.value.partTimeBook || 0) +
    (form.value.priceUniform || 0) * (form.value.uniformQty || 0) +
    (form.value.priceTaxi || 0)
  );
});

const totalDiscountValue = computed(() => {
  const tuitionTotal = form.value.paymentPerMonth * form.value.numberMonth;
  return tuitionTotal * (form.value.discountPercent / 100);
});

const totalWithDiscount = computed(() => {
  return (
    subtotal.value - totalDiscountValue.value + (form.value.penaltyAmount || 0)
  );
});

const grandTotal = computed(() => {
  return totalWithDiscount.value + (form.value.oldDebtAmount || 0);
});

const debtAmount = computed(() => {
  return grandTotal.value - (form.value.getPayment || 0);
});

function fetchStudentDebt() {
  if (form.value.studentId === 101) form.value.oldDebtAmount = 15.0;
  else form.value.oldDebtAmount = 0;
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen)
      form.value = props.payment ? { ...props.payment } : { ...defaultForm };
  },
);

function onSubmit() {
  const finalData = {
    ...form.value,
    totalWithDiscount: totalWithDiscount.value,
    totalAmount: grandTotal.value,
    debtAmount: debtAmount.value,
    status: debtAmount.value > 0 ? "partial" : "completed",
  };

  emit("submit", finalData);
  emit("update:modelValue", false);
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full hover:bg-slate-300;
}
</style>
