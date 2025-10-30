# Prueba_desarrollo_web_AlbertoVargasR
Proyecto de Desarrollo WEB para empresa ASIS 

# Sistema de Registro de Productos

Aplicación web para el registro de productos, desarrollada como parte de una prueba de diagnóstico. El proyecto utiliza un stack de tecnologías nativas: **PHP**, **JavaScript (AJAX)**, **CSS** y **PostgreSQL**.

Este proyecto está configurado para ejecutarse en un entorno de desarrollo WAPP (Windows, Apache, PostgreSQL, PHP) provisto por Bitnami.

## 🚀 Guía de Instalación y Ejecución

Siga estos pasos exactos para configurar y ejecutar el proyecto en un entorno Windows.

### 1. Prerrequisitos (Instalación de WAPP)

1.  **Descargar WAPP:** Descargue el **Bitnami WAPP Stack** desde la web "https://toolslib.net/downloads" en la versión 7.1.18. Este paquete instalará Apache, PostgreSQL, PHP y pgAdmin, y los configurará automáticamente para que funcionen juntos.
2.  **Instalar WAPP:**
    * Ejecute el instalador.
    * **¡MUY IMPORTANTE!** Durante la instalación, se le pedirá una contraseña para el usuario `postgres` de la base de datos. **Debe usar la contraseña: `admin123`** para que coincida con el script de conexión del proyecto.
    * Anote la ruta carpeta de instalación para más tarde (ej: `C:\Bitnami\wappstack-7.1.18-1`).

### 2. Configuración del Entorno

1.  **Iniciar Servicios:**
    * Vaya al Menú Inicio y abra el **"Bitnami WAPP Stack Manager"**.
    * En la pestaña "Manage Servers", asegúrese de que los servicios **Apache Web Server** y **PostgreSQL Database** estén corriendo (con luz verde 🟢). Si no lo están, selecciónelos y presione "Start".

2.  **Crear la Base de Datos:**
    * En el Bitnami WAPP Manager, vaya a la pestaña "Welcome" y haga clic en **"Open pgAdmin"**.
    * pgAdmin se abrirá en su navegador. Conéctese al servidor (le pedirá la contraseña `admin123` que definió en la instalación).
    * En el panel izquierdo, haga clic derecho en **"Databases"** -> `Create` -> `Database...`.
    * Ingrese el nombre de la base de datos: `productos_db_2`
    * Haga clic en "Save".

3.  **Crear las Tablas:**
    * En pgAdmin, seleccione la nueva base de datos `productos_db_2` en el panel izquierdo.
    * Haga clic en el ícono **"Query Tool"** (⚡) en la barra de herramientas.
    * Abra el archivo `sql/database.sql` de este repositorio.
    * Copie todo el contenido SQL y péguelo en la ventana del Query Tool (se puede adjuntar como archivo.sql).
    * Presione el botón "Execute/Run" (▶). Esto creará todas las tablas y datos iniciales.

### 3. Instalación del Proyecto

1.  **Clonar el Repositorio:**
    * Abra una terminal (Git Bash o CMD).
    * Navegue a la carpeta `htdocs` de su instalación de WAPP. (Ruta por defecto: `C:\Bitnami\wappstack-7.1.18-1\apache2\htdocs`)
    * ```bash
        cd C:\Bitnami\wappstack-7.1.18-1\apache2\htdocs
        ```
    * Clone el repositorio dentro de una carpeta llamada `sistema-productos`:
    * ```bash
        git clone https://github.com/AlbertoVargasR/Prueba_desarrollo_web_AlbertoVargasR.git sistema-productos
        ```
    * (Si lo descarga como ZIP, descomprímalo y asegúrese de que la ruta final de su `index.html` sea `C:\...\htdocs\sistema-productos\index.html`).

### 4. Ejecución y Prueba

1.  Asegúrese de que los servicios de Apache y PostgreSQL sigan corriendo en el Manager de WAPP.
2.  Abra su navegador web (Chrome, Firefox).
3.  Visite la siguiente URL:
    ```
    http://localhost/sistema-productos/
    ```
4.  El formulario debe cargar y los campos "Bodega" y "Moneda" deben llenarse automáticamente, confirmando la conexión a la base de datos.

### 5. Información Técnica

* **Versión de PHP:** PHP Version 7.1.18 (la misma incluida en el stack de WAPP).
* **Base de Datos:** PostgreSQL 10.4 (stack de WAPP que se utilizó).
* **Versión Bitnami WAPP:** Version 7.1.18-1
