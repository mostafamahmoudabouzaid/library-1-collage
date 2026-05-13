let currentCategory = "All";
let cart = [];

// CATEGORY
function setCategory(cat) {
    currentCategory = cat;
    filterBooks();
}

// BUY
function buy(name, price) {
    cart.push({ name, price, id: Date.now() });
    updateCart();
}

// FILTER
function filterBooks() {
    let search = document.getElementById("search").value.toLowerCase();
    let books = document.querySelectorAll(".book");

    books.forEach(book => {
        let title = book.querySelector("h4").innerText.toLowerCase();
        let category = book.getAttribute("data-category");

        let matchSearch = title.includes(search);
        let matchCategory = currentCategory === "All" || category === currentCategory;

        book.style.display = (matchSearch && matchCategory) ? "block" : "none";
    });
}

// CART TOGGLE
function toggleCart() {
    let box = document.getElementById("cart-box");
    box.style.display = box.style.display === "block" ? "none" : "block";
}

// REMOVE
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// UPDATE CART
function updateCart() {
    let list = document.getElementById("cart-items");
    let total = document.getElementById("total");
    let count = document.getElementById("cart-count");

    list.innerHTML = "";
    let sum = 0;

    cart.forEach(item => {
        sum += item.price;

        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ${item.price}</span>
                <button onclick="removeItem(${item.id})">X</button>
            </div>
        `;
    });

    total.innerText = sum;
    count.innerText = cart.length;
}