import { api } from "./utils.js";
import { cargarDatosProductos, modal, showAlert } from "./script.js";

const form = document.querySelector("form");
const cargarDatosEnFormulario = (producto) => {
    const { editar, name, description, price, linkimg } = form.elements;
    console.log("Que me llega aqui", producto)
    editar.value = producto.ID
    name.value = producto.nombre
    description.value = producto.descripcion
    price.value = producto.precio
    linkimg.value = producto.link_imagen
};

// Función para manejar errores
const manejarError = (error) => {
    const mensaje = error?.response?.data?.message || "Error desconocido";
    showAlert("Error!", mensaje, "error");
};


window.editarProducto = (id) => {
    console.log(id)
    api
        .get("/producto/" + id)
        .then(({ data }) => {
            cargarDatosEnFormulario(data);
            modal.show(); // Abrir el modal
        })
        .catch(manejarError);
}

window.eliminarProducto = (id) => {
    Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "Cancelar",
    }).then(function (result) {
        if (result.isConfirmed) {
            api
                .delete("/producto/" + id)
                .then(({ data }) => {
                    console.log(data);
                    showAlert("Eliminado!", data.message, "success");
                    cargarDatosProductos();
                })
                .catch(manejarError);
        }
    });

}