const request = require("request");
const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
	.option({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true 
		}
	})	
	.help()
	.alias('help','h')
	.argv;


geocode.geocodeAddress(argv.address , (errorMessage , results) =>{
	if(errorMessage){
		console.log(errorMessage);
	}else{
		console.log(results.address);

		weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
			if(errorMessage){
				console.log(errorMessage);
			}else{
				console.log(`Its currently ${weatherResults.temperature} . It feels like ${weatherResults.apparentTemperature}`);
			}
		});

	}
});




//CALLBACK METHOD
// geocode.geocodeAddress(argv.a, (errorMessage, results) => {
// 	if (errorMessage) {
// 		console.log(errorMessage);
// 	} else {
// 		//the second argument is useless ignore it
// 		// the third argument is number of indents per line or something
// 		// console.log(JSON.stringify(body, undefined, 2));
// 		// console.log(JSON.stringify(results, undefined, 2));
// 		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
// 			if (errorMessage) {
// 				console.log(errorMessage);
// 			} else {
// 				console.log("address: ", results.address);
// 				// console.log(JSON.stringify(weatherResults, undefined, 2));
// 				console.log(`it's currently ${weatherResults.temperature} farenheit. It feels like ${weatherResults.apparentTemperature} farenheit.`);
// 			}
// 		});
// 	}
// });
