<?php
header('Content-Type: application/json');

require 'conexion.php';

// Instancia de clase Database y obtener la conexión $pdo
$database = new Database();
$pdo = $database->getConnection();

// Verificamos si la conexión fue exitosa
if ($pdo === null) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Error de conexión a la base de datos.']);
    exit;
}

$accion = $_GET['accion'] ?? null;

switch ($accion) {
    case 'bodegas':
        $stmt = $pdo->query("SELECT id, nombre FROM bodegas ORDER BY nombre");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'sucursales':
        $bodega_id = isset($_GET['bodega_id']) ? (int)$_GET['bodega_id'] : 0;
        if ($bodega_id > 0) {
            $stmt = $pdo->prepare("SELECT id, nombre FROM sucursales WHERE bodega_id = ? ORDER BY nombre");
            $stmt->execute([$bodega_id]);
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode([]);
        }
        break;

    case 'monedas':
        $stmt = $pdo->query("SELECT id, nombre FROM monedas ORDER BY nombre");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'verificar_codigo':
        $codigo = $_GET['codigo'] ?? '';
        $stmt = $pdo->prepare("SELECT id FROM productos WHERE codigo = ?");
        $stmt->execute([$codigo]);
        echo json_encode(['existe' => $stmt->fetch() !== false]);
        break;

    default:
        echo json_encode(['error' => 'Acción no válida']);
        break;
}
?>