module.exports.register = function(handlebars) {
	handlebars.registerHelper( "length", function ( collection ) {
		if( collection.length ) return collection.length;
		var length = 0;
		for( var prop in collection ){
			if( collection.hasOwnProperty( prop ) ){
				length++;
			}
		}
		return length;
	});
}
