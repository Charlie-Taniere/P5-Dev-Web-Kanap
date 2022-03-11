// Récupération du localstorage
let basketProduct = JSON.parse(localStorage.getItem("basketInfo"));
let totalPriceProduct = 0;

// --------------------------------------------------
// Fonction pour afficher le panier 
// --------------------------------------------------

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
                console.log("Une erreur est survenue" + err)
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

    calculeTotals(); // Appel de la fonction pour le calculs des totaux
    deleteItem(); // Appel de la fonction pour supprimer un article 
    modifyQuantity(); // Appel de la fonction pour modifier la quantitée d'un article 
}

renderCart();

// --------------------------------------------------
// Fonction pour calculer la quantité total 
// --------------------------------------------------

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

// --------------------------------------------------
// Fonction pour calculer la prix total 
// --------------------------------------------------

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

// --------------------------------------------------
// Fonction pour supprimer un article
// --------------------------------------------------

function deleteItem() {
    const itemToDelete = document.getElementsByClassName("cart__item");
    for (i = 0; i < itemToDelete.length; i++) {
        const x = i;
        let buttonDelete = itemToDelete[x].getElementsByClassName("deleteItem");

        buttonDelete[0].addEventListener('click', function () { // On écoute le clic sur le bouton supprimer
            basketProduct.splice(x, 1); // On supprimer l'article du localstorage avec splice (x est sont index et 1 la quantité)
            localStorage.setItem("basketInfo", JSON.stringify(basketProduct)); // On met à jour le localstorage
            itemToDelete[x].remove(); // On supprime l'article du DOM 
            location.reload(); // Rafraichit et met à jour 
            window.alert("Le produit a bien été supprimé du panier");
        })
    }
}

// --------------------------------------------------
// Fonction pour modifier la quantitée d'un article
// --------------------------------------------------

function modifyQuantity() {

    const clone = Object.assign(basketProduct);
    for (i = 0; i < clone.length; i++) {
    const c = i; 
    delete clone[c].price;
    };

    const itemToChangeQuantity = document.getElementsByClassName("cart__item");
    for (i = 0; i < itemToChangeQuantity.length; i++) {
        const y = i;

        let buttonChangeQuantity = itemToChangeQuantity[y].getElementsByClassName("itemQuantity");
        buttonChangeQuantity[0].addEventListener('change', function (event) {
            basketProduct[y].quantity = parseInt(event.target.value);

            if (buttonChangeQuantity[0].value <= 100 && buttonChangeQuantity[0].value >= 1) {
                    localStorage.basketInfo = JSON.stringify(clone); // On met à jour le localstorage sans le prix 
                    window.alert("La quantitée du produit " + basketProduct[y].name + " est passé à " + basketProduct[y].quantity);
            } else {
                alert("La quantitée du produit doit être comprise entre 1 et 100.");
                buttonChangeQuantity[0].value = 1;
                basketProduct[y].quantity = 1;
                localStorage.basketInfo = JSON.stringify(clone);
            }
            location.reload();
            calculeTotals();
        })
    }
}

// --------------------------------------------------
// Fonction pour vérifier tous les champs pour passer la commande 
// --------------------------------------------------

function checkForm(test) {
    // On définit les différents Regex pour les différements éléments attendus  
    let emailRegex = RegExp("^(.+)@(.+)$");
    let adresseRegex = RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let cityRegex = RegExp("^[a-zA-Z-Zàâäéèêëïîôöùûüç ,.'-]+$");
    let namesRegex = RegExp("^[a-zA-Z-Zàâäéèêëïîôöùûüç ,.'-]+$");

    // On met à zéro les messages d'érreurs 
    document.getElementById('firstNameErrorMsg').innerText = "";
    document.getElementById('lastNameErrorMsg').innerText = "";
    document.getElementById('addressErrorMsg').innerText = "";
    document.getElementById('cityErrorMsg').innerText = "";
    document.getElementById('emailErrorMsg').innerText = "";

    // On vérifie pour chaques input les regex soient bien respecté    
    let validFirstName = test.firstName;
    if (!namesRegex.test(validFirstName)) {
        let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner un prénom valide";
        return false;
    }

    let validLastName = test.lastName;
    if (!namesRegex.test(validLastName)) {
        let firstNameErrorMsg = document.getElementById('lastNameErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner un nom valide";
        return false;
    }
    let validAddress = test.address;
    if (!adresseRegex.test(validAddress)) {
        let firstNameErrorMsg = document.getElementById('addressErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une adresse valide";
        return false;
    }

    let validCity = test.city;
    if (!cityRegex.test(validCity)) {
        let firstNameErrorMsg = document.getElementById('cityErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une ville valide";
        return false;
    }
    let validEmail = test.email;
    if (!emailRegex.test(validEmail)) {
        let firstNameErrorMsg = document.getElementById('emailErrorMsg');
        firstNameErrorMsg.innerText = "Veuillez renseigner une adresse mail valide";
        return false;
    } else {
        return true; // Si tous les inputs sont correctement remplis la fonction retourne true 
    }
};

// --------------------------------------------------
// Fonction qui récupère le formulaire de contact, le panier et redirige vers la page confirmation
// --------------------------------------------------

function userFormAndOrder() {
    let contact;
    const order = document.getElementById("order");
    order.addEventListener("click", (event) => {
        event.preventDefault();
        contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        }
        if (checkForm(contact)) { // On vérifit que le formulaire est complet 
            if (basketProduct.length < 1) { // On vérifit que le panier ne soit pas vide 
                window.alert("Votre panier est vide");
            } else {
                products = JSON.parse(localStorage.getItem("basketInfo")); // On récupère le panier 

                let productId = []; // On créé un tableau pour ajouter tous les ID des produits du panier 
                for (product of basketProduct) {
                    productId.push(product.id)
                }
                let dataUser = { // On créé un objet avec le contact du client ainsi que les ID des produits du panier
                    contact,
                    products: productId,
                };

                const options = { // On définit dans une variable les informations pour le POST 
                    method: "POST",
                    body: JSON.stringify(dataUser),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                };

                fetch("http://localhost:3000/api/products/order", options) // On requête l'API avec la méthode POST
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem("orderId", data.orderId);
                        console.log(data);
                        document.location.href = "confirmation.html?id=" + data.orderId;
                    })
                    .catch((err) => {
                        alert("Oups, le serveur rencontre un problème." + err);
                    });
            }
        } else {
            alert("Veuillez vérifier que le formulaire soit bien rempli.")
            return null
        }
    });
};

userFormAndOrder()

