var num = 1;

function lightOn() {

    if (num == 1) {

        var foto = document.getElementById("foto");
        foto.src = "imagenes/foto" + num + ".jpg";
        //buttons.classList.add(URL("imagenes/ledOn.png"));
        num = 2;

    } else {
        //buttons.classList.remove("boton on");

        var foto = document.getElementById("led");
        foto.src = "imagenes/foto" + num + ".jpg";
        num = 1;
    }
}

var provider = new firebase.auth.GoogleAuthProvider();

google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawStartTemp);
google.charts.setOnLoadCallback(drawStartPress);



function drawStartTemp() {
    var temp = google.visualization.arrayToDataTable[(
        ['label', 'value'], ['Temp', 0]
    )];

    var scale = {
        width: 250,
        height: 250,
        redFrom: 60,
        redTo: 100,
        yellowFrom: 20,
        yellowTo: 60,
        greenFrom: 0,
        greenTo: 20,
        majorTicks: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
        minorTicks: 0,
        max: 100,
        min: 0
    };
    var formatTemp = new google.visualization.NumberFormat({
        suffix: " °C",
        fractionDigits: 0
    });
    formatTemp.format(temp, 1);

    var startTemp = new google.visualization.Gauge(document.getElementById('startTemp'));
    startTemp.draw(temp, scale, formatTemp);

    var tempIni = firebase.database().ref('temperatura');
    tempIni.on('value', function(snapshot) {
        tempIni = snapshot.val();
    });
    setInterval(function() {
        temp.setValue(0, 1, tempIni);
        formatTemp.format(temp, 1);
        startTemp.draw(temp, scale);
    }, 1000);
}

function drawStartPress() {
    var press = google.visualization.arrayToDataTable[(
        ['label', 'value'], ['Presion', 0]
    )];

    var scale = {
        width: 250,
        height: 250,
        redFrom: 300,
        redTo: 500,
        yellowFrom: 150,
        yellowTo: 300,
        greenFrom: 0,
        greenTo: 150,
        majorTicks: ['0', '50', '10', '150', '200', '250', '300', '350', '400', '450', '500'],
        minorTicks: 0,
        max: 500,
        min: 0
    };
    var formatPress = new google.visualization.NumberFormat({
        suffix: " Psi",
        fractionDigits: 0
    });
    formatPress.format(press, 1);

    var startPress = new google.visualization.Gauge(document.getElementById('startPress'));
    startPress.draw(press, scale, formatPress);

    var pressIni = firebase.database().ref('presion');
    pressIni.on('value', function(snapshot) {
        pressIni = snapshot.val();
    });
    setInterval(function() {
        press.setValue(0, 1, pressIni);
        formatPress.format(press, 1);
        startPress.draw(press, scale);
    }, 1000);
}

/*document.querySelector("#check").addEventListener('click', function() {
    let ledOff = document.querySelector("#light");
    var boton = firebase.database().ref('Interruptor');
    if (this.checked) {
        firebase.database().ref('interruptor').set(true);
    } else {
        firebase.database().ref('interruptor').set(false);
    }
    boton.on('value', function(sanpshot) {
        boton = snapshot.val();
        if (boton) ledOff.classList.add(url('imagenes/LedOn.png'));
        else ledOff.classList.remove(url('imagenes/LedOff.png'));
    });
});*/


//btnOn.addEventListener('click', cambio, true)