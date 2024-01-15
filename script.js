// JavaScript code for the coffee shop website

document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle the mobile menu
  function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("active");
  }

  // Function to handle form submission
  function submitForm(event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Validate form data
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Validate email using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Display success message
    alert("Form submitted successfully!");

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }

  // Function to handle "Add to Cart" button click
  function addToCart() {
    // Create or retrieve the shopping cart array from local storage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the product to the cart
    var product = {
      name: "Coffee Blend",
      price: 10.99,
    };
    cart.push(product);

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Display success message
    alert("Product added to cart!");
  }

  // Function to display items in the cart
  function displayCartItems() {
    // Retrieve the cart items from local storage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Display the items in the "Cart" section
    var cartSection = document.getElementById("Cart");
    cartSection.innerHTML = "<h2>Cart</h2>";

    if (cart.length > 0) {
      var cartList = document.createElement("ul");
      cart.forEach(function (item) {
        var cartItem = document.createElement("li");
        cartItem.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(cartItem);
      });
      cartSection.appendChild(cartList);
    } else {
      var emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Your cart is empty.";
      cartSection.appendChild(emptyCartMessage);
    }
  }

  // Add click event listener to the mobile menu button
  var menuButton = document.getElementById("menu-button");
  menuButton.addEventListener("click", toggleMenu);

  // Add submit event listener to the contact form
  var contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", submitForm);

  // Add click event listener to the "Add to Cart" button
  var addToCartButton = document.getElementById("add-to-cart-button");
  addToCartButton.addEventListener("click", addToCart);

  // Function to update the cart display
  function updateCartDisplay() {
    var cartItemsContainer = document.getElementById("cart-items");
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear existing cart items
    cartItemsContainer.innerHTML = "";

    // Display each item in the cart
    cart.forEach(function (item) {
      var listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItemsContainer.appendChild(listItem);
    });
  }

  // Update the cart display on page load
  updateCartDisplay();
});

// Fetch products from the API
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    // Hide loading message
    loadingMessage.style.display = "none";

    // Display products
    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.title} - $${product.price}`;
      productList.appendChild(listItem);
    });
  })
  .catch((error) => {
    // Hide loading message
    loadingMessage.style.display = "none";

    // Display error message
    errorMessage.style.display = "block";
    console.error("Error fetching products:", error);
  });

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
