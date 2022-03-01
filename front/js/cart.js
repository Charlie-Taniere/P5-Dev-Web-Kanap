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

    calculeTotals(); // Appel de la fonction pour le calculs des totaux avec le localstorage en paramètre
    deleteItem(); // Appel de la fonction pour supprimer un article 
    modifyQuantity(); // Appel de la fonction pour modifier la quantitée d'un article 
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
            // location.reload(); 
            window.alert("Le produit a bien été supprimé du panier");
        })
    }
}

// Fonction pour modifier la quantitée d'un article
function modifyQuantity() {

    const itemToChangeQuantity = document.getElementsByClassName("cart__item"); // Récupération de l'article 
    for (i = 0; i < itemToChangeQuantity.length; i++) { // On itère pour savoir combien d'article sont affiché
        const y = i; // On définit y comme étant le nombre d'articles 

        buttonChangeQuantity = itemToChangeQuantity[y].getElementsByClassName("itemQuantity"); // On récupère l'input pour changer  de quantité

        buttonChangeQuantity[0].addEventListener('change', function (event) { // On écoute le changement de valeur

            // On récupère la localisation du clic avec event.target et on le définit comme étant la quantité du produit du localstorage associé
            
 // ajouter étape pour vérifier si la quantité n'est pas sup à 100 

            basketProduct[y].quantity = parseInt(event.target.value);

            if (basketProduct[y].quantity >= 1 && basketProduct[y].quantity <= 100) {
                localStorage.setItem("basketInfo", JSON.stringify(basketProduct)); // On met à jour le localstorage
                window.alert("La quantitée du produit " + basketProduct[y].name + " est passé à " + basketProduct[y].quantity);
            } else {
                window.alert("La quantitée du produit doit être comprise entre 1 et 100.");
            }
            calculeTotals();
        })
    }
}

// Fonction pour vérifier tous les champs pour passer la commande 
function checkForm(test) {
// On définit les différents Regex pour les différements éléments attendus  
    let emailRegex = RegExp("^(.+)@(.+)$");
    let adresseRegex = RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let cityRegex = RegExp("^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$");
    let namesRegex = RegExp("^[a-zA-Z ,.'-]+$");

// On met à zéro les messages d'érreurs 
    document.getElementById('firstNameErrorMsg').innerText = ""; 
    document.getElementById('lastNameErrorMsg').innerText = "";
    document.getElementById('addressErrorMsg').innerText = "";
    document.getElementById('cityErrorMsg').innerText = "";
    document.getElementById('emailErrorMsg').innerText = "";

// On vérifie pour chaques input si    
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
        return true;
    }
};


function getUserForm() {
    let userContactForm;
    const order = document.getElementById("order");
    order.addEventListener("click", (event) => {
        event.preventDefault();
            userContactForm = {
            firstName : document.getElementById("firstName").value,
            lastName : document.getElementById("lastName").value,
            address : document.getElementById("address").value,
            city : document.getElementById("city").value,
            email : document.getElementById("email").value,
        }
        console.log(userContactForm);  
        checkForm(userContactForm); 
    });
};
getUserForm()

