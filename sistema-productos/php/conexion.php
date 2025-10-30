<?php
class Database {
    private $host = "localhost";
    private $db_name = "productos_db_2";
    private $username = "postgres";
    private $password = "admin123";
    private $port = "5432";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "pgsql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            // el echo rompe etructura JSON
            // En un proyecto real, se registraría el error como un log
        }
        return $this->conn;
    }
}
?>