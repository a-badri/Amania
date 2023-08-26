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

const updateUserBtn = document.querySelector(".update-user-btn")

updateUserBtn.addEventListener("click", async() => {
  const form = document.querySelector("form.user-info")
  const formData = new FormData(form)
  
  const email = formData.get("email")
  const streetAdress = formData.get("street")
  const city = formData.get("city")
  const state = formData.get("state")
  const zipcode = formData.get("zipcode")

  const address = {streetAdress, city, state, zipcode}

  try {
    const res1 = await fetch ("http://localhost:4000/users/:id(\\+d)/email", {
      method: "PUT",
      body: email,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    if(!res1.ok) {
      console.log("res was throw")
      throw res1;
    }

    window.location.href = 'http://localhost:8080/settings'
  }
  catch (err) {
    console.log(err)
  }
})
