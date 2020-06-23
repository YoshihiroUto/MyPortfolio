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
      goTop:function(event){
        event.preventDefault();
        
        // Home画像が押されたら，ページのトップへスクロール
        $("#sidebar-home-image").on('click', (event) => {
          
          event.preventDefault();
          $('html, body').animate({ scrollTop: 0 });
          $(`ul.sidebar-nav-inner`).children("li").removeClass("active");
          $("#sidebar-home").parent("li").addClass("active");
        });
        
      }
    },
  });
  

  
  // porfolio.js ← テンプレート作成者が，Shuffle.jsの挙動などを書いていたが，
  // 上記ファイルが別であると，以下のVue el: '#portfolio'がうまく動かない．(jQuery適用範囲が上書きされてしまうため．)
  // そのため，以下にporfolio.js内の記述をすべて持ってくることにした．
  $(function(){
    var shuffleme = (function( $ ) {
      'use strict';
      var $grid = $('#grid'), //locate what we want to sort 
        $filterOptions = $('.portfolio-filter li'),  //locate the filter categories
        $sizer = $grid.find('.shuffle_sizer'),    //sizer stores the size of the items
    
        init = function() {
    
          // None of these need to be executed synchronously
          setTimeout(function() {
            listen();
            setupFilters();
          }, 100);
      
          // instantiate the plugin
          $grid.shuffle({
            itemSelector: '[class*="col-"]',
            sizer: $sizer    
          });
        },
    
          
    
        // Set up button clicks
        setupFilters = function() {
          var $btns = $filterOptions.children();
          $btns.on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
              isActive = $this.hasClass( 'active' ),
              group = isActive ? 'all' : $this.data('group');
    
            // Hide current label, show current label in title
            if ( !isActive ) {
              $('.portfolio-filter li a').removeClass('active');
            }
    
            $this.toggleClass('active');
    
            // Filter elements
            $grid.shuffle( 'shuffle', group );
          });
    
          $btns = null;
        },
    
        // Re layout shuffle when images load. This is only needed
        // below 768 pixels because the .picture-item height is auto and therefore
        // the height of the picture-item is dependent on the image
        // I recommend using imagesloaded to determine when an image is loaded
        // but that doesn't support IE7
        listen = function() {
          var debouncedLayout = $.throttle( 300, function() {
            $grid.shuffle('update');
          });
      
          // Get all images inside shuffle
          $grid.find('img').each(function() {
            var proxyImage;
      
            // Image already loaded
            if ( this.complete && this.naturalWidth !== undefined ) {
              return;
            }
      
            // If none of the checks above matched, simulate loading on detached element.
            proxyImage = new Image();
            $( proxyImage ).on('load', function() {
              $(this).off('load');
              debouncedLayout();
            });
      
            proxyImage.src = this.src;
          });
      
          // Because this method doesn't seem to be perfect.
          setTimeout(function() {
            debouncedLayout();
          }, 500);
        };      
    
      return {
        init: init
      };
    }( jQuery ));
    
    $(document).ready(function()
    {
      shuffleme.init(); //filter portfolio
    });
  
  });
  
  
  // クリック時に展開するポートフォリオのコンポーネント：ローカル登録  
  const portfolioContent = {
    props: {
      // images, small_imagesが配列であり，中身が空でないことを検証
      images: {
        type: Array,
        required: true,
      },
      current_portofolio:{
        type: String,
        required: true,
      }
    },
    template: `
    
    <ul class="row portfolio lightbox list-unstyled mb-0" id="grid">
      <li
        v-for="n in 4" 
        v-bind:key="n"
        class="col-lg-6 project"
      >
        <figure class="portfolio-item">
          <a class="popup" v-bind:href="images[current_portofolio][n-1][0]">
            <img class="img-fluid" v-bind:src="images[current_portofolio][n-1][1]" alt="">
          </a>
        </figure><!-- / portfolio-item -->
      </li> 
    </ul>

    `,
    
  }
  
  // ポートフォリオの詳細を表示する画面を表示
  new Vue({
    el: '#portfolio',
    data: {
      portfolio_images: [ 
        [
          [ 'images/izaillust/izaillust.png', 'images/izaillust/izaillust_small.png' ],
          [ 'images/izaillust/izaillust_profile_page.png', 'images/izaillust/izaillust_profile_page_small.png' ],
          [ 'images/izaillust/izaillust_ev_page.png', 'images/izaillust/izaillust_ev_page_small.png' ],
          [ 'images/izaillust/izaillust_ev_result_page.png', 'images/izaillust/izaillust_ev_result_page_small.png' ],
        ],
        [
          [ 'images/microposts/Microposts.png', 'images/microposts/Microposts.png' ],
          [ 'images/microposts/Microposts_post.png', 'images/microposts/Microposts_post_small.png' ],
          [ 'images/microposts/Microposts_signin.png', 'images/microposts/Microposts_signin_small.png' ],
          [ 'images/microposts/Microposts_user_page.png', 'images/microposts/Microposts_user_page_small.png' ],
        ],
        [
          [ 'images/myportfolio/Home2.png', 'images/myportfolio/Home2_small.png' ],
          [ 'images/myportfolio/AboutMe.png', 'images/myportfolio/AboutMe_small.png' ],
          [ 'images/myportfolio/Portfolio.png', 'images/myportfolio/Portfolio_small.png' ],
          [ 'images/myportfolio/Contact.png', 'images/myportfolio/Contact_small.png' ],
        ],
      ],

    },
    components: {
      'portfolio-content': portfolioContent,
    },
    methods: {
      showPortforlio:function(event){
        event.preventDefault();
        
        const w = $(window).width();
        
        if(!($(`#${event.target.id}_content`)).is(':visible')) {
          $(`.portfolio_contents div.portfolio_content`).slideUp();
          $(`#${event.target.id}_content`).slideDown();
          $("html,body").animate({scrollTop:$(`#${event.target.id}`).offset().top - 100});
          // 幅が狭い時用のレイアウトが適用されたときの記述
          if(w <= 767)
          {

            $("html,body").animate({scrollTop:$(".portfolio_contents").offset().top - 10});
          }
        }
        else $(`#${event.target.id}_content`).slideUp();
        
      },
      
    },
  });
  
  // popupクラスを持つ要素にMagnific Popupを適用
  $('.popup').magnificPopup({
  	type:'image',
  	closeOnContentClick: true,
    zoom: {
    	enabled: true,
    	duration: 300,
    	easing: 'ease-in-out',
    },
  });
  
  // "Contact Form を表示する"ボタンを押したときの挙動
  new Vue({
    el: '#contact',
    methods: {
      showContactForm:function(event){
        
        if(!($("#contact_form")).is(':visible')) {
          $("#contact_form").slideDown();

          $("html,body").animate({scrollTop:$("#contact_form").offset().top - 50});

        }
        else $("#contact_form").slideUp();
        
      },
      
    },
  });
  
});





