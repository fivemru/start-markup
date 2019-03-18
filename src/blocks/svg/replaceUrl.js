function replaceUrl(url) {
  const commonUrl = url.split('#')[0]
  const elms = document.body.querySelectorAll('use')
  let replaced = 0

  if (navigator.userAgent.search(/(?:edge|trident)/i) === -1) return

  Array.prototype.forEach.call(elms, el => {
    const href = el.getAttribute('xlink:href')
    if (!href) return
    const iconId = href.split('#')[1]
    if (href.indexOf(commonUrl) === -1) return
    // const replacedId = iconId.replace('-usage', '')
    const replacedId = iconId.replace('-usage', '')
    el.setAttribute('xlink:href', `#${replacedId}`)
    console.log(`iconId: #${iconId} => #${replacedId}`)
    replaced += 1
  })

  console.log(`Replaced svg url for IE 9+: ${replaced}`)
}

export default replaceUrl
