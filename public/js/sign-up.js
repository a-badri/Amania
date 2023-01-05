const form = document.querySelector(`.signUp-form`)

form.addEventListener("submit", async(e) => {
  e.preventDefault()
  const formData = new FormData(form)

  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")

  
  const body = {username, email, password}
  
  
  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(body),
      header: {
        "Content-Type": "application/json"
      }
    })
    
    
    if(!res.ok) {
      throw res
    }

    const {token, user: {id}} = await res.json();

    localStorage.setItem(`Token`, token)
    localStorage.setItem(`userId`, id)

    window.document.location = `/login`
  }
  catch(err) {
    if (err.status >= 400 && err.status < 600) {
      err.title = `bad happens`
      const errJSON = await err.json();
      const errorsContainer = document.querySelector(`.errorsContainer`)
      const errHTML = [`
      <div>
        <p>something went wrong</p>
      </div>
      `]

      const {errors} = errJSON
      if(errors && Array.isArray(errors)) {
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
