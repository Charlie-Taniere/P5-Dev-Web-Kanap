//--------------------------------------------------------------------------
// Récupération de l'URL du produit sélectionné depuis l'index 
//--------------------------------------------------------------------------

let params = (new URL(document.location)).searchParams;
let id = params.get('id');
localStorage.setItem("productInformation", []);
let data = {};

//--------------------------------------------------------------------------
// Fonction qui appelle le produit sélectionné
//--------------------------------------------------------------------------

async function getProductData() {
    let url = `http://localhost:3000/api/products/${id}`;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

//--------------------------------------------------------------------------
// Fonction qui récupère les informations du produit
//--------------------------------------------------------------------------
    
async function renderProductData() {
    data = await getProductData();

    // Déclaration des localisation des informations à implémenter

    const image = document.querySelector(".item__img");
    const name = document.querySelector("#title");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");


    // Implémentation des informations de l'API dans le DOM 

    image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    name.innerHTML = `${data.name}`;
    price.innerHTML = `${data.price}`;
    description.innerHTML = `${data.description}`;


    // Choix des couleurs   

    let colors = data.colors;

    colors.forEach(function (colors) {
        var option = document.createElement("option");
        option.value = colors;
        option.innerText = colors;
        document.getElementById("colors").appendChild(option);
    });

}

renderProductData()

//--------------------------------------------------------------------------
// Ecoute du clic sur le panier
//--------------------------------------------------------------------------
document.getElementById("addToCart").addEventListener("click", function () {

    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;

    if (quantity >= 1 && quantity <= 100 && color != "") {

        let productInformation = {
            id: id,
            color: color,
            quantity: quantity,
            image: data.imageUrl
        };
// récuperer le tableau du localstorage
// pousser le nouvel article dans le tableau 
// seter de nouveau le localstorage avec le tableau mis à jour

        localStorage.setItem("productInformation", JSON.stringify(productInformation))
        var retrievedObject = localStorage.getItem("productInformation");
        window.alert("Votre produit à été ajouté au panier")
        console.log("retrievedObject", JSON.parse(retrievedObject));

    } else {
        window.alert("Vous devez sélectioner une couleur et une quantité comprise entre 1 et 100.")
    }

});
