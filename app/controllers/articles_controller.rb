class ArticlesController < ApplicationController
  before_action :admin_user?, only: [:new,:edit,:destroy]
  
  def index

    if params[:current_category]
      if params[:current_category] === "Unselected"
        @articles = Article.where(category_id: nil).order(title: "asc") # カテゴリ未定義のものを選択
      else
        @articles = Article.where(category_id: params[:current_category]).order(title: "asc") # 既存カテゴリを選択
      end
    else
      @articles = Article.all.order(title: "asc") # すべてのカテゴリを取得
    end
    
    @categories = Category.all
  end
  
  def show
    @article = Article.find(params[:id])
  end
  
  def new
    @article = current_user.articles.build()
    @categories = Category.all
  end
  
  def create
    @article = current_user.articles.build(article_params)
    @categories = Category.all # エラーメッセージをきちんと表示させるために記述
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
    @categories = Category.all
  end
  
  def update
    @article = Article.find(params[:id])
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
    params.require(:article).permit(:category_id, :image, :title, :content)
  end
  
  def admin_user?
    if !logged_in?
      flash[:danger] = '管理者のみ編集や退会が行えます'
      redirect_back(fallback_location: articles_url)
    end
  end
  
end