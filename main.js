var latitude = 0;
var longitude = 0;
var city = "";
var temp = 0;
var tempC = 0;
var code = 0;
	
function getLocation(){  
	$.get("https://freegeoip.net/json/", 
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
		var code = data.weather[0].id;
		$(".currentLocation").html(data.name);
		$(".currentCondition").html(data.weather[0].main);
		$(".imgCondition").attr("title",description);
		$(".currentTemp").html(temp + '&deg F');
		$('.tempMin').html('Min: '+data.main.temp_min+"&deg F ");
		$('.tempMax').html('Max: '+data.main.temp_max+"&deg F ");
		$('.humidity').html('Humidity: '+data.main.humidity+"%");
		if (code >= 200 && code < 233) {
            $(".imgCondition").attr("src","imgs/weezle_cloud_thunder_rain.png");
        } if (code >= 300 && code < 322) {
           $(".imgCondition").attr("src","imgs/weezle_medium_rain.png");
        }  if (code >= 500 && code <= 532) {
            $(".imgCondition").attr("src","imgs/weezle_rain.png");
        }  if (code >= 600 && code < 623) {
            $(".imgCondition").attr("src","imgs/weezle_snow.png");
        }  if (code >= 701 && code < 782) {
            $(".imgCondition").attr("src","imgs/weezle_fog.png");
        }  if (code == 800) {
            $(".imgCondition").attr("src","imgs/weezle_sun.png");
        }  if (code > 800 && code < 805) {
            $(".imgCondition").attr("src","imgs/weezle_max_cloud.png");
        }  if (code > 806) {
            $(".imgCondition").attr("src","imgs/weezle_overcast.png");
        }
	});
	$('.currentTemp').on('click',function(){
		$(this).hide();
		$('.currentTempC').show();
		$('.currentTempC').html(Math.floor(((data.main.temp) - 32) * (5/9)) + "&deg C ");
		return false;
	});
	$('.currentTempC').on('click', function(){
		$(this).hide();
		$('.currentTemp').show();
		$('.currentTemp').html(Math.floor(data.main.temp)+"&deg F ");
	});
	 
};


$(function() {
  getLocation();
});
