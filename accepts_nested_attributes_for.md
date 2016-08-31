## accepts_nested_attributes_for 
這篇是練習accepts_nested_attributes_for 和field_for的筆記
使用時機是在比方說我們有user和address兩個model,兩者之間有一對多的關聯(一對一也是)
在使用form_for的時候有可能會碰到需要同時建立兩者的情況可以使用

> model裡先使用accepts_nested_attributes_for 

    class User < ActiveRecord::Base
	    has_many :addresses
	    accepts_nested_attributes_for :addresses 
	end

> user controller

    def new
	    @user = User.new
	    @address = @user.addresses.build
	end
這樣子之後再view就可以使用field_for來一起處理關聯model的資料

    <%= f.fields_for :addresses do |addresses_form| %>
      <%= addresses_form.label :zipcode, "郵便番号" %>
      <%= addresses_form.text_field :zipcode %><br />
      <%= addresses_form.label :city, "都道府県" %>
      <%= addresses_form.text_field :city %><br />
      <%= addresses_form.label :street, "市町村番" %>
      <%= addresses_form.text_field :street %><br />
      <%= addresses_form.label :tel, "電話番号" %>
      <%= addresses_form.text_field :tel %><br />
     <% end %>
  
  這樣就會自動建出params[:user][addresses_attributes][],可以一起存檔,也會自動執行address的validation
 如果想要一次新增多個address的form的話在controller改成下面這樣就會一次有兩個form
 

        def new
		    @user = User.new
		    2.times {@address = @user.addresses.build}
		end

###**追加消除功能**

> user model增加  allow_destroy: true

      accepts_nested_attributes_for :addresses, allow_destroy: true, reject_if: :all_blank

在view中增加_destroy(必須),如果值是1的話才會執行刪除

       <%= addresses_form.check_box :_destroy %>
       <%= addresses_form.label :_destroy, "削除" %><br />
在strong parameter加入_destroy

    def user_params
      params.require(:user).permit(:name, :age, addresses_attributes: [:id, :zipcode, :city, :street, :tel, :_destroy])
    end

這樣就可以消除關聯資料


###**reject_if**

加了下面的reject_if之後只要address form全都空白的話address就不會做任何處理,也不會跑validatation,整個表單只會處理user的資料


    accepts_nested_attributes_for :addresses, allow_destroy: true, reject_if: :all_blank

使用proc的話可以指定那些資料必需要填, 下文的話如果zipcode空白的話會被reject,但如果只填zipcode其他空白是可以的

    accepts_nested_attributes_for :addresses, allow_destroy: true, reject_if: proc { |attributes| attributes['zipcode'].blank? }

  
  http://ruby-rails.hatenadiary.com/entry/20141208/1418018874