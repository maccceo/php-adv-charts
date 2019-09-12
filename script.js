
$(document).ready(function() {
	// Grafici Step 1
	$.ajax({
		url: "fulldb.php",
		method: "GET",
		success: function(data) {

			drawGraph("graph1", "line", getMonths(), data);
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});

	// Grafici Step 2
	$.ajax({
		url: "fulldbStep2.php",
		method: "GET",
		success: function(data) {

			// grafico a linea
			drawGraph("graph2","line",getMonths(),data.fatturato.data);

			// grafico a torta
			drawGraph("graph3","pie",
				Object.keys(data.fatturato_by_agent.data),
				Object.values(data.fatturato_by_agent.data));
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});

	// Grafici Step 3
	// al click del bottone o del link per l'accesso guest
	$("#step3button").click(step3);
	$("#step3guestlink").click(function() {
		//svuoto input così il backend invia dati come utente guest
		$("#step3input").val("");
		step3();
	});
});





function drawGraph(graphID, type, label, data) {

	//Init dati grafico
	var datasets = setDatasets (data, graphID);
	//Init chart.js
	var ctx = document.getElementById(graphID).getContext('2d');

	//creazione grafico
	var lineChart = new Chart(ctx, {
	    type: type,
	    data: {
	        labels: label,
	        datasets: datasets,
	    },
	});
}



function setDatasets (data, graphID) {
	//3 tipologie di grafico selezionabili tramite ID

	if (graphID == "graph1" || graphID == "graph2" || graphID == "graph4") {
		var datasets = [{
		    label: "Vendite",
		    data: data,
		    borderColor: 'rgba(200, 200, 0, 1)',
		    borderWidth: '3',
		    pointBorderColor: "rgba(20, 20, 20, 1)"
		}]
		return datasets;
	}

	if (graphID == "graph3" || graphID == "graph5") {
		var datasets = [{
		    label: "Vendite",
		    data: data,
		    borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: '2',
            showLine: 'false',
            backgroundColor: [
	            'rgba(226, 191, 211, 1)',
	            'rgba(252, 223, 3, 1)',
	            'rgba(117, 191, 0, 1)',
	            'rgba(184, 100, 175, 1)'
	            ],
            pointBorderColor: "rgba(20, 20, 20, 1)"
		}]
		return datasets;
	}

	if (graphID == "graph6") {

		var label = Object.keys(data);
		var graphData = Object.values(data);

		var datasets = [{
	            label: label[0],
	            data: graphData[0],
	            borderColor: 'rgba(200, 200, 0, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        },
	        {
	            label: label[1],
	            data: graphData[1],
	            borderColor: 'rgba(0, 200, 0, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        },
	        {
	            label: label[2],
	            data: graphData[2],
	            borderColor: 'rgba(0, 0, 200, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        }
	    ]
		return datasets;
	}
}



function step3() {
	var user = $("#step3input").val();

	$.ajax({
		url: "fulldbStep3.php",
		method: "GET",
		data: {level:user},
		success: function(data) {

			//cancello i canvas precedenti
			canvasResetter();

			if (data.length >= 1) {
				// grafico a linea
				drawGraph("graph4", data[0].fatturato.type, getMonths(), data[0].fatturato.data);
			}
			if (data.length >= 2) {
				//grafico a torta
				drawGraph(
					"graph5",
					data[1].fatturato_by_agent.type,
					Object.keys(data[1].fatturato_by_agent.data),
					Object.values(data[1].fatturato_by_agent.data)
				);
			}
			if (data.length >= 3) {
				//grafico multi-linea
				drawGraph("graph6", data[2].team_efficiency.type, getMonths(), data[2].team_efficiency.data);
			}
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});
}



function canvasResetter() {
	//cancella i canvas dello step 3 e inserisci canvas vuoti, così se passi
	//ad un accesso inferiore non vedi più i grafici che non devi più vedere
	$("#graph3-container canvas").remove();
	var position = $("#graph3-container");
	var canvasIntro = '<canvas id="graph';
	var canvasOutro = '" width="30" height="15"></canvas>';

	for (var i = 4; i <= 6; i++) {
		var canvas = canvasIntro + i + canvasOutro;
		position.append(canvas);
	}
}



function getMonths() {
	moment.locale('it');
	var months = moment.months();
	return months;
}