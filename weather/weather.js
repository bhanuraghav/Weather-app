const request = require("request");

const  { DARKSKY_KEY }  = require("./../config");


var getWeather = (lat,lng,callback) =>{
	request({
		url:`https://api.darksky.net/forecast/${DARKSKY_KEY}/${lat},${lng}`,
		json:true
	},(err,res,body) =>{
		if(err){
			callback("Unable to connect server");
		}else if(res.statusCode === 400){
			callback("Unable to fetch weather");
		}else if(res.statusCode === 200){
			callback(undefined , {
				temperature : body.currently.temperature,
				apparentTemperature : body.currently.apparentTemperature
			})
		}
	});
}

module.exports = {
	getWeather
}