<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <GroupHeader 
        title="Student Payments" 
        description="Manage tuition fees, books, uniforms, and track student debt."
        @new-class="openCreate" 
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Received</p>
          <p class="text-2xl font-bold text-slate-900 mt-1">${{ totalReceivedSum.toFixed(2) }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Debt</p>
          <p class="text-2xl font-bold text-rose-600 mt-1">${{ totalDebtSum.toFixed(2) }}</p>
        </div>
        <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Payments Today</p>
          <p class="text-2xl font-bold text-blue-600 mt-1">{{ paymentsToday }}</p>
        </div>
      </div>

      <DataTable :data="payments" :columns="columns">
        <template #status="{ row }">
          <span 
            class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            :class="row.debtAmount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'"
          >
            {{ row.debtAmount > 0 ? 'Partial' : 'Completed' }}
          </span>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-2">
            <button 
              class="p-1.5 text-gray-400 hover:text-slate-900 transition-colors"
              title="Print Receipt"
              @click.stop="onPrint(row)"
            >
              <i data-lucide="printer" class="w-4 h-4"></i>
            </button>
            <button 
              class="p-1.5 text-gray-400 hover:text-slate-900 transition-colors"
              @click.stop="openEdit(row)"
            >
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <StudentPaymentFormModal
      v-model="showForm"
      :payment="activeItem"
      :students="students"
      :stock-items="stockItems"
      @submit="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StudentPaymentFormModal from '~/pages/payment/StudentPaymentFormModal.vue'
import GroupHeader from '~/components/GroupHeader.vue'
import DataTable from '~/components/DataTable.vue'

const columns = [
  { key: 'studentName', label: 'Student', bold: true },
  { key: 'paymentDate', label: 'Date' },
  { key: 'totalAmount', label: 'Total ($)' },
  { key: 'getPayment', label: 'Paid ($)' },
  { key: 'debtAmount', label: 'Debt ($)' },
  { key: 'nextPaymentDate', label: 'Next Due' },
  { key: 'status', label: 'Status' }
]

// Mock Data for the table
const payments = ref([
  { 
    id: 1, 
    studentId: 101, 
    studentName: 'Sok Mesa', 
    paymentDate: '2026-04-20', 
    totalAmount: 45.00, 
    getPayment: 30.00, 
    debtAmount: 15.00, 
    nextPaymentDate: '2026-05-20',
    paymentPerMonth: 30,
    numberMonth: 1
  },
  { 
    id: 2, 
    studentId: 102, 
    studentName: 'Keo Rotha', 
    paymentDate: '2026-04-21', 
    totalAmount: 120.00, 
    getPayment: 120.00, 
    debtAmount: 0, 
    nextPaymentDate: '2026-07-21',
    paymentPerMonth: 40,
    numberMonth: 3
  }
])

const students = [
  { id: 101, name: 'Sok Mesa', code: 'STU-001' },
  { id: 102, name: 'Keo Rotha', code: 'STU-002' }
]
const stockItems = [
  { id: 1, name: 'Uniform Size L', currentQty: 25 },
  { id: 2, name: 'Uniform Size M', currentQty: 14 }
]

// Modal State Logic
const showForm = ref(false)
const activeItem = ref(null)

const openCreate = () => {
  activeItem.value = null
  showForm.value = true
}

const openEdit = (row) => {
  activeItem.value = { ...row }
  showForm.value = true
}

// Summary Logic
const totalReceivedSum = computed(() => payments.value.reduce((acc, p) => acc + p.getPayment, 0))
const totalDebtSum = computed(() => payments.value.reduce((acc, p) => acc + p.debtAmount, 0))
const paymentsToday = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return payments.value.filter(p => p.paymentDate === today).length
})

const handleSave = (data) => {
  const student = students.find(s => s.id === data.studentId)
  const formattedData = {
    ...data,
    studentName: student ? student.name : 'Unknown'
  }

  if (data.id) {
    const idx = payments.value.findIndex(p => p.id === data.id)
    payments.value[idx] = formattedData
  } else {
    payments.value.unshift({ id: Date.now(), ...formattedData })
  }
}

const onPrint = (row) => {
  alert(`Generating receipt for ${row.studentName}...`)
}
</script>