var latitude = 0;
var longitude = 0;
var city = "";
var temp = 0;
var tempC = 0;
	
function getLocation(){  
	$.get("http://freegeoip.net/json/", 
	function(json){
		latitude = json.latitude;
		longitude = json.longitude;
		city = json.region_name;
		WeatherApp();
	});
};	

function WeatherApp(){
	$.get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&mode=JSON&units=imperial&appid=9815c2fc2b5f1abd1a9ced35afe57d77", 
	function(json){
		data = json;
		var status = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
		var description = data.weather[0].description;
		var temp = Math.floor(data.main.temp);
		$(".currentLocation").html(json.region_name);
		$(".currentCondition").html(data.weather[0].main);
		$(".imgCondition").attr("src",status);
		$(".imgCondition").attr("title",description);
		$(".currentTemp").html(temp + '&deg F');
		$('.tempMin').html('Min: '+data.main.temp_min+"&deg F ");
		$('.tempMax').html('Max: '+data.main.temp_max+"&deg F ");
		$('.humidity').html('Humidity: '+data.main.humidity+"%");
	});
	$('.currentTemp').on('click',function(){
		$(this).hide();
		$('.currentTempC').show();
		$('.currentTempC').html(Math.floor((parseInt(temp) - 32) * 5/9) + "&deg F ");
		return false;
	});
	$('.currentTempC').on('click', function(){
		$(this).hide();
		$('.currentTemp').show();
		$('.currentTemp').html(Math.floor(data.main.temp)+"&deg F ");
	});
};


$(function() {
  WeatherApp();
});
