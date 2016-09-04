這是做blog時如何在文章顯示頁面下方加上訪客留言的筆記,基本上從rails guide來得
[6.2 Associating Models](http://guides.rubyonrails.org/getting_started.html)
先建立好一對多的關聯
留言model

    class Comment < ApplicationRecord
      belongs_to :article
    end

文章model

    class Article < ApplicationRecord
      has_many :comments
      validates :title, presence: true,
                        length: { minimum: 5 }
    end


之後再需要顯示留言的網頁新增form


    <%= form_for([@article, @article.comments.build]) do |f| %>
      <p>
        <%= f.label :commenter %><br>
        <%= f.text_field :commenter %>
      </p>
      <p>
        <%= f.label :body %><br>
        <%= f.text_area :body %>
      </p>
      <p>
        <%= f.submit %>
      </p>
    <% end %>

這樣子就會自動連到comment的create controller,也因此可以從params得到post_od

     POST   /posts/:post_id/comments(.:format)          comments#create

留言controller

    class CommentsController < ApplicationController
      def create
        @article = Article.find(params[:article_id])
        @comment = @article.comments.create(comment_params)
        redirect_to article_path(@article)
      end
     
      private
        def comment_params
          params.require(:comment).permit(:commenter, :body)
        end
    end







> Written with [StackEdit](https://stackedit.io/).

