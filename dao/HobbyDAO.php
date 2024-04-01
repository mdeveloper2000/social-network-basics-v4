<?php

require_once("ConnectionFactory.php");
require_once("../models/Hobby.php");

class HobbyDAO {

    private $connection;
    
    public function __construct() {
        $this->connection = ConnectionFactory::connect();
    }

    public function list() {
        $hobbies = array();
        try {
            $sql = "SELECT * FROM hobbies";
            $rs = $this->connection->query($sql);
            $rs->execute();            
            if($rs->rowCount() > 0) {
                while($row = $rs->fetch(PDO::FETCH_OBJ)) {
                    $hobby = new Hobby();
                    $hobby->setId($row->id);
                    $hobby->setName($row->name);
                    array_push($hobbies, $hobby);
                }
            }            
            return $hobbies;
        }
        catch(PDOException $exception) {
            $exception->getMessage();
        }
        return null;
    }

}