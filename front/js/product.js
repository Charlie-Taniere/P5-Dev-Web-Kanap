//--------------------------------------------------------------------------
// Récupération de l'URL du produit sélectionné depuis l'index 
//--------------------------------------------------------------------------

let params = (new URL(document.location)).searchParams;
let id = params.get('id');
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
        let option = document.createElement("option");
        option.value = colors;
        option.innerText = colors;
        document.getElementById("colors").appendChild(option);
    });

}

renderProductData();

//--------------------------------------------------------------------------
// Ecoute du clic sur le panier
//--------------------------------------------------------------------------
document.getElementById("addToCart").addEventListener("click", function () {


    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;

        if (quantity >= 1 && quantity <= 100 && color != "") {

            let previousArray = localStorage.getItem("productInformation");

            let productInformation;
            if (previousArray) {
                // exists
                productInformation = JSON.parse(previousArray);

            } else {
                // Premier ajout au panier 
                productInformation = [];
            }

            let isQuantityAdded = false;
            for (let i = 0; i < productInformation.length; i++) {
                let obj = productInformation[i];
                if (obj['id'] === id && obj['color'] === color) {
                    // Si le produit est déjà au panier on incrémente la quantitée 
                    // (utilisation de parseInt pour convertir la chaine de charactère en nombre)
                    obj['quantity'] = parseInt(obj['quantity']) + parseInt(quantity);
                    isQuantityAdded = true;
                    break;
                }
            }

            if (isQuantityAdded === false) {
                // Nouveau produit au panier 
                productInformation.push({
                    id: id,
                    color: color,
                    quantity: quantity,
                    image: data.imageUrl,
                    description: data.description, 
                    alt: data.altTxt,
                    name: data.name
                });
            }

            let basket = JSON.stringify(productInformation);
            console.log(basket);

            localStorage.setItem("productInformation", basket);
            window.alert("Le produit à bien été ajouté au panier.")

        } else {
            window.alert("Vous devez sélectioner une couleur et une quantité comprise entre 1 et 100.")
        }  
});