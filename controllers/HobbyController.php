<?php

    header("Content-Type: application/json; charset=utf-8");
    require_once("../dao/HobbyDAO.php");

    $query = filter_input(INPUT_POST, "query");
    
    if($query === "list") {
        session_start();
        $hobbyDAO = new HobbyDAO();
        echo json_encode($hobbyDAO->list());
    }