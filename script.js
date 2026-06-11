async function getProducts(){
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);
    }catch (error) {
        console.log("error");
    }
}
function renderProdcuts(data){
    const parentContainer = document.createElement("div");
    parentContainer.id = "parentContainer";
    // to assign id to container
    parentContainer.dataset.id = data.id;

    const childContainer = document.createElement("div");
    childContainer.id = "childContainer";

    const image = document.createElement("img");
    image.id = "image";
    image.src = data.image;

    const productName = document.createElement("p");
    productName.id = "productName";

    const productPrice = document.createElement("p");
    productPrice.id = "productPrice";

    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";

    const detailsBtn = document.createElement("button");
    detailsBtn.id = "detailsBtn";

    const addToBtn = document.createElement("button");
    addToBtn.id = "addToBtn";

    // select gridContainer
    const gridContainer = document.querySelector("#gridContainer");

    buttonContainer.append(detailsBtn, addToBtn);
    childContainer.append(image, productName, productPrice, buttonContainer);
    parentContainer.append(childContainer);
    gridContainer.append(parentContainer);

}
function displayProducts(){

}

renderProdcuts();