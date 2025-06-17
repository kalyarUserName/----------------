<script lang="ts">
import { RouterLink } from 'vue-router'

export default {
  name: 'Navigation',
  components: {
    RouterLink,
  },
}
</script>

<template>
  <nav class="nav-bar">
    <ul class="nav-list">
      <li><RouterLink to="/" class="nav-link">Таблица</RouterLink></li>
      <li><RouterLink to="/about" class="nav-link">О проекте</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-bar {
  padding: 12px 24px;
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #cc2222;
}

.router-link-active {
  color: #cc2222;
  border-bottom: 2px solid #cc2222;
  padding-bottom: 4px;
}
</style>
