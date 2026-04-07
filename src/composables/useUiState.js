import { reactive } from 'vue';

const state = reactive({
  sidebarCollapsed: false,
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
