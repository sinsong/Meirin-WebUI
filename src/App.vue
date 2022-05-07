<script setup>
import SideBar from '@/components/layout/sidebar.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">

      <!-- 侧边菜单 -->
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse text-white">
        <!-- 对隐藏来说这个 div 是必要的 -->
        <div class="position-sticky py-3 d-flex flex-column h-100 overflow-auto">
          <side-bar></side-bar>
        </div>
      </nav>

      <!-- 辅助顶栏菜单 -->
      <div class="navbar navbar-dark sticky-top flex-md-nowrap d-md-none app-helper-header p-0">
          <button class="navbar-toggler collapsed ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
      </div>

      <!-- 主要内容 -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>

  <!-- 消息通知 -->
  <notifications position="bottom right" width="30%" :speed="500" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection
{
  background-color: #4e5d71;
  color: #eee;
}

/* 侧边栏 */
.sidebar
{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #22272e;
  border-right: 1px solid #444c56;
}

/* 辅助顶栏 */
.app-helper-header
{
  background-color: transparent;
}

/* 代码块 */
pre
{
  line-height: unset;
  padding: 15px;
  border: 1px solid #444c56;
  border-radius: 5px;
  background-color: #2d333b;
}

/* 消息通知 */
.vue-notification {
  font-size: 16px;
}
</style>
