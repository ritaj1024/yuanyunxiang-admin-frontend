<template>
  <div class="layout-shell" :class="{ collapsed: ui.state.sidebarCollapsed }">
    <AppSidebar />
    <div class="layout-main">
      <AppHeader />
      <AppTags />
      <section class="layout-content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppTags from '@/components/AppTags.vue';
import { useUiState } from '@/composables/useUiState';

const ui = useUiState();
</script>
