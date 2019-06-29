<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$restaurant = $obj["restaurant"];

$Sql_Query = "SELECT * FROM `Food` where restaurant_name = '$restaurant'";

$result = $con->query($Sql_Query);

if($result->num_rows > 0){
    $MSG = "";
    while($row = $result->fetch_assoc()) {
        $MSG .= $row["food_name"]. ",";
        if($row["min_calories"] != NULL){
            $MSG .= $row["min_calories"]. ",";
        }   
        else{
            $MSG .= "0,";
        }
        if($row["max_calories"] != NULL){
            $MSG .= $row["max_calories"]. "\n";
        }
        else{
            $MSY .= "0\n";
        }
    }
    echo json_encode($MSG);
    
}else{
    echo json_encode("Fail");
}
mysqli_close($con);
?>