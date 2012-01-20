(function() {
  var $;

  $ = jQuery;

  $.fn.stateful = function(stateManager) {
    console.log(this);
    stateManager.bindToElement(this);
    return this;
  };

}).call(this);
