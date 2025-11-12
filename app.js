// URL de la API
const API_URL = 'http://localhost:3001/api/productos';

// Referencias a elementos del DOM
const form = document.getElementById('producto-form');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const productosLista = document.getElementById('productos-lista');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const productosCount = document.getElementById('productos-count');

// Campos del formulario
const productoIdInput = document.getElementById('producto-id');
const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const precioInput = document.getElementById('precio');
const stockInput = document.getElementById('stock');
const categoriaInput = document.getElementById('categoria');

let editMode = false;

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

// Enviar formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const producto = {
        nombre: nombreInput.value.trim(),
        descripcion: descripcionInput.value.trim(),
        precio: parseFloat(precioInput.value),
        stock: parseInt(stockInput.value),
        categoria: categoriaInput.value.trim() || 'General'
    };

    if (editMode) {
        await actualizarProducto(productoIdInput.value, producto);
    } else {
        await crearProducto(producto);
    }
});

// Cancelar edición
btnCancel.addEventListener('click', () => {
    resetForm();
});

// Cargar todos los productos
async function cargarProductos() {
    try {
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        productosLista.innerHTML = '';

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }

        const productos = await response.json();
        
        loading.style.display = 'none';
        
        if (productos.length === 0) {
            productosLista.innerHTML = '<p class="loading">No hay productos</p>';
            productosCount.textContent = '0';
            return;
        }

        productosCount.textContent = productos.length;
        mostrarProductos(productos);
        
    } catch (error) {
        loading.style.display = 'none';
        mostrarError('Error al cargar productos: ' + error.message);
        console.error('Error:', error);
    }
}

// Mostrar productos en el DOM
function mostrarProductos(productos) {
    productosLista.innerHTML = '';
    
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <div class="producto-info-main">
                <div>
                    <span class="categoria">${producto.categoria}</span>
                    <h3>${producto.nombre}</h3>
                </div>
                <p class="descripcion">${producto.descripcion}</p>
                <div class="producto-details">
                    <div class="detail-item">
                        <span class="detail-label">Precio</span>
                        <span class="detail-value">$${producto.precio.toFixed(2)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Stock</span>
                        <span class="detail-value">${producto.stock}</span>
                    </div>
                </div>
            </div>
            <div class="producto-actions">
                <button class="btn-edit" onclick="editarProducto('${producto._id}')">Editar</button>
                <button class="btn-delete" onclick="confirmarEliminar('${producto._id}', '${producto.nombre}')">Eliminar</button>
            </div>
        `;
        productosLista.appendChild(card);
    });
}

// Crear un nuevo producto
async function crearProducto(producto) {
    try {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>⏳</span> Guardando...';

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.mensaje || 'Error al crear producto');
        }

        const nuevoProducto = await response.json();
        console.log('Producto creado:', nuevoProducto);
        
        resetForm();
        cargarProductos();
        mostrarMensajeExito('✅ Producto creado exitosamente');
        
    } catch (error) {
        mostrarError('Error al crear producto: ' + error.message);
        console.error('Error:', error);
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<span>➕</span> Agregar Producto';
    }
}

// Editar un producto
async function editarProducto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener producto');
        }

        const producto = await response.json();
        
        // Llenar formulario con los datos del producto
        productoIdInput.value = producto._id;
        nombreInput.value = producto.nombre;
        descripcionInput.value = producto.descripcion;
        precioInput.value = producto.precio;
        stockInput.value = producto.stock;
        categoriaInput.value = producto.categoria;

        // Cambiar a modo edición
        editMode = true;
        formTitle.textContent = 'Editar Producto';
        btnSubmit.innerHTML = '<span>💾</span> Guardar Cambios';
        btnCancel.style.display = 'block';

        // Scroll al formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        mostrarError('Error al cargar producto: ' + error.message);
        console.error('Error:', error);
    }
}

// Actualizar un producto
async function actualizarProducto(id, producto) {
    try {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>⏳</span> Actualizando...';

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.mensaje || 'Error al actualizar producto');
        }

        const productoActualizado = await response.json();
        console.log('Producto actualizado:', productoActualizado);
        
        resetForm();
        cargarProductos();
        mostrarMensajeExito('✅ Producto actualizado exitosamente');
        
    } catch (error) {
        mostrarError('Error al actualizar producto: ' + error.message);
        console.error('Error:', error);
    } finally {
        btnSubmit.disabled = false;
    }
}

// Confirmar eliminación
function confirmarEliminar(id, nombre) {
    if (confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
        eliminarProducto(id);
    }
}

// Eliminar un producto
async function eliminarProducto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.mensaje || 'Error al eliminar producto');
        }

        const resultado = await response.json();
        console.log('Producto eliminado:', resultado);
        
        cargarProductos();
        mostrarMensajeExito('✅ Producto eliminado exitosamente');
        
    } catch (error) {
        mostrarError('Error al eliminar producto: ' + error.message);
        console.error('Error:', error);
    }
}

// Resetear formulario
function resetForm() {
    form.reset();
    productoIdInput.value = '';
    editMode = false;
    formTitle.textContent = 'Agregar Nuevo Producto';
    btnSubmit.innerHTML = '<span>➕</span> Agregar Producto';
    btnCancel.style.display = 'none';
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Mostrar mensaje de éxito
function mostrarMensajeExito(mensaje) {
    const successDiv = document.createElement('div');
    successDiv.className = 'error-message';
    successDiv.style.background = '#d4edda';
    successDiv.style.color = '#155724';
    successDiv.style.borderLeft = '4px solid #28a745';
    successDiv.textContent = mensaje;
    
    const container = document.querySelector('.container');
    container.insertBefore(successDiv, container.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
