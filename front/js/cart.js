let retrieveBasket = localStorage.getItem("productInformation");
let basketProduct;
let product;
let price;

async function renderCart() {

    basketProduct = JSON.parse(retrieveBasket);
    console.log(basketProduct);


    for (product of basketProduct) {

        // for (var i = 0; i < basketProduct.length; i++) {
        //     product = basketProduct[i];
        //     url = "http://localhost:3000/api/products/" + product.id;
        //     await fetch(url)
        //         .then(function (res) {
        //             if (res.ok) {
        //                 return res.json().then(data => {
        //                     price = data.price;
        //                     console.log(price);
        //                 });
        //             }
        //         })
        //         .catch(function (err) {
        //             console.log("Une erreur est survenue")
        //         })
        // }



        let html = " ";
        let htmlSegment = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                                <div class="cart__item__img">
                                    <img src="${product.image}" alt="${product.alt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                    <h2>${product.name}</h2>
                                    <p>${product.color}</p>
                                    <p>${price}€</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté :${product.quantity} </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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