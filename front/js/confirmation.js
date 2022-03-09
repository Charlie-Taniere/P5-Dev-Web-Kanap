let orderNumber = document.querySelector("#orderId"); 
orderNumber.innerText = localStorage.getItem("orderId"); // On récupère l'identifiant de commande et on l'affiche dans l'HTML
localStorage.clear(); // On supprime le localstorage pour ne pas conservé le l'identifiant de commande 
