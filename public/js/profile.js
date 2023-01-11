const infoBtn = document.querySelector(`.info-btn`)
const securtityBtn = document.querySelector(`.security-btn`)

const infoForm = document.querySelector(`.user-info`)
const securityForm = document.querySelector(`.password-change`)

infoBtn.addEventListener(`click`, () => {
  document.querySelector(`.user-info`).style.display = ``
  document.querySelector(`.password-change`).style.display = `none`

})

securtityBtn.addEventListener(`click`, () => {
  document.querySelector(`.user-info`).style.display = `none`
  document.querySelector(`.password-change`).style.display = ``

})
