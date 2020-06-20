Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'portfolios#index'
  
  # ログインページの表示・ログイン判別・ログアウト
  get ENV['LOGIN_URL'], to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  
  # 記事関係
  resources :articles
  
  # カテゴリ関係
  resources :categories, :only => [:new, :create, :destroy]
  
  # ユーザー関係
  # なし
  
end
