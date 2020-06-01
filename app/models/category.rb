class Category < ApplicationRecord
  
  varidates :name, presence: true
  
  has_many :articles
end
