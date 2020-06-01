class Article < ApplicationRecord
  
  validates :title, presence: true, length: { maximum: 50 }
  
  belongs_to :user
  belongs_to :category
end