// Given that we don't have a framework to use I will just do everything with jQuery.
// However, probably in any larger scale project it would be worth investigating 
// Angular/React/Ember/etc. depending on the architecture and demands of the project.

$(document).on('ready', window.Virool.initPage)

window.Virool = {

  initPage: function initPage(){
    var $currentEvents = $("li.event")
    this.$currentEvents.on('click', "button.js-event__show-more", expandClickHandler)
  },

  fetchDescription: function fetchDescription($el) {
    var id = $el['data']['id']
    var parameters = {
      method: "GET",
      url: "/events/" + id
    }
    $.ajax(parameters).done(this.ajaxResponseHandler($el))
  },

  postDescription: function postDescription($el) {
    var id = $el.id
    var title = $el.title

    var parameters = {
      method: "POST",
      url: "/events/" + id,
      data: {'title': title}
    }
    $.ajax(parameters)
  },

  expandClickHandler : function expandClickHandler($el){
    // if current target is expand button=> 
    console.log(this.currentTarget)
    this.fetchDescription($el)
  },

  ajaxResponseHandler : function ajaxResponseHandler($el) {
    return function successHandler(res){
      var currentEvent = res['event']
      
      // Add description
      $el.find('event_information').text(currentEvent['description'])
      
      // Set editing listener
      $el.on('click', , edit)
    }
  }
}
