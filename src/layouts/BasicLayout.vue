<!--
 * @Author: fangkg
 * @Date: 2022-07-07 10:14:59
 * @LastModifiedBy: fangkg
 * @LastEditTime: 2022-07-07 15:39:43
 * @Description: 
-->
<template>
  <div>
    <!-- <template #menuHeaderRender> -->
    <router-link :to="{ path: '/' }">
      <img src="@/assets/logo.png" />
    </router-link>
    <!-- </template> -->
    <!-- <template #menuContentRender>
      <SideContent />
    </template>
    <template #rightContentRender>
      <RightContent :current-user="currentUser" />
    </template> -->
    <RouterView v-slot="{ Component, route }">
      <transition name="slide-left" mode="out-in">
        <!-- 动画组件需要单节点/单组件才能生效 -->
        <div>
          <component :is="Component" :key="route.path" />
        </div>
      </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useRouter, RouterView, RouterLink } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const proConfig = ref({
  layout: 'mix',
  navTheme: 'light',
  fixedHeader: true,
  fixSiderbar: true,
  splitMenus: true,
});

const currentUser = reactive({
  nickname: 'Admin',
  avatar: 'A',
});

// watch(
//   router.currentRoute,
//   () => {
//     const matched = router.currentRoute.value.matched.concat();
//     state.selectedKeys = matched
//     .filter((r) => r.name !== 'index')
//     .map((r) => r.path);
//     state.openKeys = matched
//     .filter((r) => r.path !== router.currentRoute.value.path)
//     .map((r) => r.path);
//   },
//   {
//     immediate: true,
//   },
// );
</script>
