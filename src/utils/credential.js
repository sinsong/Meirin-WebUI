/**
 * Meirin WebUI 凭据存储键值
 */
const credential_key = 'meirin_credential_key'

/**
 * 获取凭据
 * @returns {String} 凭据
 */
export function getCredential() {
  return localStorage.getItem(credential_key)
}

/**
 * 设置凭据
 * @param {String} credential 凭据
 */
export function setCredential(credential) {
  return localStorage.setItem(credential_key, credential)
}
