<template>
  <BaseModal
    :model-value="modelValue"
    :title="student ? 'Edit Student' : 'New Student Member'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
      <form
        id="student-form"
        class="space-y-6 py-2 pr-2"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="form-group">
            <label>Code *</label>
            <input
              v-model="form.code"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label>Name (Khmer) *</label>
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

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Place of Birth
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="form-group">
              <label>Province</label>
              <select
                v-model="form.province"
                class="input-field"
                @change="onProvinceChange"
              >
                <option value="">Select Province</option>
                <option v-for="p in provinceList" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>District</label>
              <select
                v-model="form.district"
                class="input-field"
                :disabled="!form.province"
                @change="onDistrictChange"
              >
                <option value="">Select District</option>
                <option v-for="d in districtList" :key="d" :value="d">
                  {{ d }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Commune</label>
              <select
                v-model="form.commune"
                class="input-field"
                :disabled="!form.district"
              >
                <option value="">Select Commune</option>
                <option v-for="c in communeList" :key="c" :value="c">
                  {{ c }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Village</label>
              <input
                v-model="form.village"
                type="text"
                class="input-field"
                :disabled="!form.commune"
                placeholder="Village name"
              />
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
        >
          <div class="form-group">
            <label>Gender</label>
            <select v-model="form.gender" class="input-field">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Grade</label>
            <input v-model="form.grade" type="text" class="input-field" />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="form.status" class="input-field">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
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
      <button type="submit" form="student-form" class="btn-primary">
        {{ student ? "Update Student" : "Create Student" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({ modelValue: Boolean, student: Object });
const emit = defineEmits(["update:modelValue", "submit"]);

// Mock Location Data
const locationData = {
  "Phnom Penh": {
    "Chamkar Mon": ["Tonle Bassac", "Boeng Keng Kang I"],
    "Daun Penh": ["Phsar Thmey", "Chey Chumneah"],
  },
  "Siem Reap": {
    "Srei Snam": ["Chrouy Neang Nguon", "Klaeng Hay"],
    "Svay Leu": ["Boeng Mealea", "Kantout"],
  },
};

const provinceList = Object.keys(locationData);

const defaultForm = {
  code: "",
  name: "",
  latinName: "",
  gender: "Male",
  province: "",
  district: "",
  commune: "",
  village: "",
  grade: "",
  status: "active",
};

const form = ref({ ...defaultForm });

// Computed lists for dependent dropdowns
const districtList = computed(() => {
  return form.value.province
    ? Object.keys(locationData[form.value.province] || {})
    : [];
});

const communeList = computed(() => {
  if (!form.value.province || !form.value.district) return [];
  return locationData[form.value.province][form.value.district] || [];
});

// Change Handlers to clear children
function onProvinceChange() {
  form.value.district = "";
  form.value.commune = "";
  form.value.village = "";
}

function onDistrictChange() {
  form.value.commune = "";
  form.value.village = "";
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen)
      form.value = props.student ? { ...props.student } : { ...defaultForm };
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
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white;
}
.input-field:disabled {
  @apply bg-gray-50 opacity-60 cursor-not-allowed;
}
.btn-primary {
  @apply px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm;
}
.btn-secondary {
  @apply px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
</style>
