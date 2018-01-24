module.exports.register = function(handlebars) {
	handlebars.registerHelper( "lowercase", function ( str ) {
		return str.toLowerCase();
	});
}
