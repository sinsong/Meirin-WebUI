<script setup>
import { onBeforeMount, ref } from 'vue'

import { requestMeirin } from '@/utils/api'
import { request_template } from '@/utils/concept'

const request_textarea = ref()

const acrequest = ref("")
const acresponse = ref("")

onBeforeMount(() => {
  reset()
})

function request() {
  let requestObject = JSON.parse(acrequest.value)

  requestMeirin(requestObject)
    .then((response) => {
      let status = `${response.status} ${response.statusText}`

      var headers = []
      for (var key in response.headers) {
        headers.push(`${key}: ${response.headers[key]}`)
      }
      let headerline = headers.join('\n')

      let body = JSON.stringify(response.data)
      acresponse.value = `${status}\n${headerline}\n\n${body}`
    })
}

function reset() {
  acrequest.value = request_template
  acresponse.value = ""
}

// 支持 Tab
function textareaKeydown(event) {
  if (event.keyCode == 9) {
    let textarea = request_textarea.value
    let insertValue = '  '

    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, startPos)
      + insertValue
      + textarea.value.substring(endPos, textarea.value.length)

    textarea.selectionStart = startPos + insertValue.length
    textarea.selectionEnd = startPos + insertValue.length

    event.preventDefault()
  }
}
</script>

<template>
  <h2 class="mt-4">请求测试</h2>

  <div class="row">
    <!-- 请求表单 -->
    <form class="col-md-6 my-3">
      <div class="mb-3">
        <label for="name" class="form-label">匹配表达式</label>
        <textarea ref="request_textarea" @keydown="textareaKeydown" v-model="acrequest" id="match" rows="12"
          class="form-control font-monospace"></textarea>
      </div>

      <div class="mb-3">
        <button @click.prevent="request" type="submit" class="btn btn-primary me-2">请求</button>
        <button @click.prevent="reset" type="reset" class="btn btn-secondary">重置</button>
      </div>
    </form>

    <!-- 响应输出 -->
    <div class="col-md-6 my-3">
      <label for="response" class="form-label">响应</label>
      <textarea v-model="acresponse" id="response" rows="12" class="form-control font-monospace"></textarea>
    </div>
  </div>
</template>
