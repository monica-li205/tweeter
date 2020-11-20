$(document).ready(function() {
    const stickyNavTop = $('.nav').offset().top;

    const stickyNav = function(){
      var scrollTop = $(window).scrollTop();

      if (scrollTop > stickyNavTop) { 
          $('.nav').addClass('sticky');
      } else {
          $('.nav').removeClass('sticky'); 
      }
  };

  stickyNav();
  
  $(window).scroll(function() {
    stickyNav();
  });
});