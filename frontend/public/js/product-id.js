const otherProducts = document.querySelector(`.other-products-container`)
const productName = document.querySelector(`.product-name`) 
const productPrice = document.querySelector(`.price-from-db`)

// -------- Queries to for the images slides ------------------ //

const bigLeftArrow = document.querySelector(`.big-left-arrow button`)
const bigRightArrow = document.querySelector(`.big-right-arrow button`)
const smallLeftArrow = document.querySelector(`.small-left-arrow`)
const smallRightArrow = document.querySelector(`.small-right-arrow`)

const bigArrows = document.querySelectorAll(`.big-arrow`)

document.addEventListener(`DOMContentLoaded`, async() => {
  
  try {

    const productId = window.location.href.split('/')[4];
    
    const res1 = await fetch(`http://localhost:4000/products/${productId}`, {
      method: `GET`,
      headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`
      }
    })
    

    if(!res1.ok) {
      productName.innerHTML = `
      <p> response was failed </p>
      `
      throw res1;
    }
    
    const {product} = await res1.json()

    productName.innerHTML = `
    <div>
      <span> ${product.name} </span>
    </div>
    `

    productPrice.innerText = `$${product.price}`
  }
  catch(err) {
    console.log(err)
  }
  



})

document.addEventListener(`DOMContentLoaded`, async() => {
  try {

    const res = await fetch(`http://localhost:4000/products/random/4`, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(`token`)}`
      }
    })

    const {products} = await res.json()
    console.log(products)

    if(!res.ok) {
      otherProducts.innerHTML = `
      <p> response was failed </p>
      `
      throw res;
    }

    let productHTML = products.map((product) => `
    <div class="one-product">
      <div class="product-img">
        <img src="https://drive.google.com/uc?export=view&id=1SuruqYqITj3j2p0U6dqgqLLlKalgy9Cr">
      </div>
      
      <div class="product-name">
        <span> ${product.name} </span>
      </div>
      <div class="product-price">
       <span> $${product.price}
      </div>
    </div>
    `)

    otherProducts.innerHTML = productHTML.join(``)
  }
  catch (err) {
    const {errors} = await err.json()
    if(errors && Array.isArray(errors)) {
      let errorsHTML = [``]
      errorsHTML = errors.map((error => `
      <p> ${error} </p>`))
      otherProducts.innerHTML = errorsHTML.join(``)
    }
  }

})

function imageSlide() {

}

bigArrows.forEach(bigArrow => {
  bigArrow.addEventListener(`click`, async(e) => {
    const imagesContainer = document.querySelector(`.product-images`)
    // const slideShow = document.querySelector(`.product-slide-show`)
    const accWidth = (ele) => ele.getBoundingClientRect().width
    const roundUp = accWidth(imagesContainer).toFixed(0)
    imagesContainer.style.Width = `${roundUp}px`
    
    
    const displayWidth = imagesContainer.offsetWidth
    const fullContainerWidth = imagesContainer.scrollWidth
    

    

    if (bigArrow.getAttribute(`id`) === `right`) {
      console.log(`scrollLeft is ${imagesContainer.scrollLeft}, width is ${fullContainerWidth}`)
      imagesContainer.scrollLeft += displayWidth
      bigArrow.style.display = imagesContainer.scrollLeft == imagesContainer.scrollWidth - displayWidth ? "none" : "block";
      document.querySelector(`.big-arrow#left`).style.display = `block`
    } else {
      console.log(`scrollLeft is ${imagesContainer.scrollLeft}, width is ${fullContainerWidth}`)
      imagesContainer.scrollLeft += -displayWidth
      bigArrow.style.display = imagesContainer.scrollLeft > 0 ? "block" : "none";
      document.querySelector(`.big-arrow#right`).style.display = `block`
    }

  })
})


// ------------ SMALL ARROWS OF PRODUCT THUMBNAILS ------------

const smallArrows = document.querySelectorAll(`.small-arrow`)

smallArrows.forEach(smallArrow => {
  smallArrow.addEventListener(`click`, (e) => {
    const thumbnails = document.querySelector(`.thumbnails`)
    const thumbnailBtn = document.querySelector(`.thumbnails button`)
    thumbnailBtn.style.width = thumbnailBtn.getBoundingClientRect().width.toFixed(0)
    console.log(thumbnails.scrollLeft)
    if(smallArrow.getAttribute(`id`) === "right") {
      thumbnails.scrollLeft += thumbnailBtn.offsetWidth
      smallArrows[0].style.display = `block`

      console.log(`${thumbnails.scrollWidth - thumbnails.scrollLeft}`)
      console.log(`${thumbnails.offsetWidth}`)
      
      smallArrow.style.display = (thumbnails.scrollWidth - thumbnails.scrollLeft) < thumbnails.getBoundingClientRect().width ? "none" : "block"
    }
    else {
      thumbnails.scrollLeft += -thumbnailBtn.offsetWidth
      smallArrows[1].style.display = "block"
      
      smallArrow.style.display = (thumbnails.scrollWidth - thumbnails.scrollLeft) < thumbnails.getBoundingClientRect().width ? "none" : "block"

      
    }
  })
})
