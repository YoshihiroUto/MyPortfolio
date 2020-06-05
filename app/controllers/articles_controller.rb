class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
  
  def show
    @articles = Article.find_by(params[:id])
  end
  
  def new
    @article = current_user.articles.build()
  end
  
  def create
    @article = current_user.articles.build(article_params)
    if @article.save
      flash[:success] = '記事を作成しました'
      redirect_to articles_url
    else
      flash.now[:danger] = '記事作成に失敗しました'
      render :new
    end
  end
  
  def edit
  end
  
  def update
  end
  
  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    flash[:success] = '記事を削除しました'
    redirect_back(fallback_location: root_path)
  end
  
  private
  
  def article_params
    params.fetch(:article, {}).permit(:category_id)
    params.require(:article).permit(:image, :title, :content)
  end
  
end