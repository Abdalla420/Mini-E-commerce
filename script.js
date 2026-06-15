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
    productPrice.textContent = `$${data.price}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const detailsBtn = document.createElement("button");
    detailsBtn.id = "detailsBtn";
    detailsBtn.textContent = "View Details";

    const addToBtn = document.createElement("button");
    addToBtn.id = "addToBtn";
    addToBtn.textContent = "Add to Cart";

    const gridContainer = document.querySelector("#gridContainer");

    buttonContainer.append(detailsBtn, addToBtn);
    childContainer.append(image, productName, productPrice, buttonContainer);
    parentContainer.append(childContainer);
    gridContainer.append(parentContainer);

    // details dialog 
    const dialog = document.querySelector("#dialog");
    const exit = document.querySelector("#exitDet");
    
    const imgDet = document.querySelector("#imgDet");
    
    const titleDet = document.querySelector("#titleDet");

    const descDet = document.querySelector("#descDet");
    
    const categoryDet = document.querySelector("#categoryDet");
    
    const priceDet = document.querySelector("#priceDet");
    
    const ratingDet = document.querySelector("#ratingDet");
    
    detailsBtn.addEventListener("click", () => {
        imgDet.src = data.image;
        titleDet.textContent = data.title;
        descDet.textContent = data.description;
        categoryDet.textContent = `Category: ${data.category}`;
        priceDet.textContent = `Price: $${data.price}`
        ratingDet.textContent = `Rating: ${data.rating.rate} (${data.rating.count} reviews)`;
        dialog.showModal();
    })

    exit.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    })


}
async function displayProducts(){
    const data = await getProducts();
    for (const product of data){
        renderProducts(product);
    }
}

displayProducts();