<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h } from 'vue';
import { useRoute } from 'vue-router';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeFilled, HomeOutlined, UserOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';

const isCollapsed = ref<boolean>(false);
const router = useRouter();

const onCollapse = (collapsed: boolean, type: string) => {
  // console.log(collapsed, type);
  isCollapsed.value = collapsed;
};

const onBreakpoint = (broken: boolean) => {
  // console.log(broken);
};

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  to?: string
): ItemType {
  return {
    key,
    icon,
    label,
    to
  } as ItemType;
}

function handleClick(info: any) {
  if (info.item && info.item.to) {
    router.push(info.item.to);
  }
}

const navItems: ItemType[] = reactive([
  getItem('Home', '1', h(HomeOutlined), '/'),
  getItem('User', '2', h(UserOutlined), '/user')
]);

</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
      theme="light" breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" :items="navItems" theme="light" mode="inline" @click="handleClick">

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
