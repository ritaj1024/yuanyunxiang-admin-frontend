<template>
  <div class="tags-bar">
    <router-link
      v-for="tag in ui.state.visitedTags"
      :key="tag.path"
      :to="tag.path"
      class="tag-link"
      :class="{ active: route.path === tag.path }"
    >
      <span>{{ tag.title }}</span>
      <el-icon
        v-if="!tag.affix"
        class="tag-close"
        @click.prevent.stop="closeTag(tag.path)"
      >
        <Close />
      </el-icon>
    </router-link>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useUiState } from '@/composables/useUiState';

const route = useRoute();
const router = useRouter();
const ui = useUiState();

watch(
  () => route.fullPath,
  () => {
    if (route.meta?.title && route.path !== '/login') {
      ui.addVisitedTag({
        path: route.path,
        title: route.meta.title,
        affix: Boolean(route.meta.affix)
      });
    }
  },
  { immediate: true }
);

function closeTag(path) {
  ui.removeVisitedTag(path);
  if (route.path === path) {
    const fallback = ui.state.visitedTags[ui.state.visitedTags.length - 1];
    router.push(fallback?.path || '/index');
  }
}
</script>
