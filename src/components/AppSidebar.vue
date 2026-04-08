<template>
  <aside class="sidebar-container has-logo">
    <div class="sidebar-logo-container" :class="{ collapse: ui.state.sidebarCollapsed }">
      <router-link class="sidebar-logo-link" to="/index">
        <img class="sidebar-logo" src="/logo.png" alt="logo" />
        <h1 v-if="!ui.state.sidebarCollapsed" class="sidebar-title">缘·云香后台管理系统</h1>
      </router-link>
    </div>

    <el-scrollbar class="sidebar-scroll" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="ui.state.sidebarCollapsed"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        class="theme-dark"
      >
        <template v-for="module in visibleModules" :key="module.id">
          <template v-if="module.pages.length === 1">
            <el-menu-item :index="module.pages[0].path" class="submenu-title-noDropdown">
              <el-icon><component :is="module.icon" /></el-icon>
              <template #title>
                <span class="menu-title" :title="getTitleTooltip(module.pages[0].title)">{{ module.pages[0].title }}</span>
              </template>
            </el-menu-item>
          </template>

          <el-sub-menu v-else :index="module.id" teleported>
            <template #title>
              <el-icon><component :is="module.icon" /></el-icon>
              <span class="menu-title" :title="getTitleTooltip(module.title)">{{ module.title }}</span>
            </template>

            <template v-for="page in module.pages" :key="page.id">
              <el-menu-item :index="page.path">
                <span class="menu-title" :title="getTitleTooltip(page.title)">{{ page.title }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
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
  menuModules
    .map((module) => ({
      ...module,
      pages: module.pages.filter((page) => !page.hidden)
    }))
    .filter((module) => module.pages.length > 0)
);

const activeMenu = computed(() => route.meta.activeMenu || route.path);

function getTitleTooltip(title) {
  return title.length > 5 ? title : '';
}
</script>
