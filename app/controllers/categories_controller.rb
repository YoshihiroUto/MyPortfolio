class CategoriesController < ApplicationController
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
  
end
