async function getData() {
    let result = await fetch("http://localhost:3000/api/products");
    if (!result.ok) {
        console.log (error);
    } else {
    return await result.json();}
}

async function renderArrayData() {
    let data = await getData();
    let html = '';
    data.forEach(data => {
        let htmlSegment = `<a href="./product.html?id=${data._id}">
                            <article>
                            <img src="${data.imageUrl}" alt="${data.altTxt}" />
                            <h3 class="productName">${data.name}</h3>
                            <p class="productDescription">${data.description}</p>
                            </article>
                            <a>`;
        html += htmlSegment;
    });

    let container = document.querySelector('.items');
    container.innerHTML = html;
}

renderArrayData();
