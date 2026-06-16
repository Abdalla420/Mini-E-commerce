const myProductsArray = [];
const cartArray = [];
let totalQuantity = 0;
let totalPrice = 0;

async function getProducts(){
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        return await response.json();
    }catch (error) {
        console.log("error");
    }
};

async function addProductsToArray(){
    const data = await getProducts();
    for (const product of data){
        myProductsArray.push(product);
        renderProducts(product);
    }
};
// total quantity
const totalQuantityP = document.querySelector("#totalQuantity");
totalQuantityP.textContent = `Total Quantity: ${totalQuantity}`;
// total price
const totalPriceP = document.querySelector("#totalPrice");
totalPriceP.textContent = `Total Price: $${totalPrice}`;

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
    
    
    
    detailsBtn.addEventListener("click", () => {
        imgDet.src = data.image;
        titleDet.textContent = data.title;
        descDet.textContent = data.description;
        categoryDet.textContent = `Category: ${data.category}`;
        priceDet.textContent = `Price: $${data.price}`
        ratingDet.textContent = `Rating: ${data.rating.rate} (${data.rating.count} reviews)`;
        dialog.showModal();
    });
    
    const cartList = document.querySelector("#cartList");
    
    addToBtn.addEventListener("click", () => {
        if(cartArray.find(p => p.id === data.id) !== undefined){
            data.quantity += 1;
            const list = document.getElementById(data.id);
            list.textContent = `${data.title} - $${data.price * data.quantity} x ${data.quantity}`;
        }else{
            const list = document.createElement("li");
            list.id = data.id;
            data.quantity = 1;
            list.textContent = `${data.title} - $${data.price} x 1`;
            cartArray.push(data);
            cartList.append(list);
        };
        totalQuantity += 1;
        totalPrice += data.price;
        totalQuantityP.textContent = `Total Quantity: ${totalQuantity}`;
        totalPriceP.textContent = `Total Price: $${totalPrice}`;
    });  
};




// details dialog 
const dialog = document.querySelector("#dialog");
const exit = document.querySelector("#exitDet");
const imgDet = document.querySelector("#imgDet");
const titleDet = document.querySelector("#titleDet");
const descDet = document.querySelector("#descDet");
const categoryDet = document.querySelector("#categoryDet");
const priceDet = document.querySelector("#priceDet");
const ratingDet = document.querySelector("#ratingDet");

exit.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

async function displayProducts(){
    const data = await getProducts();
    for (const product of data){
        renderProducts(product);
    }
};
addProductsToArray();
// displayProducts();