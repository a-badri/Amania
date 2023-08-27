document.addEventListener(`DOMContentLoaded`, async (e) => {
  
  try {
    const res = await fetch(`http://localhost:4000/products`, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    })

    const {products} = await res.json()
    console.log(products)

    const productsContainer = document.querySelector(`.ProductsContainer`)
    let productHTML = products.map((product) => 
      `
      <div class="product-box">
        <div class="product-pic">
        </div>
        <div class="name-price">
          <div> ${product.name} </div>
          <div> ${product.price} </div>
        </div>
      </div>
      `
    )

    productsContainer.innerHTML = productHTML.join("")

    const images = [
      'https://drive.google.com/uc?export=view&id=1MuUB2dxKcXyFlf_DNHBhQWnMirRO-1do',
      `https://drive.google.com/uc?export=view&id=1_eqvq_QYdI1cIjw32bRK_omOSxTYNuf-`,
      `https://drive.google.com/uc?export=view&id=1Aprm8WbmxJlOpJtH9LiHLD9PZZYTiRTr`,
      `https://drive.google.com/uc?export=view&id=1Pd4TopKJxMnxmnBaIsavp88OJsAwBJ5H`,
      `https://drive.google.com/uc?export=view&id=1beCt7UtTM4t_lCjFrT-IpaaVu22DsHdn`,
      `https://drive.google.com/uc?export=view&id=1SuruqYqITj3j2p0U6dqgqLLlKalgy9Cr`,
      `https://drive.google.com/uc?export=view&id=1mLzlG67O1DIw0-r0to6spGXp9EjyZiH7`,
      `https://drive.google.com/uc?export=view&id=1MqlCs5datAIxgGmWqtoX_jjzfYaIQtIv`,
      `https://drive.google.com/uc?export=view&id=1ztxhOudkrnznRxmQuAC_KE97dpt9NBXV`
    ]

    const allProductPic = document.querySelectorAll(`.product-pic`)

    for (let i = 0; i < allProductPic.length; i++) {
      const productPic = allProductPic[i]
      let picUpload = `
      <img class="pic" src='${images[i]}' width="100%" height="100%">
      `

      productPic.innerHTML = picUpload
    }

  }
  catch (err) {
    console.error(err)
  }

})
