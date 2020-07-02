<?php

    include_once("functions.php");
    $action = $_POST["action"];

    switch ($action) {  
        case "init":
            init();
            break;
        case "selectOneGood":
            selectOneGood();
            break;
        case "updateGoods": 
            updateGoods();
            break;
        case "newGood": 
            newGood();
            break;
        case "loadGoods": 
            loadGoods();
            break;
    }       