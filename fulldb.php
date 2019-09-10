<?php 

    header ('Content-type: application/json');

    include ("database.php");    

    // //acquisisco artista da filtrare passato dall'API
    // $artist = $_GET["artist"];
    // $result = [];

    // //se c'è questo parametro...
    // if($artist) {
    //     //stampo solo quelli con l'artista chiesto
    //     foreach ($albums as $album) {
    //         if ($album["artist"] == $artist) {
    //             $result[] = $album;
    //         }
    //     }
    // }
    // //altrimenti stampo tutto!
    // else {
    //     $result = $albums;
    // }
    // $result = $data;

    echo json_encode($data);

 ?>