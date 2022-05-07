<script setup>
import { useRouter } from 'vue-router'

import { notify } from '@kyvg/vue3-notification'
import { deletePolicy } from '@/utils/api'

const props = defineProps({
  id     :Number,
  name   :String,
  group  :Number,
  match  :String,
  effect :String,
})

const router = useRouter()

function deleteMe() {
  deletePolicy(props.id)
    .then(() => {
      router.go(0)
    })
    .catch((reason) => {
      notify({
        type: 'error',
        title: "Delete policy failed",
        text: reason.response.data.detail
      })
    })
}
</script>

<template>
  <tr>
    <th scope="row">{{id}}</th>
    <td>{{name}}</td>
    <td>{{group}}</td>
    <td><code>{{match}}</code></td>
    <td><code>{{effect}}</code></td>

    <!-- 操作组 -->
    <td class="text-center">
      <router-link class="btn btn-outline-primary me-2" :to="`/policy/${id}`">编辑</router-link>
      <button @click="deleteMe" class="btn btn-outline-danger">删除</button>
    </td>
  </tr>
</template>
