<script setup>
import { onBeforeMount, ref } from 'vue'
import { getCredential, setCredential } from '@/utils/credential'

const credential = ref("")

onBeforeMount(()=>{
  credential.value = getCredential()
})

function updateCredential() {
  setCredential(credential.value)
}
</script>

<template>
  <h2 class="mt-4">管理凭据</h2>

  <form class="my-3">
    <div class="mb-3">
      <label for="credential" class="col-sm-2 col-form-label">凭据</label>
      <input v-model="credential" type="text" id="credential" class="form-control font-monospace">
    </div>

    <div class="mb-3">
      <button @click.prevent="updateCredential" type="submit" class="btn btn-primary me-2">更新</button>
    </div>
  </form>
</template>
