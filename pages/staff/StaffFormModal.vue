<template>
  <BaseModal
    :model-value="modelValue"
    :title="staff ? 'Edit Staff Member' : 'New Staff Member'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class=" pr-2 custom-scrollbar">
      <form id="staff-form" class="space-y-6 py-2" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label>Code <span class="text-rose-500">*</span></label>
            <input
              v-model="form.code"
              type="text"
              class="input-field"
              placeholder="ST-1001"
              required
            />
          </div>
          <div class="form-group">
            <label>Name (Khmer) <span class="text-rose-500">*</span></label>
            <input
              v-model="form.name"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label>Latin Name</label>
            <input v-model="form.latinName" type="text" class="input-field" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label>Position</label>
            <select v-model="form.position" class="input-field">
              <option value="Teacher">Teacher</option>
              <option value="Marketing">Marketing</option>
              <option value="Driver">Driver</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Gender</label>
            <select v-model="form.gender" class="input-field">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input v-model="form.phone" type="text" class="input-field" />
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100"
        >
          <div class="form-group">
            <label>ID Card / Passport</label>
            <input v-model="form.idCard" type="text" class="input-field" />
          </div>
          <div class="form-group">
            <label>Date of Birth</label>
            <input v-model="form.dob" type="date" class="input-field" />
          </div>
          <div class="form-group">
            <label>Nationality</label>
            <input v-model="form.nationality" type="text" class="input-field" />
          </div>
          <div class="form-group">
            <label>Country</label>
            <input v-model="form.country" type="text" class="input-field" />
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
        >
          <div class="form-group">
            <label>Branch</label>
            <select v-model="form.branchId" class="input-field">
              <option value="" disabled>Select Branch</option>
              <option v-for="b in branches" :key="b.id" :value="b.id">
                {{ b.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Start Date</label>
            <input v-model="form.startDate" type="date" class="input-field" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status" class="input-field">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-group">
            <label>Subject Type / Skill</label>
            <input
              v-model="form.subjectType"
              type="text"
              class="input-field"
              placeholder="e.g. Mathematics"
            />
          </div>
          <div class="form-group">
            <label>Assigned Room</label>
            <input v-model="form.room" type="text" class="input-field" />
          </div>
        </div>

        <div class="form-group pb-4">
          <label>Remark</label>
          <textarea
            v-model="form.remark"
            rows="3"
            class="input-field"
            placeholder="Additional notes..."
          ></textarea>
        </div>
      </form>
    </div>

    <template #footer>
      <button
        type="button"
        class="btn-secondary"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
      <button type="submit" form="staff-form" class="btn-primary">
        {{ staff ? "Save Changes" : "Create Staff" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: Boolean,
  staff: Object,
  branches: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const defaultForm = {
  code: "",
  name: "",
  latinName: "",
  position: "Teacher",
  gender: "Male",
  phone: "",
  idCard: "",
  dob: "",
  nationality: "Khmer",
  country: "Cambodia",
  branchId: "",
  startDate: "",
  status: "active",
  remark: "",
  subjectType: "",
  room: "",
};

const form = ref({ ...defaultForm });

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      form.value = props.staff ? { ...props.staff } : { ...defaultForm };
      nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
      });
    }
  },
);

function onSubmit() {
  emit("submit", { ...form.value });
  emit("update:modelValue", false);
}
</script>

<style scoped>
.form-group {
  @apply flex flex-col gap-1.5;
}
.form-group label {
  @apply text-xs font-medium text-slate-700;
}
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all;
}
.btn-primary {
  @apply px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 shadow-sm transition-colors;
}
.btn-secondary {
  @apply px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-300;
}
</style>
