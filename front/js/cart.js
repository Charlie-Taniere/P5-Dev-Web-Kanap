// Récupération du localstorage
let basketProduct = JSON.parse(localStorage.getItem("basketInfo"));
let totalPriceProduct = 0;

// Fonction pour afficher le panier 
async function renderCart() {

    // Boucle qui itère l'API pour récupéré le prix de chaques produits sélectionnés     
    for (let i = 0; i < basketProduct.length; i++) {
        product = basketProduct[i];
        url = "http://localhost:3000/api/products/" + product.id;
        await fetch(url)
            .then(function (res) {
                if (res.ok) {
                    return res.json().then(data => {
                        product.price = data.price; // Création de la key price et récupération du prix
                    });
                }
            })
            .catch(function (err) {
                console.log("Une erreur est survenue")
            })
    }

    let htmlSegment = " ";
    // Boucle pour chaque produit dans le localstorage
    for (data of basketProduct) {

        htmlSegment += `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
                                <div class="cart__item__img">
                                    <img src="${data.image}" alt="${data.alt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                    <h2>${data.name}</h2>
                                    <p>${data.color}</p>
                                    <p>${data.price}€</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                    </div>
                                </div>
                                </article>`;

        document.querySelector("#cart__items").innerHTML = htmlSegment;
    }

    deleteItem(); // Appel de la fonction pour supprimer 


    calculeTotals() // Appel de la fonction pour le calculs des totaux avec le localstorage en paramètre
}

renderCart();


// Fonction pour calculer la quantité total 
function totalQuantity(basketProductWithQuantity) {

    // Calcul de la quantité total 
    let quantityArray = basketProductWithQuantity.map(x => x.quantity);
    let totalQuantity = 0;
    for (let i = 0; i < quantityArray.length; i++) {
        totalQuantity += parseInt(quantityArray[i]);
    }

    // Rendu de la quantité total  
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

// Fonction pour calculer la prix total 
function totalPrice(basketProductWithPrice) {

    // Calcul du prix total 
    let totalPrice = 0;
    for (let i = 0; i < basketProductWithPrice.length; i++) {
        totalPrice += parseInt(basketProductWithPrice[i].price) * parseInt(basketProductWithPrice[i].quantity);
    }

    // Rendu du prix total 
    document.getElementById("totalPrice").innerHTML = totalPrice;
}


// Récupération des deux fonctions de calculs 
function calculeTotals() {
    totalQuantity(basketProduct)
    totalPrice(basketProduct)
}

// Fonction pour supprimer un article
function deleteItem() {
    const itemToDelete = document.getElementsByClassName("cart__item"); // Récupération de l'article à supprimer
    for (i = 0; i < itemToDelete.length; i++) { // On itère pour savoir combien d'article sont affiché
        const x = i; // On définit x comme étant le nombre d'articles 
        buttonDelete = itemToDelete[x].getElementsByClassName("deleteItem"); // On récupère le bouton supprimer

        buttonDelete[0].addEventListener('click', function () { // On écoute le clic sur le bouton supprimer
            basketProduct.splice(x, 1); // On supprimer l'article du localstorage avec splice (x est sont index et 1 la quantité)
            localStorage.setItem("basketInfo", JSON.stringify(basketProduct)); // On met à jour le localstorage
            itemToDelete[x].remove(); // On supprime l'article du DOM 
            location.reload(); // On recharge la en cours pour actualisé le panier 
            window.alert("Le produit a bien été supprimé du panier");
        })
    }

    // function modifyQuantity() {

    //     const collection = document.getElementsByClassName("cart__item");
    //     for (i = 0; i < collection.length; i++) {
    //         const x = i;
    //         elt1 = collection[x].getElementsByClassName("deleteItem");
    //         elt2 = collection[x].getElementsByClassName("itemQuantity");

    //         elt1[0].addEventListener('click', function () { // clic sur supprimer
    //             basketProduct.splice(x, 1);
    //             localStorage.setItem("basketInfo", JSON.stringify(basketProduct));
    //             collection[x].remove();
    //             location.reload();
    //         })

    //         elt2[0].addEventListener('change', function (event) { // changement du nombre d'item
    //             basketProduct[x].number = parseInt(event.target.value);
    //             localStorage.setItem("basketInfo", JSON.stringify(basketProduct));
    //             calculeTotals();
    //         })
    //     }





    // let itemQuantity = document.getElementsByClassName("itemQuantity");

    // for (let i = 0; i < itemQuantity.length; i++) {
    //     itemQuantity[i].addEventListener('change', function () {
    //         let productId = document.querySelectorAll("article")[i].dataset.id;
    //         console.log("Produit :" + productId);
    //         let quantity = itemQuantity[i].value;
    //         console.log("Quantité :" + itemQuantity[i].value);
    //         basketProduct.splice(4, 1, quantity);
    //         let basketProduct = localStorage.getItem("basketInfo");

    // basketProduct.quantity = quantity;

    // basketProduct = JSON.parse(localStorage.getItem(productId));

    // localStorage.setItem("productInformation", productId);
    // localStorage.setItem(, basketProduct);
    // basketProduct.quantity = quantity;

    //         }); 

    // }
}