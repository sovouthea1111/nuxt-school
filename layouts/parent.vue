<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="logo">👨‍👩‍👧‍👦</div><div class="brand-text">Parent</div></div>
      <nav class="side-nav">
        <NuxtLink to="/parents/dashboard" class="nav-link">Dashboard</NuxtLink>
        <NuxtLink to="/parents" class="nav-link">Overview</NuxtLink>
        <NuxtLink to="/payments" class="nav-link">Payments</NuxtLink>
        <NuxtLink to="/reports/performance" class="nav-link">Performance</NuxtLink>
      </nav>
    </aside>
    <section class="content">
      <header class="topbar"><input class="search" placeholder="Search..." /></header>
      <main class="container container--wide"><NuxtPage /></main>
    </section>
  </div>
</template>
