import './menu.scss'

// class names
const modalOpenedClass = 'body--nav-panel-opened'
const navPanelMenuOpened = 'nav__menu--opened'
// const menuItemOpenedClass = 'menu__item--opened'
const menuLinkActiveClass = 'menu__link--active'
const burgerClass = 'btn--burger'
const closeClass = 'btn--close'

// Elements
const { body } = document
const btn = document.querySelector('.nav__btn')
const navPanel = document.querySelector('.nav__menu')
// const navPanelWrapper = navPanel.querySelector('.menu')
const links = document.querySelectorAll('.menu__link')

function isOpened() {
  return body.classList.contains(modalOpenedClass)
}

function isHidden(el) {
  const style = window.getComputedStyle(el)
  return style.display === 'none'
}

function toggleMenu() {
  // burger button is visible
  if (isHidden(btn)) return

  // toggle classes
  body.classList.toggle(modalOpenedClass)
  navPanel.classList.toggle(navPanelMenuOpened)

  // Escape
  if (isOpened()) {
    btn.classList.remove(burgerClass)
    btn.classList.add(closeClass)

    // window.addEventListener('click', handleOutboundClick, true)
    // focus on wrapper element for tab purposes
    navPanel.addEventListener('transitionend', e => {
      if (e.target === navPanel && e.propertyName === 'visibility') {
        navPanel.focus()
      }
    })
  } else {
    btn.classList.add(burgerClass)
    btn.classList.remove(closeClass)
    // window.removeEventListener('click', handleOutboundClick, true)
  }
}

// function handleOutboundClick(e) {
//   if (!isOpened()) return
//   const bound = navPanelWrapper.getBoundingClientRect()
//   const xOut = e.pageX < bound.left || e.pageX > bound.right
//   const yOut = e.pageY < bound.top || e.pageY > bound.bottom
//   if (xOut || yOut) toggleMenu()
// }

function handleEscape(e) {
  if (e.defaultPrevented) return
  if (!isHidden(btn) && isOpened() && e.keyCode === 27) toggleMenu()
}

function scrollToSection(hash) {
  const section = document.querySelector(hash)
  const top = section.offsetTop - navPanel.scrollHeight
  window.scrollTo(0, top)
}

// Listeners
btn.addEventListener('click', toggleMenu)
window.addEventListener('keydown', handleEscape)

// scroll trigger blocks
document.addEventListener('DOMContentLoaded', () => {
  // Close menu when click to menu_link
  Array.from(links).forEach(link => {
    const hash = link.getAttribute('href')

    // handle click
    link.addEventListener('click', e => {
      e.preventDefault()
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, null, hash)

      // close menu
      if (isOpened()) toggleMenu()

      // scroll corection
      scrollToSection(hash)
    })
  })

  const scrollTriggers = Array.from(links)
    .map(link => {
      const [, id] = link.getAttribute('href').split('#')
      const section = document.getElementById(id)
      return { link, trigger: section.offsetTop }
    })
    .sort((a, b) => a.trigger > b.trigger)
    .reverse()

  // load map when need
  function setActiveLinkOnScroll() {
    const pageY = window.pageYOffset || document.documentElement.scrollTop
    const innerHeight = document.documentElement.clientHeight
    const currPos = pageY + innerHeight * 0.5
    window.currPos = currPos

    // find current active and visible section
    const activeLink = document.querySelector(`.${menuLinkActiveClass}`)
    const visibleIndex = scrollTriggers.findIndex(
      ({ trigger }) => currPos >= trigger
    )
    const { link: visibleLink } = scrollTriggers[visibleIndex] || {}

    // skip
    if (visibleLink === activeLink) return

    // remove active class
    scrollTriggers
      .filter(({ link }) => link !== visibleLink)
      .forEach(({ link }) => link.classList.remove(menuLinkActiveClass))

    // add active class
    if (visibleLink) {
      visibleLink.classList.add(menuLinkActiveClass)
      // eslint-disable-next-line no-restricted-globals
      // history.pushState(null, null, visibleLink.getAttribute('href'))
      // history.pushState(null, null, visibleLink.getAttribute('href'))
    } else {
      // eslint-disable-next-line no-restricted-globals
      // history.pushState(null, null, ' ')
    }
  }

  document.addEventListener('scroll', setActiveLinkOnScroll)

  // set defaut position
  const { hash } = window.location
  if (hash) setTimeout(() => scrollToSection(hash), 500)
  else setActiveLinkOnScroll()
})
