<?php 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "eshop";

    function connect() {
        $conn = mysqli_connect("localhost", "root", "", "eshop");
        if (!$conn) {
            die("Conection failed: " . mysqli_connect_error());
        }
        mysqli_set_charset($conn, "utf8");
        return $conn;
    }

    function init() : void {
        //show goods
        $conn = connect();
        $sql = "SELECT id, name FROM goods";
        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0) {
            $out =  array();
            while($row = mysqli_fetch_assoc($result)) {
               $out[$row["id"]] = $row;
            }
            echo json_encode($out);
        } else {
            echo "0 results";
        }
        mysqli_close($conn);
    }

    function selectOneGood() : void {
        $conn = connect();
        $id = $_POST["aid"];
        $sql = "SELECT * FROM goods WHERE id = '$id'";
        $result = mysqli_query($conn, $sql);

        if(mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        } else {
            echo "0";
        }
        mysqli_close($conn);
    }

    function updateGoods() : void {
        $conn = connect();
        $id = $_POST["aid"];
        $name = $_POST["aname"];
        $cost = $_POST["acost"];
        $description = $_POST["adescription"];
        $img = $_POST["aimg"];

        $sql = "UPDATE goods SET name = '$name', cost = '$cost', 
                                 description = '$description', img = '$img'
                                 WHERE id = '$id'";

        if (mysqli_query($conn, $sql)) {
            echo "1";
        } else {
            echo "0";
        }
        mysqli_close($conn);
        updateJSON();
    }

    function newGood() : void {
        $conn = connect();
        $id = $_POST["aid"];
        $name = $_POST["aname"];
        $cost = $_POST["acost"];
        $description = $_POST["adescription"];
        $img = $_POST["aimg"];

        $sql = "INSERT INTO goods (name, cost, description, img)
                VALUES ('$name', '$cost', '$description', '$img')";

        if (mysqli_query($conn, $sql)) {
            echo "1";
        } else { 
            echo "0";
        }

        mysqli_close($conn);
        updateJSON();
    }

    function updateJSON() {
        $f = "../../goods.json";
        $conn = connect();
        $sql = "SELECT * FROM goods";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $out = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $out[$row["id"]] = $row;
            }
            file_put_contents($f, json_encode($out));
        } else {
            echo "0";
        }
        mysqli_close($conn);
    }

    function loadGoods() {
        $conn = connect();
        $sql = "SELECT * FROM goods";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $out = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $out[$row["id"]] = $row;
            }
            echo json_encode($out);
        } else {
            echo "0";
        }
        mysqli_close($conn);
    }