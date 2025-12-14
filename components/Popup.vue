<template>
  <div v-if="open" class="popup-overlay" @click.self="emit('close')">
    <div class="popup">
      <div class="popup-header">
        <slot name="header">
          <div class="modal-title">{{ title }}</div>
        </slot>
        <button class="icon-btn" aria-label="Close" title="Close" @click="emit('close')">×</button>
      </div>
      <div class="popup-body">
        <slot />
      </div>
      <div class="popup-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; title?: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>
