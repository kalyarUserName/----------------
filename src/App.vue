<script setup lang="ts">
import { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    hoverColor: '#E6F4FF',
    primaryColor: '#016FED',
    primaryColorHover: '#005ECC',
    primaryColorPressed: '#004AB3',
    primaryColorSuppl: '#016FED',
  },

  DataTable: {
    thColor: '#4A90E2',
    thBorderBottom: '1px solid #E0E0E0',
  },
}
</script>

<template>
  <header class="app-header">
    <Navigation> </Navigation>
  </header>

  <n-config-provider :theme-overrides="themeOverrides">
    <main class="main-content">
      <RouterView />
    </main>
  </n-config-provider>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
