const loginForm = document.querySelector(`.login-form`)

loginForm.addEventListener(`submit`, async (e) => {
  e.preventDefault()

  const formData = new FormData(loginForm)

  const email = formData.get(`email`)
  const password = formData.get(`password`)
  
  const body = {email, password}

  try {
    const res = await fetch(`http://localhost:4000/users/token`, {
      method: `post`,
      body: JSON.stringify(body),
      headers: {"Content-Type": "applica†ion/json"}
    })

    if (!res.ok) {
      throw res
    }

    const {token, user: {id}} = await res.json()

    localStorage.setItem(`token`, token)
    localStorage.setItem(`userId`, id)

    window.document.location = `/`
  }
  catch (err) {
    if (err.status <= 400 && err.status < 600) {
      err.title = `login failed`
      const errJSON = await err.json()
      const errorsContainer = document.querySelector(`.errorsContainer`)
      const errHTML = [`
      <div>
        something went wrong
      </div>
      `]
      
      const {errors} = errJSON
      if (errors && Array.isArray(errors)) {
        errHTML = errors.map((message) => `
        <div>
          ${message}
        </div>
        `)
      }
      errorsContainer.innerHTML = errHTML.join(``)
    }
    else {
      alert(`check your internet connection and try again`)
    }
  }
})
