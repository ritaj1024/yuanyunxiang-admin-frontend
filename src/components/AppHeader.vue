<template>
  <header class="header-bar">
    <div class="header-left">
      <button class="header-hamburger" @click="ui.toggleSidebar">
        <el-icon><Fold v-if="!ui.state.sidebarCollapsed" /><Expand v-else /></el-icon>
      </button>
      <div class="header-breadcrumb">
        <span>{{ route.meta.moduleTitle || '缘·云香后台管理系统' }}</span>
        <el-icon><ArrowRight /></el-icon>
        <span class="current">{{ route.meta.title || '首页' }}</span>
      </div>
    </div>

    <div class="header-right">
      <el-button text>布局大小</el-button>
      <el-dropdown>
        <div class="header-user">
          <div class="header-user-avatar">{{ user.displayName.slice(0, 1).toUpperCase() }}</div>
          <div class="header-user-meta">
            <strong>{{ user.displayName }}</strong>
            <span>{{ user.role }}</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import { ArrowRight, Expand, Fold } from '@element-plus/icons-vue';
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
