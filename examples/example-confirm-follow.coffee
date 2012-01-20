
###
 This example assumes that the StateManager.js and stateful.js files are loaded first
 StateManager.js provides an object that holds states and actions to take when entering
 and exiting those states. Optionally, the state can have a trigger that can provide an
 action to take on an event... e.g. do something on the click event
###

# get the jQuery $ to make it easier to use
$ = jQuery

# start after the document is loaded
$(document).ready () ->

	###
	 new up a StateManager and pass in a list of states with their actions
	 the options list takes the following form:
	 	{
		 	state:
	 		{
		 		enter: callback,
	 		 	trigger: {
	 		 		on: event,
	 		 		action: callback
	 		 	},
	 		 	exit: callback}
	 		}
	 	}
	 	
	###
	manager = new StateManager(
		# create a 'follow' state
		# this would be used on a 'follow' button indicating
		# that the user is not following someone yet
		'follow' :
			# 'enter' is called before attaching the trigger
			# e is the jQuery object attached to the state manager
			'enter' : (e) ->
				console.log "Entering follow state and setting initial properties on element"
				e.css 
					'background-color' : 'blue'
					'color': 'white'
				e.text 'follow'

			# 'trigger' is bound to the element in jQuery using the given event and callback
			'trigger':
				# event to use in the bind method in jQuery ... myElement.bind(click, action)
				'on' : 'click'
				# 'action' is the callback assigned to the event during the bind method
				'action' : (event) ->
					e = $(@)
					state = e.data 'stateful-state'
					manager = e.data 'stateful-manager'
					console.log "Triggering the action during the #{state} state"
					
					# the actions/states really handle the 'workflow'
					# a state should know which state is next
					# this example is going to the 'confirm-follow' state which will
					# show a confirmation box and allow the person to confirm
					# that they want to follow
					manager.changeState e, 'confirm-follow'
						

			# 'exit' is called after unbind if there was a trigger for the state
			'exit' : (e) ->
				console.log "Exiting the follow state"

		# create a 'confirm-follow' state
		# this would be used to show a confirmation box, ensuring
		# that the user does want to follow this person
		'confirm-follow' :
			# 'enter' is called before attaching the trigger
			# e is the jQuery object attached to the state manager
			'enter' : (e)->
				console.log "Entering 'confirm-follow' state and setting properties on element"

				confirm = $('<span>' + $('#confirm').html() + '</span>')
				confirm.css
					'display': 'inline'

				confirm.find('span.yes').bind 'click', (e) ->
					console.log "Yes Clicked"
					p = $($(@).parent().parent())
					state = p.data 'stateful-state'
					manager = p.data 'stateful-manager'

					manager.changeState p, 'waiting'

					callback = () -> manager.changeState p, 'unfollow'
					setTimeout callback, 2000

				confirm.find('span.no').bind 'click', (e) ->
					console.log "No Clicked"
					p = $($(@).parent().parent())
					state = p.data 'stateful-state'
					manager = p.data 'stateful-manager'

					manager.changeState p, 'waiting'

					callback = () -> manager.changeState p, 'follow'
					setTimeout callback, 500

				e.css
					'background-color' : 'yellow'
					'color': 'red'
				e.text ''
				e.append confirm

			'exit' : (e) ->
				console.log "Exiting 'confirm-follow' state and cleaning up the elements"
				e.remove('span span')

		# 'waiting' state is used during the transition between 'follow' and 'unfollow'
		# this would be used on a 'follow' button to indicate that the user has clicked
		# follow or unfollow and the request is being processed
		# there is no trigger on this state because it just sits there and we don't want to
		# user to be able to click on the button while it's waiting
		'waiting' :
			# 'enter' is called before attaching the trigger
			# e is the jQuery object attached to the state manager
			'enter' : (e) ->
				console.log "Entering the waiting state and updating the properties on the element"
				e.css 
					'background-color' : 'yellow'
					'color': 'black'
				e.text 'working...'

			# 'exit' is called after unbind if there was a trigger for the state
			'exit' : (e) ->
				console.log "Exiting the waiting state"

		# 'unfollow' is the same as the 'follow' state expect it's used when a user
		# is already following someone and the button should show 'unfollow' text
		'unfollow' :
			# 'enter' is called before attaching the trigger
			# e is the jQuery object attached to the state manager
			'enter' : (e) ->
				console.log "Entering the unfollow state and updating the properties on the element"
				e.css
					'background-color' : 'green'
					'color': 'white'
				e.text 'unfollow'

			'trigger':
				'on' : 'click'
				'action' : (event) ->
					e = $(@)
					state = e.data 'stateful-state'
					manager = e.data 'stateful-manager'
					console.log "Triggering the action during the #{state} state"

					# the actions/states really handle the 'workflow'
					# a state should know which state is next
					# this example is going to change to the 'waiting' state, then
					# use the setTimeout method to wait for 2 seconds before updating
					# the state to 'follow'
					manager.changeState e, 'confirm-unfollow'

			# 'exit' is called after unbind if there was a trigger for the state
			'exit': (e) ->
				console.log "Exiting the unfollow state"

		# create a 'confirm-unfollow' state
		# this would be used to show a confirmation box, ensuring
		# that the user does want to unfollow this person
		'confirm-unfollow' :
			# 'enter' is called before attaching the trigger
			# e is the jQuery object attached to the state manager
			'enter' : (e)->
				console.log "Entering 'confirm-unfollow' state and setting properties on element"

				confirm = $('<span>' + $('#confirm').html() + '</span>')
				confirm.css
					'display': 'inline'

				confirm.find('span.yes').bind 'click', (e) ->
					console.log "Yes Clicked"
					p = $($(@).parent().parent())
					state = p.data 'stateful-state'
					manager = p.data 'stateful-manager'

					manager.changeState p, 'waiting'

					callback = () -> manager.changeState p, 'follow'
					setTimeout callback, 2000

				confirm.find('span.no').bind 'click', (e) ->
					console.log "No Clicked"
					p = $($(@).parent().parent())
					state = p.data 'stateful-state'
					manager = p.data 'stateful-manager'

					manager.changeState p, 'waiting'

					callback = () -> manager.changeState p, 'unfollow'
					setTimeout callback, 500

				e.css
					'background-color' : 'yellow'
					'color': 'red'
				e.text ''
				e.append confirm

			'exit' : (e) ->
				console.log "Exiting 'confirm-unfollow' state and cleaning up the elements"
				e.remove('span span')
	)
	
	manager.initState = 'follow'
	$('div span').stateful(manager)