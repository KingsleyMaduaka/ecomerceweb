//search for products
document.getElementById("searchButton").addEventListener("click", filterProducts);
document.getElementById("searchInput").addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        filterProducts();
    }
});

function filterProducts(){
    const query = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        if(title.includes(query)){
            product.style.display = "block";
        }
        else{
            product.style.display = "none"
        }
    });
};

 //load cart from storage
let cart = JSON.parse(localStorage.getItem("cart")) || []
let cart2 = JSON.parse(localStorage.getItem("cart2")) || []

const cartCount = document.querySelector('.cart-count');
const cartDetails = document.querySelector('.cart-details');
const cartItemsList =document.querySelector('.cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon')

//update cart count

const updateCartCount = ()=>{

    cartCount.textContent = cart2.length;
};

//update cart details
const updateCartDetails = ()=>{
    cartItemsList.innerHTML = '';
    if(cart.lenght === 0){
        cartItemsList.innerHTML = '<li>Your cart is empty</li>'
    }
    else{
        cart.forEach(item =>{
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name}- $${item.price}`
            cartItemsList.appendChild(listItem);
        });
    }
};

document.addEventListener('DOMContentLoaded', ()=>{
    addToCartButtons.forEach(button => {
        button.addEventListener('click', ()=>{
            const product = button.parentElement;
            const productCard = button.parentElement;
            const id = product.getAttribute('data-id');
            const name = productCard.querySelector("h3").textContent;
            const price = parseFloat(productCard.querySelector("p").textContent.replace("₦", ""));

            if(!cart2.find(item => item.id === id)){
                cart2.push({id, name, price })
                
                saveCart2();
                updateCartCount();
                updateCartDetails();
            }
            else{
                alert('This product is already in the cart.')
            }
        })
    });

    cartIcon.addEventListener('click', ()=>{
        cartDetails.classList.toggle('hidden')
    })

});


updateCartDetails();



//function add to cart

function addToCart(id, productName, productPrice, productImage,){

    const existingProduct = cart.find(item => item.name === productName);

    if(existingProduct){
        existingProduct.quantity += 1;
    }
    else{
        cart.push({
            dataId:  id,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    };

    saveCart();
    
}

// save to cart

function saveCart(){
    console.log("Saving cart:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}
function saveCart2(){
    
    localStorage.setItem("cart2", JSON.stringify(cart2));

}

document.querySelectorAll(".product-card button").forEach(button => {
    button.addEventListener("click", ()=> {
        const productCard = button.parentElement;
        const product = button.parentElement;   
        const id = product.getAttribute('data-id');
        const productName = productCard.querySelector("h3").textContent;
        const productPrice = parseFloat(productCard.querySelector("p").textContent.replace("₦", ""));
        const productImage = productCard.querySelector("img").src;
        

        addToCart(id, productName, productPrice, productImage);
    })
})

saveCart2();
updateCartCount();