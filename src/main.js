console.log('main.js is connected!');
const key = '9815c2fc2b5f1abd1a9ced35afe57d77';

$(function(){
  //checks for weather once the zipcode length is greater than or equal to 5. I like this usage a lot more than zipcodes
  $('input').keyup((e)=>{
	  zipCode = e.target.value;
	  zipCode.length===5 ? getWeather(parseInt(zipCode)) : console.log('Not searching yet');
  });
})

let getWeather = (zipCode) => {
  console.log(zipCode)
  $.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${key}`,
    success: (res)=>{
      console.log(res);
      var info = {
        locationCity: res.name,
        locationCT: res.sys.country,
        currTemp: res.main.temp,
        tempMin: res.main.temp_min,
        tempMax: res.main.temp_max,
        icon: res.weather[0].icon,
        currWeather: res.weather[0].main,
        description: res.weather[0].description,
        code: res.cod,
      }
      updateApp(info)
    },
    error: (error)=>{
      console.log(error);
    }
  })
}

let updateApp = (info) => {
  console.log(info)
  $('.main').css({display: 'block'});
  $('.content').css({display: 'block'});
  $('#location').html(`${info.locationCity}, ${info.locationCT}`);
  $('#icon').html(`<img src='http://openweathermap.org/img/w/${info.icon}.png' title='${info.description}'>`);
  $('#currTemp').html(`${info.currTemp}`);
  $('#caption').html(`${info.currWeather}, & ${info.description}`);
  $('#min').html(`${info.tempMin}`);
  $('#max').html(`${info.tempMax}`);
}