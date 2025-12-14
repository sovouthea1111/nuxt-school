<template>
  <div class="layout" style="grid-template-columns: 1fr">
    <section class="content">
      <main class="container" style="max-width:520px">
        <section class="card">
          <h2 class="title">Sign In</h2>
          <div class="field">
            <label class="label">Email</label>
            <input class="input" type="email" />
          </div>
          <div class="field">
            <label class="label">Password</label>
            <input class="input" type="password" />
          </div>
          <div class="toolbar">
            <button class="btn">Login</button>
            <NuxtLink to="/" class="btn secondary">Cancel</NuxtLink>
          </div>
        </section>
      </main>
    </section>
  </div>
</template>
