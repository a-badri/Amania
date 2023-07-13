const form = document.querySelector(`.signUp-form`)

form.addEventListener("submit", async(e) => {
  e.preventDefault()
  const formData = new FormData(form)

  const username = formData.get("username")
  const email = formData.get("email")
  const password = formData.get("password")

  
  const body = {username, email, password}

  console.log(body);
  
  
  try {
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    
    
    if(!res.ok) {
      throw res
    }

    const {token, user: {id}} = await res.json();

    
    
    console.log(token, id);

    localStorage.setItem(`Token`, token)
    localStorage.setItem(`userId`, id)

    // window.document.location = `/login`
  }
  catch(err) {
    if (err.status >= 400 && err.status < 600) {
      err.title = `bad happens`
      const errJSON = await err.json();
      const errorsContainer = document.querySelector(`.errorsContainer`)
      let errHTML = [`
      <div>
        <p>something went wrong</p>
      </div>
      `]

      const {errors} = errJSON
      console.log(errors)
      if(errors ) {
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
