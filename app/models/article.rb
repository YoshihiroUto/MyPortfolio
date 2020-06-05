class Article < ApplicationRecord
  

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true
  validates :image, presence: true
  
  belongs_to :user
  belongs_to :category, optional: true
end
