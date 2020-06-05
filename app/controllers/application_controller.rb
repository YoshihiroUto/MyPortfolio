class ApplicationController < ActionController::Base
  
  # current_userへの代入やcurrent_userに値があるかを判断するメソッドをインクルード
  include SessionsHelper
  
  private
  
  def require_user_logged_in
    unless logged_in?
      redirect_to login_url
    end
  end
end
