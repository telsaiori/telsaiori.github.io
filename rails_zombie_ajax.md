# rails_zombie_ajax

這篇是code school rails zombie2 level5 ajax部分的筆記,有兩個部分
  - 刪除使用者使用ajax
  - 更新form使用ajax

練習code https://github.com/telsaiori/code_school_rails

### 刪除使用者使用ajax

##### Installation
先隨便用scaffold生個東西出來
```sh
$ rails g scaffold User name
$ rake db:migrate
```

接著打開她幫你生好的程式裡找到刪除的部分,在後面加上 remote: true,這樣這一段生出的html就會多了data-remote="true"
```
<td><%= link_to 'Destroy', zombie, method: :delete, remote: true %></td>
```
接下藥要讓controller可以吃javascript call,把format.js加到相對應的controller裡
```
  def destroy
    @zombie.destroy
    respond_to do |format|
      format.html { redirect_to zombies_url, notice: 'Zombie was successfully destroyed.' }
      format.json { head :no_content }
      format.js
    end
  end
  ```
接著需要寫一個javascript回傳給client,在view新增一個destroy.js.erb檔案
```
$('#<%= dom_id(@zombie)%>').fadeOut();
```
這樣你刪除的時候,被選中的那一項就會在畫面上fadeout,而不會整個refresh


### 新增使用者使用ajax

接下來要在使用者列表下面加一個新增使用者的按鈕,並且可以按下後馬上顯示在畫面上

Steps
- controller新增format.js
 - refactor view並新增form
 - 建立javascript

##### controller新增format.js
```
  def create
    @zombie = Zombie.new(zombie_params)
    respond_to do |format|
      if @zombie.save
        format.html { redirect_to @zombie, notice: 'Zombie was successfully created.' }
        format.json { render :show, status: :created, location: @zombie }
      else
        format.html { render :new }
        format.json { render json: @zombie.errors, status: :unprocessable_entity }
      end
     format.js
    end
  end
```
##### refactor view並新增form
把本來index裡面顯示使用這列表的部分移到partial去
本來應該是長這樣
```
<% @users.each do |user| %>
    <%= user.name %>
    .......
<% end %>
```
把each 到 end中間那段移到partial裡,比方說叫_user.html.erb,而原來的index裡會長的像下面這樣

(可以簡化成<%= render partial: user %>
```
<% @users.each do |user| %>
    <%= render partial: 'user', locals: { user: user } %>
    .......
<% end %>
```

這段還可以再簡化成partical collection的寫法
(<%= render partial: @users %> )
```
<%= render partial: 'user', collection: @users, as: user %>
```

再把index加上新增user的表單
```
<%= form_for(Zombie.new, remote: true) do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>
```

##### 建立javascript 
新增create.js.erb
```
<% if @zombie.new_record? %>
    $('input#zombie_name').effect('highlight', {color: 'red'});
<% else %>
    $('#showTable tbody').append("<%= escape_javascript(render @zombie) %>");
    
<% end %>
```
上面是用來判斷資料有沒有新增成功,有的話把新資料加到原有畫面之後,沒的話就在input框框裡顯示紅色提醒使用者
因為用了hightlight所以必須新增一些新的東西

gem 'jquery-ui-rails'
 
 application.js:
 ```
//= require jquery-ui
```

application.css:
```
*= require jquery-ui
```
 

    




