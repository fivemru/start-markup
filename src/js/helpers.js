function makeLoader() {
  const cache = {}

  return (url, resolve, reject) => {
    if (url && cache[url]) return resolve()

    const script = document.createElement('script')
    script.src = url
    script.async = true

    script.onload = () => {
      cache[url] = script
      resolve()
    }

    script.onerror = reject

    const [rootPoint] = document.getElementsByTagName('script')
    return rootPoint.parentNode.insertBefore(script, rootPoint)
  }
}

// eslint-disable-next-line import/prefer-default-export
export const jsLoader = makeLoader()
