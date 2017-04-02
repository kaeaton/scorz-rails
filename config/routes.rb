Rails::application.routes.draw do
# Rails.application.routes.draw do
  root 'records#index'
  resources :records
  get 'locations', to: 'records#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
