$(document).ready(function() {
	// prelevo dati dal db
	$.ajax({
		url: "fulldb.php",
		method: "GET",
		success: function(data) {
			printGraph(data);
		},
		error: function(error) {
			console.log("Errore API, ",error);
		}
	});
});




function printGraph(data) {
	//Init chart.js
	var ctx = document.getElementById('graph1').getContext('2d');
	//nomi dei mesi
	var months = getMonths();

	var lineChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: months,
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

function getMonths() {
	moment.locale('it');
	var months = moment.months();
	return months;
}