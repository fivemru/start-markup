// // prettier-ignore
// // eslint-disable-next-line
// ;(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

// const metrikaId = 12345;

// // eslint-disable-next-line
// ym(metrikaId, 'init', {
//   id: metrikaId,
//   clickmap: true,
//   trackLinks: true,
//   accurateTrackBounce: true,
//   webvisor: true,
//   trackHash: true,
// })

// // helper
// function makeReachGoal(counterId) {
//   return (target, params) => {
//     const { ym } = window || { ym: function error() {} }
//     return ym(counterId, 'reachGoal', target, params)
//   }
// }

// // eslint-disable-next-line import/prefer-default-export
// export const reachGoal = makeReachGoal(metrikaId)

// // places phones
// function setPhoneGoals(target, elms) {
//   Array.from(elms).forEach(link => {
//     const phone = link.textContent.replace(/[^\d]+/g, '')

//     link.addEventListener('click', () => {
//       reachGoal(target, {
//         place: target,
//         phone,
//       })
//     })
//   })
// }

// // phones separately
// function setPhoneSeparatelyGoals(targetPrefix, elms) {
//   Array.from(elms).forEach(link => {
//     const phone = link.textContent.replace(/[^\d]+/g, '')

//     link.addEventListener('click', () => {
//       reachGoal(`${targetPrefix}${phone}`)
//     })
//   })
// }

// // phones separately
// function setCardGoals(target, elms) {
//   Array.from(elms).forEach(item => {
//     const text = item.textContent
//     const index = [...item.parentNode.children].indexOf(item)

//     item.addEventListener('click', () => {
//       reachGoal(target, { index, text })
//     })
//   })
// }

// // elements
// const topPhones = document.querySelectorAll('.nav a[href^="tel:"]')
// const bottomPhones = document.querySelectorAll('.contacts a[href^="tel:"]')
// const allPhones = document.querySelectorAll('a[href^="tel:"]')
// const benefits = document.querySelectorAll('.benefits .benefits__item')
// const services = document.querySelectorAll('.services .services__item')
// const stages = document.querySelectorAll('.stages .stages__item')

// // by place
// setPhoneGoals('phone-top-click', topPhones)
// setPhoneGoals('phone-bottom-click', bottomPhones)

// // phones separately
// setPhoneSeparatelyGoals('phone-', allPhones)

// // card click
// setCardGoals('benefits-click', benefits)
// setCardGoals('services-click', services)
// setCardGoals('stages-click', stages)
