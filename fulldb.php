<?php 

    header ('Content-type: application/json');
    include ("database.php");    
    echo json_encode($data);

 ?>