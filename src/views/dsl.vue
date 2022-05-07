<script setup>
import { ref } from 'vue'

import { testExpression } from '@/utils/api'

const expression = ref("")
const output = ref("")

function testDSL() {
  testExpression(expression.value)
    .then((response) => {
      output.value = response.data
    })
}
</script>

<template>
  <h2 class="mt-4">DSL 测试</h2>

  <!-- 输入表单 -->
  <form class="my-3">
    <div class="mb-3">
      <label for="name" class="form-label">匹配表达式</label>
      <textarea v-model="expression" id="match" class="form-control font-monospace"></textarea>
    </div>

    <div class="mb-3">
      <button @click.prevent="testDSL" type="submit" class="btn btn-primary me-2">测试</button>
      <button type="reset" class="btn btn-secondary">重置</button>
    </div>
  </form>

  <!-- 输出 -->
  <div class="mb-3">
    <label for="output" class="form-label">输出</label>
    <textarea v-model="output" id="output" rows="18" class="form-control font-monospace"></textarea>
  </div>
</template>
