(function() {
  var $, StateManager, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  $ = jQuery;

  root.StateManager = StateManager = (function() {

    function StateManager(options) {
      this.bindToElement = __bind(this.bindToElement, this);
      var state, _i, _len, _ref;
      this.initState = 'init';
      this.stateFunctionMap = $.extend({
        'init': {
          'enter': function(e) {
            return console.log("Enter state 'init'");
          },
          'trigger': {
            'on': 'click',
            'action': function(event) {
              var manager, state;
              state = $(this).data('stateful-state');
              manager = $(this).data('stateful-manager');
              return console.log("Trigger state '" + state + "'");
            }
          },
          'exit': function(e) {
            return console.log("Exit state 'init'");
          }
        }
      }, options);
      _ref = this.stateFunctionMap;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        state = _ref[_i];
        console.log(state);
      }
    }

    StateManager.prototype.addState = function(state, actions) {
      this.stateFunctionMap[state] = actions;
      return this;
    };

    StateManager.prototype.removeState = function(state) {
      this.stateFunctionMap[state] = null;
      return this;
    };

    StateManager.prototype.changeState = function(e, state) {
      this.unbindState(e);
      return this.bindState(e, state);
    };

    StateManager.prototype.bindState = function(e, state) {
      var currentActions, previousState;
      previousState = e.data('stateful-state');
      console.log("PreviousState: " + previousState);
      e.data('stateful-state', state);
      currentActions = this.stateFunctionMap[state];
      console.log(currentActions);
      if (currentActions) {
        if (currentActions.enter) currentActions.enter(e);
        if (currentActions.trigger && currentActions.trigger.on) {
          return e.bind(currentActions.trigger.on, currentActions.trigger.action);
        }
      }
    };

    StateManager.prototype.unbindState = function(e) {
      var currentActions, currentState;
      currentState = e.data('stateful-state');
      currentActions = this.stateFunctionMap[currentState];
      console.log(currentActions);
      if (currentActions) {
        if (currentActions.trigger && currentActions.trigger.on) {
          e.unbind(currentActions.trigger.on, currentActions.trigger.action);
        }
        if (currentActions.exit) return currentActions.exit(e);
      }
    };

    StateManager.prototype.bindToElement = function(e) {
      var _this = this;
      e.each(function(i, e) {
        return $(e).data('stateful-manager', _this);
      });
      console.log("Binding init = '" + this.initState + "'");
      e.each(function(i, e) {
        return _this.bindState($(e), _this.initState);
      });
      return this;
    };

    return StateManager;

  })();

}).call(this);
