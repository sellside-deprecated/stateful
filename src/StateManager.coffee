root = exports ? this
$ = jQuery

root.StateManager = class StateManager

	constructor: (options) ->

		@initState = 'init'

		@stateFunctionMap = $.extend(
			# Add any defaults here
			'init' :
				'enter' : (e) -> console.log "Enter state 'init'"
				'trigger':
					'on' : 'click'
					'action' : (event) -> 
						state = $(@).data 'stateful-state'
						manager = $(@).data 'stateful-manager'
						console.log "Trigger state '#{state}'"
				'exit' : (e) -> console.log "Exit state 'init'"
			, options
		)

		# display the states
		for state in @stateFunctionMap
			console.log state

	addState: (state, actions) ->
		@stateFunctionMap[state] = actions
		@

	removeState: (state) ->
		@stateFunctionMap[state] = null
		@

	changeState: (e, state) ->
		@unbindState e
		@bindState e, state

	bindState: (e, state) ->
		previousState = e.data 'stateful-state'
		console.log "PreviousState: #{previousState}"
		e.data 'stateful-state', state

		currentActions = @stateFunctionMap[state]
		console.log currentActions

		if currentActions
			if currentActions.enter
				currentActions.enter e

			if currentActions.trigger and currentActions.trigger.on
				e.bind currentActions.trigger.on, currentActions.trigger.action

	unbindState: (e) ->
		currentState = e.data 'stateful-state'

		currentActions = @stateFunctionMap[currentState]
		console.log currentActions

		if currentActions 
			if currentActions.trigger and currentActions.trigger.on
				e.unbind currentActions.trigger.on, currentActions.trigger.action

			if currentActions.exit
				currentActions.exit e


	bindToElement: (e) =>
		# Attach current state to element data
		e.each (i,e) =>
			$(e).data 'stateful-manager', @
		

		console.log "Binding init = '#{@initState}'"

		e.each (i,e) =>
			@bindState $(e), @initState

		@