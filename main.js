var latitude = 0;
var longitude = 0;
var city = "";
	
function getLocation(){  
	$.ajax({
		type: "GET",
		url: "http://ip-api.com/json/?callback=?",
		jsonpCallback: "callback",
		dataType: 'jsonp',
		success: function(json) {
			latitude = json.lat;
			longitude = json.lon;
			city = json.city;
			WeatherApp();
		}
	});
}
	

function WeatherApp(){
	$.get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&mode=JSON&units=imperial&appid=9815c2fc2b5f1abd1a9ced35afe57d77", 
	function(json){
		data = json;
		var status = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
		var description = data.weather[0].description;
		$(".currentLocation").html(data.name);
		$(".currentCondition").html(data.weather[0].main);
		$(".imgCondition").attr("src",status);
		$(".imgCondition").attr("title",description);
		$(".currentTemp").html(data.main.temp + '&deg F');
		$('.tempMin').html('Min: '+data.main.temp_min+"&deg F ");
		$('.tempMax').html('Max: '+data.main.temp_max+"&deg F ");
		$('.humidity').html('Humidity: '+data.main.humidity+"%");
	});
};

$(function() {
  WeatherApp();
});