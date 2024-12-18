// main.js
import { api } from "./utils.js";



document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const newProductButton = document.getElementById('newProductButton');
    const productFormContainer = document.getElementById('productFormContainer');

    newProductButton.addEventListener('click', () => {
        productFormContainer.style.display = 'block';
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const description = document.getElementById('productDescription').value;
        const price = document.getElementById('productPrice').value;

        fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, price })
        })
            .then(response => response.json())
            .then(product => {
                addProductCard(product);
                productForm.reset();
                productFormContainer.style.display = 'none';
            });
    });

    function addProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <div class="actions">
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            </div>
        `;
        productList.appendChild(card);
    }

    function loadProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                products.forEach(product => {
                    addProductCard(product);
                });
            });
    }

    loadProducts();
});

function editProduct(id) {
    // Lógica para editar un producto
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        fetch(`/products/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                document.location.reload();
            });
    }
}
