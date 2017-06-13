var getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

if (window.location.search.indexOf('code=') > -1) {
	$.ajax('/api/login', {
		method: 'POST',
	    success: function(data) {
	    	console.log(data);
	    },
	    data: {
	    	code: getParameterByName('code')
	    }
	});
}