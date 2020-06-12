class Article < ApplicationRecord

  # ここで設定したカラムをfile_fieldメソッドで呼び出せば，
  # store_dirに保存される
  mount_uploader :image, ArticleUploader
  

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true
  validates :image, presence: true
  
  belongs_to :user
  belongs_to :category, optional: true
end
