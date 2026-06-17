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
    };
};

async function addProductsToArray(){
    const data = await getProducts();
    for (const product of data){
        myProductsArray.push(product);
    };
    sortByPrice(myProductsArray);
    update();
};
// total quantity
const totalQuantityP = document.querySelector("#totalQuantity");
totalQuantityP.textContent = `Total Quantity: ${totalQuantity}`;
// total price
const totalPriceP = document.querySelector("#totalPrice");
totalPriceP.textContent = `Total Price: $${totalPrice}`;
const gridContainer = document.querySelector("#gridContainer");

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
        const removeListButton = document.createElement("button");
        removeListButton.id = `remove-${data.id}`;
        removeListButton.textContent = "Remove";
        if(cartArray.find(p => p.id === data.id) !== undefined){
            data.quantity += 1;
            const list = document.getElementById(data.id);
            const lSpan = document.getElementById(`span-${data.id}`);
            lSpan.textContent = `${data.title} - $${data.price.toFixed(2) * data.quantity} x ${data.quantity}`;
        }else{
            const list = document.createElement("li");
            const lSpan = document.createElement("span");
            list.id = data.id;
            lSpan.id = `span-${data.id}`
            data.quantity = 1;
            lSpan.textContent = `${data.title} - $${data.price.toFixed(2) * data.quantity} x ${data.quantity}`;
            cartArray.push(data);

            // remove button listener 
            removeListButton.addEventListener("click", () => {
                const index = cartArray.findIndex(p => p.id === data.id);
                data.quantity -= 1;
                if(data.quantity > 0){
                    lSpan.textContent = `${data.title} - $${data.price.toFixed(2) * data.quantity} x ${data.quantity}`;
                }else {
                    list.remove();
                }
                totalQuantity -= 1;
                totalPrice -= data.price;
                cartArray.splice(index, 1)
                totalQuantityP.textContent = `Total Quantity: ${totalQuantity}`;
                totalPriceP.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            });

            list.append(lSpan, removeListButton);
            cartList.append(list);
        };
        totalQuantity += 1;
        totalPrice += data.price;
        totalQuantityP.textContent = `Total Quantity: ${totalQuantity}`;
        totalPriceP.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
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

async function displayProducts(array){
    for (const product of array){
        renderProducts(product);
    };
};

const pagesContainer = document.querySelector("#pagesContainer");

async function update(){
    let tempArray = [];
    const pageArray = [];
    const productsPerPage = 8;
    let numberOfPages = Math.ceil(myProductsArray.length / productsPerPage);
    if(numberOfPages > 1){
        for(let i = 1;i <= numberOfPages;i++){
            const pageButton = document.createElement("button");
            pageButton.id = i;  
            pageButton.textContent = i;
            // ex 0 * 8 and 1 * 8 (), 1 * 8  and 2 * 8 
            tempArray = myProductsArray.slice((i - 1) * productsPerPage, i * productsPerPage);
            pageArray.push(tempArray);
            pageButton.addEventListener("click" ,() => {
                // this empties the parent element
                gridContainer.replaceChildren();
                displayProducts(pageArray[i - 1]);
            })
            pagesContainer.append(pageButton);
        };
        displayProducts(pageArray[0]);
    };
};
// sorting by price, name and ratings
const sort = document.querySelector("#sort");
function sortByPrice(array){
    gridContainer.replaceChildren();
    array.sort((b, a) => b.price - a.price);
    pagesContainer.replaceChildren();
    update();
};
function sortByName(array){
    gridContainer.replaceChildren();
    array.sort((a, b) => a.title.localeCompare(b.title));
    pagesContainer.replaceChildren();
    update();
};
function sortByRating(array){
    gridContainer.replaceChildren();
    array.sort((b, a) => b.rating.rate - a.rating.rate);
    pagesContainer.replaceChildren();
    update();
}
sort.addEventListener("change", () => {
if(sort.value === "sort-price"){
    sortByPrice(myProductsArray);
}else if(sort.value === "sort-name"){
    sortByName(myProductsArray);
}else if(sort.value === "sort-rating"){
    sortByRating(myProductsArray);
}
});

addProductsToArray();