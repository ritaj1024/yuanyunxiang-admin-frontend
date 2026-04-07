<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img class="sidebar-logo-image" src="/logo.png" alt="logo" />
      <div v-if="!ui.state.sidebarCollapsed" class="sidebar-logo-text">
        <strong>缘·云香后台管理系统</strong>
      </div>
    </div>

    <el-scrollbar class="sidebar-scroll">
      <div
        v-for="module in visibleModules"
        :key="module.id"
        class="sidebar-group"
      >
        <div v-if="!ui.state.sidebarCollapsed" class="sidebar-group-title">{{ module.title }}</div>
        <router-link
          v-for="page in module.pages"
          :key="page.id"
          :to="page.path"
          class="sidebar-link"
          :class="{ active: isActive(page) }"
        >
          <el-icon><component :is="module.icon" /></el-icon>
          <span v-if="!ui.state.sidebarCollapsed">{{ page.title }}</span>
        </router-link>
      </div>
    </el-scrollbar>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { menuModules } from '@/data/modules';
import { useUiState } from '@/composables/useUiState';

const route = useRoute();
const ui = useUiState();

const visibleModules = computed(() =>
  menuModules.map((module) => ({
    ...module,
    pages: module.pages.filter((page) => !page.hidden)
  }))
);

function isActive(page) {
  if (page.path === route.path) {
    return true;
  }
  return route.meta.activeMenu === page.path;
}
</script>
