/**
 * 可用的 元策略模式
 */
export const metapolicy_mode = [
  "deny-overrides",
  "permit-overrides",
  "deny-unless-permit",
  "permit-unless-deny",
]

/**
 * 可用的 策略效果
 */
export const policy_effect = [
  "permit",
  "deny",
]

/**
 * Meirin 访问请求模板
 */
export const request_template = `{
  "subject": {
  },
  "object": {
  },
  "action": {
  },
  "environment": {
  }
}
`
