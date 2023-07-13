const productForm = document.querySelector(`.add-product`)


document.addEventListener("DOMContentLoaded", async(e) => {
  
  const res = await fetch(`http://localhost:4000/products`, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  
  const productsList = document.querySelector(`.productsList`)
  
  const {products} = await res.json()

  if (products && Array.isArray(products)) {
    let productsHTML = products.map((product) =>
      `<div class="product">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>$${product.price}</h4>
        <div class="edit">
          <div class="editing">
            <button class="editProduct" id="product-${product.id}"> Edit </button>
            <button class="deleteProduct" id="product-${product.id}"> Delete </button>
          </div>
          <form class="edit-form hidden" id="edit-product-${product.id}">
            <div>
              <label for="name"> Product Name </label>
              <input type="text" name="name" value="${product.name}">
            </div>
            <div>
              <label for="description"> Description </label>
              <input type="text" name="description" value="${product.description}">
            </div>
            <div>
              <label for="price"> Price </label>
              <input type="text" name="price" value="${product.price}">
            </div>
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    `)

    productsList.innerHTML = productsHTML.join(``)
  }


  const editBtns = document.getElementsByClassName(`editProduct`)
  // console.log(editBtns)

  for(let i = 0; i < editBtns.length; i++) {
    const editBtn = editBtns[i]
    editBtn.addEventListener(`click`, (e) => {
      const productId = e.target.id.split(`-`)[1]
      console.log(e.target.id);
      const editForm = document.querySelector(`#edit-product-${productId}`)
      if (editForm.classList.contains("hidden")) {
        editForm.classList.remove("hidden")
      }
      else {
        editForm.classList.add("hidden")
      }
    })
  }

  const editForms = document.querySelectorAll(`.edit-form`)
  console.log(editForms)
  for (let i = 0; i < editForms.length; i++) {
    const editForm = editForms[i]
    editForm.addEventListener(`submit`, async(e) => {
      e.preventDefault()
      const productId = e.target.id.split(`-`)[2]
      const data = new FormData(editForm)
      const name = data.get(`name`)
      const description = data.get(`description`)
      const price = data.get(`price`)
      const body = {name, description, price}
  
      try {
  
        const res = await fetch(`http://localhost:4000/products/${productId}`, {
          method: `PUT`,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
  
        const prod = await res.json()
        console.log(prod)
      }
  
      catch(err) {
  
      }
  
  
    })
  }



  // javascript to delete a product
  const deleteBtns = document.querySelectorAll(`.deleteProduct`)
  for (let i = 0; i < deleteBtns.length; i++) {
    const deleteBtn = deleteBtns[i]
    deleteBtn.addEventListener(`click`, async(e) => {
      e.preventDefault()
      const productId = e.target.id.split(`-`)[1]
      try {
        const res = await fetch(`http://localhost:4000/products/${productId}`, {
          method: `DELETE`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })

        if (!res.ok) {
          throw res
        }
        
        const {message} = await res.json()
        console.log(message)
        if(message.status === 204) {
          //the code stop running and don't reload the page
          window.location.href = window.location.href;
        }
      }


      catch(err) {
        if(err.status >= 400 && err.status < 600) {
          console.log(err);
          const errJSON = await err.json()
          const {errors} = errJSON
          const errorsContainer = document.querySelector(`.errorsContainer`)
          errorsContainer.innerHTML += 
          `
          <div>
            ${errors}
          </div>
          `
        }
      }

    })
  }
})



productForm.addEventListener(`submit`, async(e) => {
  e.preventDefault()

  const data = new FormData(productForm)

  const name = data.get(`name`)
  const description = data.get(`description`)
  const price = data.get(`price`)

  const body = {name, description, price}

  try {
  
    const res = await fetch(`http://localhost:4000/products`, {
      method: `POST`,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(`token`)}`
      }
    })

    if (!res.ok) {
      throw res;
    }

    const {product} = await res.json()
    
    // const productHTML = 
    // `
    // <div class="product" id="${product.id}">
    //   <h3>${product.name}</h3>
    //   <p>${product.description}</p>
    //   <h4>$${product.price}</h4>
    //   <div class="editing">
    //     <button type="submit" class="editProduct"> Edit </button>
    //     <button type="submit" class="deleteProduct"> Delete </button>
    //   </div>
    //   <div>
    //     <form>
    //       <div>
    //         <label for="name"> Product Name </label>
    //         <input type="text" name="name" value="${product.name}"
    //       </div>
    //       <div>
    //         <label for="description"> Description </label>
    //         <input type="text" name="description">
    //       </div>
    //       <div>
    //         <label for="price"> Price </label>
    //         <input type="text" name="price">
    //       </div>
    //       <button type="submit"> Submit </button>
    //     </form>
    //   </div>
    // </div>
    // `
    // const productsList = document.querySelector(`.productsList`)

    // productsList.appendChild(productHTML);

    window.location.href = window.location.href;


    

  }

  catch(err) {
    if(err.status >= 400 && err.status < 600) {
      const errJSON = await err.json()
      console.log(Object.keys(err))
      const errorsContainer = document.querySelector(`.errorsContainer`)
      let errorsHTML = [
      `
      <div>
        somthing went wrong
      </div>
      `]

        const {errors} = errJSON

        // console.log(errors);
      if(errors && Array.isArray(errors)) {

        errorsHTML = errors.map((message) => `
        <div>
          ${message}
        </div>
        `)
      }
      errorsContainer.innerHTML = errorsHTML.join(``)
    }
    
  }
  
})
