<template>
  <form @submit.prevent="onSubmit">
    <div class="form-grid">
      <div style="grid-column: 1 / -1">
        <div class="section-title">Profile</div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" :class="{ invalid: !valid.name }" v-model="local.name" placeholder="Teacher full name" />
        <div class="error" v-if="!valid.name">Name is required</div>
      </div>
      <div class="field">
        <label class="label">Subject</label>
        <input class="input" v-model="local.subject" placeholder="Subject taught" />
      </div>
      <div class="field">
        <label class="label">Phone</label>
        <input class="input" v-model="local.phone" placeholder="Primary phone" />
      </div>
      <div class="field">
        <label class="label">Email</label>
        <input class="input" type="email" v-model="local.email" placeholder="Primary email" />
      </div>
      <div style="grid-column: 1 / -1">
        <div class="section-title">Employment</div>
      </div>
      <div class="field">
        <label class="label">Hire Date</label>
        <input class="date" type="date" v-model="local.hireDate" />
      </div>
      <div class="field" style="grid-column: 1 / -1">
        <label class="label">Address</label>
        <input class="input" v-model="local.address" placeholder="City or district" />
      </div>
    </div>
    <div class="toolbar">
      <button class="btn" type="submit">Save</button>
      <button class="btn secondary" type="button" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
type TeacherModel = {
  name: string
  subject: string
  phone: string
  email: string
  hireDate: string
  address: string
}
const props = defineProps<{ modelValue: TeacherModel }>()
const emit = defineEmits<{ (e: 'update:model-value', v: TeacherModel): void; (e: 'submit'): void; (e: 'cancel'): void }>()
const local = reactive<TeacherModel>({ ...props.modelValue })
const valid = reactive({
  name: computed(() => local.name.trim().length > 0)
})
watch(() => props.modelValue, v => {
  Object.assign(local, v)
})
watch(local, v => {
  emit('update:model-value', { ...v })
}, { deep: true })
function onSubmit() {
  emit('submit')
}
</script>
