function WeatherApp(){
	var location = $('#locate').val()
	$.get("http://api.openweathermap.org/data/2.5/weather?q=New%20York&mode=JSON&units=imperial&appid=9815c2fc2b5f1abd1a9ced35afe57d77", 
	function(json){
		data = json;
		var status = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
		$(".currentLocation").html(data.name);
		$(".currentCondition").html(data.weather[0].main);
		$(".imgCondition").attr("src",status);
		$(".currentTemp").html(data.main.temp + '&deg F');
		$('.tempMin').html('Min: '+data.main.temp_min+"&deg F ");
		$('.tempMax').html('Max: '+data.main.temp_max+"&deg F ");
		$('.humidity').html('Humidity: '+data.main.humidity+"%");
	});
};

$(function() {
  WeatherApp();
});