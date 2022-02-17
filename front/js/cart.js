// Récupération du localstorage

let retrieveBasket = localStorage.getItem("productInformation");
let basketProduct;
let product;
let price;
let addQuantity = 0

// Fonction pour afficher le panier 
async function renderCart() {

    basketProduct = JSON.parse(retrieveBasket);
    console.log(basketProduct);

    // Boucle qui itère l'API pour récupéré le prix de chaques produits sélectionnés     
    for (let i = 0; i < basketProduct.length; i++) {
        productId = basketProduct[i];
        url = "http://localhost:3000/api/products/" + productId.id;
        await fetch(url)
            .then(function (res) {
                if (res.ok) {
                    return res.json().then(data => {
                        price = data.price;
                        console.log(price);
                    });
                }
            })
            .catch(function (err) {
                console.log("Une erreur est survenue")
            })
    }
    let html = " ";
// Boucle pour chaque produit dans le localstorage
    for (product of basketProduct) {

        let htmlSegment = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                <div class="cart__item__img">
                                    <img src="${product.image}" alt="${product.alt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                    <h2>${product.name}</h2>
                                    <p>${product.color}</p>
                                    <p>${price * product.quantity}€</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : ${product.quantity} </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addQuantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                    </div>
                                </div>
                                </article>`;
                                
        html += htmlSegment;
        let container = document.querySelector("#cart__items");
        container.innerHTML = html;

    }
}

renderCart()


// Calcul des totaux 

let quantityArray = basketProduct.map(x => x.quantity);
let totalQuantity = 0;
for (let i = 0; i < quantityArray.length; i++) {
totalQuantity += parseInt(quantityArray[i]);
}

let priceArray = basketProduct.map(y => y.price);
let totalPrice = 0;
for (let i = 0; i < priceArray.length; i++) {
totalPrice += parseInt(priceArray[i]);
}


console.log(totalPrice);



let total = `<p>Total (<span id="totalQuantity">${totalQuantity}</span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>`;
let containerTotal = document.querySelector(".cart__price");
containerTotal.innerHTML = total;




// let deleteProduct = document.getElementsByClassName("deleteItem").addEventListener("click", function () {
// let deleteProductSelected = deleteProduct.closest("deleteItem");
// });


// window.onload = function () {
// document.getElementsByName("itemQuantity")[0].addEventListener("change", doThing);
// function doThing(){
//     alert('Horray! Someone wrote "' + this.value + '"!');
// }
// }

// let itemQuantity = document.getElementsByName("itemQuantity");
// document.body.addEventListener("change", function (e) {

// });