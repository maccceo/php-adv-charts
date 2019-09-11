$(document).ready(function() {
	// Grafici Step 1
	$.ajax({
		url: "fulldb.php",
		method: "GET",
		success: function(data) {
			var label = getMonths();
			printLineGraph(data, "graph1", "line", label);
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
			step2(data);
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});
});




function printLineGraph(data, graphID, type, label) {
	//Init chart.js
	var ctx = document.getElementById(graphID).getContext('2d');

	var lineChart = new Chart(ctx, {
	    type: type,
	    data: {
	        labels: label,
	        datasets: [{
	            label: 'Vendite',
	            data: data,
	            borderColor: 'rgba(200, 0, 0, 1)',
	            borderWidth: '4',
	            showLine: 'false',
	            backgroundColor: 'rgba(0, 128, 21, 1)',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

function printPieGraph(data, graphID, type, label) {
	//Init chart.js
	var ctx = document.getElementById(graphID).getContext('2d');
	//nomi dei mesi

	var lineChart = new Chart(ctx, {
	    type: type,
	    data: {
	        labels: label,
	        datasets: [{
	            label: 'Vendite',
	            data: data,
	            borderColor: 'rgba(0, 0, 0, 1)',
	            borderWidth: '1',
	            showLine: 'false',
	            backgroundColor: 'rgba(252, 223, 3, 1)',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        }]
	    },
	});
}


function step2(data) {
	//Grafico 1
	printLineGraph(
		data.fatturato.data,	//dati grafico
		"graph2a",				//nome canvas
		data.fatturato.type,	//tipo grafico
		getMonths()				//nomi mesi (label)
	);

	//Grafico 2
	printPieGraph(
		Object.values(data.fatturato_by_agent.data),	//dati grafico
		"graph2b",										//nome canvas
		data.fatturato_by_agent.type,					//tipo grafico
		Object.keys(data.fatturato_by_agent.data)		//nomi agenti (label)
	);
}

function getMonths() {
	moment.locale('it');
	var months = moment.months();
	return months;
}