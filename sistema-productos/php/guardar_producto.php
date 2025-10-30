<?php
header('Content-Type: application/json');
require 'conexion.php';

// Instancia de clase Database y obtener la conexión $pdo
$database = new Database();
$pdo = $database->getConnection();

// Verificamos si la conexión fue exitosa
if ($pdo === null) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['exito' => false, 'mensaje' => 'Error de conexión a la base de datos.']);
    exit;
}

// Obtenemos los datos JSON enviados desde el frontend
$datos = json_decode(file_get_contents('php://input'), true);

// --- Validación de duplicado en el servidor ---

try {
    $stmt = $pdo->prepare("SELECT id FROM productos WHERE codigo = ?");
    $stmt->execute([$datos['codigo']]);
    if ($stmt->fetch()) {
        echo json_encode(['exito' => false, 'mensaje' => 'El código del producto ya está registrado.']);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error al verificar el código.']);
    exit;
}

// --- Inserción en la base de datos ---
try {
    $sql = "INSERT INTO productos (codigo, nombre, descripcion, precio, bodega_id, sucursal_id, moneda_id, materiales)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    
    // Convertimos el array de materiales en un string separado por comas
    $materiales_texto = implode(', ', $datos['materiales']);
    
    $stmt->execute([
        $datos['codigo'],
        $datos['nombre'],
        $datos['descripcion'],
        $datos['precio'],
        $datos['bodega'],
        $datos['sucursal'],
        $datos['moneda'],
        $materiales_texto
    ]);
    
    echo json_encode(['exito' => true, 'mensaje' => 'Producto guardado exitosamente.']);

} catch (PDOException $e) {
    // Capturamos cualquier error durante la inserción
    echo json_encode(['exito' => false, 'mensaje' => 'Error al guardar en la base de datos: ' . $e->getMessage()]);
}
?>