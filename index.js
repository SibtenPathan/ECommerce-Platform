document.addEventListener("DOMContentLoaded", function() {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const productContainer = document.getElementById('productContainer');
        const productTemplate = document.getElementById('productTemplate');

        // Function to add product to cart
        function addToCart(product, quantity, price) {
            console.log(`Added to cart: ${quantity} x ${product.name} ($${price} each)`);
            const totalPrice = quantity * price;
            console.log(`Total price: $${totalPrice}`);
            // Here, you can implement your logic for adding the product to the cart along with its price
        }

        data.forEach(product => {
            const instance = document.importNode(productTemplate.content, true);

            // Populate product details in the template
            instance.querySelector('.productName').textContent = product.name;
            instance.querySelector('.productImage').src = product.image;
            instance.querySelector('.productDescription').textContent = product.description;
            instance.querySelector('.productPrice').textContent = product.price;
            instance.querySelector('.productStock').textContent = product.stock;

            // Quantity management
            const quantityElement = instance.querySelector('.productQuantity');
            const incrementButton = instance.querySelector('.cartIncrement');
            const decrementButton = instance.querySelector('.cartDecrement');
            const stock = parseInt(product.stock);

            incrementButton.addEventListener('click', function() {
                let quantity = parseInt(quantityElement.textContent);
                if (quantity < stock) {
                    quantity++;
                    quantityElement.textContent = quantity;
                }
            });

            decrementButton.addEventListener('click', function() {
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                }
            });

            // Add to cart button
const addToCartButton = instance.querySelector('.add-to-cart-button');
addToCartButton.addEventListener('click', function() {
    const quantity = parseInt(quantityElement.textContent);
    const price = parseFloat(product.price);
    console.log(`Product: ${product.name}, Quantity: ${quantity}, Price: ${price}`);
    addToCart(product, quantity, price);
});


            // Append the populated template to the container
            productContainer.appendChild(instance);
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
});
