/**
 * 复制到剪切板
 * @param {String} text 内容
 */
export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  } else {
    return new Promise<void>((ok, fail) => {
      var textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      // 隐藏此输入框
      textarea.style.position = 'fixed'
      textarea.style.clip = 'rect(0 0 0 0)'
      textarea.style.top = '10px'
      // 赋值
      textarea.value = text
      // 选中
      textarea.select()
      try {
        // 复制
        if (document.execCommand('copy', true)) {
          ok()
        } else {
          throw Error('复制失败')
        }
      } catch (err) {
        fail(err)
      } finally {
        // 移除输入框
        document.body.removeChild(textarea)
      }
    })
  }
}