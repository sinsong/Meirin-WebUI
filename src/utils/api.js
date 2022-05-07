import axios from "axios"
import { getCredential } from "./credential"

// -----------------------------------------------------------------------------
// Unprivileged API
// -----------------------------------------------------------------------------

const meirin = axios.create({
  baseURL: meirin_api_baseurl
})

// Request

/**
 * 请求访问
 * @param {Object} request 请求对象
 * @returns 响应
 */
export function requestMeirin(request) {
  return meirin.post('/enforce', request)
}

// -----------------------------------------------------------------------------
// Privileged API
// -----------------------------------------------------------------------------

const meirinPrivileged = axios.create({
  baseURL: meirin_api_baseurl,

  // axios 的 headers 完全是静态的
  // 下面这玩意会把 `() => getCredential` 塞到 HTTP 头中发过去
  // headers: {
  //   'X-Meirin-Credential': () => getCredential()
  // },
})

// 动态添加凭据的拦截器
meirinPrivileged.interceptors.request.use((config) => {
  config.headers['X-Meirin-Credential'] = getCredential()
  return config
})

// Enum

/**
 * 枚举元策略
 * @param {Number} offset 偏移
 * @param {Number} limit  限制
 * @returns 元策略列表
 */
export function enumMetapolicy(offset, limit) {
  return meirinPrivileged.get('/metapolicy/', {
    params: {
      offset,
      limit
    }
  })
}

/**
 * 枚举策略
 * @param {Number} offset 偏移
 * @param {Number} limit  限制
 * @returns 策略列表
 */
export function enumPolicy(offset, limit) {
  return meirinPrivileged.get('/policy/', {
    params: {
      offset,
      limit
    }
  })
}

// Create

/**
 * 创建元策略
 * @param {Object} metapolicy 元策略
 * @returns 创建的元策略
 */
export function createMetapolicy(metapolicy) {
  return meirinPrivileged.post('/metapolicy/', metapolicy)
}

/**
 * 创建策略
 * @param {Object} policy 策略
 * @returns 创建的策略
 */
export function createPolicy(policy) {
  return meirinPrivileged.post('/policy/', policy)
}

// Delete

/**
 * 删除元策略
 * @param {Number} id 元策略 ID
 * @returns 响应
 */
export function deleteMetapolicy(id) {
  return meirinPrivileged.delete(`/metapolicy/${id}`)
}

/**
 * 删除策略
 * @param {Number} id 策略 ID
 * @returns 响应
 */
export function deletePolicy(id) {
  return meirinPrivileged.delete(`/policy/${id}`)
}

// Patch

/**
 * 更新元策略
 * @param {Number} id 元策略 ID
 * @param {Object} metapolicy 元策略
 * @returns 更新后的元策略
 */
export function patchMetapolicy(id, metapolicy) {
  return meirinPrivileged.patch(`/metapolicy/${id}`, metapolicy)
}

/**
 * 更新策略
 * @param {Number} id 策略 ID
 * @param {Object} metapolicy 策略
 * @returns 更新后的策略
 */
export function patchPolicy(id, policy) {
  return meirinPrivileged.patch(`/policy/${id}`, policy)
}

// Query

/**
 * 查询元策略
 * @param {Number} id 元策略 ID
 * @returns 查询的元策略
 */
export function getMetapolicy(id) {
  return meirinPrivileged.get(`/metapolicy/${id}`)
}

/**
 * 查询策略
 * @param {Number} id 策略 ID
 * @returns 查询的策略
 */
export function getPolicy(id) {
  return meirinPrivileged.get(`/policy/${id}`)
}

// Count

/**
 * 查询元策略数量
 * @returns 元策略数量
 */
export function countMetapolicy() {
  return meirinPrivileged.get('/metapolicy/count')
}

/**
 * 查询策略数量
 * @returns 策略数量
 */
export function countPolicy() {
  return meirinPrivileged.get('/policy/count')
}

// Test DSL

/**
 * 测试表达式
 * @param {String} expression Meirin DSL 表达式
 * @returns 响应
 */
export function testExpression(expression) {
  return meirinPrivileged.post('/test/expression', expression)
}
