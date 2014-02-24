var RJE = (function(){
	
	var _listeners 	= [],
		_bps 		= [],
		_bp			= false;

	var _updateBP = function(bp) {
		_bp = bp;
		_updateScript(bp.script);
		_updateListeners();
	};
	
	var _updateScript = function(script) {
		if(s = document.getElementById("rje-script")) {
			document.body.removeChild(s);
		}
		var s = document.createElement("script");
		s.src = script;
		s.id = "rje-script";
		document.body.appendChild(s);
	};
	
	var _updateListeners = function() {
		var label = _bp.label;
		for(var i=0; i<_listeners.length; i++) {
			var l = _listeners[i];
			if(l.bp == label) {
				// Add listener.
				l.target.addEventListener(l.type, l.listener);
			} else {
				// Remove listener.
				l.target.removeEventListener(l.type, l.listener);
			}
		}
	};
	
	var _alreadyInListeners = function (listener) {
		for(var i=0; i<_listeners.length; i++) {
			var l = _listeners[i];		
			if ((l.target == listener.target) && (l.type == listener.type) && (l.listener.toString() == listener.listener.toString()) && (l.bp == listener.bp)) {
				return true;
			}
		}
		return false;
	};
		
	var setup = function (bps) {
		if(bps.length) {
			_bps = bps;
		}
	};
	
	var checkBP = function () {
		var width = window.innerWidth;
		for(var i=0; i<_bps.length; i++) {
			var bp = _bps[i];
			if( ((width >= bp.min) && (width < bp.max)) && (bp != _bp) ) {
				_updateBP(bp);
			}
		}
	};
	
	var addListener = function(target, type, listener, bp) {
		var bp = (bp !== undefined) ? bp : _bp.label;
		var listener = {
			target: target,
			type: type,
			listener: listener,
			bp: bp
		};
		
		if(!_alreadyInListeners(listener)) {
			_listeners.push(listener);
			_updateListeners();
		}
	};

	return {
		addListener: addListener,
		setup: setup,
		checkBP: checkBP
	};
	
})();

window.addEventListener('load', RJE.checkBP);
window.addEventListener('resize', RJE.checkBP);