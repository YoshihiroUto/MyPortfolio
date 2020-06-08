class SessionsController < ApplicationController
  def new
    if current_user
      redirect_to articles_url
    end
  end

  def create
    # paramsに入っている:sessionのデータからメールの情報を取り，すべて小文字化
    email = params[:session][:email].downcase
    # paramsに入っている:sessionのデータからパスワードの情報をとる
    password = params[:session][:password]
    
    # ログイン判定後処理
    if login(email, password)
      flash.now[:success] = 'ログインに成功しました'
      redirect_to articles_url
    else
      flash.now[:danger] = 'ログインに失敗しました'
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    flash.now[:success] = 'ログアウトしました'
    render :new
  end
  
  private
  
  # ログイン処理
  def login(email, password)
    @user = User.find_by(email: email)
    if @user && @user.authenticate(password)
      # ログイン成功
      session[:user_id] = @user.id
      return true
    else
      # ログイン失敗
      return false
    end
  end
  
end