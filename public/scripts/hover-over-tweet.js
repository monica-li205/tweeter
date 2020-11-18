$(document).ready(function() {
  $("article").hover(function() {
    $(".tweeter-handle").show();
    $(this).css("box-shadow", "10px 10px  lightgrey")
  }, function() {
    $(".tweeter-handle").hide();
    $(this).css("box-shadow", "0px 0px  lightgrey");
  })
});