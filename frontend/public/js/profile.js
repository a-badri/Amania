const infoBtn = document.querySelector(`.info-btn`)
const securtityBtn = document.querySelector(`.security-btn`)
const purchasesBtn = document.querySelector(`.purchses-btn`)

const infoForm = document.querySelector(`.user-info`)
const securityForm = document.querySelector(`.password-change`)
const settingForms = document.querySelector(`.setting-forms`)

const buttons = document.querySelectorAll(`.button`)

buttons.forEach(button => {
  button.addEventListener(`click`, () => {
    const id = button.getAttribute(`id`)
    const form = document.querySelector(`form#${id}`)
    let currentSetting = document.querySelector(`.current-setting`)
    currentSetting.innerHTML = form.outerHTML;
  })
})




// infoBtn.addEventListener(`click`, () => {
//   // window.location.href = `http://localhost:8080`;
//   // console.log(settingForms.childNodes);
//   document.querySelector(`.user-info`).style.display = ``
//   document.querySelector(`.password-change`).style.display = `none`

// })



// securtityBtn.addEventListener(`click`, () => {
//   document.querySelector(`.user-info`).style.display = `none`
//   document.querySelector(`.password-change`).style.display = ``
// })
