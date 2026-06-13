async function getProducts(){
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        return await response.json();
    }catch (error) {
        console.log("error");
    }
}
function renderProducts(data){
    const parentContainer = document.createElement("div");
    parentContainer.id = "parentContainer";
    

    parentContainer.dataset.id = data.id;

    const childContainer = document.createElement("div");
    childContainer.id = "childContainer";

    const image = document.createElement("img");
    image.id = "image";
    image.src = data.image;

    const productName = document.createElement("p");
    productName.id = "productName";
    productName.textContent = data.title;

    const productPrice = document.createElement("p");
    productPrice.id = "productPrice";
    productPrice.textContent = data.price;

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";

    const detailsBtn = document.createElement("button");
    detailsBtn.id = "detailsBtn";

    const addToBtn = document.createElement("button");
    addToBtn.id = "addToBtn";

    const gridContainer = document.querySelector("#gridContainer");

    buttonContainer.append(detailsBtn, addToBtn);
    childContainer.append(image, productName, productPrice, buttonContainer);
    parentContainer.append(childContainer);
    gridContainer.append(parentContainer);

}
async function displayProducts(){
    const data = await getProducts();
    for (const product of data){
        renderProducts(product);
    }
}

displayProducts();