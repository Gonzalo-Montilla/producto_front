// main.js
import { api } from "./utils.js";
import './funcionesProductos.js'
// abrir el modal
export const modal = new bootstrap.Modal("#Formulario_modal", {
    keyboard: false,
});

// Función genérica para mostrar mensajes de alerta
export const showAlert = (title, message, type) => {
    Swal.fire(title, message, type);
};



document.addEventListener('DOMContentLoaded', () => {
    cargarDatosProductos();
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const newProductButton = document.getElementById('newProductButton');
    const productFormContainer = document.getElementById('productFormContainer');

    newProductButton.addEventListener('click', () => {
        productFormContainer.style.display = 'block';
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = document.querySelector("form");
        const { editar,name, description, price, linkimg } = form.elements;
        const data = {
            name: name.value,
            description: description.value,
            price: price.value,
            linkimg: linkimg.value
        }
        
        const solicitud = {
            method: editar.value ? "PUT" : "POST",
            url: editar.value ? `/producto/${editar.value}` : "/producto",
            data,
        }


        api(solicitud)            
            .then(({ data }) => {
                console.log(data);
                Swal.fire("Exito!", data.message, "success")
                cargarDatosProductos();
                form.reset();
                modal.hide();
            })
            .catch((err) => Swal.fire("Error!", err?.response?.data?.message, "error"));

        
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

export function cargarDatosProductos() {
    const wrapper = document.querySelector("#card-wrapper");
    wrapper.innerHTML = "";

    api.get("/productos").then(({ data }) => {

        for (const producto of data) {
            wrapper.innerHTML += `
        <div class="row">    
            <div class="col-md-12">
                <div class="card">
                    <img src="${producto.link_imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=${producto.nombre}';" >
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><small class="text-muted">Precio: ${producto.precio}</small></p>
                        <a href="#" class="btn btn-primary">Ver más</a>
                    </div><div class="col-md-12 p-4">
                      <div class="d-grid gap-2">
                        <button class="btn btn-primary"
                          onclick="editarProducto(${producto.ID})">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="eliminarProducto(${producto.ID})">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                </div>
            </div>
        </div>`;
        }
    });
}
