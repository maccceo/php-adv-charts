<?php 

    header ('Content-type: application/json');
    include ("databaseStep2.php");    
    echo json_encode($graphs);

 ?>