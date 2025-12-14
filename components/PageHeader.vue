<template>
  <div class="page-header">
    <div class="breadcrumbs">
      <NuxtLink v-for="(b, i) in breadcrumbs" :key="i" :to="b.to || '#'" class="crumb" :class="{ inactive: !b.to }">
        {{ b.label }}
      </NuxtLink>
    </div>
    <h2 class="page-title">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
type Crumb = { label: string; to?: string }
const props = defineProps<{ title: string; breadcrumbs: Crumb[] }>()
</script>
