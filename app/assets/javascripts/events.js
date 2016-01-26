// Given that we don't have a framework to use I will just do everything with jQuery.
// However, probably in any larger scale project it would be worth investigating 
// Angular/React/Ember/etc. depending on the architecture and demands of the project.

$(document).on('ready', function() { window.Virool.initPage() }) 

window.Virool = {

  initPage: function initPage() {
    var $currentEvents = $("li.event")
    $currentEvents.on('click', "button.js-event__show-more", this.expandClickHandler)
  },

  fetchDescription: function fetchDescription(el) {
    var $parentEventEl = $(el).closest('.event')
    var id = $parentEventEl.data('id')
    var parameters = {
      method: "GET",
      url: "/events/" + id
    }
    $.ajax(parameters).done(this.ajaxResponseHandler($parentEventEl))
  },

  postDescription: function postDescription($input) {
    
    var id = $input.closest('.event').data('id')
    var title = $input.val()

    var parameters = {
      method: "PUT",
      url: "/events/" + id,
      data: {'title': title}
    }
    $.ajax(parameters).done(function(res) {console.log(res)})
  },

  expandClickHandler : function expandClickHandler(evt){
    window.Virool.fetchDescription(evt.currentTarget)
  },

  ajaxResponseHandler : function ajaxResponseHandler($parentEventEl) {
    return function successHandler(res){

      var currentEvent = res['event']
      
      // Add class for expanded view
      $parentEventEl.addClass('event_expanded')

      // Add description
      var $textContainer = $("<div></div>").addClass("event__text-container")
      var $p = $("<p></p>").text(currentEvent['description'])
      var $eventInformation = $parentEventEl.find('.event__information')
      $textContainer.append($p)
      $eventInformation.append($textContainer)

      // Remove expand button
      $parentEventEl.find('button.js-event__show-more').remove()

      // Set editing listener
      window.Virool.drawText($parentEventEl.find('.event__title'))
    }
  },

  // For lack of time found the below code here : http://jsfiddle.net/prozacgod/8qY95/
  drawEditor : function drawEditor($el) {
    $el.unbind();
    var inplaceTitleInput = $("<span class='inplace-editor'><input type='text' /></span>");
    $el.html(inplaceTitleInput);

    var $input = $el.find('input');
    $input
        .val($el.data('text'))
        .focus()
        .select()
        .blur(function(){
            $el.data('text', $input.val());
            window.Virool.postDescription($input)
            window.Virool.drawText($el);
        })
  },

  drawText : function drawText($el) {
    if (! $el.data('text')) {
      $el.data('text', $el.text());
    }

    $el.unbind();
    $el
        .text($el.data('text'))
        .click(function(evt) {
            evt.preventDefault();
            window.Virool.drawEditor($el);
        });
  }
}