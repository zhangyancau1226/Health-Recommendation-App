<?php

include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$email = $obj["email"];

$password = $obj["password"];

$Sql_Query = "select * from login_info, User where User.user_id = login_info.user_id and user_email = '$email' and password = '$password' ";

$result = $con->query($Sql_Query);

$userid = "";
if($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $MSG = $row["user_id"]. ",". $row["first_name"]. ",".  $row["last_name"]. ",". $row["height"]. ",". $row["weight"]. ",". $row["gender"]. ",". $row["age"] ;
    echo json_encode($MSG);
}else{
    echo json_encode("Fail");
}
mysqli_close($con);


?>