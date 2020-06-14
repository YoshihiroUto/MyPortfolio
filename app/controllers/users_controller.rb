class UsersController < ApplicationController
  
  def new
    @user = User.new()
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "ユーザを作成しました"
    else
      flash[:danger] = "ユーザ作成に失敗しました"
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:name,:email,:password,:password_confirmation)
  end
  
end
