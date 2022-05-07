<template>
  <!-- 系统名字 -->
  <router-link class="text-white text-decoration-none" to="/">
    <span class="fs-4">Meirin</span>
  </router-link>

  <hr>

  <!-- 菜单 -->
  <ul class="nav nav-pills flex-column mb-auto">
    <li>
      <router-link class="nav-link" to="/" exact-active-class="active">主页</router-link>
    </li>
    <li>
      <router-link class="nav-link" to="/metapolicy" exact-active-class="active">元策略</router-link>
    </li>
    <li>
      <router-link class="nav-link" to="/policy" exact-active-class="active">策略</router-link>
    </li>
    <li>
      <router-link class="nav-link" to="/dsl" exact-active-class="active">DSL 测试</router-link>
    </li>
    <li>
      <router-link class="nav-link" to="/request">请求测试</router-link>
    </li>
  </ul>

  <hr>

  <!-- for active background -->
  <div class="nav-pills">
      <router-link class="nav-link" to="/setting" exact-active-class="active">管理凭证</router-link>
  </div>
</template>
