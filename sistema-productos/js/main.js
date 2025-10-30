document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL FORMULARIO ---
    const form = document.getElementById('productForm');
    const codigoInput = document.getElementById('codigo');
    const nombreInput = document.getElementById('nombre');
    const bodegaSelect = document.getElementById('bodega');
    const sucursalSelect = document.getElementById('sucursal');
    const monedaSelect = document.getElementById('moneda');
    const precioInput = document.getElementById('precio');
    const materialCheckboxes = document.querySelectorAll('input[name="material"]');
    const descripcionTextarea = document.getElementById('descripcion');

    // --- FUNCIÓN PARA CARGAR DATOS EN LOS SELECTS ---
    async function cargarSelect(url, selectElement) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.statusText);
            }
            const data = await response.json();

            selectElement.innerHTML = `<option value="">-- Seleccione --</option>`;

            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nombre;
                selectElement.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar datos para el select:', error);
            alert('No se pudieron cargar los datos para un campo. Revise la conexión y la consola.');
        }
    }

    // --- CARGA INICIAL DE DATOS AL ABRIR LA PÁGINA ---
    // Esta ruta funciona para WAPP
    const baseURL = '/sistema-productos/php/api.php';
    cargarSelect(`${baseURL}?accion=bodegas`, bodegaSelect);
    cargarSelect(`${baseURL}?accion=monedas`, monedaSelect);

    // --- LÓGICA DE SELECTS DEPENDIENTES ---
    bodegaSelect.addEventListener('change', () => {
        const bodegaId = bodegaSelect.value;
        if (bodegaId) {
            sucursalSelect.disabled = false;
            cargarSelect(`${baseURL}?accion=sucursales&bodega_id=${bodegaId}`, sucursalSelect);
        } else {
            sucursalSelect.innerHTML = '<option value="">-- Seleccione una bodega primero --</option>';
            sucursalSelect.disabled = true;
        }
    });

    // --- MANEJO DEL ENVÍO DEL FORMULARIO ---
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        // --- INICIO DE VALIDACIONES ---

        // 1. Código del Producto
        const codigo = codigoInput.value.trim();
        if (codigo === '') {
            alert("El código del producto no puede estar en blanco.");
            return;
        }
        if (codigo.length < 5 || codigo.length > 15) {
            alert("El código del producto debe tener entre 5 y 15 caracteres.");
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(codigo)) {
            alert("El código del producto debe contener letras y números");
            return;
        }
        // Verificación de unicidad
        const responseUnicidad = await fetch(`${baseURL}?accion=verificar_codigo&codigo=${codigo}`);
        const dataUnicidad = await responseUnicidad.json();
        if (dataUnicidad.existe) {
            alert("El código del producto ya está registrado.");
            return;
        }

        // 2. Nombre del Producto 
        const nombre = nombreInput.value.trim();
        if (nombre === '') {
            alert("El nombre del producto no puede estar en blanco.");
            return;
        }
        if (nombre.length < 2 || nombre.length > 50) {
            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
            return;
        }

        // 3. Bodega 
        if (bodegaSelect.value === '') {
            alert("Debe seleccionar una bodega.");
            return;
        }

        // 4. Sucursal 
        if (sucursalSelect.value === '') {
            alert("Debe seleccionar una sucursal para la bodega seleccionada.");
            return;
        }

        // 5. Moneda 
        if (monedaSelect.value === '') {
            alert("Debe seleccionar una moneda para el producto.");
            return;
        }

        // 6. Precio 
        const precio = precioInput.value.trim();
        if (precio === '') {
            alert("El precio del producto no puede estar en blanco.");
            return;
        }
        if (!/^\d+(\.\d{1,2})?$/.test(precio) || parseFloat(precio) <= 0) {
            alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
            return;
        }

        // 7. Materiales 
        const materialesSeleccionados = Array.from(materialCheckboxes).filter(cb => cb.checked);
        if (materialesSeleccionados.length < 2) {
            alert("Debe seleccionar al menos dos materiales para el producto.");
            return;
        }

        // 8. Descripción
        const descripcion = descripcionTextarea.value.trim();
        if (descripcion === '') {
            alert("La descripción del producto no puede estar en blanco.");
            return;
        }
        if (descripcion.length < 10 || descripcion.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            return;
        }
        
        // --- FIN DE VALIDACIONES ---

        // Si todo es válido, preparamos y enviamos los datos
        const formData = {
            codigo: codigo,
            nombre: nombre,
            bodega: bodegaSelect.value,
            sucursal: sucursalSelect.value,
            moneda: monedaSelect.value,
            precio: parseFloat(precio),
            materiales: materialesSeleccionados.map(cb => cb.value),
            descripcion: descripcion
        };

        try {
            const response = await fetch('/sistema-productos/php/guardar_producto.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            alert(result.mensaje); // "Producto guardado exitosamente."

            if (result.exito) {
                form.reset(); // Limpiamos el formulario
                sucursalSelect.innerHTML = '<option value="">-- Seleccione una bodega primero --</option>';
                sucursalSelect.disabled = true;
            }
        } catch (error) {
            alert("Ocurrió un error de comunicación al intentar guardar los datos.");
            console.error('Error en fetch POST:', error);
        }
    });
});