import svg from './sprite/blank.svg'
import replaceUrl from './replaceUrl'

// For IE 9+ support
function loadResource(url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, false)
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return
    if (xhr.status === 200) {
      cb(xhr.responseText)
    } else {
      throw new Error(`[${this.status}] ${this.statusText}`)
    }
  }
  xhr.send()
}

document.addEventListener('DOMContentLoaded', () => {
  if (navigator.userAgent.search(/(?:edge|trident)/i) === -1) return

  const [commonUrl] = svg.url.split('#')
  console.log(`commonUrl: ${commonUrl}`)
  loadResource(commonUrl, content => {
    const wrapper = document.createElement('div')
    wrapper.id = '__wrapper_sprite'
    wrapper.style.display = 'none'
    wrapper.innerHTML = content
    document.body.appendChild(wrapper)
    // replace svg url
    replaceUrl(commonUrl)
  })
})
