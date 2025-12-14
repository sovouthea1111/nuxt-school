<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="logo">🛠️</div><div class="brand-text">Admin</div></div>
      <nav class="side-nav">
        <NuxtLink to="/" class="nav-link">Dashboard</NuxtLink>
        <NuxtLink to="/students" class="nav-link">Students</NuxtLink>
        <NuxtLink to="/teachers" class="nav-link">Teachers</NuxtLink>
        <NuxtLink to="/classes" class="nav-link">Classes</NuxtLink>
        <NuxtLink to="/subjects" class="nav-link">Subjects</NuxtLink>
        <NuxtLink to="/attendance" class="nav-link">Attendance</NuxtLink>
        <NuxtLink to="/grades" class="nav-link">Grades</NuxtLink>
        <NuxtLink to="/exams" class="nav-link">Exams</NuxtLink>
        <NuxtLink to="/payments" class="nav-link">Payments</NuxtLink>
        <NuxtLink to="/announcements" class="nav-link">Announcements</NuxtLink>
        <NuxtLink to="/reports" class="nav-link">Reports</NuxtLink>
      </nav>
    </aside>
    <section class="content">
      <header class="topbar"><input class="search" placeholder="Search..." /></header>
      <main class="container container--wide"><NuxtPage /></main>
    </section>
  </div>
</template>
