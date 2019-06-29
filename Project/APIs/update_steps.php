<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$steps = $obj["steps"];

$user_id = $obj["user_id"];

$date = $obj["date"];

$Sql_Query = "SELECT * FROM `Daily_steps` where user_id = '$user_id' and date = '$date'";

$result = $con->query($Sql_Query);

$Update_Query = "";

if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $Update_Query = "update Daily_steps set steps = $steps where user_id = $user_id and date = '$date'";

}else{
    $Update_Query = "insert into Daily_steps (user_id, steps, date) values($user_id, $steps, '$date')";
}

$result = $con->query($Update_Query);
mysqli_close($con);

?>