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

	// Grafici Step 3
	$("#step3button").click(step3);

	$("#step3guestlink").click(function() {
		//svuoto input così il backend invia dati come utente guest
		$("#step3input").val("");
		step3();
	});
});





function step2(data) {
	//Grafico 1
	printLineGraph(
		data.fatturato.data,	//dati grafico
		"graph2",				//nome canvas
		data.fatturato.type,	//tipo grafico
		getMonths()				//nomi mesi (label)
	);

	//Grafico 2
	printPieGraph(
		Object.values(data.fatturato_by_agent.data),	//dati grafico
		"graph3",										//nome canvas
		data.fatturato_by_agent.type,					//tipo grafico
		Object.keys(data.fatturato_by_agent.data)		//nomi agenti (label)
	);
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
				// Grafico 1
				printLineGraph(
					data[0].fatturato.data,	//dati grafico
					"graph4",				//nome canvas
					data[0].fatturato.type,	//tipo grafico
					getMonths()				//nomi mesi (label)
				);
			}

			if (data.length >= 2) {
				//Grafico 2
				printPieGraph(
					Object.values(data[1].fatturato_by_agent.data),		//dati grafico
					"graph5",											//nome canvas
					data[1].fatturato_by_agent.type,					//tipo grafico
					Object.keys(data[1].fatturato_by_agent.data)		//nomi agenti (label)
				);
			}

			if (data.length >= 3) {
				//grafico 3
				printMultiLineGraph(
					Object.values(data[2].team_efficiency.data),	//array dati grafico
					"graph6",										//nome canvas
					data[2].team_efficiency.type,					//tipo grafico
					Object.keys(data[2].team_efficiency.data),		//array nomi teams
					getMonths()										//label asse X
				);
			}
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});
}

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

function printMultiLineGraph(data, graphID, type, teams, label) {
	//Init chart.js
	var ctx = document.getElementById(graphID).getContext('2d');

	var lineChart = new Chart(ctx, {
	    type: type,
	    data: {
	        labels: label,
	        datasets: [{
	            label: teams[0],
	            data: data[0],
	            borderColor: 'rgba(200, 200, 0, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        },
	        {
	            label: teams[1],
	            data: data[1],
	            borderColor: 'rgba(0, 200, 0, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        },
	        {
	            label: teams[2],
	            data: data[2],
	            borderColor: 'rgba(0, 0, 200, 1)',
	            borderWidth: '3',
	            pointBorderColor: "rgba(20, 20, 20, 1)"
	        }
	        ]
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
	    },
	});
}


function canvasResetter() {
	// <canvas id="graph1" width="30" height="15"></canvas>
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