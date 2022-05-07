<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

import range from 'lodash.range'
import { notify } from '@kyvg/vue3-notification'

import { countMetapolicy, enumMetapolicy } from '@/utils/api'
import MetapolicyItem from '@/components/enum/metapolicy.vue'

const router = useRouter()

// paging
const pagecap = 10
var count = null
const maxpage = ref()
const curpage = ref()

const metapolicies = ref("")

function loadData(page) {
  enumMetapolicy((page - 1) * pagecap, pagecap)
    .then((response) => {
      metapolicies.value = response.data

      // 调整显示
      curpage.value = page
    })
    .catch((reason) => {
      notify({
        type: 'error',
        title: reason.response.status,
        text: reason.response.data.detail
      })
    })
}

onBeforeMount(() => {
  // 先加载数据
  loadData(1)

  // 然后处理分页
  countMetapolicy()
    .then((response) => {
      count = parseInt(response.data)
      maxpage.value = Math.ceil(count / pagecap)
    })
})

function createMetapolicy() {
  router.push({
    name: 'editmetapolicy', // 命名的路由
    params: {
      id: 'create'
    }
  })
}

function generatePagination(currentPage, lastPage) {
  const pack = 10

  let pack_idx = Math.floor((currentPage - 1) / pack)
  let begin = pack_idx * 10 + 1
  let want_last = pack * (pack_idx + 1)
  let last = Math.min(maxpage.value, want_last)

  return range(begin, last + 1)
}
</script>

<template>
  <div class="d-flex mt-4">
    <h2 class="me-auto">元策略</h2>

    <button @click="createMetapolicy" class="btn btn-primary">添加</button>
  </div>
  

  <!-- 列表 -->
  <table class="table table-hover table-dark align-middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">名称</th>
        <th scope="col">匹配表达式</th>
        <th scope="col">模式</th>
        <th scope="col" class="text-center">操作</th>
      </tr>
    </thead>
    <tbody>
      <metapolicy-item v-for="metapolicy in metapolicies" :key="metapolicy.id" :id="metapolicy.id"
        :name="metapolicy.name" :match="metapolicy.match" :mode="metapolicy.mode">
      </metapolicy-item>
    </tbody>
  </table>

  <!-- 分页 -->
  <ul class="pagination me-auto mb-0">
    <li class="page-item" :class="{disabled: curpage === 1}">
      <button @click="loadData(curpage - 1)" class="page-link" aria-label="上一页">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>

    <li v-for="page in generatePagination(curpage, maxpage)" class="page-item" :class="{active: curpage === page}">
      <button @click="loadData(page)" class="page-link">{{page}}</button>
    </li>

    <li class="page-item" :class="{disabled: curpage === maxpage}">
      <button @click="loadData(curpage + 1)" href="#" class="page-link" aria-label="下一页">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</template>
