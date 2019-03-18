import './contacts.scss'
// eslint-disable-next-line import/named
import { jsLoader } from 'js/helpers'

// Page code
import { addresses } from 'data/contacts.json'

// Maps
function loaded() {
  const { ymaps } = window
  const mapContainer = document.querySelector('.map-container')

  // eslint-disable-next-line func-names
  ymaps.ready(function() {
    const container = document.querySelector('.map-container')

    return addresses.forEach(({ center, zoom, coords }) => {
      // map
      const map = new ymaps.Map(container, {
        center,
        zoom,
      })

      map.behaviors.disable('scrollZoom')
      map.controls.remove('typeSelector').remove('mapTools')

      // Placemark
      const place = new ymaps.Placemark(
        coords,
        {
          iconContent: 'ParnasAuto.ru',
          balloonContent: `<b>ParnasAuto.ru</b>`,
        },
        {
          balloonPanelMaxMapArea: 0,
          preset: 'islands#blueAutoIcon',
        }
      )

      // place mark
      map.geoObjects.add(place)

      // hide fallback
      mapContainer.style.background = 'transparent'
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelector('.benefits')
  const { height } = services.getBoundingClientRect()
  const scrollTrigger = services.offsetTop + height / 2

  // load map when need
  function loadMapOnSroll() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop
    const innerHeight = document.documentElement.clientHeight
    const currPos = pageY + innerHeight

    if (currPos >= scrollTrigger) {
      document.removeEventListener('scroll', loadMapOnSroll)
      jsLoader('//api-maps.yandex.ru/2.1/?lang=ru-RU', loaded)
    }
  }

  document.addEventListener('scroll', loadMapOnSroll)
  loadMapOnSroll()
})
