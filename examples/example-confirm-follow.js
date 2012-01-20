
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
            var e, state;
            e = $(this);
            state = e.data('stateful-state');
            manager = e.data('stateful-manager');
            console.log("Triggering the action during the " + state + " state");
            return manager.changeState(e, 'confirm-follow');
          }
        },
        'exit': function(e) {
          return console.log("Exiting the follow state");
        }
      },
      'confirm-follow': {
        'enter': function(e) {
          var confirm;
          console.log("Entering 'confirm-follow' state and setting properties on element");
          confirm = $('<span>' + $('#confirm').html() + '</span>');
          confirm.css({
            'display': 'inline'
          });
          confirm.find('span.yes').bind('click', function(e) {
            var callback, p, state;
            console.log("Yes Clicked");
            p = $($(this).parent().parent());
            state = p.data('stateful-state');
            manager = p.data('stateful-manager');
            manager.changeState(p, 'waiting');
            callback = function() {
              return manager.changeState(p, 'unfollow');
            };
            return setTimeout(callback, 2000);
          });
          confirm.find('span.no').bind('click', function(e) {
            var callback, p, state;
            console.log("No Clicked");
            p = $($(this).parent().parent());
            state = p.data('stateful-state');
            manager = p.data('stateful-manager');
            manager.changeState(p, 'waiting');
            callback = function() {
              return manager.changeState(p, 'follow');
            };
            return setTimeout(callback, 500);
          });
          e.css({
            'background-color': 'yellow',
            'color': 'red'
          });
          e.text('');
          return e.append(confirm);
        },
        'exit': function(e) {
          console.log("Exiting 'confirm-follow' state and cleaning up the elements");
          return e.remove('span span');
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
            var e, state;
            e = $(this);
            state = e.data('stateful-state');
            manager = e.data('stateful-manager');
            console.log("Triggering the action during the " + state + " state");
            return manager.changeState(e, 'confirm-unfollow');
          }
        },
        'exit': function(e) {
          return console.log("Exiting the unfollow state");
        }
      },
      'confirm-unfollow': {
        'enter': function(e) {
          var confirm;
          console.log("Entering 'confirm-unfollow' state and setting properties on element");
          confirm = $('<span>' + $('#confirm').html() + '</span>');
          confirm.css({
            'display': 'inline'
          });
          confirm.find('span.yes').bind('click', function(e) {
            var callback, p, state;
            console.log("Yes Clicked");
            p = $($(this).parent().parent());
            state = p.data('stateful-state');
            manager = p.data('stateful-manager');
            manager.changeState(p, 'waiting');
            callback = function() {
              return manager.changeState(p, 'follow');
            };
            return setTimeout(callback, 2000);
          });
          confirm.find('span.no').bind('click', function(e) {
            var callback, p, state;
            console.log("No Clicked");
            p = $($(this).parent().parent());
            state = p.data('stateful-state');
            manager = p.data('stateful-manager');
            manager.changeState(p, 'waiting');
            callback = function() {
              return manager.changeState(p, 'unfollow');
            };
            return setTimeout(callback, 500);
          });
          e.css({
            'background-color': 'yellow',
            'color': 'red'
          });
          e.text('');
          return e.append(confirm);
        },
        'exit': function(e) {
          console.log("Exiting 'confirm-unfollow' state and cleaning up the elements");
          return e.remove('span span');
        }
      }
    });
    manager.initState = 'follow';
    return $('div span').stateful(manager);
  });

}).call(this);
