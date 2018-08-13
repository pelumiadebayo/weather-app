$(document).ready(function () {
    //console.log('jS working');

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("latitude: ", latitude);
        console.log("longitude", longitude);
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=2d12fcb04f944574894d980024cfffbb`;

        $('#search-button').click(function (e) {

            if ($(".view_port").css("display") == "none") {
                $(".view_port").fadeIn();
            }
            e.preventDefault();
            var city = $('input').val();
            console.log(city);
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2d12fcb04f944574894d980024cfffbb`;
            apiCall(url);
        })
        function apiCall(myUrl) {
            if ($(".view_port").css("display") == "none") {
                $(".view_port").fadeIn();
            }
            $.ajax({
                type: 'GET',
                url: myUrl,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    var city = data.name;
                    $('#location').html(`<h3>${city}</h3>`);
                    var temK = data.main.temp;
                    var temC = Math.ceil(temK - 273);
                    $('#temperature').html(`<p>${temC}°C</p>`);
                    var pressure = data.main.pressure;
                    var humidity = data.main.humidity;
                    console.log(pressure);
                    $('#descripture').html(`<p>${pressure}hPa</p><p>${humidity}%</p>`);
                    $(".view_port").fadeOut();
                },
                error: function (request, status, error) {
                    alert(error);
                }
            });
        }
        apiCall(url);
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
})