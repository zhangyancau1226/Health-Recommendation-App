<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$eat_time = $obj['eat_time'];

$user_id = $obj['user_id'];

$Sql_Query = "SELECT user_id, max_calories, Time(eat_time) as eat_time FROM `daily_food`, `Food` where DATE(eat_time) = '$eat_time' and daily_food.food_name = Food.food_name and user_id = '$user_id'";

$result = $con->query($Sql_Query);

if($result->num_rows > 0){
    $MSG = '';
    $Breakfast = 0;
    $Lunch = 0;
    $Dinner = 0;
    $Other = 0;
    while($row = $result->fetch_assoc()) {
        $Hour = 0;
        if($row['eat_time'][0] == '0'){
            $Hour = intval(substr($row['eat_time'],1,1));
        }else{
            $Hour = intval(substr($row['eat_time'],0,2));
        }
        if($Hour >= 5 && $Hour <= 11){
            $Breakfast += $row['max_calories'];
        }
        elseif($Hour >= 12 && $Hour <= 16){
            $Lunch += $row['max_calories'];
        }
        elseif($Hour >= 17 && $Hour <= 22){
            $Dinner += $row['max_calories'];
        }
        else{
            $Other += $row['max_calories'];
        }
    }
    $MSG .= $Breakfast .',' .$Lunch .',' .$Dinner .',' .$Other; 
    echo json_encode($MSG);
}else{
    $MSG = '0,0,0'; 
    echo json_encode($MSG);
}


?>