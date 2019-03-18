import './page.scss'

function main() {
  document.querySelector('.page').classList.remove('page--not-loaded')
}

window.addEventListener('load', main)
