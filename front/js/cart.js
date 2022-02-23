// Récupération du localstorage
let retrieveBasket = localStorage.getItem("productInformation");
let basketProduct = JSON.parse(retrieveBasket);
let totalPriceProduct = 0;
let product;


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

    modifyQuantity(); // La fonction pour modifier la quantitée est appelée ici car la fonction renderCart est asyncrone
                   // et se charge moins vite que la fonction modifyQuantity

    totalQuantityPrice(basketProduct) // La fonction pour calculer les totaux est appelé dans la fonction renderCart car  
                                      // elle récupère en paramètre le localstorage avec la clé "price" en plus
}
renderCart(); 


// La fonction totalQuantityPrice va calculer et prix total et la quantité de chaque produits 
function totalQuantityPrice(basketProductWithPrice) {
    
    // Calcul de la quantité total 
    let quantityArray = basketProductWithPrice.map(x => x.quantity);
    let totalQuantity = 0;
    for (let i = 0; i < quantityArray.length; i++) {
        totalQuantity += parseInt(quantityArray[i]);
    }

    // Rendu de la quantité total  
    let totalQuantityRender = `${totalQuantity}`;
    let containerTotalQuantity = document.getElementById("totalQuantity");
    containerTotalQuantity.innerHTML = totalQuantityRender;

    // Calcul du prix total 
    let totalPrice = 0;
    for (let i = 0; i < basketProductWithPrice.length; i++){
        totalPrice += basketProductWithPrice[i].price * basketProductWithPrice[i].quantity;
    }

   // Rendu du prix total 
        let containerTotal = document.getElementById("totalPrice");
        containerTotal.innerHTML = totalPrice;
}


function modifyQuantity() {

        let addQuantity = document.getElementsByClassName("itemQuantity");
        console.log(addQuantity);
        for (let i = 0; i < addQuantity.length; i++) {
            addQuantity[i].addEventListener('change', function () {
               // console.log(addQuantity.length);
                console.log("hello")
            
            });
    }
}


// document.addEventListener("DOMContentLoaded", function(event) {
//     console.log("DOM is loaded");
//     let addQuantity = Array.from(document.getElementsByClassName("itemQuantity"));
//     console.log(addQuantity);
//     for (let i = 0; i < addQuantity.length; i++) {
//         console.log(addQuantity);
//     addQuantity[i].addEventListener('change', function(){
//         console.log(this);
//     });
//     }

//     });










// Supprimer un produit
// let buttonDeletet = document.getElementsByClassName(".deleteItem");

// for (let i = 0; i < buttonDeletet.length; i++) {
//     buttonDeletet[i].addEventListener('click', (event) => {
//         // event.preventDefault();  
//         console.log("hello");
//         console.log(buttonDeletet[i]);
//     });

// };
// console.log(buttonDeletet[i]);



// document.querySelectorAll(".deleteItem").forEach(p => {
//     p.addEventListener('click', event => {
//      console.log("hello");
//     })
//   })


//       var btn = document.getElementsByClassName('deleteItem')

// for (var i = 0; i < btn.length; i++) {
//   btn[i].addEventListener('click', function(e) {
//     e.currentTarget.parentNode.remove();
//     //this.closest('.single').remove() // in modern browsers in complex dom structure
//     //this.parentNode.remove(); //this refers to the current target element 
//     //e.target.parentNode.parentNode.removeChild(e.target.parentNode);
//   }, false);
// }

// document.addEventListener("DOMContentLoaded", () => { // wait till all the DOM is Loaded, since querying objects at this point they are not there yet.
// let deleteButton = document.getElementsByClassName("deleteItem"); 
// let test = Array.from(deleteButton);
// for (i = 0; i < test.length; i++) {
//     console.log(test[i].id);
//  };

// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded',execute);
// }else{
//     execute();
// }
// function execute() {
//     const btns = document.getElementsByClassName('deleteItem');
//     for(let i = 0; i < btns.length; i++){
//         btns[i].addEventListener('click',function(){
//             console.log('button index : '+i);
//         });
//     }
// }
// execute();