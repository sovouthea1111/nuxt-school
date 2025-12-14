<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="logo">📚</div>
        <div class="brand-text">Idea International</div>
      </div>
      <nav class="side-nav">
        <NuxtLink to="/" class="nav-link">Dashboard</NuxtLink>
        <div class="nav-group">
          <button class="nav-trigger" @click="studentsOpen = !studentsOpen">
            <span>Students</span>
            <span class="chev" :class="{ open: studentsOpen }">▸</span>
          </button>
          <div class="nav-sub" v-show="studentsOpen">
            <NuxtLink to="/students" class="nav-sublink">Students</NuxtLink>
            <NuxtLink to="/students/report-card/abc" class="nav-sublink">Report Card</NuxtLink>
          </div>
        </div>
        <div class="nav-group">
          <button class="nav-trigger" @click="teachersOpen = !teachersOpen">
            <span>Teachers</span>
            <span class="chev" :class="{ open: teachersOpen }">▸</span>
          </button>
          <div class="nav-sub" v-show="teachersOpen">
            <NuxtLink to="/teachers" class="nav-sublink">Teachers</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/classes" class="nav-link">Classes</NuxtLink>
        <NuxtLink to="/subjects" class="nav-link">Subjects</NuxtLink>
        <div class="nav-group">
          <button class="nav-trigger" @click="attendanceOpen = !attendanceOpen">
            <span>Attendance</span>
            <span class="chev" :class="{ open: attendanceOpen }">▸</span>
          </button>
          <div class="nav-sub" v-show="attendanceOpen">
            <NuxtLink to="/attendance/mark" class="nav-sublink">Mark</NuxtLink>
            <NuxtLink to="/attendance/history" class="nav-sublink">History</NuxtLink>
            <NuxtLink to="/attendance/reports" class="nav-sublink">Reports</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/grades" class="nav-link">Grades</NuxtLink>
        <div class="nav-group">
          <button class="nav-trigger" @click="examsOpen = !examsOpen">
            <span>Exams</span>
            <span class="chev" :class="{ open: examsOpen }">▸</span>
          </button>
          <div class="nav-sub" v-show="examsOpen">
            <NuxtLink to="/exams" class="nav-sublink">Overview</NuxtLink>
            <NuxtLink to="/exams/reports" class="nav-sublink">Reports</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/payments" class="nav-link">Payments</NuxtLink>
        <NuxtLink to="/announcements" class="nav-link">Announcements</NuxtLink>
        <NuxtLink to="/reports" class="nav-link">Reports</NuxtLink>
        <NuxtLink to="/profile" class="nav-link">Account</NuxtLink>
        <NuxtLink to="/parents" class="nav-link">Parents</NuxtLink>
      </nav>
    </aside>
    <section class="content">
      <header class="topbar">
        <input class="search" placeholder="What do you want to find?" />
        <div class="topbar-actions">
          <button class="icon-btn">🔔</button>
          <button class="icon-btn">💬</button>
          <div class="avatar-chip">
            <div class="avatar">P</div>
            <div>
              <div style="font-weight:700">Priscilla Lily</div>
              <div class="help">Admin</div>
            </div>
            <span>▾</span>
          </div>
        </div>
      </header>
      <main class="container container--wide">
        <NuxtPage />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const studentsOpen = ref(true)
const teachersOpen = ref(false)
const attendanceOpen = ref(false)
const examsOpen = ref(false)
</script>
