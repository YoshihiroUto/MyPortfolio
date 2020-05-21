$(function(){

  // サイドバーのボタンが押されたら，押された要素へ自動スクロール
  new Vue({
    el: '#sidebar-wrapper',
    data: {
      current_active_element: 'home'
    },
    methods: {
      changeActive:function(event){
        event.preventDefault();
        
        if(event.target.id === "sidebar-home")this.current_active_element = "home";
        else if(event.target.id === "sidebar-about-me")this.current_active_element = "about";
        else if(event.target.id === "sidebar-portfolio")this.current_active_element = "portfolio";
        else if(event.target.id === "sidebar-blog")this.current_active_element = "blog";
        else if(event.target.id === "sidebar-contact")this.current_active_element = "contact";
        else console.log('エラー：指定以外の要素へスクロールしようとしています');

        $("html,body").animate({scrollTop:$(`#${this.current_active_element}`).offset().top});
        $(`ul.sidebar-nav-inner`).children("li").removeClass("active");
        $(`#${event.target.id}`).parent("li").addClass("active");
      },
    },
  });
  
  // Home画像が押されたら，ページのトップへスクロール
  $("#sidebar-home-image").on('click', (event) => {
    
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 });
    $(`ul.sidebar-nav-inner`).children("li").removeClass("active");
    $("#sidebar-home").parent("li").addClass("active");
  });
  
  $(`.portfolio-item a`).on('click', (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(event.target.id);
    
    
    if(event.target.id === "portfolio_1" && !($('#portfolio_content_1')).is(':visible') )
    {
      $('#portfolio_content_1').slideDown();
    }
    else $('#portfolio_content_1').slideUp();
    

    if(event.target.id === "portfolio_2" && !($('#portfolio_content_2')).is(':visible') )
    {
      $('#portfolio_content_2').slideDown();
    }
    else $('#portfolio_content_2').slideUp();

    if(event.target.id === "portfolio_3" && !($('#portfolio_content_3')).is(':visible') )
    {
      $('#portfolio_content_3').slideDown();
    }
    else $('#portfolio_content_3').slideUp();

  });

});





