<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="onClose"
        />

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-show="modelValue"
            class="relative bg-white rounded-xl shadow-xl z-10 w-full flex flex-col overflow-hidden"
            :class="[sizeClass, 'max-h-[90vh]']"
          >
            <div
              class="flex-none flex items-center justify-between px-6 py-4 border-b border-gray-100"
            >
              <h2 class="text-base font-semibold text-slate-900">
                <slot name="title">{{ title }}</slot>
              </h2>
              <button
                type="button"
                @click="onClose"
                class="text-gray-400 hover:text-slate-900"
              >
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
              <slot />
            </div>

            <div
              v-if="$slots.footer"
              class="flex-none px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, nextTick } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "" },
  size: { type: String, default: "md" },
  closeOnOverlay: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue", "close"]);

const sizeClass = computed(
  () =>
    ({
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
    })[props.size] ?? "max-w-md",
);

function onClose() {
  if (!props.closeOnOverlay) return;
  emit("update:modelValue", false);
  emit("close");
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
