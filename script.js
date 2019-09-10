
$(document).ready(function() {
	
	// //carica tutti gli album
	// $.ajax({
	// 	url: "API.php",
	// 	method: "GET",
	// 	success: function(data) {
	// 		printAlbums(data);
	// 	}
	// });

	// //filtro per artista
	// $("#go").click(filterByArtist);

});


// function printAlbums(data) {
// 	console.log(data);
// 	var destinazione = $("#api");

// 	//cancello tutti gli album inseriti prima (if present)
// 	$(".apiAlbum").remove();

// 	//stampo ad uno ad uno gli album
// 	for (var i = 0; i < data.length; i++) {
// 		var album = data[i];
// 		var stampa =
// 			"<div class='apiAlbum'>" +
// 				"<h2>" + album.name + "</h2>" +
// 				"<h3>" + album.artist + "</h3>" +
// 				'<p>' + album.year + ", " + album.genre + "</p>" +
// 				'<img src="' + album.cover + '">' +
// 			"</div>";
// 		//aggiungo album all'HTML
// 		destinazione.append(stampa);
// 	}
// }

// function filterByArtist() {
// 	//prendo artista scelto, lo mando all'API
// 	var artist = $("#artist").val();
// 	$.ajax({
// 		url: "API.php",
// 		method: "GET",
// 		data: {artist: artist},
// 		success: function(data) {
// 			printAlbums(data);
// 		}
// 	});
// }