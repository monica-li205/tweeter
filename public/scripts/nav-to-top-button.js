$(document).ready(function() {
  $(window).scroll(function() {
    var height = $(window).scrollTop();

    if(height  > 300) {
      console.log(height);
      $('#scroll-button-location').show();
    } else {
      $('#scroll-button-location').hide();
    }
  });

  $('#nav-to-top-button').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });
});