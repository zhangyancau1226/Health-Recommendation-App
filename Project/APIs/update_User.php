<?php
include "DBConfig.php";

$con = mysqli_connect($HostName,$HostUser, $HostPass, $DatabaseName);

$json = file_get_contents('php://input');

$obj = json_decode($json,true);

$first_name = $obj['first_name'];
$last_name = $obj['last_name'];

$height = $obj['height'];

$age = $obj['age'];

$gender = $obj['gender'];

$user_id = $obj['user_id'];

$weight = $obj['weight'];

$Sql_Query = "update User set first_name = '$first_name', last_name = '$last_name', height = '$height', weight = '$weight', gender = '$gender' , age = '$age' where user_id = '$user_id'";

if(mysqli_query($con,$Sql_Query)){
    $MSG = 'User successfully update into Mysql Database';
    $json = json_encode($MSG);
    echo $json;
}else{
    echo "Something went wrong";
}
mysqli_close($con);

?>