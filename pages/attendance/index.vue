<template>
  <section class="card">
    <h2 class="title">Attendance</h2>
    <div class="grid" style="grid-template-columns: repeat(3, minmax(0,1fr));">
      <NuxtLink to="/attendance/mark" class="panel">
        <div class="panel-title">Mark Attendance</div>
        <div class="muted">Set status for each student by date</div>
      </NuxtLink>
      <NuxtLink to="/attendance/history" class="panel">
        <div class="panel-title">History</div>
        <div class="muted">Browse records by date range and student</div>
      </NuxtLink>
      <NuxtLink to="/attendance/reports" class="panel">
        <div class="panel-title">Reports</div>
        <div class="muted">Summary of Present, Absent, Late and rate</div>
      </NuxtLink>
    </div>
  </section>
</template>
