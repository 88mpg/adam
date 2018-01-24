module.exports.register = function(handlebars) {
	handlebars.registerHelper( "underscore", function ( str ) {
		return str.replace(/\s+/g, '_').toLowerCase();
	});
}
