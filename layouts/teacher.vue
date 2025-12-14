<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="logo">👩‍🏫</div><div class="brand-text">Teacher</div></div>
      <nav class="side-nav">
        <NuxtLink to="/classes" class="nav-link">Classes</NuxtLink>
        <NuxtLink to="/subjects" class="nav-link">Subjects</NuxtLink>
        <NuxtLink to="/attendance" class="nav-link">Attendance</NuxtLink>
        <NuxtLink to="/grades" class="nav-link">Grades</NuxtLink>
        <NuxtLink to="/exams" class="nav-link">Exams</NuxtLink>
        <NuxtLink to="/reports" class="nav-link">Reports</NuxtLink>
      </nav>
    </aside>
    <section class="content">
      <header class="topbar"><input class="search" placeholder="Search..." /></header>
      <main class="container container--wide"><NuxtPage /></main>
    </section>
  </div>
</template>
