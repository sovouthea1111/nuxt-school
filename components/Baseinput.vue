<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label
      v-if="label"
      class="block text-xs font-medium"
      :class="hasError ? 'text-rose-600' : 'text-slate-700'"
    >
      {{ label }}
    </label>

    <div class="relative flex items-center w-full">
      <template v-if="prefix">
        <span class="absolute left-3 text-slate-400 text-sm">{{ prefix }}</span>
      </template>
      <template v-else-if="icon">
        <iconify-icon
          :icon="icon"
          stroke-width="1.5"
          class="absolute left-3 text-slate-400 text-lg"
        />
      </template>

      <input
        v-bind="$attrs"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :class="[
          'w-full py-2 bg-white border rounded-md text-sm outline-none transition-all placeholder:text-slate-400',
          hasError
            ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-rose-900 pr-10'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900',
          icon || prefix ? 'pl-10' : 'pl-3',
          suffix || type === 'password' || hasError ? 'pr-10' : 'pr-3',
          suffix ? 'pr-14' : '',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <template v-if="hasError">
        <iconify-icon
          icon="solar:danger-circle-linear"
          stroke-width="1.5"
          class="absolute right-3 text-rose-500 text-lg"
        />
      </template>

      <template v-else-if="type === 'password'">
        <button
          type="button"
          class="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors flex items-center"
          @click="showPassword = !showPassword"
        >
          <iconify-icon
            :icon="
              showPassword ? 'solar:eye-closed-linear' : 'solar:eye-linear'
            "
            stroke-width="1.5"
            class="text-lg"
          />
        </button>
      </template>

      <template v-else-if="suffix">
        <span
          class="absolute right-3 text-slate-400 text-xs font-medium uppercase"
          >{{ suffix }}</span
        >
      </template>
    </div>

    <span
      v-if="hasError && errorMessage"
      class="text-[10px] text-rose-500 font-medium mt-0.5"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password")
    return showPassword.value ? "text" : "password";
  return props.type;
});
</script>
