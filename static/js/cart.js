let cart = JSON.parse(localStorage.getItem("cart")) || []
let cart2 = JSON.parse(localStorage.getItem("cart2")) || []

function removeFromCart(index){
    if(cart[index] && cart2[index]){
        cart.splice(index, 1)
        cart2.splice(index, 1)
        saveCart2()
        saveCart();
        displayCartItems();
    }
}

function increaseQuantity(index){
    if(cart[index]){
        
        cart[index].quantity += 1;
        saveCart();
        displayCartItems();
    }
    else{
        console.error("Ivalid index for increase quantity: ", index)
    }
}

function decreaseQuantity(index){
    if(cart[index]){
        if(cart[index].quantity > 1){
            cart[index].quantity -= 1;
            saveCart();
            displayCartItems();
        }
        else{
            cart.splice(index, 1)
            cart2.splice(index, 1)
        }
        saveCart();
        displayCartItems();

    }
    else{
        onsole.error("Ivalid index for decrease quantity: ", index)
    }  
}

function displayCartItems(){
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; //clears previous item

    if(cart.lenght === 0){
        cartItems.innerHTML = `<p>Your cart is empty!</p>`
        return;
    }

    cart.forEach((item, index)=>{
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: ₦${item.price.toFixed(2)}</p>
            <p>Total: ₦${(item.price * item.quantity.toFixed(2))}</p>
        </div> 
        <div class="cart-item-actions">
            <button class="increase-btn">+</button>
            <span>${item.quantity}</span>
            <button class="decrease-btn">-</button>
            <button class="remove-btn">Remove</button>
        </div>
        `;

        //add event listner
        cartItem.querySelector(".increase-btn").addEventListener("click",()=>increaseQuantity(index));
        cartItem.querySelector(".decrease-btn").addEventListener("click",()=>decreaseQuantity(index));
        cartItem.querySelector(".remove-btn").addEventListener("click",()=>removeFromCart(index));

        cartItems.appendChild(cartItem)
    });

    calculateTotals();
}


// Calculate totals

function calculateTotals(){
    const subtotalElement = document.getElementById("subtotal");
    const taxesElement = document.getElementById("taxes");
    const totalElement = document.getElementById("total");

    let subtotal = 0

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const taxes = subtotal * 0.001;
    const total = subtotal + taxes;

    subtotalElement.innerHTML = `Subtotal: <span>${subtotal.toFixed(2)}</span>`
    taxesElement.innerHTML = `Taxes: <span>${taxes.toFixed(2)}</span>`
    totalElement.innerHTML = `Total: <span>${total.toFixed(2)}</span>`

}

function saveCart(){
    console.log("Saving cart: ", cart)
    localStorage.setItem("cart", JSON.stringify(cart));
}
function saveCart2(){
    console.log("Saving cart2: ", cart)
    localStorage.setItem("cart2", JSON.stringify(cart2));
}

displayCartItems();