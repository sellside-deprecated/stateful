
/*
 This example assumes that the StateManager.js and stateful.js files are loaded first
 StateManager.js provides an object that holds states and actions to take when entering
 and exiting those states. Optionally, the state can have a trigger that can provide an
 action to take on an event... e.g. do something on the click event
*/

(function() {
  var $;

  $ = jQuery;

  $(document).ready(function() {
    /*
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
    */
    var manager;
    manager = new StateManager({
      'follow': {
        'enter': function(e) {
          console.log("Entering follow state and setting initial properties on element");
          e.css({
            'background-color': 'blue',
            'color': 'white'
          });
          return e.text('follow');
        },
        'trigger': {
          'on': 'click',
          'action': function(event) {
            var callback, e, state;
            e = $(this);
            state = e.data('stateful-state');
            manager = e.data('stateful-manager');
            console.log("Triggering the action during the " + state + " state");
            manager.changeState(e, 'waiting');
            callback = function() {
              return manager.changeState(e, 'unfollow');
            };
            return setTimeout(callback, 2000);
          }
        },
        'exit': function(e) {
          return console.log("Exiting the follow state");
        }
      },
      'waiting': {
        'enter': function(e) {
          console.log("Entering the waiting state and updating the properties on the element");
          e.css({
            'background-color': 'yellow',
            'color': 'black'
          });
          return e.text('working...');
        },
        'exit': function(e) {
          return console.log("Exiting the waiting state");
        }
      },
      'unfollow': {
        'enter': function(e) {
          console.log("Entering the unfollow state and updating the properties on the element");
          e.css({
            'background-color': 'green',
            'color': 'white'
          });
          return e.text('unfollow');
        },
        'trigger': {
          'on': 'click',
          'action': function(event) {
            var callback, e, state;
            e = $(this);
            state = e.data('stateful-state');
            manager = e.data('stateful-manager');
            console.log("Triggering the action during the " + state + " state");
            manager.changeState(e, 'waiting');
            callback = function() {
              return manager.changeState(e, 'follow');
            };
            return setTimeout(callback, 2000);
          }
        },
        'exit': function(e) {
          return console.log("Exiting the unfollow state");
        }
      }
    });
    manager.initState = 'follow';
    return $('span').stateful(manager);
  });

}).call(this);
