<?php 

    header ('Content-type: application/json');
    include ("databaseStep3.php");    

    $user = $_GET['level'];
    $results = [];

    //controllo che sia una utente valido altrimenti mando risultati da guest
    if ($user != 'guest' && $user != 'employee' && $user != 'clevel') {
    	$user = null;
    } 

    // ACCESSI DISPONIBILI:

	if ($user == 'guest' || $user == null) {
		foreach ($graphs as $type => $graph) {
			if ($graph["access"] == 'guest') {
				$results[] = [$type => $graph];
			}
		}
	}

	if ($user == 'employee') {
		foreach ($graphs as $type => $graph) {
			if ($graph["access"] == 'guest' || $graph["access"] == 'employee') {
				$results[] = [$type => $graph];
			}
		}
	}

	if ($user == 'clevel') {
		foreach ($graphs as $type => $graph) {
			$results[] = [$type => $graph];
			// passaggio in più mi rendo conto, ma formatto i dati allo stesso modo degli altri user
		}
	}

	// esporto in oggetto JSON
    echo json_encode($results);

 ?>