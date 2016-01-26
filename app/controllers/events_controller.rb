class EventsController < ApplicationController
  before_action :pull_event, except: [:index]

  def index
    @events = Event.all
  end

  def show
    render json: {event: @event}
  end

  def update
    @event.title = params[:title]
    @event.save!
    render json: {msg: 'success'}
  end

  def participants
  end

  private
  def pull_event
    @event = Event.find(params[:event_id])
  end
end
