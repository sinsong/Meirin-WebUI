<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { notify } from '@kyvg/vue3-notification'

import { createMetapolicy, getMetapolicy, patchMetapolicy } from '@/utils/api'
import { metapolicy_mode } from '@/utils/concept'

const route = useRoute()
const router = useRouter()

const create = ref(false)
const disabled = ref(true)
const mpid = ref()
const metapolicy = ref({id: null, name: '', match: '', mode: ''})

// lifecycle handler
async function initializeData() {
  mpid.value = route.params.id
  // 离开页面时会先触发钩子，然后页面更换
  if (mpid.value === undefined) {
    return
  }
  // 创建逻辑
  if (mpid.value === 'create') {
    create.value = true
    disabled.value = false
    return
  }

  try {
    let response = await getMetapolicy(mpid.value)
    metapolicy.value = response.data
    disabled.value = false
  }catch(err) {
    mpid.value = "不存在"
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
    path: '/metapolicy'
  })
}

function patchMe() {
  let { id, ...patchObject } = metapolicy.value

  patchMetapolicy(mpid.value, patchObject)
    .then(()=>{
      backtoEnumList()
    })
    .catch((reason)=>{
      notify({
        type: 'error',
        title: "Patch metapolicy failed",
        text: reason.response.data.detail
      })
    })
}

function createMe() {
  let { id, ...createObject } = metapolicy.value

  createMetapolicy(createObject)
    .then(() => {
      backtoEnumList()
    })
    .catch((reason) => {
      notify({
        type: 'error',
        title: "Create metapolicy failed",
        text: reason.response.data.detail
      })
    })
}
</script>

<template>
  <h2 class="mt-4">元策略 #{{mpid}}</h2>

  <form class="my-3">
    <div class="mb-3 row">
      <label for="name" class="col-sm-2 col-form-label">名字</label>
      <div class="col-sm-10">
        <input v-model="metapolicy.name" type="text" id="name" class="form-control" :disabled="disabled">
      </div>
    </div>

    <div class="mb-3 row">
      <label for="mode" class="col-sm-2 col-form-label">匹配模式</label>
      <div class="col-sm-10">
        <select id="mode" class="form-select" v-model="metapolicy.mode" :disabled="disabled">
          <option v-once v-for="mode in metapolicy_mode" :key="mode">{{mode}}</option>
        </select>
      </div>
    </div>

    <div class="mb-3">
      <label for="match" class="form-label">匹配表达式</label>
      <textarea v-model="metapolicy.match" id="match" class="form-control font-monospace" :disabled="disabled"></textarea>
    </div>

    <div class="mb-3">
      <button v-if="create" @click.prevent="createMe" type="submit" class="btn btn-primary me-2">创建</button>
      <button v-else @click.prevent="patchMe" type="submit" class="btn btn-primary me-2" :disabled="disabled">修改</button>

      <button @click="backtoEnumList" class="btn btn-secondary">取消</button>
    </div>
  </form>
</template>
