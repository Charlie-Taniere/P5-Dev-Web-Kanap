let orderNumber = document.querySelector("#orderId");
orderNumber.innerText = localStorage.getItem("orderId");
localStorage.clear();
