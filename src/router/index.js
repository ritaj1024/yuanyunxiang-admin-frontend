import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/composables/useAuth';
import { allPages } from '@/data/modules';

const pageRoutes = allPages.map((page) => ({
  path: page.path.replace(/^\//, ''),
  component: page.type === 'dashboard'
    ? () => import('@/views/dashboard/index.vue')
    : () => import('@/views/generic/index.vue'),
  meta: {
    title: page.title,
    moduleTitle: page.moduleTitle,
    pageId: page.id,
    hidden: Boolean(page.hidden),
    activeMenu: page.activeMenu,
    affix: page.id === 'dashboard'
  }
}));

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { public: true, title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    children: pageRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/index'
  }
];

const router = createRouter({
  history: createWebHistory('/admin'),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    if (to.path === '/login' && isLoggedIn()) {
      next('/index');
      return;
    }
    next();
    return;
  }

  if (!isLoggedIn()) {
    next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
    return;
  }

  next();
});

export default router;
