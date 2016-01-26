class EventsController < ApplicationController
  before_action :pull_event, except: [:index]

  def index
    @events = Event.all
  end

  def show
    render json: {event: @event}
  end

  def create
    @event.name = params[:name]
    @event.save!
  end

  def participants
  end

  private
  def pull_event
    @event = Event.find(params[:event_id])
  end
end
