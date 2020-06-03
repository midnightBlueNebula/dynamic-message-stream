class PostsController < ApplicationController
    before_action { back_or_root unless logged_in? }

    def create 
        @post = current_user.messages.build(content: params[:post][:content])
        @count_down = false
        respond_to do |format|
            msgs_in_30s = Message.where("user_id = ? AND created_at > ?",
                                        current_user.id, 30.seconds.ago)
            if msgs_in_30s.count < 5
                if @post.save
                    @msg = "Posted!"
                    @border = "3px solid lime"
                else 
                    @msg =  "Failed to post."
                    @border = "3px solid red"
                end
            else
                @wait = 30 - (msgs_in_30s.last.created_at - msgs_in_30s.first.created_at).to_i
                @count_down = true
            end 
            format.js
        end
    end
end
