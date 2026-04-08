import { reactive } from 'vue';

const SIDEBAR_STATUS_KEY = 'yyx-admin-sidebar-status';

const state = reactive({
  sidebarCollapsed: localStorage.getItem(SIDEBAR_STATUS_KEY) === '0',
  visitedTags: [
    {
      path: '/index',
      title: '仪表盘',
      affix: true
    }
  ]
});

export function useUiState() {
  function toggleSidebar() {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    localStorage.setItem(SIDEBAR_STATUS_KEY, state.sidebarCollapsed ? '0' : '1');
  }

  function addVisitedTag(tag) {
    if (!tag?.path || state.visitedTags.find((item) => item.path === tag.path)) {
      return;
    }
    state.visitedTags.push(tag);
  }

  function removeVisitedTag(path) {
    state.visitedTags = state.visitedTags.filter((item) => item.affix || item.path !== path);
  }

  return {
    state,
    toggleSidebar,
    addVisitedTag,
    removeVisitedTag
  };
}
