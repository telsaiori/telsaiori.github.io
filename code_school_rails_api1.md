
#**serviving API with rails 1**

##restricting routes with except

routes可以像下面這樣限制讓他無法連接某些action,或是只允許某些action
```
resources :zombies, except: :destroy
resources :zombies only: [:index :show]
```
如果有不同resources都有同樣的設定的話可以統一改成下面那樣減少重複的部分
```
with_options only: :index do |list_only|
	list_only.resources :zombies
	list_only.resources :humans
	list_only.resources :medical_kits
end
```

##using constraints to enforce subdomain
可以使用namespace來整理相關的routes,比方這樣的話controller會是Api::ZombiesController, 網址會是Api/Zombies, url helper也會變成api_zombies_path...
```
  namespace :api do
   resources :zombies
  	resources :humans
  end
```
下面這樣constraints: { subdomain: 'api' }是可以限制subdomain
加入path"/"則是為了怕造成網址尚有多餘的重複,如果不加的話url pattern 會長這樣/api/zombies(.:format),網址就會大概長得像api.domain/api/zombies,api會重複兩次
設定後則只會變成/zombies(.:format)
```
SurvivingRails::Application.routes.draw do
  namespace :api, constraints: { subdomain: 'api' }, path: '/' do
   resources :zombies
  	resources :humans
  end
  resources :announcements

end
```

> Written with [StackEdit](https://stackedit.io/).
