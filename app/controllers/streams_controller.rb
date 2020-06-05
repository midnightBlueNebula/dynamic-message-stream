class StreamsController < ApplicationController

  def show
    @stream = Message.where("created_at > ?", 5.minutes.ago)

    render_json_msgs = @stream.map { |d| { id: d.id, 
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
