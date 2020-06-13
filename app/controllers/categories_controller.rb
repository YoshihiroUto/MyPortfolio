class CategoriesController < ApplicationController
  before_action :admin_user?, only: [:new, :destroy]
  
  def new
    @category = Category.new()
  end
  
  def create
    @category = Category.new(category_params)
    if @category.save
      flash[:success] = "カテゴリを新規作成しました"
      redirect_to articles_path
    else
      flash.now[:danger] = Category 
      render :new
    end
  end
  
  def destroy
    @category = Category.find(params[:id])
    
    @category.articles.update_all(category_id: nil)
    
    @category.destroy
    flash[:success] = "削除に成功しました"
    redirect_to articles_path
  end
  
  private
  
  def category_params
    params.require(:category).permit(:name)
  end
  
  def admin_user?
    if !logged_in?
      flash[:danger] = '管理者のみ新規作成・編集・退会が行えます'
      redirect_back(fallback_location: articles_url)
    end
  end
  
end
