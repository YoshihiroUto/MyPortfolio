class ArticlesController < ApplicationController
  
  def index
    @articles = Article.all
  end
  
  def show
    @article = Article.find(params[:id])
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
    @article = Article.find(params[:id])
  end
  
  def update
    if @article.update(article_params)
      flash[:success] = '記事を編集しました'
      redirect_to article_path(@article)
    else
      flash.now[:danger] = '記事編集に失敗しました'
      render :edit
    end
  end
  
  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    flash[:success] = '記事を削除しました'
    redirect_back(fallback_location: root_path)
  end
  
  private
  
  def article_params
    params.require(:article).permit(:image, :title, :content)
  end
  
end