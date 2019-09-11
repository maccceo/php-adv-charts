<!DOCTYPE html>
<html lang="" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Advanced Dashboard Charts</title>
    <!-- FONT: LATO -->
    <link href="https://fonts.googleapis.com/css?family=Lato:30,400,700" re="stylesheet">
    <!-- FONT: FONTAWESOME -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    <!-- JS: JQUERY -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <!-- JS: MOMENT -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
    <!-- JS: HANDLEBARS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
    <!-- JS: CHART JS -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script>
    <!-- CSS: MY STYLE -->
    <link rel="stylesheet" href="style.css">
    <!-- JS: MY SCRIPT -->
    <script type="text/javascript" src="script.js"></script>
    <!-- TEMPLATE: MESSAGE MENU -->
    <script id="item-template" type="text/x-handlebars-template">
    </script>

  </head>
  <body>
  	<div id="main-container">
      <div class="graph-container" id="graph1-container">
        <h1>Grafici Step 1</h1>
        <canvas id="graph1" width="30" height="15"></canvas>
      </div>

      <div class="graph-container" id="graph2-container">
        <h1>Grafici Step 2</h1>
        <canvas id="graph2" width="30" height="15"></canvas>
        <canvas id="graph3" width="30" height="15"></canvas>
      </div>

      <div class="graph-container" id="graph3-container">
        <h1>Grafici Step 3</h1>
        <div id="graph3-login">
          <label for="step3input">Inserisci la password:</label>
          <input id="step3input" type="password">
          <button id="step3button">Go</button>
          <a href="#" id="step3guestlink">Non hai una password? Accedi come guest</a>
        </div>
        <canvas id="graph4" width="30" height="15"></canvas>
        <canvas id="graph5" width="30" height="15"></canvas>
        <canvas id="graph6" width="30" height="15"></canvas>
      </div>
    </div>
  </body>
</html>