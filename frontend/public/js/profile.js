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
    const selectedSet = document.querySelector(`.setting-forms #${id}`)
    let currentSetting = document.querySelector(`.current-setting`)
    console.log(currentSetting)
    currentSetting.innerHTML = selectedSet.outerHTML;
    currentSetting.querySelector(`#${id}`).removeAttribute("style")


    const infoForm = document.querySelector(".current-setting form")
    infoForm.addEventListener("submit", async(e) => {
      e.preventDefault()
      
      const formData = new FormData(infoForm)

      const firstName = formData.get("firstName")
      const lastName = formData.get("lastName")
      const phoneNum = formData.get("phoneNumber")
      const email = formData.get("email")
      const streetAdress = formData.get("street")
      const city = formData.get("city")
      const state = formData.get("state")
      const zipcode = formData.get("zipcode")

      const address = {streetAdress, city, state, zipcode}

      const userId = localStorage.getItem("uesrId")
      console.log(userId);

      try {
        const res1 = await fetch (`http://localhost:4000/users/${userId}/email`, {
          method: "PUT",
          body: JSON.stringify(email),
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-type": 'application/json'
          }
        })

        // if(!res1.ok) {
        //   console.log("res was throw")
        //   throw res1;
        // }
        const {emailAddress} = res1.json();
        console.log(emailAddress)
      }
      catch (err) {
        console.log(err)
      }
    })
  })
})
