class StreamsController < ApplicationController

  def show
    @stream = Message.where("created_at > ?", 5.minutes.ago)
              .order(created_at: :desc)

    msg = Message.where("created_at > ?", 20.seconds.ago)

    render_json_msgs = msg.map { |d| { id: d.id, 
                                       content: d.content,
                                       karma: d.karma,
                                       created_at: d.created_at,
                                       updated_at: d.updated_at,
                                       user: User.find_by(id: d.user_id)} }  

    respond_to do |format|
      format.html 
      format.json { render json: render_json_msgs }   
    end
  end
  
end
