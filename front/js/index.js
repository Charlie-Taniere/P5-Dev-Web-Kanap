//--------------------------------------------------------------------------
// Fonction qui récupère de l'API via fletch
//--------------------------------------------------------------------------

async function getData() {
    let url = "http://localhost:3000/api/products";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

//--------------------------------------------------------------------------
// Fonction qui récupère les données de l'API afin de les restituer dans l'HTML de l'index 
//--------------------------------------------------------------------------

async function renderData() {
    let data = await getData();
    let htmlSegment = " ";
    data.forEach(data => {
        htmlSegment += `<a href="./product.html?id=${data._id}">
                            <article>
                            <img src="${data.imageUrl}" alt="${data.altTxt}" />
                            <h3 class="productName">${data.name}</h3>
                            <p class="productDescription">${data.description}</p>
                            </article>
                            </a>`;
    });
    document.querySelector("#items").innerHTML = htmlSegment;
}

renderData();

