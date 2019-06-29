<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$location = $obj["location"];

$Sql_Query = "SELECT * FROM `Restaurant`where location = '$location'";

$result = $con->query($Sql_Query);

if($result->num_rows > 0){
    $MSG = "";
    while($row = $result->fetch_assoc()) {
        $MSG .= $row["name"] ."," .$row["cuisine"] ."\n";
    }
    echo json_encode($MSG);
    
}else{
    echo json_encode("Fail");
}
mysqli_close($con);
?>