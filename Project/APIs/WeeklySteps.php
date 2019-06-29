<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$start = $obj['start_date'];

$end = $obj['end_date'];

$user_id = $obj['user_id'];

$Sql_Query = "SELECT * from `Daily_steps` where user_id = '$user_id' and date between '$start' and '$end'";

$result = $con->query($Sql_Query);

if($result->num_rows > 0){
    $MSG = '';
    while($row = $result->fetch_assoc()) {
        $MSG .= $row['date'] ."," .$row['steps'] ."\n";
    }
    echo json_encode($MSG);
}else{
    $MSG = "sorry, the  user doesn't have sufficient infomation to generate the report";
    echo json_encode($MSG);
}

?>
