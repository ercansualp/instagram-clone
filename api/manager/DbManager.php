<?php

class DbManager
{
    private $conn;

    public function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=localhost;dbname=instagram-clone", "root", "");
        } catch (PDOException $e) {
            print $e->getMessage();
        }
    }
    public function SelectMultipleRow($sql, $params)
    {
        $query = $this->conn->prepare($sql);
        $query->execute($params);
        return json_encode($query->fetchAll(PDO::FETCH_ASSOC));
    }

    public function SelectSingleRow($sql, $params)
    {
        $query = $this->conn->prepare($sql);
        $query->execute($params);
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }

    public function Fetch($sql, $params)
    {
        try {
            $query = $this->conn->prepare($sql);
            $query->execute($params);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    function __destruct()
    {
        $this->conn = null;
    }
}

?>