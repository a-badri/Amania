const loginForm = document.querySelector(`.login-form`)



loginForm.addEventListener(`submit`, async(e) => {
  e.preventDefault()

  const formData = new FormData(loginForm)

  const email = formData.get(`email`)
  const password = formData.get(`password`)
  
  const body = {email: email, password: password}

  console.log(email)

  try {

    const res = await fetch(`http://localhost:4000/users/token`, {
        method: `POST`,
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    })

    if(!res.ok) {
      throw res;
    }

      const {user, message, token} = await res.json()

      localStorage.setItem(`uesrId`, user.id)
      localStorage.setItem(`token`, token)

  } catch(err) {
    if(err.status >= 400 && err.status < 600) {
      const errJSON = await err.json()
      console.log(errJSON)
      const errorsContainer = document.querySelector(`.errorsContainer`)
      let errHTML = [
      `
      <div>
        <p> something went wrong </p>
      </div>
      `,]
      const {errors} = errJSON
      if(errors && Array.isArray(errors)) {
        errHTML = errors.map((message) => 
          `
          <div>
            ${message}
          </div>
          `
        )
      }
      errorsContainer.innerHTML = errHTML.join(``)
    }
  }

})
