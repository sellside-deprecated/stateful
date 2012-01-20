$ = jQuery
$.fn.stateful = (stateManager) ->
	console.log @
	stateManager.bindToElement @
	@