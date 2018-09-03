const request = require("request");


var geocodeAddress =(findAddress,callback) =>{
	var encodedAddress = encodeURIComponent(findAddress);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?&address=${encodedAddress}`,
		json: true
	} , (err,res,body) =>{
		if(err){
			callback("unable to connect");
		}
		else if(body.status === "ZERO_RESULTS"){
			callback("unable to find address");
		}
		else if(body.status === "OK"){
			callback(undefined, {
				address :body.results[0].formatted_address,
				latitude:body.results[0].geometry.location.lat,
				longitude : body.results[0].geometry.location.lng
			})

		}
			
	});

}


module.exports = {
	geocodeAddress
}