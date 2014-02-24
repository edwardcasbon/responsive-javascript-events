var button = document.getElementById("button");
RJE.addListener(button, 'click', function() {
	window.alert("Mobile button clicked");
});

RJE.addListener(window, 'scroll', function(){
	document.getElementById('debug').innerHTML = window.scrollY;
});