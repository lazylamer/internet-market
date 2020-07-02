<?php
    $json = file_get_contents('../goods.json');
    $json = json_decode($json, true);
    // var_dump($_SERVER["REQUEST_METHOD"]);
    // var_dump($_POST);

    $message = '';
    $message .= "<h1>Order in market</h1>";
    $message .= "<p>Phone:" . $_POST["uphone"] . "</p>";
    $message .= "<p>Email:" . $_POST["uemail"] . "</p>";
    $message .= "<p>Name:" . $_POST["uname"] . "</p>";

    $cart = $_POST["cart"];
    // var_dump($cart);

    $total = 0;

    foreach($cart as $key => $value) {
        // var_dump($value);
        $message .= $cart[$key]['name'] . ": ";
        $message .= $cart[$key]['count'] . "pcs. ";
        $message .= $cart[$key]['cost'] * $cart[$key]['count'] . "$";
        $message .= '<br>';
        $total += $cart[$key]['cost'] * $cart[$key]['count'];
    }
    $message .= "<p>Total price: $total$</p>";
    print_r($message);

    $to = "gohes76817@go4mail.net";
    $spectext = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">
                 <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                 <title>Order</title></head><body>$message</body></html>";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $mail = mail($to, 'order', $spectext);
    echo ($mail) ?  1 :  0;