document.addEventListener(`DOMContentLoaded`, async (e) => {
  
  try {
    const res = await fetch(`http://localhost:4000/products`, {
      method: `GET`,
      //Authorization = 
    })

    const {products} = res.json()

    const productsContainer = document.querySelector(`.ProductsContainer`)
    const productHTML = products.map(({name, price}) => 
      `
      <div>
        <div class="product-pic">
        </div>
        <div>
          <div> ${name} </div>
          <div> ${price} </div>
        </div>
      </div>
      `
    )

    productContainer.innerHTML = productHTML.join("")
  }
  catch (err) {
    console.error(err)
  }

})
