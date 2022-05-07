<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { notify } from '@kyvg/vue3-notification'

import { policy_effect } from '@/utils/concept'
import { createPolicy, getPolicy, patchPolicy } from '@/utils/api'

const route = useRoute()
const router = useRouter()

const create = ref(false)
const disabled = ref(true)
const pid = ref()
const policy = ref({id:null, name:'', group:'',match:'',effect:''})

// lifecycle handler
async function initializeData() {
  pid.value = route.params.id
  // 离开页面时会先触发钩子，然后页面更换
  if (pid.value === undefined) {
    return
  }
  // 创建逻辑
  if (pid.value === 'create') {
    create.value = true
    disabled.value = false
    return
  }

  try {
    let response = await getPolicy(pid.value)
    policy.value = response.data
    disabled.value = false
  } catch(err) {
    pid.value = "不存在"
    disabled.value = true
  }
}

// lifecycle register
onBeforeMount(initializeData)
watch(
  () => route.params,
  initializeData
)

function backtoEnumList() {
  router.replace({
    path: '/policy'
  })
}

function patchMe() {
  let { id, ...patchObject } = policy.value

  patchPolicy(pid.value, patchObject)
    .then(() => {
      backtoEnumList()
    })
    .catch((reason) => {
      notify({
        type: 'error',
        title: "Delete policy failed",
        text: reason.response.data.detail
      })
    })
}

function createMe() {
  let { id, ...createObject } = policy.value

  createPolicy(createObject)
    .then(() => {
      backtoEnumList()
    })
    .catch((reason) => {
      notify({
        type: 'error',
        title: "Create policy failed",
        text: reason.response.data.detail
      })
    })
}
</script>

<template>
  <h2 class="mt-4">策略 #{{pid}}</h2>

  <form class="my-3">
    <div class="mb-3 row">
      <label for="name" class="col-sm-2 col-form-label">名字</label>
      <div class="col-sm-10">
        <input v-model="policy.name" type="text" id="name" class="form-control" :disabled="disabled">
      </div>
    </div>

    <div class="mb-3 row">
      <label for="group" class="col-sm-2 col-form-label">元策略</label>
      <div class="col-sm-10">
        <input v-model="policy.group" type="text" id="group" class="form-control" :disabled="disabled">
      </div>
    </div>

    <div class="mb-3 row">
      <label for="effect" class="col-sm-2 col-form-label">效果</label>
      <div class="col-sm-10">
        <!-- <input  type="text" id="effect" class="form-control"> -->
        <select v-model="policy.effect" id="effect" class="form-select" :disabled="disabled">
          <option v-once v-for="effect in policy_effect" :key="effect">{{effect}}</option>
        </select>
      </div>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">匹配表达式</label>
      <textarea v-model="policy.match" id="match" class="form-control font-monospace" :disabled="disabled"></textarea>
    </div>

    <div class="mb-3">
      <button v-if="create" @click.prevent="createMe" type="submit" class="btn btn-primary me-2">创建</button>
      <button v-else @click.prevent="patchMe" type="submit" class="btn btn-primary me-2" :disabled="disabled">修改</button>

      <button @click="backtoEnumList" class="btn btn-secondary">取消</button>
    </div>
  </form>
</template>
