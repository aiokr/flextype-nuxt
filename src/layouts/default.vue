<script lang="ts" setup>
import { ref } from 'vue';

const isCollapsed = ref<boolean>(false);

const onCollapse = (collapsed: boolean, type: string) => {
  // console.log(collapsed, type);
  isCollapsed.value = collapsed;
};

const onBreakpoint = (broken: boolean) => {
  // console.log(broken);
};

const selectedKeys = ref<string[]>(['1']);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }" theme="light"
      breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: isCollapsed ? '0' : '200px' }">
      <a-layout-content :style="{ margin: '16px 12px 0' }">
        <a-breadcrumb style="margin-bottom: 12px;">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '16px', background: '#fff', minHeight: '360px' }">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        FlexType © 2024 Tripper Press
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.site-layout-sub-header-background {
  background: #fff;
}

.site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
  background: #141414;
}
</style>

<style>
body {
  margin: 0px;
}
</style>
