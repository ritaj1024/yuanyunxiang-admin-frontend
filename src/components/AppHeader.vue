<template>
  <header class="navbar">
    <button id="hamburger-container" class="hamburger-container" @click="ui.toggleSidebar">
      <el-icon><Fold v-if="!ui.state.sidebarCollapsed" /><Expand v-else /></el-icon>
    </button>

    <div class="breadcrumb-container">
      <span>{{ route.meta.moduleTitle || '缘·云香后台管理系统' }}</span>
      <el-icon><ArrowRight /></el-icon>
      <span class="current">{{ route.meta.title || '首页' }}</span>
    </div>

    <div class="right-menu">
      <div class="right-menu-item hover-effect">布局大小</div>

      <div class="avatar-container">
        <el-dropdown class="right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <div class="info-wrapper">
              <div class="user-avatar">{{ user.displayName.slice(0, 1).toUpperCase() }}</div>
              <span class="user-name">{{ user.displayName }}</span>
              <el-icon><CaretBottom /></el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ArrowRight, CaretBottom, Expand, Fold } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { getCurrentUser, logout } from '@/composables/useAuth';
import { useUiState } from '@/composables/useUiState';

const router = useRouter();
const route = useRoute();
const ui = useUiState();
const user = getCurrentUser();

function handleLogout() {
  logout();
  router.push('/login');
}
</script>
