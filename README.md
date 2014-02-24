# Responsive JavaScript events (RJE)

This script aids responsive web design by allowing you to add functionality to your web page depending on the width of the page.

For example, when clicking on a hyperlink in a mobile design you may want it to drop down a menu, or do some dynamic event, whereas on the desktop version you just want it to act as normal.

## How it works
When adding the script to your page, you setup the script with details of your breakpoints (name, min/max width, script reference). When the browser window is resized the script checks against the registered breakpoints and references the necessary JavaScript.

In your breakpoint related JavaScripts, you add event listeners to events, and when the events happen, within that breakpoint, but JavaScript executes.

## Example

Setting up your breakpoints:

	<script>
	RJE.setup([
		{
			"label": "mobile",
			"min": 0,
			"max": 600,
			"script": "mobile.js"
		},
		{
			"label": "tablet",
			"min": 600,
			"max": 1000,
			"script": "tablet.js"
		},
		{
			"label": "desktop",
			"min": 1000,
			"max": 9999,
			"script": "desktop.js"
		}
	]);
	</script>

Adding event listeners in a mobile.js JavaScript:

	<script>
	var button = document.getElementById("button");
	RJE.addListener(button, 'click', function() {
		window.alert("Mobile button clicked");
	});
	
	RJE.addListener(window, 'scroll', function(){
		document.getElementById('debug').innerHTML = window.scrollY;
	});
	</script>

## Adding a listener

The RJE listener takes 4 arguments:
* Event target (Required)
* Event type (Required)
* Callback (Required)
* Breakpoint (Optional, if missing, takes the current breakpoint)
