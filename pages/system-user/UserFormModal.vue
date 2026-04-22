<template>
  <BaseModal
    :model-value="modelValue"
    :title="user ? 'Edit System User' : 'Create New System User'"
    size="2xl"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="max-h-[75vh] overflow-y-auto px-1 custom-scrollbar">
      <form
        id="user-form"
        class="space-y-6 py-2 pr-2"
        @submit.prevent="onSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Full Name *</label
            >
            <input
              v-model="form.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              placeholder="e.g. Hoeun Sovouthea"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-slate-700"
              >Email Address *</label
            >
            <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              placeholder="username@idea.edu.kh"
              required
            />
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Security & Credentials
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5 relative">
              <label class="text-xs font-medium text-slate-700"
                >Password
                {{ user ? "(Leave blank to keep current)" : "*" }}</label
              >
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white pr-10"
                  :required="!user"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600"
                >
                  <i
                    :data-lucide="showPassword ? 'eye-off' : 'eye'"
                    class="w-4 h-4"
                  ></i>
                </button>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Account Status</label
              >
              <select
                v-model="form.isActive"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
              >
                <option :value="true">Active / Enabled</option>
                <option :value="false">Disabled / Locked</option>
              </select>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <h3
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4"
          >
            Permissions & Access
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >User Role *</label
              >
              <select
                v-model="form.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
                required
              >
                <option value="">Select a Role</option>
                <option value="Super Admin">Super Admin (Full Access)</option>
                <option value="Admin">Admin</option>
                <option value="Accountant">Accountant</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-slate-700"
                >Assigned Branch *</label
              >
              <select
                v-model="form.branchId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all bg-white"
                required
              >
                <option :value="0">All Branches</option>
                <option v-for="b in branches" :key="b.id" :value="b.id">
                  {{ b.name }}
                </option>
              </select>
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
        form="user-form"
        class="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
      >
        {{ user ? "Update User" : "Create User" }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from "vue";
import BaseModal from "~/components/BaseModal.vue";

const props = defineProps({
  modelValue: Boolean,
  user: Object,
  branches: Array,
});

const emit = defineEmits(["update:modelValue", "submit"]);

const showPassword = ref(false);

const defaultForm = {
  name: "",
  email: "",
  password: "",
  role: "",
  branchId: 0,
  isActive: true,
};

const form = ref({ ...defaultForm });

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      form.value = props.user
        ? { ...props.user, password: "" }
        : { ...defaultForm };
      showPassword.value = false;
    }
  },
);

const onSubmit = () => {
  emit("submit", { ...form.value });
  emit("update:modelValue", false);
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 rounded-full;
}
</style>
