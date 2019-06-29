<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$user_id = $obj["user_id"];

$amount = $obj["amount"];

$date = $obj["date"];

$food_name = $obj["food_name"];

$restaurant_name = $obj["restaurant_name"];

$eat_time = $obj["eat_time"];

$Sql_Query = "SELECT * FROM `Daily_calories` where user_id = '$user_id' and date = '$date'";

$result = $con->query($Sql_Query);

$MSG = $amount;

$Daily_Query = "";

if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $eaten = $row["amount"];
    $MSG = $MSG + $eaten;
    $Daily_Query = "update Daily_calories set amount = $MSG where user_id = $user_id and date = '$date'";
}else{
    $Daily_Query = "insert into Daily_calories (user_id, amount, date) values($user_id, $amount, '$date')";
}

$result = $con->query($Daily_Query);

$food_query = "insert into daily_food (user_id, food_name, restaurant_name, eat_time) values($user_id, '$food_name', '$restaurant_name', '$eat_time')";

$result = $con->query($food_query);

mysqli_close($con);
?>